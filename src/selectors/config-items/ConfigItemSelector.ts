import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import moment from 'moment';

import ConfigItemListBySerialNumber, { CIListBySNRowsModel } from 'stores/config-items/models/ConfigItemListBySerialNumber';
import ConfigItemList, { ConfigItemRowsModel } from 'stores/config-items/models/ConfigItemList';
import IConfigItemsTable, { IConfigItemsTableRow } from './models/IConfigItemsTable';
import IOptionsDataString from 'selectors/select-options/models/IOptionsDataString';
import IConfigItemsBySerialNumber from './models/IConfigItemsBySerialNumber';
import ConfigTypeModel from 'stores/config-items/models/ConfigTypeModel';

const _selectConfigItems = (model: ConfigItemList): IConfigItemsTable => {
  return new ConfigItemList({
    totalRows: model.totalRows,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter,
    rows: model?.rows?.map((model: ConfigItemRowsModel): any => ({

      configItemGenID: model.configItemGenID,
      lpbNumber:model.lpbNumber,
      lpbDate: model.lpbDate ? new Date(model.lpbDate!) : '',
      doNumber:model.doNumber,
      doDate: model.doDate ? new Date(model.doDate!) : '',
      soNumber:model.soNumber,
      productDescription:model.productDescription,
      productNumber:model.productNumber,
      serialNumber:model.serialNumber,
      customerName: model.customerName,
      buNumber: model.buNumber,
      dept: model.dept,
      createDate: model.createDate,
      note: model.note,
    
      startWarranty: model.startWarranty ? new Date(model.startWarranty!) : '',
      endWarranty: model.endWarranty ? new Date(model.endWarranty!) : '',
      preventiveDate: model.preventiveDate ? new Date(model.preventiveDate!) : '',
      warrantyDuration: model.warrantyDuration ? model.warrantyDuration : '',
      preventiveSchedule: model.preventiveSchedule ? model.preventiveSchedule : '',


      poNumber: model.poNumber,
      poDate: model.poDate  ? new Date(model.poDate!) : '',
      poCloseDate: model.poCloseDate ? new Date(model.poCloseDate!) : '',
      poAdmin: model.poAdmin ,
      vendorName: model.vendorName ,
      vendorType: model.vendorType ,
      poStatus: model.poStatus ,
      eta: model.eta,
      expectedArrivalDate: model.expectedArrivalDate!,
      expectedDeliveryDate: model.expectedDeliveryDate ? new Date(model.expectedDeliveryDate!) : '',
      pmoRemark: model.pmoRemark,
      poRemark: model.poRemark,

    }    
    )) || [],
  })
};
export const selectConfigItems: Selector<IStore, IConfigItemsTable> = createSelector((state: IStore) => state.configItems.listData, _selectConfigItems);
export const selectConfigProjPO: Selector<IStore, IConfigItemsTable> = createSelector((state: IStore) => state.configItems.listDataProjectPO, _selectConfigItems);

const _selectConfigItemsAll = (model: ConfigItemList): IConfigItemsTable => {
  return new ConfigItemList({
    totalRows: model.totalRows,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter,
    rows: model?.rows?.map((model: ConfigItemRowsModel): any => ({

      lpbNumber:model.lpbNumber,
      lpbDate: model.lpbDate ? moment(model.lpbDate!).format('yyyy-MM-DD') : '',
      doNumber:model.doNumber,
      doDate: model.doDate ? moment(model.doDate!).format('yyyy-MM-DD') : '',
      soNumber:model.soNumber,
      productDescription:model.productDescription,
      productNumber:model.productNumber,
      serialNumber:model.serialNumber,
      customerName: model.customerName,
      buNumber: model.buNumber,
      dept: model.dept,
      createDate: model.createDate ? moment(model.createDate!).format('yyyy-MM-DD') : '',
      note: model.note,

      poNumber: model.poNumber,
      poDate: model.poDate  ? moment(model.poDate!).format('yyyy-MM-DD') : '',
      poCloseDate: model.poCloseDate ? moment(model.poCloseDate!).format('yyyy-MM-DD') : '',
      poAdmin: model.poAdmin ,
      vendorName: model.vendorName ,
      vendorType: model.vendorType ,
      poStatus: model.poStatus ,
      eta: model.eta,
      expectedDeliveryDate: model.expectedDeliveryDate ? moment(model.expectedDeliveryDate!).format('yyyy-MM-DD') : '',
      pmoRemark: model.pmoRemark,
      poRemark: model.poRemark,

    }    
    )) || [],
  })
};
export const selectConfigItemsAll: Selector<IStore, IConfigItemsTable> = createSelector((state: IStore) => state.configItems.listDataAll, _selectConfigItemsAll);


const _selectConfigProduct = (model: ConfigItemList): IConfigItemsTable => {
  return new ConfigItemList({
    totalRows: model.totalRows,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter,
    rows: model?.rows?.map((model: ConfigItemRowsModel): any => ({
      poNumber: model.poNumber,
      productNumber: model.productNumber,
      soNumber: model.soNumber,
      doNumber: model.doNumber,
      lpbNumber: model.lpbNumber,
      lpbDate: model.lpbDate ? new Date(model.lpbDate!) : '',
      eta: model.eta,
      expectedArrivalDate: model.expectedArrivalDate ? new Date(model.expectedArrivalDate!) : '',
      expectedDeliveryDate: model.expectedDeliveryDate ? new Date(model.expectedDeliveryDate!) : '',
      doDate: model.doDate ? new Date(model.doDate!) : '',
      productDescription: model.productDescription,
      brand: model.brand,
      quantityPO: model.quantityPO,
      serialNumberStatus: model.serialNumberStatus,

      startWarranty: model.startWarranty ? new Date(model.startWarranty!) : '',
      endWarranty: model.endWarranty ? new Date(model.endWarranty!) : '',
      preventiveDate: model.preventiveDate ? new Date(model.preventiveDate!) : '',
      warrantyDuration: model.warrantyDuration ? model.warrantyDuration : '',
      preventiveSchedule: model.preventiveSchedule ? model.preventiveSchedule : '',
    })) || [],
  })
};
export const selectConfigProduct: Selector<IStore, IConfigItemsTable> = createSelector((state: IStore) => state.configItems.listDataProduct, _selectConfigProduct);

