import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import CustomerNameModel from "stores/customer-name/models/CustomerNameModel";
import ResultActions from "models/ResultActions";

const _selectCustomerSearch = (models: CustomerNameModel[]): any[] => {
  return models.map(
    (model: CustomerNameModel): any => ({
      key: model.customerID,
      title: model.customerName,
      customerID: model.customerID,
      customerAddress: model.customerAddress,
      blacklist: model.blacklist,
      holdshipment: model.holdshipment,
      avgAR: model.avgAR
    })
  );
};

export const selectCustomerSearchOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerName.data, _selectCustomerSearch
);

const _selectCustomerDropdown = (models: CustomerNameModel[]): any[] => {
  return models.map(
    (model: CustomerNameModel): any => ({
      key: model.customerID,
      text: model.customerName,
      value: {
        customerName: model.customerName,
        customerID: model.customerID,
        customerAddress: model.customerAddress,
        blacklist: model.blacklist,
        holdshipment: model.holdshipment,
        avgAR: model.avgAR
      }
    })
  );
};

export const selectCustomerDropdownOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerName.data, _selectCustomerDropdown
);

const _selectCustomerById = (model: CustomerNameModel): any => {
  return ({
    customerName: model.customerName,
    customerID: model.customerID,
    customerAddress: model.customerAddress,
    blacklist: model.blacklist,
    holdshipment: model.holdshipment,
    avgAR: model.avgAR
  })
}

export const selectCustomerById: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerName.customerById, _selectCustomerById
);

const _selectCustomerCategories = (categories: ResultActions): any => {
  if (Array.isArray(categories.resultObj)) {
    return categories.resultObj.map(
      (category: any): any => ({
        text: category,
        value: category
      })
    );
  } else {
    return []
  }
}

export const selectCustomerCategories: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerName.resultActions, _selectCustomerCategories
);