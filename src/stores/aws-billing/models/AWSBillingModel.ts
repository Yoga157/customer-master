import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class AWSBillingModel extends BaseModel {
    billingIdH: number = 0;
    billingPeriod: string = '';
    billingPeriodStart: string = '';
    billingPeriodStartStr: string = '';
    billingPeriodEnd: string = '';
    billingPeriodEndStr: string = '';
    accountId: number = 0;
    picName: string = '';
    picNameID: number = 0;
    picNameDept: string = '';
    customerName: string = '';
    totalBillingUsd: number = 0;
    rate: number = 0;
    credit: number = 0;
    usageAmount: number = 0;
    savingPlanAmount: number = 0;
    savingPlanFee: number = 0;
    savingPlanNego: number = 0;
    customerNameID: number = 0;
    discountUsage: number = 0;
    sppDiscount: number = 0;
    fee: number = 0;
    riFee: number = 0;
    tax: number = 0;
    invoiceNo: string = '';
    totalBillingIdr: number = 0;
    billingStatus: string = '';
    syncDate: string = '';
    syncDateStr: string = '';
    createdBy: string = '';
    createdDate: string = '';
    modifiedBy: string = '';
    modifiedDate: string = '';
    isUsageDetail: number = 0;
    so: string = '';
    mpa: string = '';
    flag: string = '';

  constructor(data: Partial<AWSBillingModel>) {
    super();
    this.update(data);
  }

  // public update(data: Partial<AWSBillingModel>): void {
  //   const conversionOptions: IConversionOption = {
  //       awsid: ConversionTypeEnum.String,
  //       accessKey: ConversionTypeEnum.String,
  //       secretKey: ConversionTypeEnum.String,
  //       notes: ConversionTypeEnum.String,
  //       userLoginID: ConversionTypeEnum.Number,
  //       createdBy: ConversionTypeEnum.String,
  //       modifiedBy: ConversionTypeEnum.String,
  //       createUserID: ConversionTypeEnum.Number,
  //       modifyUserID: ConversionTypeEnum.Number
  //   };

    // super.update(data, conversionOptions);
  // }
}
