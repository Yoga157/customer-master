import IProductServiceTableRow from './IProductServiceTableRow';

export default interface IProductServiceTable {
  readonly  totalItemProduct:number
  readonly totalItemService:number
  readonly totalRow: number;
  readonly rows: IProductServiceTableRow[];
}
