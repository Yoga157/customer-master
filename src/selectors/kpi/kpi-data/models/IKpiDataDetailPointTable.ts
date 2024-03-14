import IKpiDataDetailPointableRow from './IKpiDataDetailPointTableRow';

export default interface IKpiDataDetailPointTable {
  readonly totalRow: number;
  readonly totalPoint: number;
  readonly column: string;
  readonly sorting: string;
  readonly rows: IKpiDataDetailPointableRow[];
}
