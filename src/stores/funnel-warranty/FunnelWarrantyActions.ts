import * as FunnelWarrantyEffects from './FunnelWarrantyEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import FunnelWarrantySLADetailModel from './models/FunnelWarrantySLADetailModel';
import FunnelWarrantySLAModel from './models/FunnelWarrantySLAModel';
import FunnelWarrantySupportModel from './models/FunnelWarrantySupportModel';
import FunnelWarrantySLAsModel from './models/FunnelWarrantySLAsModel';
import FunnelWarrantySLADetailEnvelope from './models/FunnelWarrantySLADetailEnvelope';
import FunnelWarrantySLAEnvelope from './models/FunnelWarrantySLAEnvelope';
import ResultActions from 'models/ResultActions';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | FunnelWarrantySLADetailEnvelope
  | FunnelWarrantySLAEnvelope
  | FunnelWarrantySupportModel
  | ResultActions
  | FunnelWarrantySLADetailModel
  | FunnelWarrantySLAModel;

export const REQUEST_FUNNEL_WARRANTY_SLAS: string = 'FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_SLAS';
export const REQUEST_FUNNEL_WARRANTY_SLAS_FINISHED: string = 'FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_SLAS_FINISHED';

export const requestFunnelWarrantySLAs = (id: number, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLAEnvelope>(
      dispatch,
      REQUEST_FUNNEL_WARRANTY_SLAS,
      FunnelWarrantyEffects.requestFunnelWarrantySLAs,
      id,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_FUNNEL_WARRANTY_DETAILS: string = 'FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS';
export const REQUEST_FUNNEL_WARRANTY_DETAILS_FINISHED: string = 'FunnelWarrantyActions.REQUEST_FUNNEL_WARRANTY_DETAILS_FINISHED';

export const requestFunnelWarrantyDetails = (id: number, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailEnvelope>(
      dispatch,
      REQUEST_FUNNEL_WARRANTY_DETAILS,
      FunnelWarrantyEffects.requestFunnelWarrantyDetails,
      id,
      activePage,
      pageSize
    );
  };
};

export const POST_WARRANTY_SUPPORT: string = 'FunnelWarrantyActions.REQUEST_POST_WARRANTY_SUPPORT';
export const POST_WARRANTY_SUPPORT_FINISHED = 'FunnelWarrantyActions.REQUEST_POST_WARRANTY_SUPPORT_FINISHED';
export const postWarrantySupport = (data: FunnelWarrantySupportModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_WARRANTY_SUPPORT, FunnelWarrantyEffects.postWarrantySupport, data);
  };
};

export const REQUEST_WARRANTY_SUPPORT_BY_ID: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SUPPORT_BY_ID';
export const REQUEST_WARRANTY_SUPPORT_BY_ID_FINISHED: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SUPPORT_BY_ID_FINISHED';

export const requestWarrantySupportById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySupportModel>(
      dispatch,
      REQUEST_WARRANTY_SUPPORT_BY_ID,
      FunnelWarrantyEffects.requestWarrantySupportById,
      funnelGenID
    );
  };
};

export const REQUEST_WARRANTY_SLA_BY_ID: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_BY_ID';
export const REQUEST_WARRANTY_SLA_BY_ID_FINISHED: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_BY_ID_FINISHED';

export const requestWarrantySLAById = (slaGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLAModel>(
      dispatch,
      REQUEST_WARRANTY_SLA_BY_ID,
      FunnelWarrantyEffects.requestWarrantySLAById,
      slaGenID
    );
  };
};

export const REQUEST_WARRANTY_SLA_DETAIL_BY_ID: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_BY_ID';
export const REQUEST_WARRANTY_SLA_DETAIL_BY_ID_FINISHED: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_BY_ID_FINISHED';

export const requestWarrantySLADetailById = (slaDetailID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      REQUEST_WARRANTY_SLA_DETAIL_BY_ID,
      FunnelWarrantyEffects.requestWarrantySLADetailById,
      slaDetailID
    );
  };
};

export const REQUEST_WARRANTY_CUSTOMER_LOCAL: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_CUSTOMER_LOCAL';
export const REQUEST_WARRANTY_CUSTOMER_LOCAL_FINISHED: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_CUSTOMER_LOCAL_FINISHED';

export const requestWarrantyCustomerLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailEnvelope>(
      dispatch,
      REQUEST_WARRANTY_CUSTOMER_LOCAL,
      FunnelWarrantyEffects.requestWarrantyCustomerLocal
    );
  };
};

export const POST_WARRANTY_DETAIL_LOCAL: string = 'FunnelWarrantyActions.POST_WARRANTY_DETAIL_LOCAL';
export const POST_WARRANTY_DETAIL_LOCAL_FINISHED: string = 'FunnelWarrantyActions.POST_WARRANTY_DETAIL_LOCAL_FINISHED';

export const postWarrantyDetailLocal = (data: FunnelWarrantySLADetailModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      POST_WARRANTY_DETAIL_LOCAL,
      FunnelWarrantyEffects.postWarrantyDetailLocal,
      data
    );
  };
};

