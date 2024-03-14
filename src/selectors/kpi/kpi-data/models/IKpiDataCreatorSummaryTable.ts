import IKpiDataCreatorSummaryTableRow from './IKpiDataCreatorSummaryTableRow';

export default interface IKpiDataDetailPointTable {
  readonly totalRow: number;
  readonly rows: IKpiDataCreatorSummaryTableRow[];
}
