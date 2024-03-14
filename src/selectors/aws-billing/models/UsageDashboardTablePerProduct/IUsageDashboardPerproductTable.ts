import IUsageDashboardPerproductRow from './IUsageDashboardPerproductTableRow.';

export default interface IUsageDashboardPerproductTable {
  readonly period : string;
  readonly productCode  : string;
  readonly totalUsageAmount  : number;
  readonly awsBillingDetail : IUsageDashboardPerproductRow[];
}
