

import ConfigItemListBySerialNumber from './models/ConfigItemListBySerialNumber';
import ConfigItemPutETAByPMOModel from './models/ConfigItemPutETAByPMOModel';
import CIBySerialReqBodyModel from './models/CIBySerialReqBodyModel';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ConfigItemHeaderModel from './models/ConfigItemHeaderModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import * as ConfigItemsEffects from './ConfigItemsEffects'
import { ReduxDispatch } from '../../models/ReduxProps';
import ConfigTypeModel from './models/ConfigTypeModel';
import ConfigItemList from './models/ConfigItemList';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';

type ActionUnion =
  | HttpErrorResponseModel
  | ResultActions
  | undefined
  | boolean
  | boolean
  | any
  | ConfigItemHeaderModel
  | ConfigItemListBySerialNumber
  | ConfigItemList
  | ConfigTypeModel[]


export const CONFIG_ITEMS_HEADER: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_HEADER';
export const CONFIG_ITEMS_HEADER_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_HEADER_FINISHED';
export const reqConfigItemsHeader = (projectID:number,funnelGenID:number): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
  await ActionUtility.createThunkEffect<ConfigItemHeaderModel>(
    dispatch,
    CONFIG_ITEMS_HEADER,
    ConfigItemsEffects.reqConfigItemsHeader,
    projectID,
    funnelGenID
  );
};
};

export const CONFIG_ITEMS_LIST: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST';
export const CONFIG_ITEMS_LIST_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_FINISHED';
export const reqConfigItemsList = (page:number, pageSize:number, column:string, sorting:string, userLoginID:number): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_ITEMS_LIST,
      ConfigItemsEffects.reqConfigItemsList,
      page,
      pageSize,
      column,
      sorting,
      userLoginID,
    );
  };
};

export const CONFIG_ITEMS_LIST_SEARCH: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_SEARCH';
export const CONFIG_ITEMS_LIST_SEARCH_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_SEARCH_FINISHED';

export const CONFIG_ITEMS_LIST_SEARCH_ALL: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_SEARCH_ALL';
export const CONFIG_ITEMS_LIST_SEARCH_ALL_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_SEARCH_ALL_FINISHED';
export const reqConfigItemsListSearch = (page:number, pageSize:number, column:string, sorting:string, search:string, userLoginID:number, type:string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      type === "ALL" ? CONFIG_ITEMS_LIST_SEARCH_ALL : CONFIG_ITEMS_LIST_SEARCH,
      ConfigItemsEffects.reqConfigItemsListSearch,
      page,
      pageSize,
      column,
      sorting,
      search,
      userLoginID,
    );
  };
};

export const CONFIG_ITEMS_LIST_FILTER: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_FILTER';
export const CONFIG_ITEMS_LIST_FILTER_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_FILTER_FINISHED';

export const CONFIG_ITEMS_LIST_FILTER_ALL: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_FILTER_ALL';
export const CONFIG_ITEMS_LIST_FILTER_ALL_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_FILTER_ALL_FINISHED';
export const reqConfigItemsListFilter = (data: any, type: string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      type === "ALL" ? CONFIG_ITEMS_LIST_FILTER_ALL : CONFIG_ITEMS_LIST_FILTER,
      ConfigItemsEffects.reqConfigItemsListFilter,
      data
    );
  };
};

export const CONFIG_ITEMS_LIST_ALL: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_ALL';
export const CONFIG_ITEMS_LIST_ALL_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_LIST_ALL_FINISHED';
export const reqConfigItemsListAll = (page:number, pageSize:number, column:string, sorting:string, userLoginID:number): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_ITEMS_LIST_ALL,
      ConfigItemsEffects.reqConfigItemsListAll,
      page,
      pageSize,
      column,
      sorting,
      userLoginID,
    );
  };
};

export const CONFIG_ITEMS_DROPDOWN_VENDOR: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_VENDOR';
export const CONFIG_ITEMS_DROPDOWN_VENDOR_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_VENDOR_FINISHED';

export const CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE';
export const CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE_FINISHED';

export const CONFIG_ITEMS_DROPDOWN_CUSTOMER: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_CUSTOMER';
export const CONFIG_ITEMS_DROPDOWN_CUSTOMER_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_CUSTOMER_FINISHED';

export const CONFIG_ITEMS_DROPDOWN_DEPARTMENT: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_DEPARTMENT';
export const CONFIG_ITEMS_DROPDOWN_DEPARTMENT_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_ITEMS_DROPDOWN_DEPARTMENT_FINISHED';

export const reqConfigItemsDropdown = (userLoginID:number, type:string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigTypeModel[]>(
      dispatch,
      type === "Vendor" ? CONFIG_ITEMS_DROPDOWN_VENDOR : type === "VendorType" ? CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE : type === "Customer" ?CONFIG_ITEMS_DROPDOWN_CUSTOMER : CONFIG_ITEMS_DROPDOWN_DEPARTMENT,
      ConfigItemsEffects.reqConfigItemsDropdown,
      userLoginID,
      type
    );
  };
};

