import { createSelector } from "reselect";
import { Selector } from "react-redux";

import PMORequirementClosingProject from "stores/pmo/models/PMORequirementClosingProject";
import PMOProgressDetailMilestone, { DataDetailMilestones } from "stores/pmo/models/PMOProgressDetailMilestone";
import CustomerForPmoProjectModel from "stores/pmo/models/CustomerForPmoProjectModel";
import PMOTopListModel, { PMOTopRowModel } from "stores/pmo/models/PMOTopListModel";
import PMOViewEditProjectStatus from "stores/pmo/models/PMOViewEditProjectStatus";
import IPMOProgressDetailMilestone from "./models/IPMOProgressDetailMilestone";
import IPMORequirementCloseProject from "./models/IPMORequirementCloseProject";
import PMOViewEditCustommerPO from "stores/pmo/models/PMOViewEditCustommerPO";
import PMOGetByEntryKeyModel from "stores/pmo/models/PMOGetByEntryKeyModel";
import PMOGetActualDateModel from "stores/pmo/models/PMOGetActualDateModel";
import PMOProjectByIDModel from "stores/pmo/models/PMOProjectByIDModel";
import IPMOTopList, { IPMOTopListRow } from "./models/IPMOTopList";
import PMOListEnvelope from "stores/pmo/models/PMOListEnvelope";
import ICustomerPmoProject from "./models/ICustomerPmoProject";
import IPMOViewEditStatus from "./models/IPMOViewEditStatus";
import PMOListModel from "stores/pmo/models/PMOListModel";
import IPMOCopyProject from "./models/IPMOCopyProject";
import IPMOViewEditPO from "./models/IPMOViewEditPO";
import IPMOActualDate from "./models/IPMOActualDate";
import IPMOList from "./models/IPMOList";
import IStore from "models/IStore";


const _selectPMO = (models: PMOListEnvelope): IPMOList => {
   return {
    totalRows: models.totalRows,
    rows: _createTableRows(models?.rows || []),
    column: models.column,
    sorting: models.sorting,
    search: models.search,
    filter: models.filter,
  };
}

const _createTableRows = (models: PMOListModel[]): PMOListModel[] => {
   return models.map(model => new PMOListModel({
      projectId: model.projectId,
      funnelGenId: model.funnelGenId,
      oiNumber: model.oiNumber,
      soNumber: model.soNumber,
      salesName: model.salesName,
      salesDepartment: model.salesDepartment,
      pmoName: model.pmoName,
      pmoDepartment: model.pmoDepartment,
      customerName: model.customerName,
      projectName: model.projectName,
      projectAlias: model.projectAlias,
      estStartBypmo: model.estStartBypmo,
      estEndBypmo: model.estEndBypmo,
      actualStartBypmo: model.actualStartBypmo,
      actualEndBypmo: model.actualEndBypmo,
      milestone: model.milestone,
      projectStatus: model.projectStatus,
      warrantyStatus: model.warrantyStatus,
      createDate: model.createDate,
      createUserID: model.createUserID,
      modifyUserID: model.modifyUserID,
      modifyDate: model.modifyDate,
   }))
}

export const selectPMO: Selector<IStore, IPMOList> = createSelector((state: IStore) => state.pmo.data!, _selectPMO);

const _selectPMOViewEditPO = (model: PMOViewEditCustommerPO): IPMOViewEditPO => {
   return {
      projectID: model.projectId, 
      funnelGenID: model.funnelGenID,  
      salesName: model.salesName,  
      department: model.department,  
      salesAdminName: model.salesAdminName,  
      startWarrantyDate:  model.startWarrantyDate ? new Date(model.startWarrantyDate!) : undefined,
      endWarrantyDate:   model.endWarrantyDate ? new Date(model.endWarrantyDate!) : undefined,  

   }
}
export const selectPMOViewEditPO: Selector<IStore, IPMOViewEditPO> = createSelector((state: IStore) => state.pmo.pmoViewEditPO!, _selectPMOViewEditPO);

const _selectPMODetailMilestone = (models: any): DataDetailMilestones[] => {
   return models.progresses?.map(model => new DataDetailMilestones({
        taskId : model.taskId,
        title : model.title,
        description : model.description,
        remark : model.remark,
        actualStartDate : model.actualStartDate,
        actualEndDate : model.actualEndDate,
        precentageTask : model.precentageTask,
        taskStatus : model.taskStatus,
        isMilestone : model.isMilestone,
   }))
}
export const selectPMODetailMilestone: Selector<IStore, DataDetailMilestones[]> = createSelector((state: IStore) => state.pmo.progressDetailMilestone!, _selectPMODetailMilestone);

