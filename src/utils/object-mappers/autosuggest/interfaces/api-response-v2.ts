export interface AutosuggestApiResponseV2 {
  responseHeader: ResponseHeader
  response: Response
}

export interface Response {
  q?: string
  suggestions?: Suggestion[]
  numFound?: number
  products?: Product[]
}

export interface Product {
  price?: number
  sale_price: number
  url: string
  pid: string
  thumb_image: string
  title: string
}

export interface Suggestion {
  q: string
  dq: string
  filters?: Filter[]
}

export interface Filter {
  name: string
  value: string
  key: string
}

export interface ResponseHeader {
  zkConnected: boolean
  status: number
  QTime: number
}
