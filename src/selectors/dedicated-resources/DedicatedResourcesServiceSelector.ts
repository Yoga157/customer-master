import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import DedicatedResourcesEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesEnvelope';
import IDedicatedResourceTable from './models/IDedicatedResourceTable';
import DedicatedResourcesModel from 'stores/dedicated-resources/models/DedicatedResourcesModel';
import IDedicatedResourceTableRow from './models/IDedicatedResourceTableRow';
import DropdownDedicatedResourcesModel from 'stores/dedicated-resources/models/DropdownDedicatedResourcesModel';
import ListApprovalModel from 'stores/dedicated-resources/models/ListApprovalModel';
import GetEmployeeInfoModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/GetEmployeeInfoModel';
import GetEmployeeDetailModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/GetEmployeeDetailModel';
import DeductionsEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/Deductions/DeductionsEnvelope';
import IDeductionsTable from './models/Deductions/IDeductionsTable';
import DeductionsModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/Deductions/DeductionsModel';
import IDeductionsTableRow from './models/Deductions/IDeductionsTableRow';
import GetProjectInfoModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/GetProjectInfoModel';
import OtherBenefitEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitEnvelope';
import IOtherBenefitTable from './models/OtherBenefit/IOtherBenefitTable';
import OtherBenefitModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitModel';
import IOtherBenefitTableRow from './models/OtherBenefit/IOtherBenefitTableRow';
import SalaryBenefitEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitEnvelope';
import ISalaryBenefitTable from './models/SalaryBenefit/ISalaryBenefitTable';
import SalaryBenefitModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitModel';
import ISalaryBenefitTableRow from './models/SalaryBenefit/ISalaryBenenfitTableRow';
import ISalaryBenefitTableRowById from './models/SalaryBenefit/ISalaryBenefitTableRowById';
import SalaryBenefitModelById from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/SalaryBenefit/SalaryBenefitById';
import OtherBenefitTemplateProject from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';
import WorkFlowHeaderModel from 'stores/dedicated-resources/models/WorkFlowHeaderModel';
import VerificationDataStatusModel from 'stores/dedicated-resources/models/VerificationDataStatusModel';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import GetSearchSOOIModel from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/GetSearchSOOIModel';
import GetHistoryContractEnvelope from 'stores/dedicated-resources/models/GetHistoryContractEnvelope';
import IGetHistoryContractTable from './models/IGetHistoryContractTable';
import GetHistoryContractModel from 'stores/dedicated-resources/models/GetHistoryContractModel';
import IGetHistoryContractTableRow from './models/IGetHistoryContractTableRow';
import GetActivityReportEnvelope from 'stores/dedicated-resources/models/GetActivityReportEnvelope';
import IGetActivityReportTable from './models/IGetActivityReportTable';
import GetActivityReportModel from 'stores/dedicated-resources/models/GetActivityReportModel';
import IGetActivityReportTableRow from './models/IGetActivityReportTableRow';
import OtherBenefitTemplateProjectEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import OtherBenefitLastContractEnvelope from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContractEnvelope';
import IOtherBenefitTableLastContract from './models/OtherBenefit/IOtherBenefitTableLastContract';
import OtherBenefitLastContract from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitLastContract';
import IOtherBenefitTableRowLastContract from './models/OtherBenefit/IOtherBenefitTableRowLastContract';
import WorkFlowHeaderEnvelope from 'stores/dedicated-resources/models/WorkFlowHeaderEnvelope';
import IWorkFlowHeaderTable from './models/IWorkFlowHeaderTable';
import IWorkFlowHeaderTableRow from './models/IWorkFlowHeaderTableRow';
import DocumentTrackingModel from 'stores/dedicated-resources/models/DocumentTrackingModel';
import ResultCheck from 'stores/dedicated-resources/models/ResultCheck';

const _selectRenewalContracts = (models: DedicatedResourcesEnvelope): IDedicatedResourceTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: DedicatedResourcesModel[]): IDedicatedResourceTableRow[] => {
  return models && models.map((model: DedicatedResourcesModel): IDedicatedResourceTableRow => _mappingObjectTableRow(model));
};

export const selectRenewalContracts: Selector<IStore, IDedicatedResourceTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listData!,
  _selectRenewalContracts
);

