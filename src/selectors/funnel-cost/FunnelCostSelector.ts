import { createSelector, ParametricSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';

import CostNameModel from 'stores/funnel-cost/models/CostNameModel';
import TableRowModel from 'stores/funnel-cost/models/TableRowModel';
import COFModel from 'stores/funnel-cost/models/COFModel';
import CostTypeModel from 'stores/funnel-cost/models/CostTypeModel';
import PersenModel from 'stores/funnel-cost/models/PersenModel';
import FunnelCostHistoryEnvelope from 'stores/funnel-cost/models/FunnelCostHistoryEnvelope';

interface IOptionsData {
  readonly value: number;
  readonly text: string;
}

interface TableModel {
  readonly funnelCostID: number;
  readonly funnelGenID: string;
  readonly funnelCostType: number;
  readonly costID: number;
  readonly cost: number;
  readonly createDate: Date;
  readonly createUserID: number;
  readonly modifyUserID: number;
}

const _selectCostName = (models: CostNameModel[]): IOptionsData[] => {
  return models.map(
    (model: CostNameModel): IOptionsData => ({
      text: model.name,
      value: model.id,
    })
  );
};

// const _createTableRows = (models: BrandTypeModel[]): IBrandModelTableRow[] => {
//   return models.map(
//     (model: BrandTypeModel): IBrandModelTableRow => (_mappingObjectTableRow(model))
//   );
// };
const _selectRows = (models: any) => {
  return models.map((model: TableRowModel): any => _mappingObjectTableRow(model));
};

// const _createTotalSelling = (models: ProductServiceModel[]): number => {
//   let result:number = 0;
//   models.forEach(element => {
//     result = result + element.sellingPrice
//   });
//   return result;
// };

const _createTotalCost = (models: any) => {
  let total = 0;
  models.forEach((item: any) => {
    total = total + item.cost;
  });
  return total;
};

const _selectTotalCost = (models: TableRowModel[]): number => {
  return _createTotalCost(models);
};

export const selectTotalCost: Selector<IStore, number> = createSelector((state: IStore) => state.costTable.rowTable, _selectTotalCost);

const _mappingObjectTableRow = (model: any) => {
  return {
    funnelCostID: model.funnelCostID,
    funnelGenID: model.funnelGenID,
    funnelCostType: model.funnelCostType,
    costID: model.costID,
    cost: model.cost,
    modifyUserID: model.modelName,
    createUserID: model.createUserID,
    //modifyUserID: model.modelName,
    createDate: new Date(model.createDate!),
    modifyDate: model.modifyDate === null || model.modifyDate === '' ? null : model.modifyDate,
    costName: model.costName,
    funnelCostTypeName: model.funnelCostTypeName,
    costRemark: model.costRemark, 
    isUpdate: model.isUpdate?.toString() === 'NaN' ? 0 : model.isUpdate,
    isDelete: model.isDelete?.toString() === 'NaN' ? 0 : model.isDelete,
    isAdd: model.isAdd?.toString() === 'NaN' ? 0 : model.isAdd,
  };
};

export const selectCostNameOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.costTable.costName, _selectCostName);

export const selectRows: Selector<IStore, TableModel[]> = createSelector((state: IStore) => state.costTable.rowTable, _selectRows);

// export const selectTotalCost: Selector<IStore, number> = createSelector(
//   (state: IStore) => state.costTable.rowTable,
//   _selectTotalCost);

const _selectFunnelCostHistory = (models: FunnelCostHistoryEnvelope[]): FunnelCostHistoryEnvelope[] => {
  return models.map((model: FunnelCostHistoryEnvelope): FunnelCostHistoryEnvelope => _mappingFunnelCostHistory(model));
};

const _mappingFunnelCostHistory = (model: FunnelCostHistoryEnvelope): FunnelCostHistoryEnvelope => {
  return new FunnelCostHistoryEnvelope({
    historyDate: model.historyDate,
    historyList: model.historyList,
  });
};

export const selectFunnelCostHistory: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.costTable.funnelCostHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelCostHistory
);

//Hendz PMT
const _selectPMT = (model: COFModel): any => {
  return _mappingObjectPMT(model);
};

const _mappingObjectPMT = (model: COFModel): any => {
  return {
    pmt: model.pmt == undefined ? 0 : model.pmt,
    totalPMT: model.totalPMT == undefined ? 0 : model.totalPMT,
    monthlySelling: model.monthlySelling == undefined ? 0 : model.monthlySelling,
    financing: model.financing == undefined ? 0 : model.financing,
    totalFinancing: model.totalFinancing == undefined ? 0 : model.totalFinancing,
    pmtFinancing: model.pmtFinancing == undefined ? 0 : model.pmtFinancing,
  };
};

export const selectPMT: Selector<IStore, COFModel> = createSelector((state: IStore) => state.costTable.pmtData!, _selectPMT);

const _selectTotalFinancing = (model: any): any => {
  return _mappingObjectTotalFinancing(model);
};

const _mappingObjectTotalFinancing = (model: any): any => {
  return {
    totalFinancing: model,
  };
};

export const selectTotalFinancing: Selector<IStore, any> = createSelector((state: IStore) => state.costTable.totalPMT!, _selectTotalFinancing);

const _selectDropdownCOF = (models: CostTypeModel[]): any[] => {
  return models.map((model: CostTypeModel): any => ({
    text: model.textData,
    value: model.textData,
  }));
};

export const selectDropdownCOF: Selector<IStore, any[]> = createSelector((state: IStore) => state.costTable.dropdownCOF, _selectDropdownCOF);

/*const _selectPersenCOF = (model: any[]): any[] => {
  return model.map((model: any): any => _mappingObjectPersenCOF(model));
};

const _mappingObjectPersenCOF = (model: PersenModel): any => {
  return {
    inum1: model.inum1,
  };
};

export const selectPersenCOF: Selector<IStore, PersenModel[]> = createSelector((state: IStore) => state.costTable.persenCOF!, _selectPersenCOF); */

//-------------------------------------------------------------------------------------

const _selectPersenCOF = (models: PersenModel[]): any[] => {
  return models.map((model: PersenModel): any => ({
    inum1: model.inum1,
    rnum1: model.rnum1,
  }));
};

export const selectPersenCOF: Selector<IStore, any[]> = createSelector((state: IStore) => state.costTable.persenCOF, _selectPersenCOF);
