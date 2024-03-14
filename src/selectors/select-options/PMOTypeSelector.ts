
import FunnelEntryKeyByModel from 'stores/funnel/models/FunnelEntryKeyByModel';
import EmployeeModel from 'stores/employee/models/EmployeeModel';
import PMOSOorOIExist from 'stores/pmo/models/PMOSOorOIExist';
import PMOSTypeSelect from 'stores/pmo/models/PMOSTypeSelect';
import IOptionsDataString from './models/IOptionsDataString';
import IOptionsKeyLabel from './models/IOptionsKeyLabel';
import { createSelector, Selector } from 'reselect';
import ISearchResult from './models/ISearchResult';
import IOptionsData from './models/IOptionsData';
import IStore from 'models/IStore';

import { dummy } from 'views/pmo-page/page/pmo/components/form/components/dummy';

const _selectPMOFunnelTypeOptions = (models: PMOSOorOIExist[]): ISearchResult[] => {
  // console.log('dummy',dummy)
  
  
  return models.map(
    (model: PMOSOorOIExist): ISearchResult => ({
      // title: `${model.valueData}-${model.textData}`,
      title: model.valueData,
      price: model.textData,
      descriptions: model.textData,
    })
  );
};

export const selectFunnelSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.pmo.funnelSoOiExist,
  _selectPMOFunnelTypeOptions
);


const _selectProjDrp = (models: PMOSTypeSelect[]): IOptionsDataString[] => {
  return models.map(
    (model: PMOSTypeSelect): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectProjDrp: any = createSelector(
  (state: IStore,type:any) => 
  type === "project" ? state.pmo.projListDrp : 
  type === "customer" ? state.pmo.customerListDrp : 
  type === "assign" ? state.pmo.assignListDrp : 
  state.pmo.salesListDrp,
  _selectProjDrp
);


const _selectEntryKey = (models: FunnelEntryKeyByModel[]): any => {  
  return models.map(
    (model: FunnelEntryKeyByModel): IOptionsDataString => ({
      text: model.text1,
      value: model.text1,
    })
  );
};
export const selectEntryKey: any = createSelector(
  (state: IStore, type:any) => type === "pmo-project-status" ? state.funnel.dataPMOProjectStatus : state.funnel.dataPMOWarrantyStatus,
  _selectEntryKey
  );
  
  const _selectEntryKeyValNumber = (models: FunnelEntryKeyByModel[]): any => {  
    return models.map(
      (model: FunnelEntryKeyByModel): IOptionsData => ({
        text: model.text1 === "Handover to Berca Support" ? "Handover BS" : model.text1 === "Handover to SMO" ? "Handover SMO": model.text1,
        value: model.udcid,
      })
    );
  };  
  export const selectEntryKeyValNumber: any = createSelector(
    (state: IStore, type:any) => type === "pmo-project-status" ? state.funnel.dataPMOProjectStatus : state.funnel.dataPMOWarrantyStatus,
    _selectEntryKeyValNumber
    );

const _selectEmployees = (models: EmployeeModel[]): IOptionsKeyLabel[] => {
  return models.map(
    (model: EmployeeModel): IOptionsKeyLabel => ({
      key: model.employeeKey,
      label: model.employeeName
    })
  );
};

export const selectEmployees: Selector<IStore, IOptionsKeyLabel[]> = createSelector(
  (state: IStore) => state.employee.data,
  _selectEmployees
);

const _selectEmployeesGantt = (models: EmployeeModel[]): IOptionsKeyLabel[] => {
  return models.map(
    (model: EmployeeModel): IOptionsKeyLabel => ({
      key: model.employeeID,
      label: model.employeeName
    })
  );
};

export const selectEmployeesGantt: Selector<IStore, IOptionsKeyLabel[]> = createSelector(
  (state: IStore) => state.employee.dataEmployeeAssign,
  _selectEmployeesGantt
);


const _selectEmployeeFixAll = (models: EmployeeModel[]): any => {
  return models.map(
    (model: any): any => ({
      title: model.employeeEmail,
      descriptions: model.employeeID.toString() + '##' + model.employeeName,
      price: String(model.employeeID),
      // price: model.employeeEmail,
    })
  );
};

export const selectEmployeeFixAll: any = createSelector(
  (state: IStore, fromState:any) => state.employee.dataEmployeeAssign,
  _selectEmployeeFixAll
);
