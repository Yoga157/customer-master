import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class GetProjectInfoModel extends BaseModel {
    contractID: number = 0;
    so: string = '';
    oi: string = ''
    referToSO: string = '';
    customerName: string = '';
    projectName: string = '';
    projectAlias: string = '';
    projectCategory: string = '';
    projectComplexity: string = '';
    estProjectDuration: string = '';
    buCost: string = '';
    buCostID: string = '';
    
    userLoginID: number = 0;

    constructor(data: Partial<GetProjectInfoModel>) {
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
