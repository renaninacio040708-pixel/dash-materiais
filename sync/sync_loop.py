"""
DASH Materiais — sincronizador de preço/estoque com a Shopee.

O que faz: abre uma área de trabalho virtual NOVA (separada da sua),
abre o Edge lá (já logado como dash6556, mesma sessão), passa pelos
30 produtos no Seller Center, lê preço/preço com desconto/estoque de
cada um, e atualiza a tabela `product_status` no Supabase. Depois
fecha essa área de trabalho virtual e volta para a que você estava
usando. Repete a cada SYNC_INTERVAL_HOURS.

Como rodar:
    1. Crie um arquivo sync/.env (não sobe pro git) com:
         SUPABASE_URL=https://SEU-PROJETO.supabase.co
         SUPABASE_SERVICE_KEY=sua-service-role-key
       (pegue as duas em Project Settings > API > Legacy anon,
       service_role API keys — a service_role fica só aqui no seu PC,
       nunca vai pro site nem pro GitHub).
    2. python -m pip install pyautogui pyscreeze==0.1.28 pygetwindow requests
    3. python sync_loop.py
    4. Deixa essa janela do terminal rodando em segundo plano. Ela vai
       abrir uma área de trabalho virtual nova a cada ciclo, mexer lá,
       e fechar — não deve atrapalhar o que você estiver fazendo na
       sua área de trabalho principal.

Para rodar só uma vez (sem loop), chame: python sync_loop.py --once

Nota sobre CONSOLE_XY: essa automação clica em coordenadas fixas da tela
pra usar o DevTools do Edge. Se o painel Console estiver ancorado à
direita (não embaixo, não em aba dividida com "Fontes"), a posição
(1550, 1007) funciona em Full HD. Se os resultados vierem vazios, abra
o Edge, aperte F12, confirme que só a aba "Console" está visível
ancorada à direita, e ajuste CONSOLE_XY se sua resolução for diferente.
"""

import os
import sys
import time
import json
import subprocess
from datetime import datetime, timezone

import pyautogui
import requests


def _load_dotenv(path):
    """Minimal .env loader (no extra dependency) — only sets vars not already in the environment."""
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())


_load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# ---------------------------------------------------------------------------
# Configuração — preencha sync/.env (ou defina como variável de ambiente)
# ---------------------------------------------------------------------------
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")
SYNC_INTERVAL_HOURS = 4

PRODUCT_IDS = [
    "58217052625", "58266742369", "58266733685", "58216757016", "58216760920",
    "58266750118", "58216757078", "58216748452", "58216760868", "58266733657",
    "58216757073", "58216748396", "58216752429", "58216752459", "58216748410",
    "58216756980", "58216760827", "58266750141", "58216752377", "58216752382",
    "58216752389", "58216760895", "58216752451", "23295182154", "58216760858",
    "58216760864", "58216760886", "58216760883", "58266750099", "58216752397",
]

SCRATCH_DIR = os.path.join(os.path.dirname(__file__), "_scratch")
os.makedirs(SCRATCH_DIR, exist_ok=True)
LOG_FILE = os.path.join(SCRATCH_DIR, "sync_log.txt")
CONSOLE_XY = (1550, 1007)  # posicao do console do DevTools quando ancorado a direita

JS_CLICK_TAB = (
    'document.querySelectorAll("body *").forEach(el=>{'
    'if(el.children.length===0&&el.textContent.trim()==="Informacoes de vendas")el.click();});'
)

EXTRACT_JS = (
    'copy(JSON.stringify((function(){'
    'function norm(s){return s.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");}'
    'function findByText(txt){const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(norm(n.textContent.trim())===txt)return n.parentElement;}return null;}'
    'function nearestInput(el){if(!el)return null;let cur=el;for(let i=0;i<6&&cur;i++){const inp=cur.querySelector&&cur.querySelector("input");if(inp)return inp.value;cur=cur.parentElement;}return null;}'
    'const precoEl=findByText("Preco");'
    'const estoqueEl=findByText("Estoque");'
    'const body=norm(document.body.innerText);'
    'const idx=body.lastIndexOf("Informacoes de vendas");'
    'const chunk=body.slice(idx,idx+500);'
    'const discMatch=chunk.match(/R\\$([\\d.,]+)\\s*\\(\\s*(\\d+)\\s*%/)||[];'
    'const out={};'
    'out.preco=nearestInput(precoEl&&precoEl.parentElement);'
    'out.estoque=nearestInput(estoqueEl&&estoqueEl.parentElement);'
    'out.descPreco=discMatch[1]||null;'
    'out.descPct=discMatch[2]||null;'
    'return out;'
    '})()))'
)


