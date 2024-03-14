import CustomerPICModel from 'stores/customer-pic/models/CustomerPICModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';

const _selectCustomerPIC = (model: CustomerPICModel): CustomerPICModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: CustomerPICModel): CustomerPICModel => {
  return new CustomerPICModel({
    customerGenID: model.customerGenID,
    customerInfoID: model.customerInfoID,
    salesID: model.salesID,
    customerPICID: model.customerPICID,
    picName: model.picName,
    picMobilePhone: model.picMobilePhone,
    picEmailAddr: model.picEmailAddr,
    picJobTitle: model.picJobTitle,
  });
};

export const selectCustomerPIC: Selector<IStore, CustomerPICModel> = createSelector(
  (state: IStore) => state.customerPIC.firstData!,
  _selectCustomerPIC
);
