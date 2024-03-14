
export interface IPMOTopListRow {
  readonly funnelGenID: number,
  readonly topNumber: string,
  readonly invoiceDescription: string,
  readonly invoiceNumber: number,
  readonly invoiceDate: string,
  readonly productDesc: number,
  readonly productDescStr: string,
  readonly productPercentage: number,
  readonly serviceDesc: number,
  readonly serviceDescStr: string,
  readonly servicePercentage: number,
  readonly supportDoc: string,
  readonly docCollectionDate: Date,
  readonly notes: string,
}

export default interface IPMOTopList {
  readonly totalRows: number;
  readonly rows: IPMOTopListRow[];
}