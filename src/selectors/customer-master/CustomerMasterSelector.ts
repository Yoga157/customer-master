import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import ResultActions from "models/ResultActions";
import IOptionsDataString from "selectors/select-options/models/IOptionsDataString";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

const _selectReqNewCustomer = (models: any): any => {
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
    customerID: model.customerID === null ? null : model.customerID,
    customerName: model.customerName,
    picName: model.picName,
    blacklist: model.blacklist,
    holdshipment: model.holdshipment,
    similarity: model.similarity,
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
      customerGenID: models.resultObj[0].customerGenID
        ? models.resultObj[0].customerGenID
        : "-",
      customerID: models.resultObj[0].customerID
        ? models.resultObj[0].customerID
        : "-",
      customerName: models.resultObj[0].customerName
        ? models.resultObj[0].customerName
        : "-",
      industryClass: models.resultObj[0].industryClass
        ? models.resultObj[0].industryClass
        : "-",
      customerBusinessName: models.resultObj[0].customerBusinessName
        ? models.resultObj[0].customerBusinessName
        : "-",
      holdingCompName: models.resultObj[0].holdingCompName
        ? models.resultObj[0].holdingCompName
        : "-",
      customerAddress: models.resultObj[0].customerAddress
        ? models.resultObj[0].customerAddress
        : "-",
      country: models.resultObj[0].country ? models.resultObj[0].country : "-",
      city: models.resultObj[0].city ? models.resultObj[0].city : "-",
      zipCode: models.resultObj[0].zipCode ? models.resultObj[0].zipCode : "-",
      nib: models.resultObj[0].nib ? models.resultObj[0].nib : "-",
      phoneNumber: models.resultObj[0].phoneNumber
        ? models.resultObj[0].phoneNumber
        : "-",
      website: models.resultObj[0].website ? models.resultObj[0].website : "-",
      coorporateEmail: models.resultObj[0].coorporateEmail
        ? models.resultObj[0].coorporateEmail
        : "-",
      npwpNumber: models.resultObj[0].npwpNumber
        ? models.resultObj[0].npwpNumber
        : "-",
      requestor: models.resultObj[0].requestor
        ? models.resultObj[0].requestor
        : "-",
      npwpCard:
        models.resultObj[0].req_CustomerCardFileGetByCustomerGenID_ViewModels
          .length != 0
          ? _getTaxCard(
              models.resultObj[0]
                .req_CustomerCardFileGetByCustomerGenID_ViewModels
            )
          : {},
      picName: models.resultObj[0].picName ? models.resultObj[0].picName : "-",
      picMobilePhone: models.resultObj[0].picMobilePhone
        ? models.resultObj[0].picMobilePhone
        : "-",
      picJobTitle: models.resultObj[0].picJobTitle
        ? models.resultObj[0].picJobTitle
        : "-",
      picEmailAddr: models.resultObj[0].picEmailAddr
        ? models.resultObj[0].picEmailAddr
        : "-",
      createDate: models.resultObj[0].createDate
        ? models.resultObj[0].createDate
        : "-",
      isNew: models.resultObj[0].isNew ? models.resultObj[0].isNew : "-",
      approvalStatus: models.resultObj[0].approvalStatus
        ? models.resultObj[0].approvalStatus
        : "PENDING",
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
    country: model.country,
    city: model.city,
    zipCode: model.zipCode,
    phoneNumber: model.phoneNumber,
    alternateNumber: model.alternateNumber,
    faxNumber: model.faxNumber,
    customerGenID: model.customerGenID,
    customerID: model.customerID,
  }));
};

const _mappingAddressOfficeOptions = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    id: model.addressOfficeNumberID,
    text: `${model.type.toUpperCase()} - ${model.fullAddress} ${
      model.zipCode
    }, ${model.city}, ${model.country}`,
    value: `${model.type.toUpperCase()} - ${model.fullAddress} ${
      model.zipCode
    }, ${model.city}, ${model.country}`,
  }));
};

const _selectAddressOfficeOptions = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    if (models.resultObj.length == 0) {
      return [];
    } else {
      return _mappingAddressOfficeOptions(
        models.resultObj[0].cpAddressOfficeNumbers
      );
    }
  }
};

// customer pic
const _mappingCustomerPICs = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    id: model.customerPICID,
    name: model.picName,
    jobTitle: model.picJobTitle,
    email: model.picEmailAddr,
    address: model.picAddress,
    pin: model.pinFlag,
    cap: model.capFlag,
    phoneNumber: model.picMobilePhone,
    customerGenID: model.customerGenID,
    customerID: model.customerID,
  }));
};

