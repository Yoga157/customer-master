import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class FilterAWSBillingModel extends BaseModel {
    userLoginID: number = 0;
    billingPeriod: string = '';
    billingStatus: string = '';
    customerName: string = '';
    pic: string = '';
    dept: string = '';
    column: string = '';
    sorting: string = '';
    invoice: number = 0;
    page: number = 0;
    pageSize: number = 0;

  constructor(data: Partial<FilterAWSBillingModel>) {
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
