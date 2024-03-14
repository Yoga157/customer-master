import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';

const _selectCustomerPIC = (models: CustomerPICModel[]): IOptionsData[] => {
  return models.map(
    (model: CustomerPICModel): IOptionsData => ({
      text: model.picName,
      value: model.customerPICID,
    })
  );
};

export const selectCustomerPICOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.customerPIC.customerPic,
  _selectCustomerPIC
);
