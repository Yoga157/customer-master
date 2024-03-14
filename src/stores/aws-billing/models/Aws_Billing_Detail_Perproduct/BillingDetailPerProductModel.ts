import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class BillingDetailPerProductModel extends BaseModel {
    billingIdD  : number = 0;
    billingIdH  : number = 0;
    invoiceNumber  : number = 0;
    productCode  : string = '';
    billingPeriodStart  : string = '';
    billingPeriodEnd  : string = '';
    accountId  : number = 0;
    picName  : string = '';
    customerName  : string = '';
    usageAmount  : number = 0;
    creditAmount  : number = 0;
    discUsageAmount  : number = 0;
    discSppAmount  : number = 0;
    feeAmount   : number = 0;
    riFeeAmount   : number = 0;
    taxAmount   : number = 0;
    savingPlanAmount: number = 0;
    savingPlanNego: number = 0;
    savingPlanFee: number = 0;
    syncDate  : string = '';
    modifiedDate  : string = '';
    modifiedById  : string = '';

  constructor(data: Partial<BillingDetailPerProductModel>) {
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
