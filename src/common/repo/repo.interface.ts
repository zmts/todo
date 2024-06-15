interface IPagination {
  limit?: number
  offset?: number
}

export interface IPage <T> {
  items: Array<T>,
  total: number
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface IOrder<T> {
  field?: keyof T | string
  direction?: OrderDirection
}

export interface IFindOptions <T> {
  pagination?: IPagination,
  order?: IOrder<T>
  filter?: T
}
