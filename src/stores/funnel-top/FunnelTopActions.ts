import * as FunnelTopEffects from './FunnelTopEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import FunnelTopModel from './models/FunnelTopModel';
import FunnelTopEnvelope from './models/FunnelTopEnvelope';
import FunnelTopItem from './models/FunnelTopItem';
import TopServiceModel from './models/TopServiceModel';
import TopServiceOfObjModel from './models/TopServiceOfObjModel';
import ProductDescModel from './models/ProductDescModel';
import ResultActions from 'models/ResultActions';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';
import IStore from 'models/IStore';
import SearchTopNumberModel from './models/SearchTopNumberModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | boolean
  | TopServiceModel
  | TopServiceOfObjModel
  | FunnelTopModel
  | FunnelTopEnvelope
  | ProductDescModel
  | SearchTopNumberModel
  | FunnelTopItem[]
  | FunnelHistoryEnvelope[];

export const REQUEST_FUNNEL_TOP: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP';
export const REQUEST_FUNNEL_TOP_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_FINISHED';

export const requestFunnelTop = (funnelGenID: number, page: number, pageSize: number | string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelTopEnvelope>(
      dispatch,
      REQUEST_FUNNEL_TOP,
      FunnelTopEffects.requestFunnelTop,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REQUEST_FUNNEL_TOP_ALL: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_ALL';
export const REQUEST_FUNNEL_TOP_ALL_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_ALL_FINISHED';

export const requestFunnelTopAll = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    const page = 1;
    const pageSize = '';
    await ActionUtility.createThunkEffect<FunnelTopEnvelope>(
      dispatch,
      REQUEST_FUNNEL_TOP_ALL,
      FunnelTopEffects.requestFunnelTop,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REQUEST_POST_FUNNEL_TOP: string = 'FunnelTopActions.REQUEST_POST_FUNNEL_TOP';
export const REQUEST_POST_FUNNEL_TOP_FINISHED: string = 'FunnelTopActions.REQUEST_POST_FUNNEL_TOP_FINISHED';

export const postFunnelTop = (data: TopServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_FUNNEL_TOP, FunnelTopEffects.postFunnelTop, data);
  };
};

export const REQUEST_PUT_FUNNEL_TOP: string = 'FunnelTopActions.REQUEST_PUT_FUNNEL_TOP';
export const REQUEST_PUT_FUNNEL_TOP_FINISHED: string = 'FunnelTopActions.REQUEST_PUT_FUNNEL_TOP_FINISHED';

export const requestPutFunnelTop = (data: TopServiceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_FUNNEL_TOP, FunnelTopEffects.requestPutFunnelTop, data);
  };
};

export const DEL_FUNNEL_TOP: string = 'FunnelTopActions.REQUEST_DEL_FUNNEL_TOP';
export const DEL_FUNNEL_TOP_FINISHED = 'FunnelTopActions.REQUEST_DEL_FUNNEL_TOP_FINISHED';
export const delFunnelTop = (funnelTopId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TopServiceModel>(dispatch, DEL_FUNNEL_TOP, FunnelTopEffects.delFunnelTop, funnelTopId);
  };
};

export const REQUEST_FUNNEL_TOP_BY_ID: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_BY_ID';
export const REQUEST_FUNNEL_TOP_BY_ID_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_BY_ID_FINISHED';

export const requestFunnelTopById = (funnelTopID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TopServiceOfObjModel>(
      dispatch,
      REQUEST_FUNNEL_TOP_BY_ID,
      FunnelTopEffects.requestFunnelTopById,
      funnelTopID
    );
  };
};

export const REQUEST_FUNNEL_TOP_ITEM: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_ITEM';
export const REQUEST_FUNNEL_TOP_ITEM_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_ITEM_FINISHED';

export const requestTopItem = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelTopItem[]>(dispatch, REQUEST_FUNNEL_TOP_ITEM, FunnelTopEffects.requestTopItem);
  };
};

export const REQUEST_FUNNEL_TOP_SUPPORT_DOC: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_SUPPORT_DOC';
export const REQUEST_FUNNEL_TOP_SUPPORT_DOC_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_SUPPORT_DOC_FINISHED';

export const requestSupportingDocument = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelTopItem[]>(dispatch, REQUEST_FUNNEL_TOP_SUPPORT_DOC, FunnelTopEffects.requestSupportingDocument);
  };
};

export const REQUEST_FUNNEL_TOP_TYPE: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_TYPE';
export const REQUEST_FUNNEL_TOP_TYPE_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_TYPE_FINISHED';

export const requestTopType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelTopItem[]>(dispatch, REQUEST_FUNNEL_TOP_TYPE, FunnelTopEffects.requestTopType);
  };
};

export const REQUEST_SET_PAGE: string = 'FunnelTopActions.REQUEST_SET_PAGE';
export const REQUEST_SET_PAGE_FINISHED: string = 'FunnelTopActions.REQUEST_SET_PAGE_FINISHED';

export const requestSetPage = (page: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<any>(dispatch, REQUEST_SET_PAGE, FunnelTopEffects.requestSetPage, page);
  };
};

//Dropdown Product Desc
export const REQUEST_DROPDOWN_PRODUCT_DESC: string = 'FunnelTopActions.REQUEST_DROPDOWN_PRODUCT_DESC';
export const REQUEST_DROPDOWN_PRODUCT_DESC_FINISHED: string = 'FunnelTopActions.REQUEST_DROPDOWN_PRODUCT_DESC_FINISHED';

export const requestDropdownProductDesc = (duration: number, durationType: string, type: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ProductDescModel>(
      dispatch,
      REQUEST_DROPDOWN_PRODUCT_DESC,
      FunnelTopEffects.requestDropdownProductDesc,
      duration,
      durationType,
      type
    );
  };
};

export const SEARCH_TOP_NUMBER: string = 'FunnelTopActions.REQUEST_SEARCH_TOP_NUMBER';
export const SEARCH_TOP_NUMBER_FINISHED: string = 'FunnelTopActions.REQUEST_SEARCH_TOP_NUMBER_FINISHED';
export const searchTOPNumber = (funnelGenID: number, searchText: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SearchTopNumberModel>(
      dispatch,
      SEARCH_TOP_NUMBER,
      FunnelTopEffects.searchTOPNumber,
      funnelGenID,
      searchText,
    );
  };
};

export const REQUEST_FUNNEL_TOP_HISTORY: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_HISTORY';
export const REQUEST_FUNNEL_TOP_HISTORY_FINISHED: string = 'FunnelTopActions.REQUEST_FUNNEL_TOP_HISTORY_FINISHED';

export const requestFunnelTopHistoryById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHistoryEnvelope[]>(
      dispatch,
      REQUEST_FUNNEL_TOP_HISTORY,
      FunnelTopEffects.requestFunnelTopHistoryById,
      funnelGenID
    );
  };
};
export const REQUEST_CLEAR_RESULT_GENERATE: string = 'FunnelTopActions.REQUEST_CLEAR_RESULT_GENERATE';
export const REQUEST_CLEAR_RESULT_GENERATE_FINISHED: string = 'FunnelTopActions.REQUEST_CLEAR_RESULT_GENERATE_FINISHED';

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_CLEAR_RESULT_GENERATE, FunnelTopEffects.clearResult);
  };
};