export const CONFIG_PROJECT_PO: string = 'ConfigItemsActions.REQUEST_CONFIG_PROJECT_PO';
export const CONFIG_PROJECT_PO_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_PROJECT_PO_FINISHED';
export const reqConfigItemsProjectPO = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_PROJECT_PO,
      ConfigItemsEffects.reqConfigItemsProjectPO,
      page,
      pageSize,
      column,
      sorting,
      userLoginId,
      projectID,
      funnelGenID
    );
  };
};

export const CONFIG_PROJECT_PO_SEARCH: string = 'ConfigItemsActions.REQUEST_CONFIG_PROJECT_PO_SEARCH';
export const CONFIG_PROJECT_PO_SEARCH_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_PROJECT_PO_SEARCH_FINISHED';
export const reqConfigItemsProjectPOSearch = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, search:string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_PROJECT_PO_SEARCH,
      ConfigItemsEffects.reqConfigItemsProjectPOSearch,
      page,
      pageSize,
      column,
      sorting,
      userLoginId,
      projectID,
      funnelGenID,
      search
    );
  };
};
  
  export const PUT_PROJECT_PO: string = 'ConfigItemsActions.REQUEST_PUT_PROJECT_PO';
  export const PUT_PROJECT_PO_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_PROJECT_PO_FINISHED';

  export const PUT_PROJECT_PO_REMARK: string = 'ConfigItemsActions.REQUEST_PUT_PROJECT_PO_REMARK';
  export const PUT_PROJECT_PO_REMARK_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_PROJECT_PO_REMARK_FINISHED';
  export const reqPutProjectPO = (op: string, data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        op !== "remark" ? PUT_PROJECT_PO : PUT_PROJECT_PO_REMARK,
        ConfigItemsEffects.reqPutProjectPO,
        op,
        data
      );
    };
  };

export const CONFIG_PRODUCT: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT';
export const CONFIG_PRODUCT_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT_FINISHED';
export const reqConfigItemsProduct = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, PONumber: string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_PRODUCT,
      ConfigItemsEffects.reqConfigItemsProduct,
      page,
      pageSize,
      column,
      sorting,
      userLoginId,
      projectID,
      funnelGenID,
      PONumber
    );
  };
};

export const CONFIG_PRODUCT_SEARCH: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT_SEARCH';
export const CONFIG_PRODUCT_SEARCH_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT_SEARCH_FINISHED';
export const reqConfigItemsProductSearch = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, PONumber: string, search: string): any => {
return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ConfigItemList>(
      dispatch,
      CONFIG_PRODUCT_SEARCH,
      ConfigItemsEffects.reqConfigItemsProductSearch,
      page,
      pageSize,
      column,
      sorting,
      userLoginId,
      projectID,
      funnelGenID,
      PONumber,
      search
      );
    };
  };
  
  export const PUT_ARRIVAL_DATE_PN: string = 'ConfigItemsActions.REQUEST_PUT_ARRIVAL_DATE_PN';
  export const PUT_ARRIVAL_DATE_PN_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_ARRIVAL_DATE_PN_FINISHED';
  export const reqPutArrivalDatePN = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_ARRIVAL_DATE_PN,
        ConfigItemsEffects.reqPutArrivalDatePN,
        data
      );
    };
  };
  
  export const PUT_ETA_BY_PMO: string = 'ConfigItemsActions.REQUEST_PUT_ETA_BY_PMO';
  export const PUT_ETA_BY_PMO_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_ETA_BY_PMO_FINISHED';
  export const reqPutEtaBYPmo = (data: ConfigItemPutETAByPMOModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_ETA_BY_PMO,
        ConfigItemsEffects.reqPutEtaBYPmo,
        data
      );
    };
  };

  export const CONFIG_PRODUCT_DETAIL: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT_DETAIL';
  export const CONFIG_PRODUCT_DETAIL_FINISHED: string = 'ConfigItemsActions.REQUEST_CONFIG_PRODUCT_DETAIL_FINISHED';
  export const reqConfigItemsProductDetail = (page: number, pageSize: number, column: string, sorting: string, userLoginId: number, projectID: number, funnelGenID: number, productNumber:string, doNumber:string, serialNumber: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ConfigItemList>(
        dispatch,
        CONFIG_PRODUCT_DETAIL,
        ConfigItemsEffects.reqConfigItemsProductDetail,
        page,
        pageSize,
        column,
        sorting,
        userLoginId,
        projectID,
        funnelGenID,
        productNumber,
        doNumber,
        serialNumber
      );
    };
  };
  
  export const PUT_PRODUCT_DETAIL: string = 'ConfigItemsActions.REQUEST_PUT_PRODUCT_DETAIL';
  export const PUT_PRODUCT_DETAIL_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_PRODUCT_DETAIL_FINISHED';
  export const reqPutDetailProduct = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_PRODUCT_DETAIL,
        ConfigItemsEffects.reqPutDetailProduct,
        data
      );
    };
  };
  
  
  export const PUT_NOTE_BY: string = 'ConfigItemsActions.REQUEST_PUT_NOTE_BY';
  export const PUT_NOTE_BY_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_NOTE_BY_FINISHED';
  export const reqPutNoteBy = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_NOTE_BY,
        ConfigItemsEffects.reqPutNoteBy,
        data
      );
    };
  };
  
  export const PUT_START_WARRANTY: string = 'ConfigItemsActions.REQUEST_PUT_START_WARRANTY';
  export const PUT_START_WARRANTY_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_START_WARRANTY_FINISHED';
  export const putStartWarrantyByID = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_START_WARRANTY,
        ConfigItemsEffects.putStartWarrantyByID,
        data
      );
    };
  };
  
  export const PUT_END_WARRANTY: string = 'ConfigItemsActions.REQUEST_PUT_END_WARRANTY';
  export const PUT_END_WARRANTY_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_END_WARRANTY_FINISHED';
  export const putEndWarrantyByID = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_END_WARRANTY,
        ConfigItemsEffects.putEndWarrantyByID,
        data
      );
    };
  };
  
  export const PUT_BULK_SERIAL_NUMBER: string = 'ConfigItemsActions.REQUEST_PUT_BULK_SERIAL_NUMBER';
  export const PUT_BULK_SERIAL_NUMBER_FINISHED: string = 'ConfigItemsActions.REQUEST_PUT_BULK_SERIAL_NUMBER_FINISHED';
  export const reqPutBulkSerialNumber = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        PUT_BULK_SERIAL_NUMBER,
        ConfigItemsEffects.reqPutBulkSerialNumber,
        data
      );
    };
  };
  
  export const GET_SEARCH_SERIAL_NUMBER: string = 'ConfigItemsActions.REQUEST_GET_SEARCH_SERIAL_NUMBER';
  export const GET_SEARCH_SERIAL_NUMBER_FINISHED: string = 'ConfigItemsActions.REQUEST_GET_SEARCH_SERIAL_NUMBER_FINISHED';
  export const getSearchSerialNumber = (search: string, projectId: number, funnelGenId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ConfigTypeModel[]>(
        dispatch,
        GET_SEARCH_SERIAL_NUMBER,
        ConfigItemsEffects.getSearchSerialNumber,
        search,
        projectId,
        funnelGenId
      );
    };
  };
  
  export const GET_LIST_BY_SN: string = 'ConfigItemsActions.REQUEST_GET_LIST_BY_SN';
  export const GET_LIST_BY_SN_FINISHED: string = 'ConfigItemsActions.REQUEST_GET_LIST_BY_SN_FINISHED';
  export const getListBySerialNumber = (data: CIBySerialReqBodyModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ConfigItemListBySerialNumber>(
        dispatch,
        GET_LIST_BY_SN,
        ConfigItemsEffects.getListBySerialNumber,
        data
      );
    };
  };