export const POST_WARRANTY_SLA: string = 'FunnelWarrantyActions.POST_WARRANTY_SLA';
export const POST_WARRANTY_SLA_FINISHED = 'FunnelWarrantyActions.POST_WARRANTY_SLA_FINISHED';
export const postWarrantySLA = (data: FunnelWarrantySLAsModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_WARRANTY_SLA, FunnelWarrantyEffects.postWarrantySLA, data);
  };
};

export const REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL: string = 'FunnelWarrantyActions.REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL';
export const REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL_FINISHED: string = 'FunnelWarrantyActions.REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL_FINISHED';
export const editWarrantySLADetailLocal = (data: FunnelWarrantySLADetailModel, id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      REQUEST_EDIT_WARRANTY_SLA_DETAIL_LOCAL,
      FunnelWarrantyEffects.editWarrantyDetailLocal,
      data,
      id
    );
  };
};

export const PUT_SLA_HEADER: string = 'FunnelWarrantyActions.REQUEST_PUT_SLA_HEADER';
export const PUT_SLA_HEADER_FINISHED = 'FunnelWarrantyActions.REQUEST_PUT_SLA_HEADER_FINISHED';
export const putSLAHeader = (data: FunnelWarrantySLAModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLAModel>(dispatch, PUT_SLA_HEADER, FunnelWarrantyEffects.putSLAHeader, data);
  };
};

export const PUT_SLA_CUSTOMER: string = 'FunnelWarrantyActions.REQUEST_PUT_SLA_CUSTOMER';
export const PUT_SLA_CUSTOMER_FINISHED = 'FunnelWarrantyActions.REQUEST_PUT_SLA_CUSTOMER_FINISHED';
export const putSLACustomer = (data: FunnelWarrantySLAModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLAModel>(dispatch, PUT_SLA_CUSTOMER, FunnelWarrantyEffects.putSLACustomer, data);
  };
};

export const PUT_SLA_VENDOR: string = 'FunnelWarrantyActions.REQUEST_PUT_SLA_VENDOR';
export const PUT_SLA_VENDOR_FINISHED = 'FunnelWarrantyActions.REQUEST_PUT_SLA_VENDOR_FINISHED';
export const putSLAVendor = (data: FunnelWarrantySLAModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLAModel>(dispatch, PUT_SLA_VENDOR, FunnelWarrantyEffects.putSLAVendor, data);
  };
};

export const POST_WARRANTY_SLA_DETAIL: string = 'FunnelWarrantyActions.REQUEST_POST_WARRANTY_SLA_DETAIL';
export const POST_WARRANTY_SLA_DETAIL_FINISHED = 'FunnelWarrantyActions.REQUEST_POST_WARRANTY_SLA_DETAIL_FINISHED';
export const postWarrantySLADetail = (data: FunnelWarrantySLADetailModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_WARRANTY_SLA_DETAIL, FunnelWarrantyEffects.postWarrantySLADetail, data);
  };
};

export const PUT_WARRANTY_SLA_DETAIL: string = 'FunnelWarrantyActions.REQUEST_PUT_WARRANTY_SLA_DETAIL';
export const PUT_WARRANTY_SLA_DETAIL_FINISHED = 'FunnelWarrantyActions.REQUEST_PUT_WARRANTY_SLA_DETAIL_FINISHED';
export const putWarrantySLADetail = (data: FunnelWarrantySLADetailModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      PUT_WARRANTY_SLA_DETAIL,
      FunnelWarrantyEffects.putWarrantySLADetail,
      data
    );
  };
};

export const DEL_WARRANTY_SLA_DETAIL: string = 'FunnelWarrantyActions.REQUEST_DEL_WARRANTY_SLA_DETAIL';
export const DEL_WARRANTY_SLA_DETAIL_FINISHED = 'FunnelWarrantyActions.REQUEST_DEL_WARRANTY_SLA_DETAIL_FINISHED';
export const delWarrantySLADetail = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      DEL_WARRANTY_SLA_DETAIL,
      FunnelWarrantyEffects.delWarrantySLADetail,
      id
    );
  };
};

export const REQUEST_WARRANTY_SLA_DETAIL_LOCAL: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_LOCAL';
export const REQUEST_WARRANTY_SLA_DETAIL_LOCAL_FINISHED: string = 'FunnelWarrantyActions.REQUEST_WARRANTY_SLA_DETAIL_LOCAL_FINISHED';

export const requestSLADetailLocal = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      REQUEST_WARRANTY_SLA_DETAIL_LOCAL,
      FunnelWarrantyEffects.requestSLADetailLocal,
      id
    );
  };
};

export const REQUEST_DELETE_WARRANTY_SLA_DETAIL_LOCAL: string = 'FunnelWarrantyActions.REQUEST_DELETE_WARRANTY_SLA_DETAIL_LOCAL';
export const REQUEST_DELETE_WARRANTY_SLA_DETAIL_LOCAL_FINISHED: string = 'FunnelWarrantyActions.REQUEST_DELETE_WARRANTY_SLA_DETAIL_LOCAL_FINISHED';
export const deleteWarrantyDetailLocal = (data: FunnelWarrantySLADetailModel, id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelWarrantySLADetailModel>(
      dispatch,
      REQUEST_DELETE_WARRANTY_SLA_DETAIL_LOCAL,
      FunnelWarrantyEffects.deleteWarrantyDetailLocal,
      data,
      id
    );
  };
};
