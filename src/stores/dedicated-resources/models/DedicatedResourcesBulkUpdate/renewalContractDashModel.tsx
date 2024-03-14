import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class renewalContractDash  extends BaseModel{
    contractID: number = 0;
    employeeID: string = '';
    employeeName: string = '';
    contractNo: number = 0;
    contractStatus: string = '';
    contractStatusName: string = '';
    employeeDept: string = '';
    employeeClassName: string = '';
    supervisor: number = 0;
    supervisorName: string = '';
    lastProjectName: string = '';
    lastContractBeginDate: Date = null;
    lastContractEndDate: Date = null;
    newContractBeginDate: Date = null;
    newContractEndDate: Date = null;
    newContractPeriod: number = 0;
    contractAdmin: string = '';
    flagDraft: boolean
    flagPaklaring: boolean
    reasonPaklaring: string = '';
    so: string = '';
    soReference: number = 0;
    oi: string = '';
    buCost: string = '';
    level: number = 0;
    placement: string = '';
    lastEmployeeExperience: number = 0;
    lastEmployeeEdu: string = '';
    reasonToExtend: string = '';
    workflowStatus: string = '';
    returnDoc: string = '';
    remarkApproval: string = '';
    submittedBy: number = 0;
    submittedByName: string = '';
    submittedDate: Date = null;

    constructor(data: Partial<renewalContractDash>) {
        super();
        this.update(data);
      }
}

