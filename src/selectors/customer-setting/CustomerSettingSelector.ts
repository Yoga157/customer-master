import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ResultActions from "models/ResultActions";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

const formatDate = (date: any): any => {
  const [day, month, year] = date.split("-");
  const parsedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    parsedDate
  );

  return formattedDate;
};

//Selector No Name Account
const _selectCustomerSetting = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: any): any => {
  return {
    customerID: model.customerID === null ? null : model.customerID,
    jdeCustomerID: model.jdeCustomerID === null ? null : model.jdeCustomerID,
    customerGenID: model.customerGenID === null ? null : model.customerGenID,
    industryClass: model.industryClass === null ? null : model.industryClass,
    industryClassID:
      model.industryClassID === null ? null : model.industryClassID,
    industryClassBusiness:
      model.industryClassBusiness === null ? null : model.industryClassBusiness,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    named: model.named === "" ? null : model.named,
    salesShareableID: model.salesShareableID,
    shareable: model.shareable === null ? null : model.shareable,
    blacklist: model.blacklist === null ? null : model.blacklist,
    requestedBy: model.requestedBy === null ? "" : model.requestedBy,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
    status: model.status === null ? null : model.status,
    isNew: model.isNew === null ? null : model.isNew,
    approvalStatus: model.approvalStatus === null ? null : model.approvalStatus,
    salesHistory: model.salesHistory.length == 0 ? {} : model.salesHistory[0],
  };
};

export const selectCustomerSetting: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataNoName!,
  _selectCustomerSetting
);

//Selector Named Account
const _selectNameAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableNameRows(models.rows),
  };
};

const _createTableNameRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableNameRow(model));
};

const _mappingObjectTableNameRow = (model: any): any => {
  return {
    customerID: model.customerID === null ? null : model.customerID,
    jdeCustomerID: model.jdeCustomerID === null ? null : model.jdeCustomerID,
    customerGenID: model.customerGenID === null ? null : model.customerGenID,
    industryClass: model.industryClass === null ? null : model.industryClass,
    industryClassID:
      model.industryClassID === null ? null : model.industryClassID,
    industryClassBusiness:
      model.industryClassBusiness === null ? null : model.industryClassBusiness,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    named: model.named === "" ? null : model.named,
    salesShareableID: model.salesShareableID,
    shareable: model.shareable === null ? null : model.shareable,
    blacklist: model.blacklist === null ? null : model.blacklist,
    requestedBy: model.requestedBy === null ? "" : model.requestedBy,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
    status: model.status === null ? null : model.status,
    isNew: model.isNew === null ? null : model.isNew,
    approvalStatus: model.approvalStatus === null ? null : model.approvalStatus,
    salesHistory: model.salesHistory.length == 0 ? {} : model.salesHistory[0],
  };
};

export const selectNameAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataNamed!,
  _selectNameAccount
);

//Selector Shareable Account
const _selectShareableAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableShareableRows(models.rows),
  };
};

const _createTableShareableRows = (models: any[]): any[] => {
  return models.map((model: any): any =>
    _mappingObjectTableShareableRow(model)
  );
};

const _mappingObjectTableShareableRow = (model: any): any => {
  return {
    customerID: model.customerID === null ? null : model.customerID,
    jdeCustomerID: model.jdeCustomerID === null ? null : model.jdeCustomerID,
    customerGenID: model.customerGenID === null ? null : model.customerGenID,
    industryClass: model.industryClass === null ? null : model.industryClass,
    industryClassID:
      model.industryClassID === null ? null : model.industryClassID,
    industryClassBusiness:
      model.industryClassBusiness === null ? null : model.industryClassBusiness,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    named: model.named === "" ? null : model.named,
    salesShareableID: model.salesShareableID,
    shareable: model.shareable === null ? null : model.shareable,
    blacklist: model.blacklist === null ? null : model.blacklist,
    requestedBy: model.requestedBy === null ? "" : model.requestedBy,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
    status: model.status === null ? null : model.status,
    isNew: model.isNew === null ? null : model.isNew,
    approvalStatus: model.approvalStatus === null ? null : model.approvalStatus,
    salesHistory: model.salesHistory.length == 0 ? {} : model.salesHistory[0],
  };
};

export const selectShareableAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataShareable!,
  _selectShareableAccount
);

//Selector All Account
const _selectAllAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableAllRows(models.rows),
  };
};

const _createTableAllRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableAllRow(model));
};

const _mappingObjectTableAllRow = (model: any): any => {
  return {
    customerID: model.customerID === null ? null : model.customerID,
    jdeCustomerID: model.jdeCustomerID === null ? null : model.jdeCustomerID,
    customerGenID: model.customerGenID === null ? null : model.customerGenID,
    industryClass: model.industryClass === null ? null : model.industryClass,
    industryClassID:
      model.industryClassID === null ? null : model.industryClassID,
    industryClassBusiness:
      model.industryClassBusiness === null ? null : model.industryClassBusiness,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    named: model.named === "" ? null : model.named,
    salesShareableID: model.salesShareableID,
    shareable: model.shareable === null ? null : model.shareable,
    blacklist: model.blacklist === null ? null : model.blacklist,
    requestedBy: model.requestedBy === null ? "" : model.requestedBy,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
    status: model.status === null ? null : model.status,
    isNew: model.isNew === null ? null : model.isNew,
    approvalStatus: model.approvalStatus === null ? null : model.approvalStatus,
    salesHistory: model.salesHistory.length == 0 ? {} : model.salesHistory[0],
  };
};

