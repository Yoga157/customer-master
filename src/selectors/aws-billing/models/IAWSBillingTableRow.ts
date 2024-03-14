export default interface IAWSBillingTableRow {
    readonly billingIdH: number;
    readonly billingPeriod: string;
    readonly billingPeriodStart: string;
    readonly billingPeriodStartStr: string;
    readonly billingPeriodEnd: string;
    readonly billingPeriodEndStr: string;
    readonly accountId: number;
    readonly picName: string;
    readonly picNameDept: string;
    readonly picNameID: number;
    readonly customerName: string;
    readonly totalBillingUsd: number;
    readonly rate: number;
    readonly credit: Number;
    readonly usageAmount: number;
    readonly savingPlanAmount: number;
    readonly savingPlanFee: number;
    readonly savingPlanNego: number;
    readonly customerNameID: number
    readonly discountUsage: number;
    readonly sppDiscount: number;
    readonly fee: number;
    readonly riFee: number;
    readonly tax: number;
    readonly totalBillingIdr: number;
    readonly invoiceNo: string;
    readonly billingStatus: string;
    readonly syncDate: string;
    readonly syncDateStr: string;
    readonly createdBy: string;
    readonly createdDate: string;
    readonly modifiedBy: string;
    readonly modifiedDate: string;
    readonly isUsageDetail: number;
    readonly so: string;
    readonly flag: string;
    readonly mpa: string;
  }
  