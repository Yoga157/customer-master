import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import ResultActions from "models/ResultActions";
import CustomerMasterPostModel from "stores/customer-master/models/CustomerMasterPostModel";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

const _selectReqNewCustomer = (models: any): any => {
  // console.log(models);
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

const _selectNewCustomerDetailPending = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    return {
      titleCustomer: models.resultObj[0].titleCustomer,
      customerName: models.resultObj[0].customerName,
      picName: models.resultObj[0].picName,
      customerAddress: models.resultObj[0].customerAddress,
      phoneNumber: models.resultObj[0].phoneNumber,
      industryClass: models.resultObj[0].industryClass,
      website: models.resultObj[0].website,
      socialMedia: models.resultObj[0].socialMedia,
      picMobilePhone: models.resultObj[0].picMobilePhone,
      picJobTitle: models.resultObj[0].picJobTitle,
      picEmailAddr: models.resultObj[0].picEmailAddr,
      requestor: models.resultObj[0].requestor,
      modifyUserID: models.resultObj[0].modifyUserID,
      approvalStatus: models.resultObj[0].approvalStatus,
    };
  } else {
    return [];
  }
};

export const selectNewCustomerDetailPending: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerMaster.customerNewByGenId!,
  _selectNewCustomerDetailPending
);
