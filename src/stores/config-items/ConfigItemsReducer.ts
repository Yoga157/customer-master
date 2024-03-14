import { Reducer } from "redux";

import ConfigItemListBySerialNumber from "./models/ConfigItemListBySerialNumber";
import ConfigItemHeaderModel from "./models/ConfigItemHeaderModel";
import IConfigItemsState from "./models/IConfigItemsState";
import * as ConfigItemsActions from "./ConfigItemsActions"
import ConfigTypeModel from "./models/ConfigTypeModel";
import ConfigItemList from "./models/ConfigItemList";
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IAction from "models/IAction";

export const initialState: IConfigItemsState = {
  refreshPage: false,
  error: false,
  activePage: 1,
  serialNumber: '',
  activePageProduct: 1,
  activePageProductDetail: 1,
  selectProjPO: null,
  selectProduct: null,
  isExportExcelConfigList: false,
  resSearchSN: [],
  selectVendor: [],
  selectCustomer: [],
  selectDepartment: [],
  selectVendorType: [],
  configListBySN: new ConfigItemListBySerialNumber({}),
  listDataProductDetail: new ConfigItemList({}),
  configHeader: new ConfigItemHeaderModel({}),
  listDataProjectPO: new ConfigItemList({}),
  listDataProduct: new ConfigItemList({}),
  resultAction: new ResultActions({}),
  listDataAll: new ConfigItemList({}),
  listData: new ConfigItemList({}),
};

const ConfigItemsReducer: Reducer = baseReducer(initialState, {

  [ConfigItemsActions.CONFIG_ITEMS_HEADER_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemHeaderModel>): IConfigItemsState {
    return {
      ...state, 
      configHeader: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_SEARCH_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_VENDOR_FINISHED](state: IConfigItemsState, action: IAction<ConfigTypeModel[]>): IConfigItemsState {
    return {
      ...state, 
      selectVendor: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_VENDOR_TYPE_FINISHED](state: IConfigItemsState, action: IAction<ConfigTypeModel[]>): IConfigItemsState {
    return {
      ...state, 
      selectVendorType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_CUSTOMER_FINISHED](state: IConfigItemsState, action: IAction<ConfigTypeModel[]>): IConfigItemsState {
    return {
      ...state, 
      selectCustomer: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_DROPDOWN_DEPARTMENT_FINISHED](state: IConfigItemsState, action: IAction<ConfigTypeModel[]>): IConfigItemsState {
    return {
      ...state, 
      selectDepartment: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_FILTER_FINISHED](state: IConfigItemsState, action: IAction<any>): IConfigItemsState {
    if(action.payload.errorNumber === "666"){
      return {
        ...state, 
          resultAction: action.payload!,
          listData: {...action.payload!,filter:true},
          error: action.error!,
          refreshPage: false
      }
    }
    return {
      ...state, 
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_ALL_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataAll: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_SEARCH_ALL_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataAll: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_ITEMS_LIST_FILTER_ALL_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataAll: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_PROJECT_PO_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataProjectPO: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [ConfigItemsActions.CONFIG_PROJECT_PO_SEARCH_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataProjectPO: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

    [ConfigItemsActions.PUT_PROJECT_PO_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    // [ConfigItemsActions.PUT_PROJECT_PO_REMARK_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
    //   return {
    //     ...state, 
    //     resultAction: action.payload!,
    //     error: action.error!,
    //     refreshPage: action.error ? false : true,
    //   };
    // },
  
    [ConfigItemsActions.PUT_NOTE_BY_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.PUT_START_WARRANTY_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.PUT_END_WARRANTY_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },

  [ConfigItemsActions.CONFIG_PRODUCT_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataProduct: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  
  [ConfigItemsActions.CONFIG_PRODUCT_SEARCH_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
    return {
      ...state, 
      listDataProduct: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  
    [ConfigItemsActions.PUT_ARRIVAL_DATE_PN_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.PUT_ETA_BY_PMO_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.CONFIG_PRODUCT_DETAIL_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemList>): IConfigItemsState {
      return {
        ...state, 
        listDataProductDetail: action.payload!,
        error: action.error!,
        refreshPage: false,
      };
    },
  
    [ConfigItemsActions.PUT_PRODUCT_DETAIL_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.PUT_BULK_SERIAL_NUMBER_FINISHED](state: IConfigItemsState, action: IAction<ResultActions>): IConfigItemsState {
      return {
        ...state, 
        resultAction: action.payload!,
        error: action.error!,
        refreshPage: action.error ? false : true,
      };
    },
  
    [ConfigItemsActions.GET_SEARCH_SERIAL_NUMBER_FINISHED](state: IConfigItemsState, action: IAction<ConfigTypeModel[]>): IConfigItemsState {
      return {
        ...state, 
        resSearchSN: action.payload!,
        error: action.error!,
        refreshPage: false ,
      };
    },
  
    [ConfigItemsActions.GET_LIST_BY_SN_FINISHED](state: IConfigItemsState, action: IAction<ConfigItemListBySerialNumber>): IConfigItemsState {
      return {
        ...state, 
        configListBySN: action.payload!,
        error: action.error!,
        refreshPage: false 
      };
    },
  
    [ConfigItemsActions.RESET_CI_BY_SN_AND_VAL_SEARCH_SN](state: IConfigItemsState, action: IAction<any>): IConfigItemsState {
      return {
        ...state, 
        configListBySN: new ConfigItemListBySerialNumber({}),
      };
    },

    [ConfigItemsActions.SEARCH_PRODUCT](state: IConfigItemsState, action: IAction<string>): IConfigItemsState {
    return {
      ...state,
      serialNumber: action.payload!,   
    };
  },

    [ConfigItemsActions.SELECT_PROJECT_PO](state: IConfigItemsState, action: IAction<any>): IConfigItemsState {
    return {
      ...state,
      resSearchSN: [],
      selectProjPO: action.payload!,   
    };
  },

    [ConfigItemsActions.SELECT_PRODUCT](state: IConfigItemsState, action: IAction<any>): IConfigItemsState {
    return {
      ...state,
      selectProduct: action.payload!,   
    };
  },

    [ConfigItemsActions.EXPORT_EXCEL_LIST_CONFIG](state: IConfigItemsState, action: IAction<boolean>): IConfigItemsState {
    return {
      ...state,
      isExportExcelConfigList: action.payload!,   
    };
  },

  [ConfigItemsActions.SET_PAGE_LIST_CONFIG](state: IConfigItemsState, action: IAction<number>): IConfigItemsState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },

  [ConfigItemsActions.SET_PAGE_LIST_PRODUCT](state: IConfigItemsState, action: IAction<number>): IConfigItemsState {
    return {
      ...state,
      activePageProduct: action.payload!,   
    };
  },

  [ConfigItemsActions.SET_PAGE_LIST_PRODUCT_DETAIL](state: IConfigItemsState, action: IAction<number>): IConfigItemsState {
    return {
      ...state,
      activePageProductDetail: action.payload!,   
    };
  },

  [ConfigItemsActions.REMOVE_RESULT](state: IConfigItemsState, action: IAction<number>): IConfigItemsState {
    return {
      ...state,
      resultAction: new ResultActions({}),   
      refreshPage: false,
    };
  },
  
});

export default ConfigItemsReducer;