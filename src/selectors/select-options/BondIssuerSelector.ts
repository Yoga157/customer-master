import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import BondIssuerModel from 'stores/bond-issuer/models/BondIssuerModel';

const _selectBondIssuer = (models: BondIssuerModel[]): IOptionsDataString[] => {
  return models.map(
    (model: BondIssuerModel): IOptionsDataString => ({
      text: model.textData,
      value: model.textData,
    })
  );
};

export const selectBondIssuerOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.bondIssuer.data,
  _selectBondIssuer
);
