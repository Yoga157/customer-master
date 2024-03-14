import { createSelector } from "reselect";
import moment from "moment";

import WorkActivityReportModel from "stores/work-list/models/WorkActivityReportModel";
import ListWorkAttachmentModel from "stores/work-list/models/ListWorkAttachmentModel";
import ActivityReportViewModel from "stores/work-list/models/ActivityReportViewModel";
import IOptionsDataString from "selectors/select-options/models/IOptionsDataString";
import DropdownTextValueModel from "stores/work-list/models/DropdownTextValueModel";
import ActivityCategoryModel from "stores/work-list/models/ActivityCategoryModel";
import WorkListDetailModel from "stores/work-list/models/WorkListDetailModel";
import WorkListModel from "stores/work-list/models/WorkListModel";
import IListWorkAttachment from "./models/IListWorkAttachment";
import IActivityReportView from "./models/IActivityReportView";
import IWorkActivityReport from "./models/IWorkActivityReport";
import IWorkListDetail from "./models/IWorkListDetail";
import IWorkList from "./models/IWorkList";
import IStore from "models/IStore";

const _selectWorklist = (model: WorkListModel): IWorkList => {
  return {
    totalRows: model.totalRows,
    rows: model?.rows?.length > 0 ? model?.rows?.map((models,index) => {
      return {
        workId: models.workId ? models.workId : "" ,
        uid: models.uid ? models.uid : "" ,
        workType: models.workType ? models.workType : "" ,
        projectName: models.projectName ? models.projectName : "",
        customerName: models.customerName ? models.customerName : "",
        primaryResourcesSuperiorId: models.primaryResourcesSuperiorId ? models.primaryResourcesSuperiorId : "",
        engineerName: models.engineerName ? models.engineerName : "",
        description: models.description ? models.description : "",
        estStartDate: models.estStartDate ? new Date(models.estStartDate!) : '',
        estEndDate:  models.estEndDate ? new Date(models.estEndDate!) : '',
        actualStartDate: models.actualStartDate ? new Date(models.actualStartDate!) : '',
        actualEndDate: models.actualEndDate ? new Date(models.actualEndDate!) : '',
        workName: models.workName ? models.workName : "",
        workStatus: models.workStatus ? models.workStatus : "",
        creatorId: models.creatorId ? models.creatorId : 0,
        creatorName: models.creatorName ? models.creatorName : ""
      }
    }) : [] as any,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter
  }
};

export const selectWorklist: any = createSelector(
  (state: IStore) => state.workList.workList!, _selectWorklist
);

const _selectWorkActivityReport = (model: WorkActivityReportModel): IWorkActivityReport => {
  return {
    totalRows: model.totalRows,
    rows: model?.rows?.length > 0 ? model?.rows?.map((item,index) => {
      return {
          activityReportGenId: item.activityReportGenId,
          ticketId: item.ticketId ? item.ticketId : "",
          engineerList: item.engineerList ? item.engineerList.split(";").join(" ") : "",
          activityCategory: item.activityCategory ? item.activityCategory.split(";").join(" ") : "",
          status: item.status ? item.status : "",
          actionTaken: item.actionTaken ? item.actionTaken : "",
          startDate: item.startDate ? new Date(item.startDate!) : '',
          endDate: item.endDate ? new Date(item.endDate!) : '',
      }
    }) : [] as any,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter
  }
};

export const selectWorkActivityReport: any = createSelector(
  (state: IStore) => state.workList.workActivityReport!, _selectWorkActivityReport
);

const _selectListWorkAttachment = (model: ListWorkAttachmentModel): IListWorkAttachment => {
  return {
    totalRows: model.totalRows,
    rows: model?.rows?.length > 0 ? model?.rows?.map((item,index) => {
      return {
          funnelAttachmentID: item.funnelAttachmentID ? item.funnelAttachmentID : "",
          funnelGenID: item.funnelGenID,
          documentTypeID: item.documentTypeID,
          fileName: item.fileName ? item.fileName : "",
          fileDownload: item.fileDownload ? item.fileDownload : "",
          modul: item.modul,
          docNumber: item.docNumber ? item.docNumber : "",
          uploadDate: item.uploadDate ? item.uploadDate : "",
          uploadById: item.uploadById,
          uploadByName: item.uploadByName ? item.uploadByName : "",
      }
    }) : [] as any,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter
  }
};

export const selectListWorkAttachment: any = createSelector(
  (state: IStore) => state.workList.listWorkAttachment!, _selectListWorkAttachment
);