def log(msg):
    line = f"[{datetime.now().isoformat(timespec='seconds')}] {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def get_clipboard():
    r = subprocess.run(
        ["powershell", "-NoProfile", "-Command", "Get-Clipboard -Raw"],
        capture_output=True, text=True, encoding="utf-8", errors="ignore",
    )
    return (r.stdout or "").strip()


def type_and_run(js):
    pyautogui.click(*CONSOLE_XY)
    time.sleep(0.2)
    pyautogui.hotkey("ctrl", "a")
    time.sleep(0.1)
    pyautogui.press("delete")
    time.sleep(0.1)
    pyautogui.typewrite(js, interval=0.004)
    time.sleep(0.2)
    pyautogui.press("escape")  # dismiss any autocomplete suggestion first
    time.sleep(0.1)
    pyautogui.press("enter")


def brl_to_number(s):
    if not s:
        return None
    try:
        return float(s.replace(".", "").replace(",", "."))
    except ValueError:
        return None


def open_virtual_desktop_and_edge():
    log("Abrindo área de trabalho virtual nova...")
    pyautogui.hotkey("win", "ctrl", "d")
    time.sleep(1.2)
    pyautogui.hotkey("win", "r")
    time.sleep(0.6)
    pyautogui.typewrite("msedge https://seller.shopee.com.br/portal/product/list/all", interval=0.01)
    pyautogui.press("enter")
    time.sleep(6)
    pyautogui.press("f12")
    time.sleep(1.5)


def close_virtual_desktop():
    log("Fechando área de trabalho virtual e voltando para a principal...")
    pyautogui.hotkey("win", "ctrl", "f4")
    time.sleep(1)


def scrape_one(item_id):
    url = f"https://seller.shopee.com.br/portal/product/{item_id}"
    pyautogui.click(600, 75)
    time.sleep(0.2)
    pyautogui.hotkey("ctrl", "a")
    time.sleep(0.1)
    pyautogui.typewrite(url, interval=0.008)
    time.sleep(0.2)
    pyautogui.press("enter")
    time.sleep(4.5)
    pyautogui.press("escape")
    time.sleep(0.2)

    type_and_run(JS_CLICK_TAB)
    time.sleep(1.0)
    type_and_run(EXTRACT_JS)
    time.sleep(0.8)
    clip = get_clipboard()

    for _ in range(2):
        if clip.strip().startswith("{") and '"preco":null' not in clip:
            break
        time.sleep(1.5)
        type_and_run(EXTRACT_JS)
        time.sleep(0.8)
        clip = get_clipboard()

    try:
        data = json.loads(clip)
    except json.JSONDecodeError:
        return None

    preco = brl_to_number(data.get("preco"))
    estoque_raw = data.get("estoque")
    estoque = None
    if estoque_raw:
        try:
            estoque = int(estoque_raw.replace(".", ""))
        except ValueError:
            estoque = None
    desc_preco = brl_to_number(data.get("descPreco"))
    desc_pct = data.get("descPct")
    has_discount = bool(desc_preco and desc_pct)

    return {
        "id": item_id,
        # price = o que o cliente paga de fato (com desconto quando houver promoção)
        "price": desc_preco if has_discount else preco,
        # original_price = preço de tabela, só preenchido quando há promoção ativa
        "original_price": preco if has_discount else None,
        "discount_pct": int(desc_pct) if has_discount else None,
        "stock": estoque,
        "in_stock": (estoque is None) or estoque > 0,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


def push_to_supabase(rows):
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        log("SUPABASE_URL/SUPABASE_SERVICE_KEY não configurados — pulando envio.")
        return

    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/product_status",
        headers={
            "apikey": SUPABASE_SERVICE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates",
        },
        json=rows,
        timeout=30,
    )
    resp.raise_for_status()
    log(f"Supabase atualizado: {len(rows)} produtos.")


def sync_once():
    open_virtual_desktop_and_edge()
    rows = []
    try:
        for idx, item_id in enumerate(PRODUCT_IDS):
            row = scrape_one(item_id)
            if row:
                rows.append(row)
                log(f"{idx+1}/{len(PRODUCT_IDS)} {item_id}: OK")
            else:
                log(f"{idx+1}/{len(PRODUCT_IDS)} {item_id}: FALHOU (verificar manualmente)")
    finally:
        close_virtual_desktop()

    if rows:
        push_to_supabase(rows)
    log(f"Ciclo concluído: {len(rows)}/{len(PRODUCT_IDS)} produtos sincronizados.")


if __name__ == "__main__":
    once = "--once" in sys.argv
    while True:
        sync_once()
        if once:
            break
        log(f"Aguardando {SYNC_INTERVAL_HOURS}h até o próximo ciclo...")
        time.sleep(SYNC_INTERVAL_HOURS * 3600)
