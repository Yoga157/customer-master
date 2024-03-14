import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import ResourceModel from 'stores/customer-credit-service/models/ResourceModel';

const _selectResource = (models: ResourceModel[]): IOptionsDataString[] => {
  return models.map(
    (model: ResourceModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectResourceOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.customerCredit.resource,
  _selectResource
);
