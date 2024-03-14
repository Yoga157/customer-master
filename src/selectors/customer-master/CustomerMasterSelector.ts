import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import ResultActions from "models/ResultActions";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

const _selectReqNewCustomer = (models: any): any => {
  console.log(models);
  return {
    totalRow: models.totalRows,
    rows: _createTableReqNewCustomerRows(models.rows),
  };
};

const _createTableReqNewCustomerRows = (models: any[]): any[] => {
  return models.map((model: any): any =>
    _mappingObjectTableReqNewCustomerRow(model)
  );
};

const _mappingObjectTableReqNewCustomerRow = (model: any): any => {
  return {
    titleCustomer: model.titleCustomer,
    customerID: model.customerID === null ? null : model.customerID,
    customerName: model.customerName === "" ? "" : model.customerName,
    picName: model.picName === "" ? "" : model.picName,
  };
};

export const selectReqCustomerNewAccount: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerMaster.data!,
  _selectReqNewCustomer
);
