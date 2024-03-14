// import ICreditBillingState from './models/ICreditBillingState';
// import * as CreditBillingActions from './CreditBillingActions';
import * as AWSBillingActions from './AWSBillingActions';
import IAction from '../../models/IAction';
//import SoftwareModel from './models/SoftwareModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
// import CreditBillingEnvelope from './models/CreditBillingEnvelope';
import ResultActions from 'models/ResultActions';
import IAWSBillingState from './models/IAWSBillingState';
import AWSBillingEnvelope from './models/AWSBillingEnvelope';
import AWSBillingByIdModel from './models/AWSBillingByIdModel';
import DropDownSearchCBVModel from './models/DropDownSearchCBVModel';
import DropDownSearchLPRModel from './models/DropDownSearchLPRModel';
import DropDownPICModel from './models/DropDownPICModel';
import VoucherAmountPICNameModel from './models/VoucherAmountPICNameModel';
import UsageDetailDashboardEnvelope from './models/UsageDetailDashhboard/UsageDetailDashboardEnvelope';
import BillingDetailPerProductEnvelope from './models/Aws_Billing_Detail_Perproduct/BillingDetailPerProductEnvelope';
import NeccessityModel from './models/NeccesityModel';
import AWSBillingHPermission from './models/AWSBillingPermission';
import DropDownSearchSOModel from './models/DropDownSearchSOModel';
import AWSAmountUnsettleModel from './models/AWSAmountUnsettleModel';
import AWSBillingPeriodModel from './models/AWSBillingPeriodModel';
import DropDownModel from './models/DropDownModel';
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareTypeModel from './models/SoftwareTypeModel';
//import SoftwareMainModel from './models/SoftwareMainModel';
//import SoftwareHeaderModel from './models/SoftwareHeaderModel';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareSearchModel from './models/SoftwareSearchModel';

export const initialState: IAWSBillingState = {
  listData: new AWSBillingEnvelope({}),
  getDataById: new AWSBillingByIdModel({}),
  dropdownCbv: [],
  dropdownLpr: [],
  dropdownPIC: [],
  dropdownSo: [],
  dropdownCustomerNameAWS:[],
  dropdownDeptAWS:[],
  dropdownPicAWS: [],
  dataNeccesity: [],
  dataAwsBillingPermission:[],
  usageDetailDashboard: new UsageDetailDashboardEnvelope({}),
  VoucherAmount: new VoucherAmountPICNameModel({}),
  BillingDetailPerProduct: new BillingDetailPerProductEnvelope({}),
  AmountUnsettleOrdering: new AWSAmountUnsettleModel({}),
  AmountUnsettleSelling:  new AWSAmountUnsettleModel({}),
  BillingPeriod: new AWSBillingPeriodModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const AWSBillingReducer: Reducer = baseReducer(initialState, {
  [AWSBillingActions.REQUEST_AWS_BILLING_FINISHED](state: IAWSBillingState, action: IAction<AWSBillingEnvelope>): IAWSBillingState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_AWS_BILLING_BY_ID_FINISHED](state: IAWSBillingState, action: IAction<AWSBillingByIdModel>): IAWSBillingState {
    return {
      ...state,
      getDataById: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_INSERT_USAGE_DETAIL_FINISHED](state: IAWSBillingState, action: IAction<ResultActions>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_SEARCH_CBV_FINISHED](state: IAWSBillingState, action: IAction<DropDownSearchCBVModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownCbv: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_SEARCH_LPR_FINISHED](state: IAWSBillingState, action: IAction<DropDownSearchLPRModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownLpr: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_SEARCH_SO_FINISHED](state: IAWSBillingState, action: IAction<DropDownSearchSOModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownSo: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_PIC_FINISHED](state: IAWSBillingState, action: IAction<DropDownPICModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownPIC: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_CUSTOMER_NAME_AWS_FINISHED](state: IAWSBillingState, action: IAction<DropDownModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownCustomerNameAWS: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_DEPT_AWS_FINISHED](state: IAWSBillingState, action: IAction<DropDownModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownDeptAWS: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DROPDOWN_PIC_AWS_FINISHED](state: IAWSBillingState, action: IAction<DropDownModel[]>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      dropdownPicAWS: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },


  [AWSBillingActions.REQUEST_VOUCHER_AMOUNT_BY_PIC_NAME_FINISHED](state: IAWSBillingState, action: IAction<VoucherAmountPICNameModel>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      VoucherAmount: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_USAGE_DASHBOARD_FINISHED](state: IAWSBillingState, action: IAction<UsageDetailDashboardEnvelope>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      usageDetailDashboard: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_DASHBOARD_USAGE_DETAIL_PERPRODUCT_FINISHED](state: IAWSBillingState, action: IAction<BillingDetailPerProductEnvelope>): IAWSBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      BillingDetailPerProduct: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [AWSBillingActions.REQUEST_UPDATE_ACCOUNT_ID_FINISHED](state: IAWSBillingState, action: IAction<ResultActions>): IAWSBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_NECCESITY_FINISHED](state: IAWSBillingState, action: IAction<NeccessityModel[]>): IAWSBillingState {
    return {
      ...state,
      dataNeccesity: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_AWS_BILLING_PERMISSION_FINISHED](state: IAWSBillingState, action: IAction<AWSBillingHPermission[]>): IAWSBillingState {
    return {
      ...state,
      dataNeccesity: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_ORDERING_FINISHED](state: IAWSBillingState, action: IAction<AWSAmountUnsettleModel>): IAWSBillingState {
    return {
      ...state,
      AmountUnsettleOrdering: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_GET_AMOUNT_UNSETTLE_SELLING_FINISHED](state: IAWSBillingState, action: IAction<AWSAmountUnsettleModel>): IAWSBillingState {
    return {
      ...state,
      AmountUnsettleSelling: action.payload!,
    };
  },

  
  [AWSBillingActions.REQUEST_GET_BILLING_PERIOD_FINISHED](state: IAWSBillingState, action: IAction<AWSBillingPeriodModel>): IAWSBillingState {
    return {
      ...state,
      BillingPeriod: action.payload!,
    };
  },

  [AWSBillingActions.REQUEST_FILTER_AWS_BILLING_FINISHED](state: IAWSBillingState, action: IAction<AWSBillingEnvelope>): IAWSBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      listData: action.payload!,
    };
  },

  [AWSBillingActions.REMOVE_SUBMIT_RESULT_FINISHED](state: IAWSBillingState, action: IAction<ResultActions>): IAWSBillingState {
    const clearResult = new ResultActions({})
    return {
    ...state,
    error: action.error!,
    refreshPage: action.error ? false : true,
    resultActions: clearResult!,
    };
  },

//   [AWSCredentialActions.POST_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
//     return {
//       ...state,
//       error: action.error!,
//       refreshPage: action.error ? false : true,
//       resultActions: action.payload!,
//     };
//   },

//   [AWSCredentialActions.UPDATE_AWS_CREDENTIAL_FINISHED](state: IAWSCredentialState, action: IAction<ResultActions>): IAWSCredentialState {
//     return {
//       ...state,
//       error: action.error!,
//       refreshPage: action.error ? false : true,
//       resultActions: action.payload!,
//     };
//   },
});

export default AWSBillingReducer;
