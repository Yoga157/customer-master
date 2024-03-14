import IReqDedicatedResourceTableRow from './IReqDedicatedResourceTableRow';

export default interface IReqDedicatedResourceTable {
  readonly totalRow: number;
  readonly rows: IReqDedicatedResourceTableRow[];
}