const _mappingObjectTableRow = (model: DedicatedResourcesModel): IDedicatedResourceTableRow => {
  return {
    text: model.employeeName,
    contractID: model.contractID,
    employeeID: model.employeeID,
    employeeIDFunnel: model.employeeIDFunnel,
    employeeEmail: model.employeeEmail,
    employeeName: model.employeeName,
    contractNo: model.contractNo,
    contractStatus: model.contractStatus,
    contractStatusName: model.contractStatusName,
    employeeDept: model.employeeDept,
    employeeClassName: model.employeeClassName,
    supervisor: model.supervisor,
    supervisorName: model.supervisorName,
    lastProjectName: model.lastProjectName,
    lastContractBeginDate: model.lastContractBeginDate,
    lastContractEndDate: model.lastContractEndDate,
    newContractBeginDate: model.newContractBeginDate,
    newContractEndDate: model.newContractEndDate,
    newContractPeriod: model.newContractPeriod,
    contractAdmin: model.contractAdmin,
    flagButtonDocument: model.flagButtonDocument,
    flagDraft: model.flagDraft,
    flagPaklaring: model.flagPaklaring,
    flagView: model.flagView,
    reasonPaklaring: model.reasonPaklaring,
    so: model.so,
    soReference:  model.soReference,
    oi: model.oi,
    buCost: model.buCost,
    level: model.level,
    placement: model.placement,
    days: model.days,
    lastEmployeeExperience: model.lastEmployeeExperience,
    lastEmployeeEdu: model.lastEmployeeEdu,
    reasonToExtend: model.reasonToExtend,
    workflowStatus: model.workflowStatus,
    returnDoc: model.returnDoc,
    remarkApproval: model.remarkApproval,
    submittedBy: model.submittedBy,
    submittedByName: model.submittedByName,
    submittedDate: model.submittedDate,
    statusApprovalDocument: model.statusApprovalDocument,
    statusApprovalSubmit: model.statusApprovalSubmit,
    statusApprovalSubmitOwner: model.statusApprovalSubmitOwner
  };
};

//GetHistoryContract
const _selectGetHistoryContract = (models: GetHistoryContractEnvelope): IGetHistoryContractTable => {
  return {
    totalRows: models.totalRows,
    employeeID: models.employeeID,
    employeeName: models.employeeName,
    rows: _createHistoryContractTableRows(models.rows),
    column: models.column,
    sorting: models.sorting
  };
};

const _createHistoryContractTableRows = (models: GetHistoryContractModel[]): IGetHistoryContractTableRow[] => {
  return models && models.map((model: GetHistoryContractModel): IGetHistoryContractTableRow => _mappingObjectHistoryContractTableRow(model));
};

export const selectGetHistoryContract: Selector<IStore, IGetHistoryContractTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listHistoryContract!,
  _selectGetHistoryContract
);

const _mappingObjectHistoryContractTableRow = (model: GetHistoryContractModel): IGetHistoryContractTableRow => {
  return {
    contractID: model.contractID,
    contractNo: model.contractNo,
    projectName: model.projectName,
    newContractBeginDate: model.newContractBeginDate,
    newContractEndDate: model.newContractEndDate,
  };
};


//GetActivityReport
const _selectGetActivityReport = (models: GetActivityReportEnvelope): IGetActivityReportTable => {
  return {
    totalRows: models.totalRows,
    rows: _createActivityReportableRows(models.rows),
    column: models.column,
    sorting: models.sorting
  };
};

const _createActivityReportableRows = (models: GetActivityReportModel[]): IGetActivityReportTableRow[] => {
  return models && models.map((model: GetActivityReportModel): IGetActivityReportTableRow => _mappingObjectActivityReportTableRow(model));
};

export const selectGetActivityReport: Selector<IStore, IGetActivityReportTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listActivityReport!,
  _selectGetActivityReport
);

const _mappingObjectActivityReportTableRow = (model: GetActivityReportModel): IGetActivityReportTableRow => {
  return {
    SO: model.SO,
    CustomerName: model.CustomerName,
    ProjectName: model.ProjectName,
    ActivityWithInProgressStatus: model.ActivityWithInProgressStatus,
    ActivityWithPendingStatus: model.ActivityWithPendingStatus,
    ActivityWithCloseStatus: model.ActivityWithCloseStatus,
    TotalActivities: model.TotalActivities,
  };
};

