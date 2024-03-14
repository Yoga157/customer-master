import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import CustomerSignatureView from 'views/activity-report-page/components/form/form-edit/child-edit/CustomerSignatureView';

export default class DedicatedResourcesModel extends BaseModel {
  text: string = '';
  contractID: number = 0;
  employeeID: string = '';
  employeeIDFunnel: string = '';
  employeeEmail: string = '';
  employeeName: string = '';
  contractNo: number = 0;
  contractStatus:  string = '';
  contractStatusName: string = '';
  employeeDept:  string = '';
  employeeClassName:  string = '';
  supervisor: number = 0;
  supervisorName: string = '';
  lastProjectName: string = '';
  lastContractBeginDate: string = '';
  lastContractEndDate: string = '';
  newContractBeginDate: string = '';
  newContractEndDate: string = '';
  newContractPeriod: number = 0;
  contractAdmin: string = '';
  flagButtonDocument: string = '';
  flagDraft: boolean;
  flagPaklaring: boolean;
  flagView: number = 0;
  reasonPaklaring: string = '';
  so: number = 0;
  soReference: number = 0;
  oi: number = 0;
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
  submittedDate: string = '';
  statusApprovalSubmit: string = '';
  statusApprovalDocument: string = '';
  statusApprovalSubmitOwner: string = '';
  days: string = '';

  constructor(data: Partial<DedicatedResourcesModel>) {
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
