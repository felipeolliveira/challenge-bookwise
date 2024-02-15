export * from './getBook'
export * from './getBooks'
export * from './getBooksByRating'
export * from './getCategories'
export * from './getUserRatingBooks'
export * from './getUserStats'

export interface GetData<FetchArgs, FetchResponse> {
  key: string
  fetch: (data: FetchArgs) => () => Promise<FetchResponse>
}
export interface MutationData<FetchArgs, FetchResponse = unknown> {
  key: string
  fn: (data: FetchArgs) => Promise<FetchResponse>
}