//DropdownContractStatus
const _selectDropDownContractStatus = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownContractStatus: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownContractStatus,
  _selectDropDownContractStatus
);

//DropdownDepartment
const _selectDropDownDepartment = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownDepartment: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownDepartment,
  _selectDropDownDepartment
);

//DropdownSupervisor
const _selectDropDownSupervisor = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownSupervisor: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownSupervisor,
  _selectDropDownSupervisor
);

//ListApproval
const _selectGetListApprovalButton = (models: ListApprovalModel[]): any[] => {
  return models.map((model: any): any => ({
    text1: model.text1,
    udcid: model.udcid,
  }));
};

export const selectGetListApprovalButton: Selector<IStore, ListApprovalModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.ListApprovalButton,
  _selectGetListApprovalButton
);

//VerificationDataStatus
const _selectVerificationDataStatus = (models: VerificationDataStatusModel[]): any[] => {
  return models.map((model: any): any => ({
    no: model.no,
    verificationItem: model.verificationItem,
    verificationStatus: model.verificationStatus,
  }));
};

export const selectVerificationDataStatus: Selector<IStore, VerificationDataStatusModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.VerificationDataStatus,
  _selectVerificationDataStatus
);

// GetEmployeeInfo
const _selectEmployeeInfo = (models: GetEmployeeInfoModel): any => {
  // console.log('models',models)
  return {
    contractID: models.contractID,
    contractNo: models.contractNo,
    contractStatus: models.contractStatus,
    contractStatusName: models.contractStatusName,
    employeeID: models.employeeID,
    employeeName: models.employeeName,
    employeeClass: models.employeeClass,
    beginDate: models.beginDate === undefined ? undefined : new Date(models.beginDate!),
    endDate: models.endDate === undefined ? undefined : new Date(models.endDate!),
  };
};

export const selectEmployeeInfo: Selector<IStore, GetEmployeeInfoModel> = createSelector(
  (state: IStore) => state.dedicatedresources.EmployeeInfo,
  _selectEmployeeInfo
);

//DropdownOtherBenefitType
const _selectWorkFlowHeader = (models: WorkFlowHeaderEnvelope): IWorkFlowHeaderTable => {
  return {
    errorNumber: models.errorNumber,
    bSuccess: models.bSuccess,
    message: models.message,
    resultObj: _createWorkFlowHeaderRows(models.resultObj)
  };
};

const _createWorkFlowHeaderRows = (models: WorkFlowHeaderModel[]): IWorkFlowHeaderTableRow[] => {
  return models && models.map((model: WorkFlowHeaderModel): IWorkFlowHeaderTableRow => _mappingObjecWorkFlowHeaderTableRow(model));
};

const _mappingObjecWorkFlowHeaderTableRow = (model: WorkFlowHeaderModel): IWorkFlowHeaderTableRow => {
  return {
    workflowHeaderGenID: model.workflowHeaderGenID,
    workflowDetailGenID: model.workflowDetailGenID,
    stepName: model.stepName,
    status: model.status,
    employeeID: model.employeeID,
    employeeName: model.employeeName,
    employeeEmail: model.employeeEmail,
    notes: model.notes,
    tanggal: model.tanggal,
    stepTelerik: model.stepTelerik,
    flagApprove: model.flagApprove,
  };
};

export const selectWorkFlowHeader: Selector<IStore, IWorkFlowHeaderTable> = createSelector(
  (state: IStore) => state.dedicatedresources.WorkFlowHeader,
  _selectWorkFlowHeader
);


// GetEmployeeDetail
const _selectEmployeeDetail = (models: GetEmployeeDetailModel): any => {
  // console.log('models',models)
  return {
    contractID: models.contractID,
    contractNo: models.contractNo,
    employeeDiv: models.employeeDiv,
    employeeDept: models.employeeDept,
    position: models.position,
    education: models.education,
    expBeforeJoin: models.expBeforeJoin,
    workInBHP: models.workInBHP,
    level: models.level,
    supervisor: models.supervisor,
    lastPeriodInBHP: models.lastPeriodInBHP,
    newBeginDate: models.newBeginDate === undefined ? undefined : new Date(models.newBeginDate!),
    newEndDate: models.newEndDate === undefined ? undefined : new Date(models.newEndDate!),
    reasonToExtend: models.reasonToExtend,
    placement: models.placement,
  };
};

