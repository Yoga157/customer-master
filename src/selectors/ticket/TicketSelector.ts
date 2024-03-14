import { createSelector } from "reselect";

import TicketDropdownTextValueModel from "stores/ticket/models/TicketDropdownTextValueModel";
import TicketDropdownSearchByModel from "stores/ticket/models/TicketDropdownSearchByModel";
import IOptionsDataString from "selectors/select-options/models/IOptionsDataString";
import TicketProjSummaryModel from "stores/ticket/models/TicketProjSummaryModel";
import TicketEntrykeyModel from "stores/ticket/models/TicketEntrykeyModel";
import TicketDetailModel from "stores/ticket/models/TicketDetailModel";
import TicketHeaderModel from "stores/ticket/models/TicketHeaderModel";
import TicketListModel from "stores/ticket/models/TicketListModel";
import ITicketProjSummary from "./models/ITicketProjSummary";
import ITicketList from "./models/ITicketList";
import IStore from "models/IStore";

const _selectTicketlist = (model: TicketListModel): ITicketList => {
  return {
    totalRows: model.totalRows,
    rows: model?.rows?.length > 0 ? model?.rows?.map((models,index) => {
      return {
        ticketId: models.ticketId ? models.ticketId : 0 ,
        ticketUID: models.ticketUID ? models.ticketUID : "" ,
        ticketName: models.ticketName ? models.ticketName : "" ,
        description: models.description ? models.description : "",
        primaryResources: models.primaryResources ? models.primaryResources : "",
        secondaryResources: models.secondaryResources ? models.secondaryResources : "",
        estStartDate: models.estStartDate ? new Date(models.estStartDate!) : "",
        estEndDate: models.estEndDate ? new Date(models.estEndDate!) : '',
        actualStartDate: models.actualStartDate ? new Date(models.actualStartDate!) : "",
        actualEndDate: models.actualEndDate ? new Date(models.actualEndDate!) : '',
        status:  models.status ? models.status : '',
        remark: models.remark ? models.remark : '',
        primaryResourcesSuperiorId: models.primaryResourcesSuperiorId ? models.primaryResourcesSuperiorId : '',
        createUserName: models.createUserName ? models.createUserName  : '',
        createDate: models.createDate ? new Date(models.createDate!) : "",
        modifyUserName: models.modifyUserName ? models.modifyUserName : "",
        modifyDate: models.modifyDate ? new Date(models.modifyDate!) : ""

      }
    }) : [] as any,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter
  }
};

export const selectTicketlist: any = createSelector(
  (state: IStore) => state.ticket.ticketList!, _selectTicketlist
);

const _selectTicketDrpToStr = (models: TicketDropdownTextValueModel[]): IOptionsDataString[] => {
  return models.map(
    (model: any): IOptionsDataString => ({
          text: model.textData,
          value: model?.textData,
        })
  );
};

export const selectTicketDrpToStr: any = createSelector(
  (state: IStore,type:any) => 
  type === "resource" ? state.ticket.drpResource! : 
  type === "secoundaryResource" ? state.ticket.drpSecondaryResource! : state.ticket.drpCustomer,
  _selectTicketDrpToStr
);

const _selectDrpByEntryKey = (models: TicketEntrykeyModel[]): IOptionsDataString[] => {
   return models.map(
    (model: TicketEntrykeyModel): IOptionsDataString => ({
          text: model.text1,
          value: model.text1,
        })
  );
};

export const selectDrpByEntryKey: any = createSelector(
  (state: IStore,type:any) => 
  type === "drpPriority" ? state.ticket.drpPriority! : state.ticket.drpComplexity! ,
  _selectDrpByEntryKey
);


const _selectDrpEntryKey = (models: TicketEntrykeyModel[]): IOptionsDataString[] | any =>  {
  return models.map((item: TicketEntrykeyModel, key) => {
    if(item.entryKey === "TaskSubCategory" || item.entryKey	=== "TaskSubType"){
      return {
              text: item.text2,
              value: item.text2,  
              text1: item.text1,
          }
    }else {
      return {
            text: item.text1,
            value: item.text1, 
            entrykey: item.entryKey,
        }
    }
    
  })
}

