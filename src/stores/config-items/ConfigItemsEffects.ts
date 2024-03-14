import ConfigItemListBySerialNumber from './models/ConfigItemListBySerialNumber';
import ConfigItemPutETAByPMOModel from './models/ConfigItemPutETAByPMOModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import CIBySerialReqBodyModel from './models/CIBySerialReqBodyModel';
import ConfigItemHeaderModel from './models/ConfigItemHeaderModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import ConfigTypeModel from './models/ConfigTypeModel';
import ConfigItemList from './models/ConfigItemList';
import ResultActions from 'models/ResultActions';
import environment from 'environment';



export const reqConfigItemsHeader = async (projectID:number,funnelGenID:number): Promise<ConfigItemHeaderModel | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/Header?projectID=${projectID}&funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemHeaderModel>(ConfigItemHeaderModel, endpoint);
};

export const reqConfigItemsList = async (page:number, pageSize:number, column:string, sorting:string, userLoginID:number): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/Dashboard?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqConfigItemsListSearch = async (page:number, pageSize:number, column:string, sorting:string, search:string, userLoginID:number): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/Search?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqConfigItemsListFilter = async (data: any): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/FilterSearch`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ConfigItemList>(ConfigItemList, endpoint, data);
};

export const reqConfigItemsListAll = async (page:number, pageSize:number, column:string, sorting:string, userLoginID:number): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/Dashboard?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqConfigItemsDropdown = async (userLoginID:number, type:string): Promise<ConfigTypeModel[] | HttpErrorResponseModel> => {
  let controllerName: string
  if(type === "Vendor"){
    controllerName = `ConfigItem/DropdownVendor?userLoginID=${userLoginID}`;
  }else if(type === "VendorType"){
    controllerName = `ConfigItem/DropdownVendorType?userLoginID=${userLoginID}`;
  }else if(type === "Customer"){
    controllerName = `ConfigItem/DropdownCustomer?userLoginID=${userLoginID}`;
  }else{
    controllerName = `ConfigItem/DropdownDepartment?userLoginID=${userLoginID}`;
    
  }
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigTypeModel[]>(ConfigTypeModel, endpoint);
};

export const reqConfigItemsProjectPO = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/ProjectPO?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginId}&projectID=${projectID}&funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqConfigItemsProjectPOSearch = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, search: string): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/ProjectPOSearch?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginId}&projectID=${projectID}&funnelGenID=${funnelGenID}&search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
}

export const reqPutProjectPO = async (op: string, data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  let controllerName: string
  if(op !== "remark"){
     controllerName = `ConfigItem/UpdateExpectedArrivalDate`;
    }else{
    controllerName = `ConfigItem/UpdatePMORemark`;
  }

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqConfigItemsProduct = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, PONumber: string): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/Product?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginId}&projectID=${projectID}&funnelGenID=${funnelGenID}&PONumber=${PONumber}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqConfigItemsProductSearch = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, PONumber: string, search: string): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/ProductSearch?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginId}&projectID=${projectID}&funnelGenID=${funnelGenID}&PONumber=${PONumber}&search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
}

export const reqPutArrivalDatePN = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateExpectedArrivalDateByPN`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqPutEtaBYPmo = async (data: ConfigItemPutETAByPMOModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateExpectedArrivalAndWarrantyDate`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqConfigItemsProductDetail = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, productNumber:string, doNumber:string, serialNumber: string): Promise<ConfigItemList | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/ProductDetail?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLoginID=${userLoginId}&projectID=${projectID}&funnelGenID=${funnelGenID}&productNumber=${productNumber}&doNumber=${doNumber}&serialNumber=${serialNumber}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigItemList>(ConfigItemList, endpoint);
};

export const reqPutDetailProduct = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateSerialNumber`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqPutNoteBy = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateNoteByID`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putStartWarrantyByID = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateStartWarrantyByID`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putEndWarrantyByID = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateEndWarrantyByID`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqPutBulkSerialNumber = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/UpdateBulkSerialNumber`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const getSearchSerialNumber = async (search: string, projectId: number, funnelGenId: number): Promise<ConfigTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/SearchSerialNumber?search=${search}&projectId=${projectId}&funnelGenId=${funnelGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ConfigTypeModel[]>(ConfigTypeModel, endpoint);
};

export const getListBySerialNumber = async (data: CIBySerialReqBodyModel): Promise<ConfigItemListBySerialNumber | HttpErrorResponseModel> => {
  const controllerName = `ConfigItem/ListBySerialNumber`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ConfigItemListBySerialNumber>(ConfigItemListBySerialNumber, endpoint, data);
};