export const selectEmployeeDetail: Selector<IStore, GetEmployeeDetailModel> = createSelector(
  (state: IStore) => state.dedicatedresources.EmployeeDetail,
  _selectEmployeeDetail
);

//TakeHomePay
const _selectTakeHomePay = (models: DropdownDedicatedResourcesModel): any => {
  return {
    text: models.text,
    value: models.value,
  };
};

export const selectTakeHomePay: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.TakeHomePay!,
  _selectTakeHomePay
);

//Dropdown SenderAdmin
const _selectSenderAdmin = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectSenderAdmin: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownSenderAdmin!,
  _selectSenderAdmin
);


//ProjectInfo
//Get ProjectInfo
const _selectProjectInfo = (models: GetProjectInfoModel): any => {
  return {
    contractID: models.contractID,
    so: models.so,
    oi: models.oi,
    referToSO: models.referToSO,
    customerName: models.customerName,
    projectName: models.projectName,
    projectAlias: models.projectAlias,
    projectCategory: models.projectCategory,
    projectComplexity: models.projectComplexity,
    estProjectDuration: models.estProjectDuration,
    buCost: models.buCost,
    buCostID: models.buCostID
  };
};

export const selectProjectInfo: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.ProjectInfo!,
  _selectProjectInfo
);

//SearchSOOI
const _selectSearchSOOI = (models: GetSearchSOOIModel[]): any[] => {
  return models.map((model: any): any => ({
    contractID: model.contractID,
    so: model.so,
    oi: model.oi,
    text: model.so === "0" ? model.oi : model.so,
    referToSO: model.referToSO,
    customerName: model.customerName,
    projectName: model.projectName,
    projectAlias: model.projectAlias,
    projectCategory: model.projectCategory,
    projectComplexity: model.projectComplexity,
    estProjectDuration: model.estProjectDuration,
    buCost: model.buCost,
    buCostID: model.buCostID
  }));
};

export const selectSearchSOOI: Selector<IStore, GetSearchSOOIModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.SearchSOOI,
  _selectSearchSOOI
);

//Deductions

//get deductions
const _selectDeductions = (models: DeductionsEnvelope): IDeductionsTable => {
  return {
    totalRows: models.totalRows,
    totalDeductions: models.totalDeductions,
    rows: _createDeductionsTableRows(models.rows),
  };
};

const _createDeductionsTableRows = (models: DeductionsModel[]): IDeductionsTableRow[] => {
  return models && models.map((model: DeductionsModel): IDeductionsTableRow => _mappingObjectDeductionsTableRow(model));
};

export const selectDeductions: Selector<IStore, IDeductionsTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listDeductions!,
  _selectDeductions
);

const _mappingObjectDeductionsTableRow = (model: DeductionsModel): IDeductionsTableRow => {
  return {
    deductID: model.deductID,
    percentage: model.percentage,
    contractID: model.contractID,
    deductType: model.deductType,
    deductTypeStr: model.deductTypeStr,
    deductDesc: model.deductDesc,
    deductDescStr: model.deductDescStr,
    amount: model.amount,
    remark: model.remark,
    BulkDeductionID: model.BulkDeductionID,
    isSave: model.isSave,
    userLoginID: model.userLoginID
  };
};

//DropdownDeductionType
const _selectDropDownDeductionType = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownDeductionType: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownDeductionType,
  _selectDropDownDeductionType
);

//DropdownDeductionType
const _selectDropDownDeductionDesc = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownDeductionDesc: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownDeductionDesc,
  _selectDropDownDeductionDesc
);

//Deduction By ID
const _selectDeductionByID = (models: DeductionsModel): IDeductionsTableRow => {
  return {
    deductID: models.deductID,
    percentage: models.percentage,
    contractID: models.contractID,
    deductType: models.deductType,
    deductTypeStr: models.deductTypeStr,
    deductDesc: models.deductDesc,
    deductDescStr: models.deductDescStr,
    amount: models.amount,
    remark: models.remark,
    BulkDeductionID: models.BulkDeductionID,
    isSave: models.isSave,
    userLoginID: models.userLoginID
  };
};

export const selectDeductionByID: Selector<IStore, IDeductionsTableRow> = createSelector(
  (state: IStore) => state.dedicatedresources.DeductionById!,
  _selectDeductionByID
);

