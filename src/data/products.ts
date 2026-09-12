export type Category =
  | "Vedação"
  | "Drenagem"
  | "Corte"
  | "Segurança"
  | "Fixação"
  | "Hidráulica"

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  url: string
  image: string
}

export const categories: Category[] = [
  "Vedação",
  "Hidráulica",
  "Drenagem",
  "Corte",
  "Segurança",
  "Fixação",
]

const SHOP_ID = "600231337"
const link = (itemId: string) => `https://shopee.com.br/product/${SHOP_ID}/${itemId}`
const img = (itemId: string) => `/products/${itemId}.jpg`

export const products: Product[] = [
  { id: "58217052625", name: "Bloqueador de Ar 2 Molas Alta e Baixa Pressão para Registro Hidráulico", description: "Elimina o ar preso na tubulação do registro e reduz o consumo de água.", category: "Hidráulica", url: link("58217052625"), image: img("58217052625") },
  { id: "58266733657", name: "Bloqueador de Ar 2 Molas Alta e Baixa Pressão — Reduz Conta de Água", description: "Instalação simples antes da boia da caixa d'água, sem obra.", category: "Hidráulica", url: link("58266733657"), image: img("58266733657") },
  { id: "58266742369", name: "4 Bloqueadores de Ar 2 Molas Alta e Baixa Pressão", description: "Kit com 4 unidades para equipar todos os registros da casa.", category: "Hidráulica", url: link("58266742369"), image: img("58266742369") },
  { id: "58216752382", name: "Sanitário Almofadado Oval Original ATLAS Branco", description: "Vaso sanitário oval em louça branca, padrão ATLAS.", category: "Hidráulica", url: link("58216752382"), image: img("58216752382") },

  { id: "58266733685", name: "Kit 4 Selante Pu40 Elite + Aplicador Profissional Alumínio", description: "Vedação de alta aderência com aplicador de alumínio incluso.", category: "Vedação", url: link("58266733685"), image: img("58266733685") },
  { id: "58216757016", name: "Kit 5 Pu40 Multiuso 400g + Pistola Aplicadora Reforçada", description: "Cinco sachês de selante multiuso com pistola aplicadora reforçada.", category: "Vedação", url: link("58216757016"), image: img("58216757016") },
  { id: "58216760920", name: "Kit 12 Selantes Cinza Pu 40 Construção Sachê 800g Wurth", description: "Doze sachês de 800g para vedação em obras de maior porte.", category: "Vedação", url: link("58216760920"), image: img("58216760920") },
  { id: "58216757078", name: "Kit 4 Selantes Pu40 4 Cores Construção Sachê 800g Wurth", description: "Quatro cores diferentes de selante PU40 em sachê de 800g.", category: "Vedação", url: link("58216757078"), image: img("58216757078") },
  { id: "58216748452", name: "Kit 4 Cola PU40 + Aplicador Reforçado — Isopor, Vidro, Metal", description: "Cola PU reforçada para isopor, vidro e metal, com aplicador incluso.", category: "Vedação", url: link("58216748452"), image: img("58216748452") },
  { id: "58216757073", name: "Kit 2 Colas Pu40 Selante 400g + Aplicador Reforçado", description: "Vedação para lajes, trincas e calhas com aplicador reforçado.", category: "Vedação", url: link("58216757073"), image: img("58216757073") },
  { id: "58216748396", name: "Kit 4 Selantes Preto Pu 40 Construção Sachê 800g Wurth", description: "Selante preto PU40 em sachê de 800g, caixa com 4 unidades.", category: "Vedação", url: link("58216748396"), image: img("58216748396") },
  { id: "58216752459", name: "Kit Cola Pu40 + Aplicador Reforçado — Pedra, Vidro, Zinco", description: "Cola PU reforçada para pedra, vidro e zinco.", category: "Vedação", url: link("58216752459"), image: img("58216752459") },
  { id: "58216748410", name: "Kit 6 Selantes Branco Pu 40 Construção Sachê 800g Wurth", description: "Selante branco PU40 em sachê, caixa com 6 unidades.", category: "Vedação", url: link("58216748410"), image: img("58216748410") },
  { id: "58216752377", name: "Aplicador de Silicone e Cola PU Super Reforçado Profissional", description: "Pistola aplicadora profissional para tubos de silicone e PU.", category: "Vedação", url: link("58216752377"), image: img("58216752377") },

  { id: "58266750118", name: "Ralo Linear Oculto 5x50 ABS Invisível Sifonado", description: "Ralo linear invisível para banheiros e áreas externas.", category: "Drenagem", url: link("58266750118"), image: img("58266750118") },
  { id: "58216756980", name: "Ralo Oculto 15x15 Invisível 5 Cores Piso e Porcelanato", description: "Ralo oculto quadrado, disponível em 5 cores.", category: "Drenagem", url: link("58216756980"), image: img("58216756980") },
  { id: "58216760827", name: "Ralo Oculto 10x10 Invisível 5 Cores Piso e Porcelanato", description: "Ralo oculto compacto para piso e porcelanato.", category: "Drenagem", url: link("58216760827"), image: img("58216760827") },

  { id: "58216760868", name: "10 Discos Wídea 110mm 24 Dentes para Corte de Madeira", description: "Discos de corte para madeira, 24 dentes, uso profissional.", category: "Corte", url: link("58216760868"), image: img("58216760868") },
  { id: "58216760864", name: "Kit 2 Discos Wídea 110mm 24D para Corte de Madeira", description: "Par de discos de corte com 24 dentes para serra circular.", category: "Corte", url: link("58216760864"), image: img("58216760864") },
  { id: "58216752429", name: "Kit 12 Estiletes Profissional Emborrachado 18mm", description: "Estiletes emborrachados 18mm, caixa com 12 unidades.", category: "Corte", url: link("58216752429"), image: img("58216752429") },
  { id: "58266750141", name: "Kit 96 Estiletes Profissional Emborrachado 18mm", description: "Estoque de estiletes emborrachados 18mm, caixa com 96 unidades.", category: "Corte", url: link("58266750141"), image: img("58266750141") },
  { id: "58216760895", name: "Kit 48 Estiletes Profissional Emborrachado 18mm", description: "Estiletes emborrachados 18mm, caixa com 48 unidades.", category: "Corte", url: link("58216760895"), image: img("58216760895") },
  { id: "58216752451", name: "Kit 24 Estiletes Profissional Emborrachado 18mm", description: "Estiletes emborrachados 18mm, caixa com 24 unidades.", category: "Corte", url: link("58216752451"), image: img("58216752451") },
  { id: "58216760886", name: "Kit 6 Estiletes Profissional + 10 Lâminas 18mm", description: "Seis estiletes profissionais com dez lâminas de reposição.", category: "Corte", url: link("58216760886"), image: img("58216760886") },
  { id: "58216760883", name: "Kit 2 Estiletes + 10 Lâminas Profissional 18mm", description: "Dois estiletes com lâminas de reposição incluídas.", category: "Corte", url: link("58216760883"), image: img("58216760883") },

  { id: "58216752389", name: "Fechadura Tetra Antifurto 6 Chaves Sobrepor para Portão", description: "Fechadura de sobrepor com 6 chaves para reforço de portões.", category: "Segurança", url: link("58216752389"), image: img("58216752389") },
  { id: "23295182154", name: "Fechadura Antifurto Tetra 6 Chaves Proteção Máxima", description: "Trava adicional com 6 chaves para portões e portas.", category: "Segurança", url: link("23295182154"), image: img("23295182154") },

  { id: "58216760858", name: "Bobina 50 Metros + 2 Clips Varal Cabo de Aço Reforçado", description: "Cabo de aço revestido com clipes para instalar varal.", category: "Fixação", url: link("58216760858"), image: img("58216760858") },
  { id: "58266750099", name: "Bobina 100 Metros Varal Cabo de Aço Reforçado Revestido", description: "Cem metros de cabo de aço revestido para varal.", category: "Fixação", url: link("58266750099"), image: img("58266750099") },
  { id: "58216752397", name: "Bobina 100 Metros + 10 Clips Varal Cabo de Aço 1,75mm", description: "Cabo de aço reforçado com dez clipes inclusos.", category: "Fixação", url: link("58216752397"), image: img("58216752397") },
]
