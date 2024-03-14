import { createSelector,  ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IReportManagerItem from './models/IReportManagerItem';
import { Selector } from "react-redux";
import ReportManagerModel from 'stores/report-manager/models/ReportManagerModel';

const _selectReportCategory = (models: ReportManagerModel[]): IReportManagerItem[] => {
    return models.map(
        (model: ReportManagerModel): IReportManagerItem => (_mappingObjectTableRow(model))
      );
};

const _mappingObjectTableRow = (model: ReportManagerModel): IReportManagerItem => {
  return {
        udcid:model.udcid,
        entryKey:model.entryKey,
        text1:model.text1,
  };
};

export const selectReportCategory: ParametricSelector<IStore,string[], IReportManagerItem[]> = createSelector(
  (state: IStore) => state.reportManager.data,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectReportCategory);

//Report Item
const _selectReportItem = (models: ReportManagerModel[]): IReportManagerItem[] => {
  return models.map(
      (model: ReportManagerModel): IReportManagerItem => (_mappingObjectTableRowItem(model))
    );
};

const _mappingObjectTableRowItem = (model: ReportManagerModel): IReportManagerItem => {
return {
      udcid:model.udcid,
      entryKey:model.entryKey,
      text1:model.text1,
      text2:model.text2,
      text3:model.text3,
};
};

export const selectReportItem: ParametricSelector<IStore,string[], IReportManagerItem[]> = createSelector(
(state: IStore) => state.reportManager.dataItem,
(state: IStore, actionTypes: string[]) => actionTypes,
_selectReportItem);

const _selectReportItemByID = (model: ReportManagerModel): ReportManagerModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: ReportManagerModel): ReportManagerModel => {
  return new ReportManagerModel({
    udcid:model.udcid,
    entryKey:model.entryKey,
    text1:model.text1,
    text2:model.text2,
    text3:model.text3,
  })
};

 export const selectReportItemByID: Selector<IStore, ReportManagerModel> = createSelector(
  (state: IStore) => state.reportManager.firstData!,
  _selectReportItemByID);