//OtherBenefit
const _selectOtherBenefit = (models: OtherBenefitEnvelope): IOtherBenefitTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableOtherBenefitRows(models.rows),
  };
};

const _createTableOtherBenefitRows = (models: OtherBenefitModel[]): IOtherBenefitTableRow[] => {
  return models && models.map((model: OtherBenefitModel): IOtherBenefitTableRow => _mappingObjectTableOtherBenefitRow(model));
};

export const selectOtherBenefit: Selector<IStore, IOtherBenefitTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listOtherBenefit!,
  _selectOtherBenefit
);

const _mappingObjectTableOtherBenefitRow = (model: OtherBenefitModel): IOtherBenefitTableRow => {
  return {
    benefitID: model.benefitID,
    contractID: model.contractID,
    benefitType: model.benefitType,
    benefitDescStr: model.benefitDescStr,
    benefitTypeStr: model.benefitTypeStr,
    benefitDesc: model.benefitDesc,
    flagLastContract: model.flagLastContract,
    flagNewContract: model.flagNewContract,
    idState: model.idState,
    isSave: model.isSave,
    userLoginID: model.userLoginID
  };
};



//DropdownOtherBenefitType
const _selectDropDownOtherBenefitType = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
    text2: model.text2
  }));
};

export const selectDropDownOtherBenefitType: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownOtherBenefitType,
  _selectDropDownOtherBenefitType
);

//DropdownOtherBenefitDesc
const _selectDropDownOtherBenefitDesc = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownOtherBenefitDesc: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownOtherBenefitDesc,
  _selectDropDownOtherBenefitDesc
);

//OtherBenerfitTemplateProject
const _selectOtherBenefitTemplateProject = (models: OtherBenefitTemplateProject[]): any[] => {
  return models.map((model: any): any => ({
    benefitID: model.benefitID,
    contractID: model.contractID,
    benefitType: model.benefitType,
    benefitTypeStr: model.benefitTypeStr,
    benefitDesc: model.benefitDesc,
    benefitDescStr: model.benefitDescStr,
    isSave: model.isSave,
  }));
};

export const selectOtherBenefitTemplateProject: Selector<IStore, OtherBenefitTemplateProject[]> = createSelector(
  (state: IStore) => state.dedicatedresources.listOtherTemplateProject,
  _selectOtherBenefitTemplateProject
);

//OtherBenerfitLastContract

const _selectOtherBenefitLastContract = (models: OtherBenefitLastContractEnvelope): IOtherBenefitTableLastContract => {
  return {
    totalRows: models.totalRows,
    column: models.column,
    sorting: models.sorting,
    rows: _createTableOtherBenefitLastContractRows(models.rows),
  };
};

const _createTableOtherBenefitLastContractRows = (models: OtherBenefitLastContract[]): IOtherBenefitTableRowLastContract[] => {
  return models && models.map((model: OtherBenefitLastContract): IOtherBenefitTableRowLastContract => _mappingObjectTableOtherBenefitLastContractRow(model));
};

const _mappingObjectTableOtherBenefitLastContractRow = (model: OtherBenefitLastContract): IOtherBenefitTableRowLastContract => {
  return {
    idState: model.idState,
    benefitID: model.benefitID,
    contractID: model.contractID,
    benefitType: model.benefitType,
    benefitTypeStr: model.benefitTypeStr,
    benefitDescStr: model.benefitDescStr,
    benefitDesc: model.benefitDesc,
    flagLastContract: model.flagLastContract,
    flagNewContract: model.flagNewContract,
    userLoginID: model.userLoginID,
    isSave: model.isSave,
  };
};

// const _selectOtherBenefitLastContract = (models: OtherBenefitTemplateProject[]): any[] => {
//   return models?.map((model: any): any => ({
//     benefitID: model.benefitID,
//     contractID: model.contractID,
//     benefitType: model.benefitType,
//     benefitDesc: model.benefitDesc,
//     isSave: model.isSave,
//   }));
// };

export const selectOtherBenefitLastContract: Selector<IStore, IOtherBenefitTableLastContract> = createSelector(
  (state: IStore) => state.dedicatedresources.listOtherLastContract,
  _selectOtherBenefitLastContract
);


//SalaryBenefit
const _selectSalaryBenefit = (models: SalaryBenefitEnvelope): ISalaryBenefitTable => {
  return {
    totalRows: models.totalRows,
    totalGrossCurrAmount: models.totalGrossCurrAmount,
    totalGrossNewAmount: models.totalGrossNewAmount,
    rows: _createTableSalaryBenefitRows(models.rows),
  };
};

