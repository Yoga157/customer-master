import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataOther from './models/IOptionsDataOther';
import BrandModel from 'stores/brand/models/BrandModel';

const _selectBrand = (models: BrandModel[]): IOptionsDataOther[] => {
  return models.map(
    (model: BrandModel): IOptionsDataOther => ({
      text: model.brandName,
      value: model.brandID,
      text2: model.productManager,
    })
  );
};

export const selectBrandOptions: Selector<IStore, IOptionsDataOther[]> = createSelector((state: IStore) => state.brand.data, _selectBrand);


const _selectBrandProd = (models: any[]): IOptionsDataOther[] => {

  return models.map(
    (model: any): IOptionsDataOther => ({
      text: model.brandName,
      value: model.brandID,
      text2: model.productManager,
    })
  );
};

export const selectBrandOptionsByProd: Selector<IStore, IOptionsDataOther[]> = createSelector((state: IStore) => state.brand.dataBrand, _selectBrandProd);


const _selectBrandDate = (models: BrandModel[]): IOptionsDataOther[] => {
  return models.map(
    (model: BrandModel): IOptionsDataOther => ({
      text: model.brandName,
      value: model.brandID,
      text2: model.productManager,
    })
  );
};

export const selectBrandOptionsByDate: Selector<IStore, IOptionsDataOther[]> = createSelector((state: IStore) => state.brand.dataBrandDate, _selectBrandDate);