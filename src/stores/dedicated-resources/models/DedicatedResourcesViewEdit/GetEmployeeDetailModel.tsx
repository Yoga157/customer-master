import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class GetEmployeeDetailModel extends BaseModel {
    contractID: number = 0;
    contractNo: number = 0;
    employeeDiv: string = '';
    employeeDept: string = '';
    position: string = '';
    education: string = '';
    expBeforeJoin: string = '';
    workInBHP: string = '';
    level: string = '';
    supervisor: string = '';
    lastPeriodInBHP: string = '';
    newBeginDate: Date = undefined;
    newEndDate: Date = undefined;
    reasonToExtend: string = '';
    placement: string = '';

    constructor(data: Partial<GetEmployeeDetailModel>) {
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
