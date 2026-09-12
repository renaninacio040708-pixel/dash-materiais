-- DASH Materiais — schema do painel (rodar uma vez no SQL Editor do Supabase)

create extension if not exists "pgcrypto";

-- Preço/estoque ao vivo por produto (atualizado pelo script de sincronização local)
create table if not exists product_status (
  id text primary key,
  price numeric,
  original_price numeric,
  discount_pct int,
  stock int,
  in_stock boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Eventos de analytics (visita ao site, visualização de produto, clique para a Shopee)
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('site_view', 'product_view', 'shopee_click')),
  product_id text,
  path text,
  created_at timestamptz not null default now()
);

-- Pedidos de reposição de produtos esgotados
create table if not exists restock_requests (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  product_name text not null,
  name text not null,
  email text not null,
  fulfilled boolean not null default false,
  created_at timestamptz not null default now()
);

-- E-mails com acesso ao painel /admin
create table if not exists admin_allowlist (
  email text primary key
);

insert into admin_allowlist (email) values ('i.renan0407@gmail.com')
on conflict (email) do nothing;

-- Row Level Security
alter table product_status enable row level security;
alter table analytics_events enable row level security;
alter table restock_requests enable row level security;
alter table admin_allowlist enable row level security;

-- product_status: qualquer visitante pode ler; escrita só via service_role (script local)
create policy "public read product_status" on product_status
  for select using (true);

-- analytics_events: qualquer visitante pode inserir (rastreamento); só admin lê
create policy "public insert analytics_events" on analytics_events
  for insert with check (true);

create policy "admin read analytics_events" on analytics_events
  for select using (auth.jwt() ->> 'email' in (select email from admin_allowlist));

-- restock_requests: qualquer visitante pode inserir; só admin lê/atualiza
create policy "public insert restock_requests" on restock_requests
  for insert with check (true);

create policy "admin read restock_requests" on restock_requests
  for select using (auth.jwt() ->> 'email' in (select email from admin_allowlist));

create policy "admin update restock_requests" on restock_requests
  for update using (auth.jwt() ->> 'email' in (select email from admin_allowlist));

-- admin_allowlist: ninguém lê via cliente (só o backend/local via service_role)
-- (nenhuma policy de select para anon/authenticated = acesso negado por padrão)
