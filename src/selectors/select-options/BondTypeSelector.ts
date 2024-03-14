import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import BondTypeModel from 'stores/bond-type/models/BondTypeModel';

const _selectBondType = (models: BondTypeModel[]): IOptionsDataString[] => {
  return models.map(
    (model: BondTypeModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectBondTypeOptions: Selector<IStore, IOptionsDataString[]> = createSelector((state: IStore) => state.bondType.data, _selectBondType);
