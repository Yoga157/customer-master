import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class UsageDetailDashboardModel extends BaseModel {
  usageId : number = 0;
  billingIdH : number = 0;
  creditId : number = 0;
  lprNumber : string = '';
  cbvNumber : string = '';
  soNo : string = '';
  so: number = 0;
  oiNo : string = '';
  funnelId : number = 0;
  usageAmount : number = 0;
  necessity : string = '';
  resources : string = '';
  notes : string = '';
  createdBy : string = '';
  createdDate : string = '';
  modifiedBy : string = '';
  modifiedDate : string = '';

  constructor(data: Partial<UsageDetailDashboardModel>) {
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
