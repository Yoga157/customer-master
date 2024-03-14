import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class SalaryBenefitModelById extends BaseModel {
  salaryID?: number = 0;
  contractID: number = 0;
  salaryType: string = '';
  salaryDesc: string = '';
  currentAmount: number = 0;
  salaryTypeStr: string = '';
  salaryTypeID: string = '';
  salaryDescStr: string = '';
  salaryDescID: string = '';
  newAmount: number = 0;
  increase: number = 0;
  remark:  string = '';
  createdDate: string = '';
  createdByID: number = 0;
  modifiedDate: string = '';
  modifiedByID: number = 0;

  constructor(data: Partial<SalaryBenefitModelById>) {
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