const _selectWorklistDrp = (models: DropdownTextValueModel[]): IOptionsDataString[] => {
  return models.map(
    (model: DropdownTextValueModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectWorklistDrp: any = createSelector(
  (state: IStore,type:any) => 
  type === "customer"  ? state.workList.drpCustomer! :
  type === "employee"  ? state.workList.drpEmployee! :
  type === "project"  ? state.workList.drpProject! : state.workList.drpProject! ,
  _selectWorklistDrp
);

const _selectWorklistDrpToStr = (models: DropdownTextValueModel[]): IOptionsDataString[] => {
  return models.map(
    (model: DropdownTextValueModel): IOptionsDataString => ({
      text: model.textData,
      value: model?.textData,
    })
  );
};

export const selectWorklistDrpToStr: any = createSelector(
  (state: IStore,type:any) => 
  type === "workType" ? state.workList.drpWorkType! : 
  type === "branch" ? state.workList.branchByFunnel! : 
  type === "subBranch" ? state.workList.subBranchByFunnel! : state.workList.drpTaskStatus!,
  _selectWorklistDrpToStr
);


const _selectDrpActivityCategory = (models: ActivityCategoryModel[]): IOptionsDataString[] => {
  return models.map(
    (model: ActivityCategoryModel): IOptionsDataString => ({
      text: model.activityReportCategoryName,
      value: model?.activityReportCategoryName,
    })
  );
};

export const selectDrpActivityCategory: any = createSelector(
  (state: IStore,type:any) => 
   state.workList.drpActivityCategory!,
  _selectDrpActivityCategory
);


const _selectWorkListDetail = (model: WorkListDetailModel): IWorkListDetail => {
  return new WorkListDetailModel({
    taskId: model.taskId,
    taskUID: model.taskUID,
    pmoName: model.pmoName ? model.pmoName : "",
    pmoId: model.pmoId,
    pmoEmail: model.pmoEmail ? model.pmoEmail : "",
    projectId: model.projectId,
    funnelGenId: model.funnelGenId,
    customerName:  model.customerName ? model.customerName : "",
    projectName: model.projectName ? model.projectName : "",
    projectStatus: model.projectStatus ? model.projectStatus : "",
    projectAlias: model.projectAlias ? model.projectAlias : "",
    workType: model.workType ? model.workType : "",
    estStartDate: model.estStartDate ? moment(model.estStartDate!).format("DD/MM/YYYY") : '',
    estEndDate: model.estEndDate ? moment(model.estEndDate!).format("DD/MM/YYYY") : '',
    actualStartDate: model.actualStartDate ? moment(model.actualStartDate!).format("DD/MM/YYYY") : '',
    actualEndDate: model.actualEndDate ? moment(model.actualEndDate!).format("DD/MM/YYYY") : '',
    taskTitle: model.taskTitle ? model.taskTitle : "",
    taskDescription: model.taskDescription ? model.taskDescription : "",
    taskStatus: model.taskStatus ? model.taskStatus : "",
    primaryResources: model.primaryResources ? model.primaryResources : "",
    secondaryResources: model.secondaryResources ? model.secondaryResources : "",
    slaAssignment: model.slaAssignment ? model.slaAssignment : "",
    remark: model.remark ? model.remark : "",
    category: model.category ? model.category : "",
    subcategory: model.subcategory ? model.subcategory : "",
    issueType: model.issueType ? model.issueType : "",
    issueSubtype: model.issueSubtype ? model.issueSubtype : "",
    so: model.so ? model.so : "",
    brand: model.brand ? model.brand : "",
    subBrand: model.subBrand ? model.subBrand : "",
    emailReceiver: model.emailReceiver ? model.emailReceiver : "",
    emailCc: model.emailCc ? model.emailCc : "",
    customerPhone:  model.customerPhone ? model.customerPhone : "",
    customerAddress:  model.customerAddress ? model.customerAddress : "",
    customerPicName:  model.customerPicName ? model.customerPicName : "",

  }) ;
};

export const selectWorkListDetail: any = createSelector(
  (state: IStore) => state.workList.detailWorkList!,
  _selectWorkListDetail
);

const _selectViewActivityReport = (model: ActivityReportViewModel): IActivityReportView => {
  return new ActivityReportViewModel({
      funnelGenId: model.funnelGenId,
      activityReportGenID: model.activityReportGenID,
      ticketId: model.ticketId,
      so: model.so,
      customerName: model.customerName,
      phone: model.phone,
      contactName: model.contactName,
      address: model.address,
      activityCategory: model.activityCategory,
      startDate: model.startDate ? new Date(model.startDate!): '',
      endDate: model.endDate ? new Date(model.endDate!): '',
      departureDate: model.departureDate ? new Date(model.departureDate!): '',
      arrivalDate: model.arrivalDate ? new Date(model.arrivalDate!): '',
      engineerList: model.engineerList,
      status: model.status,
      notes: model.notes,
      description: model.description,
      symptom: model.symptom,
      actionTaken: model.actionTaken,
      totalCustomerExperience: model.totalCustomerExperience,
      superiorID: model.superiorID,
      superiorName: model.superiorName,
      reviewDate: model.reviewDate,
      reviewNotes: model.reviewNotes,
      customerSignName: model.customerSignName,
      customerSignDate: model.customerSignDate,
      customerSignImage: model.customerSignImage,
      reviewStatus: model.reviewStatus,
      customerSignStatus: model.customerSignStatus,
      projectName: model.projectName,
      department: model.department,
      isDraft: model.isDraft,
      isDelete: model.isDelete,
      createDate: model.createDate,
      createUserID: model.createUserID,
      modifyDate: model.modifyDate,
      modifyUserID: model.modifyUserID
  }) ;
};

export const selectViewActivityReport: any = createSelector(
  (state: IStore) => state.workList.activityReportView!,
  _selectViewActivityReport
);
