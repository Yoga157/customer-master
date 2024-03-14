/*
readonly funneleSvcCatGenID:number;
    readonly funnelGenID:number;
    readonly brandModelGenID:number ;
    readonly svcCatGenID:number ;
    readonly qty:number;
    readonly unitPrice:number;
    readonly totalPrice:number;
    readonly discountPctg:number;
    readonly discountAmount:number;
    readonly notes:string;
    readonly createUserID:string;
    readonly createDate?:Date;
    readonly modifyDate?:Date;
    readonly modifyUser:string ;
*/

export default interface IFunnelServiceCatalogTableRow {
  readonly funnelSvcCatGenID: number;
  readonly funnelGenID: number;
  readonly svcCatGenID: number;
  readonly svcCatReffID: string;
  readonly category: string;
  readonly serviceName: string;
  readonly brandModelName: string;
  readonly pic: string;
  readonly qty: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly discountStatus: string;
  readonly discountAmount: number;
  readonly discountPctg: number;
  readonly owner:string;
}
