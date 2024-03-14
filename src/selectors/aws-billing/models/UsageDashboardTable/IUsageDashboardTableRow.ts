export default interface IUsageDashboardDetailRow {
    readonly usageId : number;
    readonly billingIdH : number;
    readonly creditId : number;
    readonly lprNumber : string;
    readonly cbvNumber : string;
    readonly soNo : string;
    readonly so: number;
    readonly oiNo : string;
    readonly funnelId : number;
    readonly usageAmount : number;
    readonly necessity : string;
    readonly resources : string;
    readonly notes : string;
    readonly createdBy : string;
    readonly createdDate : string;
    readonly modifiedBy : string;
    readonly modifiedDate : string;
  }
  