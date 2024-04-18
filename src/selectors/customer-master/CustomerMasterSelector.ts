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
    totalRows: models.totalRows,
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
  if (Array.isArray(models.resultObj) && models.resultObj.length > 0) {
    return {
      customerGenID: models.resultObj[0].customerGenID,
      customerID: models.resultObj[0].customerID,
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
      createDate: models.resultObj[0].createdDate,
      isNew: models.resultObj[0].isNew,
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

// address office
const _joinOfficeNumber = (
  phoneNumber: any,
  alternateNumber: any,
  faxNumber: any
): string => {
  let numbers = [];

  if (phoneNumber) {
    numbers.push(phoneNumber);
  }
  if (alternateNumber) {
    numbers.push(alternateNumber);
  }
  if (faxNumber) {
    numbers.push(faxNumber);
  }

  if (numbers.length == 0) {
    return "-";
  } else {
    return numbers.join(", ");
  }
};

const _mappingAddressOffice = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    id: model.addressOfficeNumberID,
    type: model.type.toUpperCase(),
    address: model.fullAddress,
    officeNumber: _joinOfficeNumber(
      model.phoneNumber,
      model.alternateNumber,
      model.faxNumber
    ),
    phoneNumber: model.phoneNumber,
    alternateNumber: model.alternateNumber,
    faxNumber: model.faxNumber,
    customerGenID: model.customerGenID,
    customerID: model.customerID,
  }));
};

// customer pic
const _mappingCustomerPICs = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    id: model.customerPICID,
    name: model.picName,
    jabatan: model.picJobTitle,
    email: model.picEmailAddr,
    address: model.picAddress,
    phoneNumber: model.picMobilePhone,
    customerGenID: model.customerGenID,
    customerID: model.customerID,
  }));
};

const _selectNewCustomerDetailApproved = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    if (models.resultObj.length == 0) {
      return {
        customerID: "-",
        titleCustomer: "-",
        customerName: "-",
        industryClass: "-",
        requestor: "-",
        cpAddressOfficeNumbers: [],
        cpWebsiteSocialMedias: [],
        customerPICs: [],
        cpRelatedCustomers: [],
        createDate: "-",
        createUserID: "-",
        modifyDate: "-",
        modifyUserID: "-",
      };
    } else {
      return {
        customerID:
          models.resultObj[0].customerID == 0
            ? "-"
            : models.resultObj[0].customerID,
        titleCustomer: models.resultObj[0].titleCustomer,
        customerName: models.resultObj[0].customerName,
        industryClass: models.resultObj[0].industryClass
          ? models.resultObj[0].industryClass
          : "-",
        requestor: models.resultObj[0].requestor,
        cpAddressOfficeNumbers: models.resultObj[0].cpAddressOfficeNumbers
          ? _mappingAddressOffice(models.resultObj[0].cpAddressOfficeNumbers)
          : [],
        cpWebsiteSocialMedias: models.resultObj[0].cpWebsiteSocialMedias
          ? models.resultObj[0].cpWebsiteSocialMedias
          : [],
        customerPICs: models.resultObj[0].customerPICs
          ? _mappingCustomerPICs(models.resultObj[0].customerPICs)
          : [],
        cpRelatedCustomers: models.resultObj[0].cpRelatedCustomers
          ? models.resultObj[0].cpRelatedCustomers
          : [],
        createDate: models.resultObj[0].createDate,
        createUserID: models.resultObj[0].createUserID,
        modifyDate: models.resultObj[0].modifyDate,
        modifyUserID: models.resultObj[0].modifyUserID,
      };
    }
  } else {
    return [];
  }
};

export const selectCustomerMoreDetails: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerMaster.customerMoreDetails!,
  _selectNewCustomerDetailApproved
);
