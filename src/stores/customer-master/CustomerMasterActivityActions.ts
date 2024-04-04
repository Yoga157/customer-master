import * as CustomerMasterEffect from "./CustomerMasterActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerMasterModel from "./models/CustomerMasterModel";
import CustomerMasterRow from "./models/CustomerMasterRow";
import CustomerMasterPostModel from "./models/CustomerMasterPostModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";
import PostStatusNewCustomerModel from "./models/PostStatusNewCustomerModel";
import PostPeopleInChargerModel from "./models/PostPeopleInChargerModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerMasterModel
  | CustomerMasterRow
  | CustomerMasterPostModel
  | PostPeopleInChargerModel
  | boolean
  | ResultActions;

export const REQUEST_CUSTOMERS_MASTER_SEARCH: string =
  "CustomerMasterActions.REQUEST_CUSTOMERS_MASTER_SEARCH";
export const REQUEST_CUSTOMERS_MASTER_SEARCH_FINISHED: string =
  "CustomerMasterActions.REQUEST_CUSTOMERS_MASTER_SEARCH_FINISHED";

export const requestSearchCustomerMaster = (
  page: number,
  pageSize: number,
  column: string,
  sorting?: string,
  titleCustomer?: string,
  customerName?: string,
  picName?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerMasterModel>(
      dispatch,
      REQUEST_CUSTOMERS_MASTER_SEARCH,
      CustomerMasterEffect.requestSearchCustomerMaster,
      page,
      pageSize,
      column,
      sorting,
      titleCustomer,
      customerName,
      picName
    );
  };
};

export const SET_PAGE: string = "CustomerMasterActions.SET_PAGE";
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const SET_TABS: string = "CustomerMasterActions.SET_TABS";
export const setActiveTabs = (activeTabs: number): IAction<number> => {
  return ActionUtility.createAction(SET_TABS, activeTabs);
};

export const SET_SUCCESS_MODAL: string =
  "CustomerMasterActions.SET_SUCCESS_MODAL";
export const setSuccessModal = (isSuccess: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_SUCCESS_MODAL, isSuccess);
};

export const CLEAR_RESULT_CM: string = "CustomerMasterActions.CLEAR_RESULT_CM";
export const clearResult = (): IAction<CustomerMasterModel> => {
  return ActionUtility.createAction(CLEAR_RESULT_CM);
};

export const POST_REQUEST_NEW_CUSTOMERS: string =
  "CustomerMasterActions.POST_REQUEST_NEW_CUSTOMERS";
export const POST_REQUEST_NEW_CUSTOMERS_FINISHED: string =
  "CustomerMasterActions.POST_REQUEST_NEW_CUSTOMERS_FINISHED";

export const postNewCustomerMaster = (data: CustomerMasterPostModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_REQUEST_NEW_CUSTOMERS,
      CustomerMasterEffect.postNewCustomerMaster,
      data
    );
  };
};

export const REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID: string =
  "CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID";
export const REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID_FINISHED: string =
  "CustomerMasterActions.REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID_FINISHED";

export const requestNewCustomerDetailByGenId = (genId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_NEW_CUSTOMER_DETAIL_BY_GEN_ID,
      CustomerMasterEffect.requestNewCustomerDetailByGenId,
      genId
    );
  };
};

export const PUT_STATUS_NEW_CUSTOMER: string =
  "CustomerActions.PUT_STATUS_NEW_CUSTOMER";
export const PUT_STATUS_NEW_CUSTOMER_FINISHED =
  "CustomerActions.PUT_STATUS_NEW_CUSTOMER_FINISHED";
export const updateStatusNewCustomer = (
  data: PostStatusNewCustomerModel
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      PUT_STATUS_NEW_CUSTOMER,
      CustomerMasterEffect.updateStatusNewCustomer,
      data
    );
  };
};

export const REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID: string =
  "CustomerMasterActions.REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID";
export const REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID_FINISHED: string =
  "CustomerMasterActions.REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID_FINISHED";

export const requestApprovedCustomerByGenId = (genId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_APPROVED_DATA_DETAIL_BY_GEN_ID,
      CustomerMasterEffect.requestApprovedCustomerByGenId,
      genId
    );
  };
};

export const REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID: string =
  "CustomerMasterActions.REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID";
export const REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID_FINISHED: string =
  "CustomerMasterActions.REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID_FINISHED";

export const requestCustomerMoreDetailsByCustId = (custId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_CUSTOMER_MORE_DETAILS_BY_CUST_ID,
      CustomerMasterEffect.requestCustomerMoreDetailsByCustId,
      custId
    );
  };
};

export const POST_PIC: string = "CustomerMasterActions.POST_PIC";
export const POST_PIC_FINISHED: string =
  "CustomerMasterActions.POST_PIC_FINISHED";

export const postPIC = (data: PostPeopleInChargerModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_PIC,
      CustomerMasterEffect.postPIC,
      data
    );
  };
};

export const PUT_PIC: string = "CustomerActions.PUT_PIC";
export const PUT_PIC_FINISHED = "CustomerActions.PUT_PIC_FINISHED";
export const updatePIC = (
  data: PostPeopleInChargerModel,
  custId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      PUT_PIC,
      CustomerMasterEffect.updatePIC,
      data,
      custId
    );
  };
};
