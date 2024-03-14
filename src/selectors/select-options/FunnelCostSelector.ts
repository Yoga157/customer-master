import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import CostTypeModel from 'stores/funnel-cost/models/CostTypeModel';

const _selectCost = (models: CostTypeModel[]): IOptionsData[] => {
  return models.map(
    (model: CostTypeModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectCostTypeOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.costTable.costType, _selectCost);
