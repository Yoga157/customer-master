import { createSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import IPMOSupportModel from './models/IPMOSupportModel';
import PMOSupportModel from 'stores/pmo-support/models/PMOSupportModel';

const _mappingObjectTableRow = (model: PMOSupportModel): IPMOSupportModel => {
  return {
    salesDeptID: model.salesDeptID === undefined ? '' : model.salesDeptID,
    pmoDeptID: model.pmoDeptID === undefined ? '' : model.pmoDeptID,
    salesDeptName: model.salesDeptName === undefined ? '' : model.salesDeptName,
    pmoEmail: model.salesDeptName === undefined ? '' : model.salesDeptName,
    pmoEmployeeKey: model.pmoEmployeeKey === undefined ? 0 : model.pmoEmployeeKey,
    pmoName: model.salesDeptName === undefined ? '' : model.salesDeptName,
  };
};

const _selectPMOSupport = (model: PMOSupportModel): IPMOSupportModel => {
  return _mappingObjectTableRow(model);
};

export const selectPMOSupport: Selector<IStore, IPMOSupportModel> = createSelector((state: IStore) => state.pmoSupport.data, _selectPMOSupport);
