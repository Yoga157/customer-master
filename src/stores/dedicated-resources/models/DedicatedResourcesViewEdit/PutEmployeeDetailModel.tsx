import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class PutEmployeeDetailModel {
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
    userLoginID: number = 0;
    // Old
    // contractID: number = 0;
    // newBeginDate: Date = undefined;
    // newEndDate: Date = undefined;
    // reasonToExtend: string = '';
    // placement: string = '';
    // userLoginID: number = 0;
}
