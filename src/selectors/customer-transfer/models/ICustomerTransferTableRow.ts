export interface ICustomerTransferTableRow {
  readonly id: number;
  readonly funnelGenID: number;
  readonly customerGenID: number;
  readonly customerName: string;
  readonly projectName: string;
  readonly totalSellingPrice: string;
  readonly gpmAmount: string;
  readonly dealCloseDate: string;
  readonly funnelStatus: string;
}

export interface IHistoryTableRow {
  readonly id: number;
  readonly customerName: string;
  readonly funnelID: string;
  readonly fromSales: string;
  readonly toSales: string;
  readonly createDate: string;
  readonly creatorUserID: number;
}