export const RESET_CI_BY_SN_AND_VAL_SEARCH_SN: string = 'ConfigItemsActions.RESET_CI_BY_SN_AND_VAL_SEARCH_SN';
export const clearDataBy = (by:"radioChange"): IAction<any> => {
  return ActionUtility.createAction(RESET_CI_BY_SN_AND_VAL_SEARCH_SN);
};

export const SEARCH_PRODUCT: string = 'ConfigItemsActions.SEARCH_PRODUCT';
export const onSearchProduct = (text: string): IAction<any> => {
  return ActionUtility.createAction(SEARCH_PRODUCT, text);
};

export const SELECT_PROJECT_PO: string = 'ConfigItemsActions.SELECT_PROJECT_PO';
export const selectProjectPo = (poNumber: string): IAction<any> => {
  return ActionUtility.createAction(SELECT_PROJECT_PO, poNumber);
};
  
export const SELECT_PRODUCT: string = 'ConfigItemsActions.SELECT_PRODUCT';
export const selectProduct = (productNumber:string, doNumber:string): IAction<any> => {
  return ActionUtility.createAction(SELECT_PRODUCT, {productNumber, doNumber});
};

export const EXPORT_EXCEL_LIST_CONFIG: string = 'ConfigItemsActions.EXPORT_EXCEL_LIST_CONFIG';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(EXPORT_EXCEL_LIST_CONFIG, isExport);
};

export const SET_PAGE_LIST_CONFIG: string = 'ConfigItemsActions.SET_PAGE_LIST_CONFIG';
export const setActivePageListConf = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE_LIST_CONFIG, activePage);
};

export const SET_PAGE_LIST_PRODUCT: string = 'ConfigItemsActions.SET_PAGE_LIST_PRODUCT';
export const setActivePageProduct = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE_LIST_PRODUCT, activePage);
};

export const SET_PAGE_LIST_PRODUCT_DETAIL: string = 'ConfigItemsActions.SET_PAGE_LIST_PRODUCT_DETAIL';
export const setActivePageProductDetail = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE_LIST_PRODUCT_DETAIL, activePage);
};

export const REMOVE_RESULT: string = 'ConfigItemsActions.REMOVE_RESULT';
export const removeResult = (): IAction<number> => {
  return ActionUtility.createAction(REMOVE_RESULT);
};