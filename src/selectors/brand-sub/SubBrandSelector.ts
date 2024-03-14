import SubBrandModel from 'stores/brand-sub/models/SubBrandModel';
import { createSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';

const _selectSubBrand = (model: SubBrandModel): SubBrandModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: SubBrandModel): SubBrandModel => {
  return new SubBrandModel({
    subBrandID: model.subBrandID.toString() === 'undefined' ? 0 : model.subBrandID,
    brandID: model.brandID,
    subBrandName: model.subBrandName,
    groupID: model.groupID,
  });
};

export const selectSubBrand: Selector<IStore, SubBrandModel> = createSelector((state: IStore) => state.subBrand.firstdata, _selectSubBrand);
