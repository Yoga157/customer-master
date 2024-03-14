import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class GetEmployeeInfoModel extends BaseModel {
    contractID: number = 0;
    contractNo: number = 0;
    contractStatus: string = ''
    contractStatusName: string = '';
    employeeID: number = 0;
    employeeName: string = '';
    employeeClass: string = '';
    beginDate: Date = undefined;
    endDate: Date = undefined;

    constructor(data: Partial<GetEmployeeInfoModel>) {
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
