import HistoryPSSModels, { HistoryRowsModel } from "stores/pss/models/HistoryPSSModels";
import { IHistory, IHistoryRow } from "./models/IHistory";
import PSSModels from "stores/pss/models/PSSModels";
import { createSelector } from "reselect";
import { Selector } from "react-redux";
import IStore from "models/IStore";
import moment from "moment";

const _selectHeaderPss = (model: PSSModels): PSSModels => {
  return new PSSModels({
      customerName: model.customerName,
      projectName: model.projectName,
      projectID: model.projectID,
      reference: model.reference,
      preparedBy: model.preparedBy === "undefined" ? "" : model.preparedBy,
      docVersionNumber: model.docVersionNumber === "undefined" ? '' : model.docVersionNumber,
      docVersionDate: model.docVersionDate === "undefined" ? "" : model.docVersionDate,
      email: model.email === "undefined" ? "" : model.email,
      salesName: model.salesName,
      salesEmail: model.salesEmail,
      presalesName: model.presalesName === "undefined" ? "" : model.presalesName,
      presalesEmail: model.presalesEmail === "undefined" ? "" : model.presalesEmail,
      customerPICName: model.customerPICName,
      customerPICEmail: model.customerPICEmail,
  });;
};

export const selectHeaderPss: Selector<IStore, PSSModels> = createSelector(
  (state: IStore) => state.pss.pssHeader!,
  _selectHeaderPss
);

const _selectHistory = (model: HistoryPSSModels): IHistory => {
  return {
      totalRows: model.totalRows ,
      rows: model?.rows ? model?.rows?.map(( item :HistoryRowsModel ): IHistoryRow => ({
        pssDocumentId : item.pssDocumentId,
        versionNumber : item.versionNumber,
        documentName : item.documentName,
        documentType : item.documentType,
        projectName : item.documentName,
        customerName : item.customerName,
        createUserName : item.createUserName,
        modifyUserName : item.modifyUserName,
        createDate : item.createDate ? moment(item.createDate).format('DD/MM/YYYY HH:mm') : "",
        createUserID : item.createUserID,
        modifyDate : item.modifyDate ? moment(item.modifyDate).format('DD/MM/YYYY HH:mm') : "",
        modifyUserID : item.modifyUserID
      })) as [] : [],
      column: model.column ,
      sorting: model.sorting ,
      search: model.search ,
      filter: model.filter,
  }
};


export const selectHistoryPSS: Selector<IStore, IHistory> = createSelector(
  (state: IStore) => state.pss.history!,
  _selectHistory
);