const _createTableSalaryBenefitRows = (models: SalaryBenefitModel[]): ISalaryBenefitTableRow[] => {
  return models && models.map((model: SalaryBenefitModel): ISalaryBenefitTableRow => _mappingObjectTableSalaryBenefitRow(model));
};

export const selectSalaryBenefit: Selector<IStore, ISalaryBenefitTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listSalaryBenefit!,
  _selectSalaryBenefit
);

const _mappingObjectTableSalaryBenefitRow = (model: SalaryBenefitModel): ISalaryBenefitTableRow => {
  return {
    salaryID: model.salaryID,
    contractID: model.contractID,
    salaryType: model.salaryType,
    salaryTypeStr: model.salaryTypeStr,
    salaryDesc: model.salaryDesc,
    salaryDescStr: model.salaryDescStr,
    currentAmount: model.currentAmount,
    newAmount: model.newAmount,
    remark: model.remark,
    isSave: model.isSave,
    userLoginID: model.userLoginID,
    increase: model.increase,
    percentage: model.percentage,
    //BulkUpdate
    BulkSalaryID: model.BulkSalaryID,
  };
};

//DropdownSalaryBenefitType
const _selectDropDownSalaryBenefitType = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};
// DropdownDedicatedResourcesModel[]
export const selectDropDownSalaryBenefitType: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownSalaryBenefitType,
  _selectDropDownSalaryBenefitType
);

//DropdownSalaryBenefitDesc
const _selectDropDownSalaryBenefitDesc = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownSalaryBenefitDesc: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownSalaryBenefitDesc,
  _selectDropDownSalaryBenefitDesc
);

//DropDownUMRYearSalaryBenefit
const _selectDropDownUMRYearSalaryBenefit = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownUMRYearSalaryBenefit: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownUMRYearSalaryBenefit,
  _selectDropDownUMRYearSalaryBenefit
);

//DropdownSalaryUMRYearSalaryBenefit
const _selectDropDownUMRSalaryBenefit = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownUMRSalaryBenefit: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownUMRSalaryBenefit,
  _selectDropDownUMRSalaryBenefit
);

//Salary Benefit By ID
const _selectSalaryBenefitByID = (models: SalaryBenefitModelById): ISalaryBenefitTableRowById => {
  return {
    salaryID: models.salaryID,
    contractID: models.contractID,
    salaryType: models.salaryType,
    salaryDesc: models.salaryDesc,
    salaryTypeStr: models.salaryTypeStr,
    salaryDescStr: models.salaryDescStr,
    salaryTypeID: models.salaryTypeID,
    salaryDescID: models.salaryDescID,
    currentAmount: models.currentAmount,
    newAmount: models.newAmount,
    increase: models.increase,
    remark: models.remark,
    createdDate: models.createdDate,
    createdByID: models.createdByID,
    modifiedDate: models.modifiedDate,
    modifiedByID: models.modifiedByID,
  };
};

export const selectSalaryBenefitByID: Selector<IStore, ISalaryBenefitTableRowById> = createSelector(
  (state: IStore) => state.dedicatedresources.SalaryBenefitById!,
  _selectSalaryBenefitByID
);

//TakeHomePay
const _selectCurrentSalary = (models: DropdownDedicatedResourcesModel): any => {
  return {
    text: models.text,
    value: models.value,
  };
};

export const selectCurrentSalary: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.CurrentSalary!,
  _selectCurrentSalary
);


//DropDownEmplyoee
const _selectEmployee = (models: EmployeeModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.employeeName,
    value: model.employeeID,
  }));
};

export const selectEmployee: Selector<IStore, EmployeeModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropdownEmployee,
  _selectEmployee
);

