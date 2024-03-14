import { createSelector, Selector } from 'reselect';
import FunnelBrandModel from 'stores/funnel-product-service/models/FunnelBrandModel';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';

const _selectBrand = (models: FunnelBrandModel[]): IOptionsData[] => {
  return models.map(
    (model: FunnelBrandModel): IOptionsData => ({
      text: model.brandName,
      value: model.brandID,
    })
  );
};

export const selectFunnelBrandOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelProductService.listBrand,
  _selectBrand
);
