import { createSelector, Selector } from 'reselect';
import IStore from 'models/IStore';
import ServiceItemModel from 'stores/service-item/models/ServiceItemModel';
// import IOptionsData from './models/IOptionsData';

const _selectServiceItems = (models: ServiceItemModel[]): any[] => {
  return models.map(
    (model: ServiceItemModel): any => ({
      text: model.textData,
      value: model.valueData,
      flag: model.flag,
    })
  );
};

export const selectServiceItemOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.serviceItem.data,
  _selectServiceItems
);
