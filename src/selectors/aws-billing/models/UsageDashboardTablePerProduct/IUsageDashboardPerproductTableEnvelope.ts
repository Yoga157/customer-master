import IUsageDashboardPerproductTable from './IUsageDashboardPerproductTable';

export default interface IUsageDashboardPerproductTableEnvelope {
  readonly totalAmount: number;
  readonly awsBillingDetail : IUsageDashboardPerproductTable[];
}
