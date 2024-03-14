import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsDataString';
import BoqModel from 'stores/boq/models/BoqModel';

const _selectProductNumber = (models: BoqModel[]): IOptionsData[] => {
  return models.map(
    (model: BoqModel): IOptionsData => ({
      text: model.productNumber,
      value: model.productNumber,
    })
  );
};

export const selectProductNumberOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelBoq.listData.rows,
  _selectProductNumber
);
