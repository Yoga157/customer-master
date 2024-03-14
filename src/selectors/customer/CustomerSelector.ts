import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import ICustomerFunnelTable from './models/ICustomerFunnelTable';
import ICustomerFunnelTableRow from './models/ICustomerFunnelTableRow';
import CustomerToFunnelEnvelope from 'stores/customer/models/CustomerToFunnelEnvelope';
import CustomerToFunnelModel from 'stores/customer/models/CustomerToFunnelModel';
import { Selector } from 'react-redux';
import CustomerModel from 'stores/customer/models/CustomerModel';

const _selectCustomerFunnel = (models: CustomerToFunnelEnvelope): ICustomerFunnelTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: CustomerToFunnelModel[]): ICustomerFunnelTableRow[] => {
  return models.map((model: CustomerToFunnelModel): ICustomerFunnelTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: CustomerToFunnelModel): ICustomerFunnelTableRow => {
  return {
    customerPICID: model.customerPICID,
    picEmailAddr: model.picEmailAddr,
    picJobTitle: model.picJobTitle,
    picMobilePhone: model.picMobilePhone,
  };
};

export const selectCustomerToFunnel: ParametricSelector<IStore, string[], ICustomerFunnelTable> = createSelector(
  (state: IStore) => state.customerToFunnel.listData,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectCustomerFunnel
);

const _selectCustomer = (model: CustomerModel): CustomerModel => {
  return _mappingCustomerObject(model);
};

const _mappingCustomerObject = (model: CustomerModel): CustomerModel => {
  return new CustomerModel({
    customerGenID: model.customerGenID.toString() === 'NaN' ? 0 : model.customerGenID,
    customerID: model.customerID.toString() === 'NaN' ? 0 : model.customerID,
    customerName: model.customerName === 'undefined' ? '' : model.customerName,
    addr1: model.addr1 === 'undefined' ? '' : model.addr1,
    addr2: model.addr2 === 'undefined' ? '' : model.addr2,
    addr3: model.addr3 === 'undefined' ? '' : model.addr3,
    addr4: model.addr4 === 'undefined' ? '' : model.addr4,
    city: model.city === 'undefined' ? '' : model.city,
    phoneNumber: model.phoneNumber === 'undefined' ? '' : model.phoneNumber,
    industryClass: model.industryClass === 'undefined' ? '' : model.industryClass,
    website: model.website === 'undefined' ? '' : model.website,
    socialMedia: model.socialMedia === 'undefined' ? '' : model.socialMedia,
    endUserFlag: model.endUserFlag === 'undefined' ? '' : model.endUserFlag,
    memberGroup: model.memberGroup === 'undefined' ? '' : model.memberGroup,
    npwpNumber: model.npwpNumber === 'undefined' ? '' : model.npwpNumber,
    npwpAddress: model.npwpAddress === 'undefined' ? '' : model.npwpAddress,
    financeCPName: model.financeCPName === 'undefined' ? '' : model.financeCPName,
    financeCPPhone: model.financeCPPhone === 'undefined' ? '' : model.financeCPPhone,
    financeCPEmail: model.financeCPEmail === 'undefined' ? '' : model.financeCPEmail,
    financeDirName: model.financeDirName === 'undefined' ? '' : model.financeDirName,
    financeDirPhone: model.financeDirPhone === 'undefined' ? '' : model.financeDirPhone,
    financeDirEmail: model.financeDirEmail === 'undefined' ? '' : model.financeDirEmail,
    executiveDirName: model.executiveDirName === 'undefined' ? '' : model.executiveDirName,
    executiveDirPhone: model.executiveDirPhone === 'undefined' ? '' : model.executiveDirPhone,
    executiveDirEmail: model.executiveDirEmail === 'undefined' ? '' : model.executiveDirEmail,
  });
};

export const selectCustomer: Selector<IStore, CustomerModel> = createSelector((state: IStore) => state.customer.customerSingle, _selectCustomer);
