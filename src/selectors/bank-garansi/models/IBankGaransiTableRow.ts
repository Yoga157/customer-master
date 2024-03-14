export default interface IBankGaransiTableRow {
    readonly bankGuaranteeGenID:number;
    readonly funnelGenID:number
    readonly projectAmount:number
    readonly nilai:number,
    readonly status:string;
    readonly bondIssuer:string;
    readonly bondType:string;
    readonly letterType:string;
    readonly bankGuaranteeNo:string;
    readonly submitDate?:Date;
    readonly expireDate?:Date;
  }
  