export const selectAllAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataAll!,
  _selectAllAccount
);

const _selectCustomerSettingById = (model: CustomerSettingById): any => {
  return {
    customerID: model.customerID,
    salesID: model.salesID,
    modifyUserID: model.salesID,
  };
};

export const selectCustomerSettingByCustomerId: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerSetting.dataByCustomerId,
  _selectCustomerSettingById
);

const _selectCustomerSettingOptions = (
  models: any[]
): ICustomerSettingOptions[] => {
  return models.map(
    (model: any): ICustomerSettingOptions => ({
      text: model.customerName,
      value: {
        customerName: model.customerName,
        customerID: model.customerID,
        blacklist: model.blacklist,
        holdshipment: model.holdshipment,
        avgAR: 0,
        customerAddress: model.customerAddress,
      },
    })
  );
};

export const selectCustomerSettingOptions: Selector<
  IStore,
  ICustomerSettingOptions[]
> = createSelector(
  (state: IStore) => state.customerSetting.dataAll.rows,
  _selectCustomerSettingOptions
);

const _selectPostResponseCustomerSetting = (model: ResultActions): any => {
  return {
    customerSettingID: model.resultObj.customerSettingID,
    customerID: model.resultObj.customerID,
    customerCategoryID: model.resultObj.customerCategoryID,
    shareable: model.resultObj.shareable,
    pmoCustomer: model.resultObj.pmoCustomer,
    createdBy: model.resultObj.createdBy,
    createdDate: model.resultObj.createdDate,
    modifiedBy: model.resultObj.modifiedBy,
    modifiedDate: model.resultObj.modifiedDate,
  };
};

export const selectPostResponseCustomerSetting: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerSetting.resultActions,
  _selectPostResponseCustomerSetting
);

export const _selectCustomerDataById = (model: ResultActions): any => {
  if (Object.keys(model.resultObj).length != 0) {
    let lastIndex =
      model.resultObj.shareableApprovalStatus.length != 0
        ? model.resultObj.shareableApprovalStatus.length - 1
        : 0;
    return {
      accountStatus: model.resultObj.accountStatus,
      customerID: model.resultObj.customerID,
      jdeCustomerID: model.resultObj.jdeCustomerID,
      customerGenID: model.resultObj.customerGenID,
      industryClassID: model.resultObj.industryClassID,
      industryClass: model.resultObj.industryClass,
      industryClassBusiness: model.resultObj.industryClassBusiness,
      customerCategory: model.resultObj.customerCategory,
      customerName: model.resultObj.customerName,
      customerAddress: model.resultObj.customerAddress,
      pmoCustomer:
        model.resultObj.pmoCustomer?.toUpperCase() == "TRUE" ? true : false,
      blacklist: model.resultObj.blacklist,
      holdshipment: model.resultObj.holdshipment,
      avgAR: model.resultObj.avgAR,
      salesName: model.resultObj.salesName,
      capFlag: model.resultObj.capFlag,
      shareableApprovalStatus:
        model.resultObj.shareableApprovalStatus.length != 0
          ? {
              status: model.resultObj.shareableApprovalStatus[lastIndex].status,
              description:
                model.resultObj.shareableApprovalStatus[lastIndex].description,
              requestedBy:
                model.resultObj.shareableApprovalStatus[lastIndex].requestedBy,
              requestedUserID:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .requestedUserID,
              requestedUserKey:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .requestedUserKey,
              requestedDirectorate:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .requestedDirectorate,
              requestedDate:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .requestedDate,
              approvedDirectorateBy:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .approvedDirectorateBy,
              directorateApprovedDate:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .directorateApprovedDate,
              approvedAdminBy:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .approvedAdminBy,
              adminApprovedDate:
                model.resultObj.shareableApprovalStatus[lastIndex]
                  .adminApprovedDate,
              rejectedDate:
                model.resultObj.shareableApprovalStatus[lastIndex].rejectedDate,
              rejectedBy:
                model.resultObj.shareableApprovalStatus[lastIndex].rejectedBy,
            }
          : [],
    };
  } else {
    return {};
  }
};

export const selectCustomerDataById: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.customerDataById,
  _selectCustomerDataById
);

export const _selectSearchCustomerByName = (model: ResultActions): any => {
  if (Object.keys(model.resultObj).length != 0) {
    return model.resultObj.map((model: any): any => ({
      key: model.customerID,
      title: model.customerName,
      customerID: model.customerID,
      customerAddress: model.customerAddress,
      blacklist: model.blacklist,
      holdshipment: model.holdshipment,
      avgAR: model.avgAR,
    }));
  } else {
    return [];
  }
};

export const selectSearchCustomerByName: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.searchCustomerByName,
  _selectSearchCustomerByName
);
