import * as AWSBillingEffects from './AWSBillingEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResultActions from 'models/ResultActions';
import AWSBillingEnvelope from './models/AWSBillingEnvelope';
import AWSBillingByIdModel from './models/AWSBillingByIdModel';
import DropDownSearchCBVModel from './models/DropDownSearchCBVModel';
import DropDownSearchLPRModel from './models/DropDownSearchLPRModel';
import DropDownPICModel from './models/DropDownPICModel';
import VoucherAmountPICNameModel from './models/VoucherAmountPICNameModel';
import UsageDetailDashboardEnvelope from './models/UsageDetailDashhboard/UsageDetailDashboardEnvelope';
import BillingDetailPerProductEnvelope from './models/Aws_Billing_Detail_Perproduct/BillingDetailPerProductEnvelope';
import NeccessityModel from './models/NeccesityModel';
import AWSBillingModel from './models/AWSBillingModel';
import FilterAWSBillingModel from './models/FilterAWSBillingModel';
import AWSBillingInsertUsageDetail from './models/AWSBillingInsertUsageDetail';
import AWSBillingHPermission from './models/AWSBillingPermission';
import DropDownSearchSOModel from './models/DropDownSearchSOModel';
import AWSAmountUnsettleModel from './models/AWSAmountUnsettleModel';
import AWSBillingPeriodModel from './models/AWSBillingPeriodModel';
import DropDownModel from './models/DropDownModel';
// import CBVCreditBillingModels from './models/CBVCreditBillingModels';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | AWSBillingEnvelope
  | AWSBillingByIdModel
  | DropDownSearchCBVModel
  | DropDownSearchLPRModel
  | DropDownSearchSOModel
  | DropDownPICModel
  | DropDownModel
  | VoucherAmountPICNameModel
  | UsageDetailDashboardEnvelope
  | BillingDetailPerProductEnvelope
  | NeccessityModel
  | FilterAWSBillingModel
  | AWSBillingHPermission
  | AWSBillingPeriodModel
  | ResultActions;

export const REQUEST_AWS_BILLING: string = 'AWSBillingActions.REQUEST_AWS_BILLING';
export const REQUEST_AWS_BILLING_FINISHED: string = 'AWSBillingActions.REQUEST_AWS_BILLING_FINISHED';

export const requestAWSBillings = (userLoginID: number, text: string, sorting: string, column: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSBillingEnvelope>(
      dispatch,
      REQUEST_AWS_BILLING,
      AWSBillingEffects.requestAWSBillings,
      userLoginID,
      text,
      sorting,
      column,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_AWS_BILLING_BY_ID: string = 'AWSBillingActions.REQUEST_AWS_BILLING_BY_ID';
export const REQUEST_AWS_BILLING_BY_ID_FINISHED: string = 'AWSBillingActions.REQUEST_AWS_BILLING_BY_ID_FINISHED';

export const requestAWSBillingById = (ID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSBillingByIdModel>(
      dispatch,
      REQUEST_AWS_BILLING_BY_ID,
      AWSBillingEffects.requestAWSBillingById,
      ID,
    );
  };
};

export const REQUEST_INSERT_USAGE_DETAIL: string = 'AWSBillingActions.REQUEST_INSERT_USAGE_DETAIL';
export const REQUEST_INSERT_USAGE_DETAIL_FINISHED: string = 'AWSBillingActions.REQUEST_INSERT_USAGE_DETAIL_FINISHED';

export const InsertUsageDetail = (data: AWSBillingInsertUsageDetail): any => {
  // console.log('dataattachment',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_INSERT_USAGE_DETAIL, AWSBillingEffects.InsertUsageDetail, data);
  };
};

export const REQUEST_DROPDOWN_SEARCH_CBV: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_CBV';
export const REQUEST_DROPDOWN_SEARCH_CBV_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_CBV_FINISHED';

export const DropDownSearchCBV = (userLoginID: number, text: string, funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownSearchCBVModel>(
      dispatch,
      REQUEST_DROPDOWN_SEARCH_CBV,
      AWSBillingEffects.DropDownSearchCBV,
      userLoginID,
      text,
      funnelGenID
    );
  };
};

export const REQUEST_DROPDOWN_SEARCH_LPR: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_LPR';
export const REQUEST_DROPDOWN_SEARCH_LPR_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_LPR_FINISHED';

