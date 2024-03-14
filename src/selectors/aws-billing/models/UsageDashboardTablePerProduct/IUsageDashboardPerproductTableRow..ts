export default interface IUsageDashboardPerproductRow {

    readonly billingIdD  : number ;
    readonly billingIdH  : number ;
    readonly invoiceNumber  : number ;
    readonly productCode  : string ;
    readonly billingPeriodStart  : string ;
    readonly billingPeriodEnd  : string ;
    readonly accountId  : number ;
    readonly picName  : string ;
    readonly customerName  : string ;
    readonly usageAmount  : number ;
    readonly creditAmount  : number ;
    readonly discUsageAmount  : number ;
    readonly discSppAmount  : number ;
    readonly feeAmount   : number ;
    readonly riFeeAmount   : number ;
    readonly taxAmount   : number ;
    readonly syncDate  : string ;
    readonly modifiedDate  : string ;
    readonly modifiedById  : string ;
  }
  