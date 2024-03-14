import IDashboardSalesTableRow from './IDashboardSalesTableRow';

export default interface ICustomerFunnelTable {
  readonly totalRow: number;
  readonly rows: IDashboardSalesTableRow[];
}
