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
  category: Category
  url: string
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

export const products: Product[] = [
  { id: "58217052625", name: "Bloqueador de Ar 2 Molas Alta e Baixa Pressão para Registro Hidráulico", category: "Hidráulica", url: link("58217052625") },
  { id: "58266733657", name: "Bloqueador de Ar 2 Molas Alta e Baixa Pressão — Reduz Conta de Água", category: "Hidráulica", url: link("58266733657") },
  { id: "58266742369", name: "4 Bloqueadores de Ar 2 Molas Alta e Baixa Pressão", category: "Hidráulica", url: link("58266742369") },
  { id: "58216752382", name: "Sanitário Almofadado Oval Original ATLAS Branco", category: "Hidráulica", url: link("58216752382") },

  { id: "58266733685", name: "Kit 4 Selante Pu40 Elite + Aplicador Profissional Alumínio", category: "Vedação", url: link("58266733685") },
  { id: "58216757016", name: "Kit 5 Pu40 Multiuso 400g + Pistola Aplicadora Reforçada", category: "Vedação", url: link("58216757016") },
  { id: "58216760920", name: "Kit 12 Selantes Cinza Pu 40 Construção Sachê 800g Wurth", category: "Vedação", url: link("58216760920") },
  { id: "58216757078", name: "Kit 4 Selantes Pu40 4 Cores Construção Sachê 800g Wurth", category: "Vedação", url: link("58216757078") },
  { id: "58216748452", name: "Kit 4 Cola PU40 + Aplicador Reforçado — Isopor, Vidro, Metal", category: "Vedação", url: link("58216748452") },
  { id: "58216757073", name: "Kit 2 Colas Pu40 Selante 400g + Aplicador Reforçado", category: "Vedação", url: link("58216757073") },
  { id: "58216748396", name: "Kit 4 Selantes Preto Pu 40 Construção Sachê 800g Wurth", category: "Vedação", url: link("58216748396") },
  { id: "58216752459", name: "Kit Cola Pu40 + Aplicador Reforçado — Pedra, Vidro, Zinco", category: "Vedação", url: link("58216752459") },
  { id: "58216748410", name: "Kit 6 Selantes Branco Pu 40 Construção Sachê 800g Wurth", category: "Vedação", url: link("58216748410") },
  { id: "58216752377", name: "Aplicador de Silicone e Cola PU Super Reforçado Profissional", category: "Vedação", url: link("58216752377") },

  { id: "58266750118", name: "Ralo Linear Oculto 5x50 ABS Invisível Sifonado", category: "Drenagem", url: link("58266750118") },
  { id: "58216756980", name: "Ralo Oculto 15x15 Invisível 5 Cores Piso e Porcelanato", category: "Drenagem", url: link("58216756980") },
  { id: "58216760827", name: "Ralo Oculto 10x10 Invisível 5 Cores Piso e Porcelanato", category: "Drenagem", url: link("58216760827") },

  { id: "58216760868", name: "10 Discos Wídea 110mm 24 Dentes para Corte de Madeira", category: "Corte", url: link("58216760868") },
  { id: "58216760864", name: "Kit 2 Discos Wídea 110mm 24D para Corte de Madeira", category: "Corte", url: link("58216760864") },
  { id: "58216752429", name: "Kit 12 Estiletes Profissional Emborrachado 18mm", category: "Corte", url: link("58216752429") },
  { id: "58266750141", name: "Kit 96 Estiletes Profissional Emborrachado 18mm", category: "Corte", url: link("58266750141") },
  { id: "58216760895", name: "Kit 48 Estiletes Profissional Emborrachado 18mm", category: "Corte", url: link("58216760895") },
  { id: "58216752451", name: "Kit 24 Estiletes Profissional Emborrachado 18mm", category: "Corte", url: link("58216752451") },
  { id: "58216760886", name: "Kit 6 Estiletes Profissional + 10 Lâminas 18mm", category: "Corte", url: link("58216760886") },
  { id: "58216760883", name: "Kit 2 Estiletes + 10 Lâminas Profissional 18mm", category: "Corte", url: link("58216760883") },

  { id: "58216752389", name: "Fechadura Tetra Antifurto 6 Chaves Sobrepor para Portão", category: "Segurança", url: link("58216752389") },
  { id: "23295182154", name: "Fechadura Antifurto Tetra 6 Chaves Proteção Máxima", category: "Segurança", url: link("23295182154") },

  { id: "58216760858", name: "Bobina 50 Metros + 2 Clips Varal Cabo de Aço Reforçado", category: "Fixação", url: link("58216760858") },
  { id: "58266750099", name: "Bobina 100 Metros Varal Cabo de Aço Reforçado Revestido", category: "Fixação", url: link("58266750099") },
  { id: "58216752397", name: "Bobina 100 Metros + 10 Clips Varal Cabo de Aço 1,75mm", category: "Fixação", url: link("58216752397") },
]
