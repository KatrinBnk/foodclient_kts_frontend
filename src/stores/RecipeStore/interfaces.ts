export interface IPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IRange {
  min?: number;
  max?: number;
}