const _selectConfigProductDetail = (model: ConfigItemList): IConfigItemsTable => {
  return new ConfigItemList({
    totalRows: model.totalRows,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter,
    rows: model?.rows?.map((model: ConfigItemRowsModel): any => ({
      poNumber: model.poNumber,
      productNumber: model.productNumber,
      serialNumber: model.serialNumber,
      productDescription: model.productDescription,
      configItemGenID: model.configItemGenID
    })) || [],
  })
};
export const selectConfigProductDetail: Selector<IStore, IConfigItemsTable> = createSelector((state: IStore) => state.configItems.listDataProductDetail, _selectConfigProductDetail);




  const _mappingFailedDataUpload = (model: any): any => {
    return {
      configItemGenID: model.configItemGenID,
      projectId: model.projectId,
      funnelGenId: model.funnelGenId,
      poNumber: model.poNumber,
      doNumber: model.doNumber,
      doDate: model.doDate,
      brand: model.brand,
      productNumber: model.productNumber,
      productDescription: model.productDescription,
      serialNumber: model.serialNumber,
      errorMessage: model?.errorMessage?.[0]
    };
  };

  export const selectFailedDataUpload = (models: any[]): any[] => {
    if (models.length > 0) {
      return models.map((model: any): any => _mappingFailedDataUpload(model));
    }
    return [];
  };


  
const _selectPtConfigDropdown = (models: ConfigTypeModel[]): IOptionsDataString[] => {
  return models.map(
    (model: ConfigTypeModel): IOptionsDataString => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectPtConfigDropdown: any = createSelector(
  (state: IStore,type:any) => 
  type === "Vendor" ? state.configItems.selectVendor : 
  type === "VendorType" ? state.configItems.selectVendorType : 
  type === "Customer" ? state.configItems.selectCustomer : state.configItems.selectDepartment,
  _selectPtConfigDropdown
  );


  
const _selectConfigBySerialNumber = (model: ConfigItemListBySerialNumber): IConfigItemsBySerialNumber => {
  return new ConfigItemListBySerialNumber({
    totalRows: model.totalRows,
    column: model.column,
    sorting: model.sorting,
    search: model.search,
    filter: model.filter,
    rows: model?.rows?.map((model: CIListBySNRowsModel): any => ({
        configItemGenID: model.configItemGenID ,
        poNumber: model.poNumber ,
        poDate: model.poDate ? new Date(model.poDate!) : "",
        vendorName: model.vendorName ,
        brand: model.brand ,
        productDescription: model.productDescription ,
        productNumber: model.productDescription ,
        serialNumber: model.serialNumber ,
        warranty: model.warranty ? new Date(model.warranty!) : "",
    })) || [],
  })
};
export const selectConfigBySerialNumber: Selector<IStore, IConfigItemsBySerialNumber> = createSelector((state: IStore) => state.configItems.configListBySN, _selectConfigBySerialNumber);



const _selectSearchSN = (models: ConfigTypeModel[]): any => {
  return models.map(
    (model: any): any => ({
      title: model.textData,
      price: String(model.valueData),
      // descriptions: model.employeeID.toString() + '##' + model.employeeName,
    })
  );
};

export const selectSearchSN: Selector<IStore, any> = createSelector(
  (state: IStore) => state.configItems.resSearchSN,
  _selectSearchSN
);


const _selectCustomerSetting = (models: any): any => {
  return {
    rows: _createTableRowsSetting(models.rows),
  };
};

const _createTableRowsSetting = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRowSetting(model));
};

const _mappingObjectTableRowSetting = (model: any): any => {
  return {
    customerSettingID:
      model.customerSettingID.toString() === "undefined"
        ? 0
        : model.customerSettingID,
    customerGenID: model.customerGenID === "" ? "" : model.customerGenID,
    customerCategory: model.customerGenID === "" ? "" : model.customerGenID,
    customerName: model.customerName === "" ? "" : model.customerName,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesAssign: model.salesAssign === "" ? "" : model.salesAssign,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    invoiceCondition:
      model.invoiceCondition === "" ? "" : model.invoiceCondition,
    shareable: model.shareable === "" ? "" : model.shareable,
    pmoCustomer: model.pmoCustomer === "" ? "" : model.pmoCustomer,
    blacklist: model.blacklist === "" ? "" : model.blacklist,
    holdshipment: model.holdshipment === "" ? "" : model.holdshipment,
    createUserID: model.createUserID === "" ? "" : model.createUserID,
    createDate: model.createDate === "" ? "" : model.createDate,
    modifyUserID: model.modifyUserID === "" ? "" : model.modifyUserID,
    modifyDate: model.modifyDate === "" ? "" : model.modifyDate,
  };
};

export const selectCustomerSetting: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.data!,
  _selectCustomerSetting
);