export const DropDownSearchLPR = (userLoginID: number, text: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownSearchLPRModel>(
      dispatch,
      REQUEST_DROPDOWN_SEARCH_LPR,
      AWSBillingEffects.DropDownSearchLPR,
      userLoginID,
      text
    );
  };
};

export const REQUEST_DROPDOWN_PIC: string = 'AWSBillingActions.REQUEST_DROPDOWN_PIC';
export const REQUEST_DROPDOWN_PIC_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_PIC_FINISHED';

export const DropDownPIC = (userLoginID:number, VoucherNo: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownPICModel>(
      dispatch,
      REQUEST_DROPDOWN_PIC,
      AWSBillingEffects.DropDownPIC,
      userLoginID,
      VoucherNo,
    );
  };
};

export const REQUEST_DROPDOWN_CUSTOMER_NAME_AWS: string = 'AWSBillingActions.REQUEST_DROPDOWN_CUSTOMER_NAME_AWS';
export const REQUEST_DROPDOWN_CUSTOMER_NAME_AWS_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_CUSTOMER_NAME_AWS_FINISHED';

export const DropDownCustomerNameAWS = (userLoginID:number, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownModel>(
      dispatch,
      REQUEST_DROPDOWN_CUSTOMER_NAME_AWS,
      AWSBillingEffects.DropDownCustomerNameAWS,
      userLoginID,
      search,
    );
  };
};

export const REQUEST_DROPDOWN_DEPT_AWS: string = 'AWSBillingActions.REQUEST_DROPDOWN_DEPT_AWS';
export const REQUEST_DROPDOWN_DEPT_AWS_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_DEPT_AWS_FINISHED';

export const DropDownDeptAWS = (userLoginID:number, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownModel>(
      dispatch,
      REQUEST_DROPDOWN_DEPT_AWS,
      AWSBillingEffects.DropDownDeptAWS,
      userLoginID,
      search,
    );
  };
};

export const REQUEST_DROPDOWN_PIC_AWS: string = 'AWSBillingActions.REQUEST_DROPDOWN_PIC_AWS';
export const REQUEST_DROPDOWN_PIC_AWS_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_PIC_AWS_FINISHED';

export const DropDownPicAWS = (userLoginID:number, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownModel>(
      dispatch,
      REQUEST_DROPDOWN_PIC_AWS,
      AWSBillingEffects.DropDownPicAWS,
      userLoginID,
      search,
    );
  };
};

export const REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME: string = 'AWSBillingActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME';
export const REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED: string = 'AWSBillingActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED';

export const GetDetailVoucherAmount = (VoucherNo: string, salesId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<VoucherAmountPICNameModel>(
      dispatch,
      REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME,
      AWSBillingEffects.GetDetailVoucherAmount,
      VoucherNo,
      salesId,
    );
  };
};

export const REQUEST_USAGE_DASHBOARD: string = 'AWSBillingActions.REQUEST_USAGE_DASHBOARD';
export const REQUEST_USAGE_DASHBOARD_FINISHED: string = 'AWSBillingActions.REQUEST_USAGE_DASHBOARD_FINISHED';

export const requestUsageDashboard = (BillingIdH: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<UsageDetailDashboardEnvelope>(
      dispatch,
      REQUEST_USAGE_DASHBOARD,
      AWSBillingEffects.requestUsageDashboard,
      BillingIdH,
      page,
      pageSize
    );
  };
};

export const REQUEST_GET_AMOUNT_UNSETTLE_ORDERING: string = 'AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_ORDERING';
export const REQUEST_GET_AMOUNT_UNSETTLE_ORDERING_FINISHED: string = 'AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_ORDERING_FINISHED';

export const requestAmountUnsettleOrdering = (billingPeriod: string, salesId: number, currency: string, createDate: string, customerGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSAmountUnsettleModel>(
      dispatch,
      REQUEST_GET_AMOUNT_UNSETTLE_ORDERING,
      AWSBillingEffects.requestAmountUnsettleOrdering,
      billingPeriod,
      salesId,
      currency, 
      createDate,
      customerGenID
    );
  };
};

export const REQUEST_GET_AMOUNT_UNSETTLE_SELLING: string = 'AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_SELLING';
export const REQUEST_GET_AMOUNT_UNSETTLE_SELLING_FINISHED: string = 'AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_SELLING_FINISHED';