export const selectDrpEntryKey: any = createSelector((state: IStore, dropdown) => 
dropdown === "taskCategory" ? state.ticket?.dropdownCategory! 
: dropdown === "taskSubCategory" ? state.ticket?.dropdownSubCategory!
: dropdown === "taskTemplate" ? state.ticket?.dropdownTemplate! 
: dropdown === "taskIssueType" ? state.ticket?.dropdownIssueType! 
: dropdown === "slaCustomer" ? state.ticket?.dropdownSlaCustomer! 
: state.ticket?.dropdownSubIssue! ,
_selectDrpEntryKey
);

const _selectSearchProjSummary = (models: TicketDropdownSearchByModel[]): any[] => {
   return models.map(
    (model: TicketDropdownSearchByModel): any => ({
      // title: model.valueData,
      funnelGenId: model.funnelGenId ? model.funnelGenId : 0,
      so: model.so ? model.so : "",
      title: model.textData,
      price: model.valueData,
      descriptions: '',
    })
  );
};

export const selectSearchProjSummary: any = createSelector(
  (state: IStore,type:any) =>  state.ticket.searchSummary! ,
  _selectSearchProjSummary
  );
  
  
  const _selectValProjSummary = (models: TicketProjSummaryModel): ITicketProjSummary => {
     return {
          projectId : models.projectId ? models.projectId : null , 
          funnelGenId : models.funnelGenId, 
          projectAlias : models.projectAlias, 
          startProject : models.startProject ? new Date(models.startProject!) : undefined, 
          endProject : models.endProject ? new Date(models.endProject!) : undefined, 
          startWarranty : models.startWarranty ? new Date(models.startWarranty!) : undefined, 
          endWarranty : models.endWarranty ? new Date(models.endWarranty!) : undefined, 
          so : models.so, 
          projectName : models.projectName, 
          customerName : models.customerName, 
          customerAddress : models.customerAddress, 
          customerPicName : models.customerPicName, 
          phone : models.customerPhone, 
          pmoName : models.pmoName, 
          soidc : models.soidc, 
     };
  };

export const selectValueSummaryProject: any = createSelector(
  (state: IStore,type:any) =>  state.ticket.projectSummary! ,
  _selectValProjSummary
);
  
  const _selectHeaderTicket = (model: TicketHeaderModel): any => {
     return {
         projectId:  model.projectId ,
         funnelGenId:  model.funnelGenId ,
         projectName: model.projectName ?  model.projectName : "" ,
         customerName: model.customerName ? model.customerName : "" ,
         pmoName: model.pmoName ? model.pmoName : ""
     };
  };

export const selectHeaderTicket: any = createSelector(
  (state: IStore,type:any) =>  state.ticket.headerTicket! ,
  _selectHeaderTicket
);
  
  const _selectTicketDetail = (model: TicketDetailModel): any => {
     return {
        ticketId : model.ticketId, 
        ticketUID : model.ticketUID, 
        ticketName : model.ticketName, 
        description : model.description ? model.description : "", 
        status : model.status, 
        primaryResources : model.primaryResources, 
        secondaryResources : model.secondaryResources, 
        category : model.category, 
        subcategory : model.subcategory, 
        issueType : model.issueType, 
        issueSubtype : model.issueSubtype, 
        priority : model.priority, 
        complexity : model.complexity, 
        slaName : model.slaName, 
        slaCustomer : model.slaCustomer, 
        estStartDate : model.estStartDate ? new Date(model.estStartDate!) : "" ,  
        estEndDate : model.estEndDate ? new Date(model.estEndDate!) : "" ,  
        resolution : model.resolution, 
        remark : model.remark ? model.remark : "", 
        serialNumberList : model.serialNumberList, 
        projectId : model.projectId, 
        funnelGenId : model.funnelGenId, 
        so : model.so, 
        emailReceiver : model.emailReceiver, 
        emailCc : model.emailCc, 
     };
  };

export const selectTicketDetail: any = createSelector(
  (state: IStore,type:any) =>  state.ticket.ticketDetail! ,
  _selectTicketDetail
);

const _selectValueEmailTicket = (model: any): any =>  {
    return {
        subject: model.subject  && model.subject !== "undefined" ? model.subject : "", 
        body: model.body  && model.body !== "undefined" ? model.body : ""
    }
}

export const selectValueEmailTicket: any = createSelector((state: IStore) => 
state.ticket.valueEmail!,
_selectValueEmailTicket);