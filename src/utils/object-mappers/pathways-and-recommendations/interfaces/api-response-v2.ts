export interface PathwaysAndRecommendationsApiResponseV2 {
  response: PathwaysAndRecommendationsAPIResponseV2Response
  metadata: Metadata
}

export interface Metadata {
  widget: Widget
  query: Query
  response: MetadataResponse
}

export interface Query {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface MetadataResponse {
  personalized_results: boolean
  fallback: string
  recall: string
}

export interface Widget {
  id: string
  name: string
  description: string
  type: string
  rid: string
}

export interface PathwaysAndRecommendationsAPIResponseV2Response {
  numFound: number
  start: number
  docs: Doc[]
}

export interface Doc {
  price: number
  url: string
  pid: string
  sale_price: number
  thumb_image: string
  title: string
}