export const requestAmountUnsettleSelling = (billingPeriod: string, salesId: number, currency: string, createDate: string, customerGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSAmountUnsettleModel>(
      dispatch,
      REQUEST_GET_AMOUNT_UNSETTLE_SELLING,
      AWSBillingEffects.requestAmountUnsettleSelling,
      billingPeriod,
      salesId,
      currency, 
      createDate,
      customerGenID
    );
  };
};

export const REQUEST_GET_BILLING_PERIOD: string = 'AWSBillingActions.REQUEST_GET_BILLING_PERIOD';
export const REQUEST_GET_BILLING_PERIOD_FINISHED: string = 'AWSBillingActions.REQUEST_GET_BILLING_PERIOD_FINISHED';

export const requestBillingPeriod = (currentDate: string, salesId: number, customerGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSBillingPeriodModel>(
      dispatch,
      REQUEST_GET_BILLING_PERIOD,
      AWSBillingEffects.requestBillingPeriod,
      currentDate,
      salesId,
      customerGenID
    );
  };
};

export const REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT: string = 'AWSBillingActions.REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT';
export const REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT_FINISHED: string = 'AWSBillingActions.REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT_FINISHED';

export const requestDashboardUsagePerproduct = (BillingIdH: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BillingDetailPerProductEnvelope>(
      dispatch,
      REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT,
      AWSBillingEffects.requestDashboardUsagePerproduct,
      BillingIdH,
    );
  };
};

export const REQUEST_UPDATE_ACCOUNT_ID: string = 'AWSBillingActions.REQUEST_UPDATE_ACCOUNT_ID';
export const REQUEST_UPDATE_ACCOUNT_ID_FINISHED: string = 'AWSBillingActions.REQUEST_UPDATE_ACCOUNT_ID_FINISHED';

export const UpdateAccountID = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_ACCOUNT_ID,
      AWSBillingEffects.UpdateAccountID,
      data,
    );
  };
};

//Get Neccesity
export const REQUEST_NECCESITY: string = 'AWSBillingActions.REQUEST_NECCESITY';
export const REQUEST_NECCESITY_FINISHED: string = 'AWSBillingActions.REQUEST_NECCESITY_FINISHED';

export const requestNeccesity = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<NeccessityModel>(dispatch, REQUEST_NECCESITY, AWSBillingEffects.requestNeccesity);
  };
};

export const REQUEST_AWS_BILLING_PERMISSION: string = 'AWSBillingActions.REQUEST_AWS_BILLING_PERMISSION';
export const REQUEST_AWS_BILLING_PERMISSION_FINISHED: string = 'AWSBillingActions.REQUEST_AWS_BILLING_PERMISSION_FINISHED';

export const requestAWSBillingPermission = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSBillingHPermission>(dispatch, REQUEST_AWS_BILLING_PERMISSION, AWSBillingEffects.requestAWSBillingPermission);
  };
};

export const REQUEST_FILTER_AWS_BILLING: string = 'AWSBillingActions.REQUEST_FILTER_AWS_BILLING';
export const REQUEST_FILTER_AWS_BILLING_FINISHED: string = 'AWSBillingActions.REQUEST_FILTER_AWS_BILLING_FINISHED';

export const RequestFilterAWSBilling = (data: FilterAWSBillingModel): any => {
  // console.log('dataattachment',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSBillingEnvelope>(dispatch, REQUEST_FILTER_AWS_BILLING, AWSBillingEffects.RequestFilterAWSBilling, data);
  };
};

export const REMOVE_SUBMIT_RESULT: string = 'AWSBillingActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'AWSBillingActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, AWSBillingEffects.removeResult);
  };
};

export const REQUEST_DROPDOWN_SEARCH_SO: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_SO';
export const REQUEST_DROPDOWN_SEARCH_SO_FINISHED: string = 'AWSBillingActions.REQUEST_DROPDOWN_SEARCH_SO_FINISHED';

export const DropDownSearchSO = (userLoginID: number, text: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownSearchSOModel>(
      dispatch,
      REQUEST_DROPDOWN_SEARCH_SO,
      AWSBillingEffects.DropDownSearchSO,
      userLoginID,
      text,
    );
  };
};