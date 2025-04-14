export interface IPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ICaloriesRange {
  min?: number;
  max?: number;
}

export interface ITotalTimeRange {
  min?: number;
  max?: number;
}
