import IBoqTableRow from './IBoqTableRow';

export default interface IBoqTable {
  readonly totalRow: number;
  readonly rows: IBoqTableRow[];
}
