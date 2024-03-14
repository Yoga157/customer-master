
export interface RowHistoryGpm{
  readonly totalCostProduct: number ,
  readonly totalSellingProduct: number ,
  readonly totalCostService: number ,
  readonly totalSellingService: number ,
  readonly totalExpendProduct: number ,
  readonly totalExpendService: number ,
  readonly gpmProduct: number ,
  readonly gpmService: number ,
  readonly gpmAmount: number ,
  readonly gpmPercentage: number ,
  readonly createDate: string|Date ,
  readonly remark: string ,
}

export default interface IFunnelHistoryGpm{
  readonly totalRows : number,
  readonly rows: RowHistoryGpm[]
}