//DropDownBuCost
const _selectDropDownBuCost = (models: DropdownDedicatedResourcesModel[]): any[] => {
  return models.map((model: any): any => ({
    
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownBuCost: Selector<IStore, DropdownDedicatedResourcesModel[]> = createSelector(
  (state: IStore) => state.dedicatedresources.DropDownBuCost,
  _selectDropDownBuCost
)

//DocumentTracking
const _selectDocumentTracking = (models: DocumentTrackingModel): any => {
  return {
    trackingID: models.trackingID,
    contractID: models.contractID,
    sentByName: models.sentByName,
    sentDate: models.sentDate,
    receivedByName: models.receivedByName,
    receivedDate: models.receivedDate,
    remarkHR: models.remarkHR,
    remarkSender: models.remarkSender,
    confirmType: models.confirmType,
    remarkReceiver: models.remarkReceiver,
    returnByName: models.returnByName,
    returnDate: models.returnDate,
    remarkReturn: models.remarkReturn,
    modifiedDate: models.modifiedDate,
    modifiedByID: models.modifiedByID,
  };
};

export const selectDocumentTracking: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.DocumentTracking!,
  _selectDocumentTracking
);

//CheckLastEmployeeContract
const _selectCheckLastEmployeeContract = (models: ResultCheck): any => {
  return {
    result: models.result,
  };
};

export const selectCheckLastEmployeeContract: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.CheckLastEmployeeContract!,
  _selectCheckLastEmployeeContract
);

//CheckSubmited
const _selectCheckSubmited = (models: ResultCheck): any => {
  return {
    result: models.result,
  };
};

export const selectCheckSubmited: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.CheckSubmited!,
  _selectCheckSubmited
);

//CheckApproval
const _selectCheckApproval = (models: ResultCheck): any => {
  return {
    result: models.result,
  };
};

export const selectCheckApproval: Selector<IStore, any> = createSelector(
  (state: IStore) => state.dedicatedresources.CheckApproval!,
  _selectCheckApproval
);

//BulkUpdate Dashboard
const _selectRenewalContractsBulkUpdate = (models: DedicatedResourcesEnvelope): IDedicatedResourceTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableBulkUpdateRows(models.rows),
  };
};

const _createTableBulkUpdateRows = (models: DedicatedResourcesModel[]): IDedicatedResourceTableRow[] => {

  return models && models.map((model: DedicatedResourcesModel): IDedicatedResourceTableRow => _mappingObjectTableBulkUpdateRow(model));
};

export const selectRenewalContractsBulkUpdate: Selector<IStore, IDedicatedResourceTable> = createSelector(
  (state: IStore) => state.dedicatedresources.listDataBulkUpdate!,
  _selectRenewalContractsBulkUpdate
);

const _mappingObjectTableBulkUpdateRow = (model: DedicatedResourcesModel): IDedicatedResourceTableRow => {
  return {
    text: model.employeeName,
    contractID: model.contractID,
    employeeID: model.employeeID,
    employeeIDFunnel: model.employeeIDFunnel,
    employeeEmail: model.employeeEmail,
    employeeName: model.employeeName,
    contractNo: model.contractNo,
    contractStatus: model.contractStatus,
    contractStatusName: model.contractStatusName,
    employeeDept: model.employeeDept,
    employeeClassName: model.employeeClassName,
    supervisor: model.supervisor,
    supervisorName: model.supervisorName,
    lastProjectName: model.lastProjectName,
    lastContractBeginDate: model.lastContractBeginDate,
    lastContractEndDate: model.lastContractEndDate,
    newContractBeginDate: model.newContractBeginDate,
    newContractEndDate: model.newContractEndDate,
    newContractPeriod: model.newContractPeriod,
    contractAdmin: model.contractAdmin,
    flagButtonDocument: model.flagButtonDocument,
    flagDraft: model.flagDraft,
    flagPaklaring: model.flagPaklaring,
    flagView: model.flagView,
    reasonPaklaring: model.reasonPaklaring,
    so: model.so,
    soReference:  model.soReference,
    oi: model.oi,
    buCost: model.buCost,
    level: model.level,
    placement: model.placement,
    lastEmployeeExperience: model.lastEmployeeExperience,
    lastEmployeeEdu: model.lastEmployeeEdu,
    reasonToExtend: model.reasonToExtend,
    workflowStatus: model.workflowStatus,
    returnDoc: model.returnDoc,
    remarkApproval: model.remarkApproval,
    submittedBy: model.submittedBy,
    submittedByName: model.submittedByName,
    submittedDate: model.submittedDate,
    statusApprovalDocument: model.statusApprovalDocument,
    statusApprovalSubmit: model.statusApprovalSubmit,
    statusApprovalSubmitOwner: model.statusApprovalSubmitOwner,
    days: model.days
  };
};
