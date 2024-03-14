import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsData from './models/IOptionsData';
import ISearchResult from './models/ISearchResult';
import CustomerModel from 'stores/customer/models/CustomerModel';
import CustomerFunnel from 'stores/customer/models/CustomerFunnel';
import CustomerOptions from 'stores/customer/models/CustomerOptions';
import IOptionsDataString from './models/IOptionsDataString';


export default interface ISearchResultFunnel {
  readonly title: string;
  readonly descriptions: string;
  readonly price: string;
  readonly key: number
}


const _selectCustomer = (models: CustomerModel[]): IOptionsData[] => {
  return models.map(
    (model: CustomerModel): IOptionsData => ({
      text: model.customerName,
      value: model.customerGenID,
    })
  );
};

export const selectCustomerOptions: Selector<IStore, IOptionsData[]> = createSelector((state: IStore) => state.customer.customer, _selectCustomer);

const _selectCustomerSearch = (models: CustomerModel[]): ISearchResult[] => {
  return models.map(
    (model: CustomerModel): ISearchResult => ({
      title: model.customerName.toString() + '##' + model.customerGenID.toString(),
      descriptions: model.customerGenID.toString() + '##' + model.customerName,
      price: model.customerGenID.toString(),
    })
  );
};

export const selectCustomerSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.customer.customer,
  _selectCustomerSearch
);


const _selectCustomerSearchFunnelSA = (models: CustomerModel[]): ISearchResultFunnel[] => {
  return models.map(
    (model: CustomerModel, index: number): ISearchResultFunnel => ({
      title: model.customerName.toString(),
      descriptions: model.customerGenID.toString(),
      price: model.customerGenID.toString(),
      key: index
    })
  );
};

export const selectCustomerSearchFunnelSA: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.customer.customer,
  _selectCustomerSearchFunnelSA
);

const _selectCustomerSearchFlag = (models: CustomerOptions[]): any => {
  if (models) {
    return models.map((model: any, index): any => ({
      title: model.textData,
      descriptions: '',
      price: model.valueData,
      flag: model.flag,
      index: index,
      key: index,
    }));
  }
};

export const selectCustomerSearchOptionsWithFlag: Selector<IStore, CustomerOptions[]> = createSelector(
  (state: IStore) => state.customer.customerWithFlag,
  _selectCustomerSearchFlag
);

const _selectCustomerGenerated = (models: CustomerModel[]): ISearchResult[] => {
  return models.map(
    (model: CustomerModel): ISearchResult => ({
      title: model.customerName.toString() + '##' + model.customerGenID.toString(),
      descriptions: model.customerGenID.toString(),
      price: model.customerID.toString(),
    })
  );
};

export const selectCustomerGenerated: Selector<IStore, ISearchResult[]> = createSelector(
  (state: IStore) => state.customer.customer,
  _selectCustomerGenerated
);

const _selectCustomerTypeC = (models: CustomerModel[]): any => {
  
  if (models) {
    return models.map((model: any, index): any => ({
      title: model.customerName,
      soType: model.soType,
      descriptions: model.customerID,
      price: model.customerGenID,
      flag:model.endUserFlag,
      index: index,
      key: index,
    }));
  }
};

export const selectCustomerTypeC: Selector<IStore, CustomerModel[]> = createSelector(
  (state: IStore) => state.customer.customerTypeC,
  _selectCustomerTypeC
);

const _selectCustomerIDCNotNull = (models: CustomerModel[]): any => {
  
  if (models) {
    return models.map((model: any, index): any => ({
      title: model.customerName,
      descriptions: model.customerID,
      price: model.customerGenID,
      customerIDC: model.customerIDC,
      index:index,
      flag: model.endUserFlag
    }));
  }
};

export const selectCustomerIDCNotNull: Selector<IStore, CustomerModel[]> = createSelector(
  (state: IStore) => state.customer.customerIDCNotNull,
  _selectCustomerIDCNotNull
);

const _selectCustomerFunnel = (models: CustomerFunnel[]): IOptionsData[] => {
  return models.map(
    (model: CustomerFunnel): IOptionsData => ({
      text: model.customerName,
      value: model.customerGenID,
    })
  );
};

export const selectCustomerFunnelOptions: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.customer.customerFunnel,
  _selectCustomerFunnel
);

const _selectCustomerFunnelValByName = (models: CustomerFunnel[]): IOptionsDataString[] => {
  return models.map(
    (model: CustomerFunnel): IOptionsDataString => ({
      text: model.customerName,
      value: model.customerName,
    })
  );
};

export const selectCustomerFunnelOptionsValByName: Selector<IStore, IOptionsDataString[]> = createSelector(
  (state: IStore) => state.customer.customerFunnel,
  _selectCustomerFunnelValByName
);
