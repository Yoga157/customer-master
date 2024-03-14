import { createSelector,ParametricSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
// import { Selector } from 'react-redux';

import IListDelegation from './models/IListDelegation';
import IObjListDelegation from './models/IObjListDelegation';
import ListDelegationModel from 'stores/delegation/models/ListDelegationModel';
import ObjListDelegationModel from 'stores/delegation/models/ObjListDelegationModel';

import IOptionsData from 'selectors/select-options/models/IOptionsData';
import ListAplicationModel from 'stores/delegation/models/ListAplicationModel';
import DelegationModel from 'stores/delegation/models/DelegationModel';
import IDelegationEdit from './models/IDelegationEdit';

const _selectDelgationList = (models: ListDelegationModel): IListDelegation =>{
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
}

const _createTableRows = (models: ObjListDelegationModel[]): IObjListDelegation[] => {  
  return models.map((model: ObjListDelegationModel): IObjListDelegation => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: ObjListDelegationModel): IObjListDelegation => {
  return {
  delegasiID: model.delegasiID,
  fromUser: model.fromUser,
  fromUserStr: model.fromUserStr,
  toUser: model.toUser,
  effDateStr: model.effDateStr,
  application: model.application,
  effDate: model.effDate,
  expDateStr: model.expDateStr,
  expDate: model.expDate,
  remarks: model.remarks,
  createDate: model.createDate,
  modifyDate: model.modifyDate,
  };
};

export const selectDelegationList: ParametricSelector<IStore, string[], IListDelegation> = createSelector(
  (state: IStore) =>  state.delegation.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectDelgationList
);


const _selectApplication = (models: ListAplicationModel[]): IOptionsData[] => {  
  return models.map(
    (model: ListAplicationModel): IOptionsData => ({
        value: model.udcid,
        text: model.text1,
    })
  );
};
export const selectApplication: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.delegation.application,
  _selectApplication
);



const _selectDelegationEdit = (models: DelegationModel): IDelegationEdit =>{
  return {
    delegasiID : models.delegasiID,
    fromUser : models.fromUser,
    fromUserStr : models.fromUserStr,
    effDate : new Date(models.effDate),
    effDateStr : models.effDateStr,
    expDate : new Date(models.expDate),
    expDateStr : models.expDateStr,
    remarks : models.remarks,
    userLoginID : models.userLoginID,
    detailDelegasi : models.detailDelegasi
  };
}

export const selectDelegationEdit: Selector<IStore, any> = createSelector(
  (state: IStore) => state.delegation.firstData,
  _selectDelegationEdit
);