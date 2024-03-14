import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class OtherBenefitLastContract extends BaseModel {
  idState: number = 0;
  benefitID: number = 0;
  contractID: number = 0;
  benefitType: string = '';
  benefitDesc: string = '';
  benefitTypeStr: string = '';
  benefitDescStr: string = '';
  flagLastContract: boolean = true;
  flagNewContract: boolean = true;
  userLoginID: number = 0;
  isSave: number = 0;

  constructor(data: Partial<OtherBenefitLastContract>) {
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
