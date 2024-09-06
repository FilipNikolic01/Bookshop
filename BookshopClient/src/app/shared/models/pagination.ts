import { IBook } from "./book"

export interface IPagination {
    pageIndex: number
    pageSize: number
    count: number
    data: IBook[]
}

export class Pagination implements IPagination {
  pageIndex!: number;
  pageSize!: number;
  count!: number;
  data: IBook[] = [];
}