const _selectPMOProjectViewEditStatus = (model: PMOViewEditProjectStatus): IPMOViewEditStatus => {
   return new PMOViewEditProjectStatus({
    projectId: model.projectId,
    projectStatus: model.projectStatus,
    projectStatusId: model.projectStatusId,
    warrantyStatus: model.warrantyStatus,
    funnelGenId: model.funnelGenId,
    soDate: model.soDate && model.oiDate ? new Date(model.soDate!) : model.soDate ? new Date(model.soDate!) : new Date(model.oiDate!),
    // soDate: new Date(),
    // oiDate: model.oiDate,
    pmoName: model.pmoName,
    pmoId: model.pmoId,
    isApprove: model.isApprove,
   })
}
export const selectPMOProjectViewEditStatus: Selector<IStore, IPMOViewEditStatus> = createSelector((state: IStore) => state.pmo.pmoViewEditStatus!, _selectPMOProjectViewEditStatus);

const _selectPMOCopyProject = (model: PMOProjectByIDModel): IPMOCopyProject => {
   return new PMOProjectByIDModel({
    funnelGenId: model.funnelGenId,
    projectAlias: model.projectAlias,
    estStartBypmo: model.estStartBypmo ? new Date(model.estStartBypmo!) : '',
    estEndBypmo: model.estEndBypmo ? new Date(model.estEndBypmo!) : '',
    createDate: model.createDate ? new Date(model.createDate!) : '',
    createUserID: model.createUserID,
    initialMeeting: model.initialMeeting,
    activityTitle: model.activityTitle,
    assignTo: model.assignTo,
    assignCc: model.assignCc,
    activityStart: model.activityStart ? new Date(model.activityStart!) : '',
    activityEnd: model.activityEnd ? new Date(model.activityEnd!) : '',
    activityText : model.activityText,
    activityRemark: model.activityRemark,
    docNumber:  model.docNumber,

   })
}
export const selectPMOCopyProject: Selector<IStore, IPMOCopyProject> = createSelector((state: IStore) => state.pmo.pmoProjectBy!, _selectPMOCopyProject);

const _selectCustomerPmoProject = (model: CustomerForPmoProjectModel): ICustomerPmoProject => {
   return new CustomerForPmoProjectModel({
    funnelGenID: model.funnelGenID,
    salesName: model.salesName,
    presalesNameList: model.presalesNameList,
    customerName: model.customerName,
    projectName: model.projectName,
    projectAlias: model.projectAlias,
    estStartProjectDate: model.estStartProjectDate ? new Date(model.estStartProjectDate!) : "" ,
    estEndProjectDate: model.estEndProjectDate ? new Date(model.estEndProjectDate!) : "",

   })
}
export const selectCustomerPmoProject: Selector<IStore, ICustomerPmoProject> = createSelector((state: IStore) => state.pmo.customerPmoProject!, _selectCustomerPmoProject);

const _selectPMORequirementClosingProject = (model: PMORequirementClosingProject): IPMORequirementCloseProject => {
   return {
      isAllowComplete: model.isAllowComplete,
      startContract: model.startContract ? new Date(model.startContract!) : '',
      endContract: model.endContract ? new Date(model.endContract!) : '',
      startWarranty: model.startWarranty ? new Date(model.startWarranty!) : '',
      endWarranty: model.endWarranty ? new Date(model.endWarranty!) : '',

      actualStartByPmo: model.actualStartByPmo ? new Date(model.actualStartByPmo!) : '',
      actualEndByPmo: model.actualEndByPmo ? new Date(model.actualEndByPmo!) : '',
      
      requirements: model.requirements || []
   }
}
export const selectPMORequirementClosingProject: Selector<IStore, IPMORequirementCloseProject> = createSelector((state: IStore) => state.pmo.requirementClosingProject!, _selectPMORequirementClosingProject);

const _selectPMOActualDate = (model: PMOGetActualDateModel): IPMOActualDate => {
   return {
      actualStartDate: model.actualStartDate ? new Date(model.actualStartDate!) : '',
      actualEndDate: model.actualEndDate ? new Date(model.actualEndDate!) : '',
   }
}
export const selectPMOActualDate: Selector<IStore, IPMOActualDate> = createSelector((state: IStore) => state.pmo.actualDate!, _selectPMOActualDate);

const _selectPMOTopList = (models: PMOTopListModel): IPMOTopList => {
   return {
      totalRows: models.totalRows,
      rows: !models.rows ? [] :  models.rows.map((model: IPMOTopListRow) => new PMOTopRowModel({
        funnelGenID: model.funnelGenID,
        topNumber: model.topNumber,
        invoiceDescription: model.invoiceDescription,
        invoiceNumber: model.invoiceNumber,
        invoiceDate: model.invoiceDate,
        productDesc: model.productDesc,
        productDescStr: model.productDescStr,
        productPercentage: model.productPercentage,
        serviceDesc: model.serviceDesc,
        serviceDescStr: model.serviceDescStr,
        supportDoc: model.supportDoc,
   }))
   }
}
export const selectPMOTopList: Selector<IStore, IPMOTopList> = createSelector((state: IStore) => state.pmo.topList!, _selectPMOTopList);

const _selectSmoMappingList = (models: PMOGetByEntryKeyModel[]): any => {
   return models.map((model: PMOGetByEntryKeyModel) => ({
    email: model.text3
   }))
}
export const selectSmoMappingList: Selector<IStore, any> = createSelector((state: IStore) => state.pmo.smoMappingList!, _selectSmoMappingList);