import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class DeductionsModel extends BaseModel {
  deductID: number = 0;
  contractID: number = 0;
  percentage: number = 0;
  deductType: string = '';
  deductTypeStr: string = '';
  deductDesc: string = '';
  deductDescStr: string = '';
  amount: number = 0;
  remark:  string = '';
  userLoginID: number = 0;
  isSave: number = 0;
  //BulkUpdate
  BulkDeductionID: number = 0;

  constructor(data: Partial<DeductionsModel>) {
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
