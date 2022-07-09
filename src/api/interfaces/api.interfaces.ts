export interface IApiResponse<T> {
  _items: T[];
  _meta: {
    max_results: number;
    total_results: number;
    page: number;
    total_pages: number;
  };
}