// related customer/account
const _mappingRelatedCustomer = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    id: model.rCustomerID,
    customerID: model.relatedCustomerID,
    accountName: model.relatedCustomerName,
  }));
};

// gambar kartu npwp
const _getTaxCard = (models: any[]): {} => {
  return {
    customerCardID: models[0].customerCardID,
    imageFile: models[0].imageFile,
    extension: models[0].extension,
  };
};

const _selectNewCustomerDetailApproved = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    if (models.resultObj.length == 0) {
      return {
        customerID: "-",
        titleCustomer: "-",
        customerName: "-",
        industryClass: "-",
        customerBusinessName: "-",
        holdingCompName: "-",
        address: "-",
        country: "-",
        city: "-",
        zipCode: "-",
        nib: "-",
        phoneNumber: "-",
        website: "-",
        coorporateEmail: "-",
        npwpNumber: "-",
        capFlag: false,
        requestor: "-",
        npwpCard: {},
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
          models.resultObj[0].customerGenID == 0
            ? "-"
            : models.resultObj[0].customerGenID,
        customerName: models.resultObj[0].customerName,
        industryClass: models.resultObj[0].industryClass
          ? models.resultObj[0].industryClass
          : "-",
        customerBusinessName: models.resultObj[0].customerBusinessName
          ? models.resultObj[0].customerBusinessName
          : "-",
        holdingCompName: models.resultObj[0].holdingCompName
          ? models.resultObj[0].holdingCompName
          : "-",
        address: models.resultObj[0].customerAddress
          ? models.resultObj[0].customerAddress
          : "-",
        country: models.resultObj[0].country
          ? models.resultObj[0].country
          : "-",
        city: models.resultObj[0].city ? models.resultObj[0].city : "-",
        zipCode: models.resultObj[0].zipCode
          ? models.resultObj[0].zipCode
          : "-",
        nib: models.resultObj[0].nib ? models.resultObj[0].nib : "-",
        phoneNumber: models.resultObj[0].phoneNumber
          ? models.resultObj[0].phoneNumber
          : "-",
        website: models.resultObj[0].website
          ? models.resultObj[0].website
          : "-",
        coorporateEmail: models.resultObj[0].coorporateEmail
          ? models.resultObj[0].coorporateEmail
          : "-",
        npwpNumber: models.resultObj[0].npwpNumber
          ? models.resultObj[0].npwpNumber
          : "-",
        capFlag: models.resultObj[0].capFlag,
        requestor: models.resultObj[0].requestor
          ? models.resultObj[0].requestor
          : "-",
        npwpCard:
          models.resultObj[0]
            .req_CustomerCardFileGetByCustomerGenID_ViewModels != undefined &&
          models.resultObj[0].req_CustomerCardFileGetByCustomerGenID_ViewModels
            .length != 0
            ? _getTaxCard(
                models.resultObj[0]
                  .req_CustomerCardFileGetByCustomerGenID_ViewModels
              )
            : {},
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
          ? _mappingRelatedCustomer(models.resultObj[0].cpRelatedCustomers)
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

const _selectIndustryClassOptions = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    models.resultObj.map((model: any): any => ({
      text: model.industryClass,
      value: model.industryClassID,
    }));
  } else {
    return [];
  }
};

export const selectCustomerMoreDetails: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerMaster.customerMoreDetails!,
  _selectNewCustomerDetailApproved
);

export const selectAddressOfficeOptions: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerMaster.customerMoreDetails!,
  _selectAddressOfficeOptions
);

const _selectIndustry = (models: any[]): any[] => {
  if (Array.isArray(models) && models.length > 0) {
    const resultArray = models.map((model) => ({
      text: model.industryClass,
      value: model.industryClassID,
    }));
    return resultArray;
  } else {
    return [];
  }
};

export const selectIndustry: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerMaster.industryClassification.resultObj,
  _selectIndustry
);

const _selectAccountHistory = (models: ResultActions): any => {
  if (Array.isArray(models.resultObj)) {
    return models.resultObj.map((item) => ({
      accountActivityHistoryID: item.accountActivityHistoryID,
      customerID: item.customerID,
      customerGenID: item.customerGenID,
      description: item.description,
      createdDate: item.createdDate,
      remark: item.remark,
    }));
  } else {
    return [];
  }
};

export const selectAccountHistory: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerMaster.accountHistoryDetails!,
  _selectAccountHistory
);
