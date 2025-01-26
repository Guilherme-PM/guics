export interface PaginatedResultDTO {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  items?: any[];
}
