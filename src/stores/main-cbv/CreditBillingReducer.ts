import ICreditBillingState from './models/ICreditBillingState';
import * as CreditBillingActions from './CreditBillingActions';
import IAction from '../../models/IAction';
//import SoftwareModel from './models/SoftwareModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import CreditBillingEnvelope from './models/CreditBillingEnvelope';
import ResultActions from 'models/ResultActions';
import CreditBillingModel from './models/CreditBillingModel';
import SearchProjectNameModel from './models/SearchProjectNameModel';
import CBVAttachmentModel from './models/CBVAttachmentModel';
import CBVAssignModel from './models/CBVAssignModel';
import CBVDetail from './models/CBVDetail';
import CBVCreditByIDModel from './models/CBVCreditByIDModel';
import CBVUsageDetailEnvelope from './models/Detail_Usage_CBV/CBVUsageDetailEnvelope';
import CBVDocTypeModel from './models/CBVDocTypeModel';
import DropDownBillingPeriodModel from './models/DropDownBillingPeriodModel';
import CBVTypeVoucherModel from './models/CBVTypeVoucherModel';
import CBVEntitlementModel from './models/CBVEntitlementModel';
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareTypeModel from './models/SoftwareTypeModel';
//import SoftwareMainModel from './models/SoftwareMainModel';
//import SoftwareHeaderModel from './models/SoftwareHeaderModel';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareSearchModel from './models/SoftwareSearchModel';

export const initialState: ICreditBillingState = {
  listData: new CreditBillingEnvelope({}),
  cbvusagedetailData: new CBVUsageDetailEnvelope({}),
  CBVAttachment: [],
  CBVAssign: [],
  projectName: [],
  CBVDetail: [],
  CBVGetById: new CBVCreditByIDModel({}),
  CBVCreditEntitlement: new CBVEntitlementModel({}),
  CBVDocType: [],
  DropDownBilling: [],
  dataVoucherType: [],
  error: false,
  refreshPage: false,
  refreshPageSubmit: false,
  resultActions: new ResultActions({}),
  fileDownload: new Blob,
};

const creditBillingReducer: Reducer = baseReducer(initialState, {
  [CreditBillingActions.REQUEST_CREDIT_BILLINGS_FINISHED](state: ICreditBillingState, action: IAction<CreditBillingEnvelope>): ICreditBillingState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.POST_CREDIT_BILLINGS_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPageSubmit: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_PROJECT_NAME_FINISHED](state: ICreditBillingState, action: IAction<SearchProjectNameModel[]>): ICreditBillingState {
    return {
      ...state,
      projectName: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_POST_ATTACHMENT_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_ATTACHMENT_BILLING_FINISHED](state: ICreditBillingState, action: IAction<CBVAttachmentModel[]>): ICreditBillingState {
    return {
      ...state,
      CBVAttachment: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_POST_ASSIGN_CBV_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    // console.log('reducer',action)
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_ASSIGN_CBV_FINISHED](state: ICreditBillingState, action: IAction<CBVAssignModel[]>): ICreditBillingState {
    return {
      ...state,
      CBVAssign: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.DEL_CREDIT_BILLINGS_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_DELETE_DETAIL_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REMOVE_SUBMIT_RESULT](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [CreditBillingActions.REQUEST_DETAIL_CBV_FINISHED](state: ICreditBillingState, action: IAction<CBVDetail[]>): ICreditBillingState {
    return {
      ...state,
      CBVDetail: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_CBV_CREDIT_ID_FINISHED](state: ICreditBillingState, action: IAction<CBVCreditByIDModel>): ICreditBillingState {
    return {
      ...state,
      CBVGetById: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_UPDATE_ASSIGN_CBV_FINISHED](state:ICreditBillingState,
    action:IAction<ResultActions>):ICreditBillingState{
    return {
      ...state,
      resultActions: action.payload!,
      error:action.error!,
      refreshPage:(action.error) ? false : true    
    }
  },

  [CreditBillingActions.UPDATE_CREDIT_BILLING_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_DETAIL_USAGE_CBV_FINISHED](state: ICreditBillingState, action: IAction<CBVUsageDetailEnvelope>): ICreditBillingState {
    return {
      ...state,
      cbvusagedetailData: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_CBV_DOCTYPE_FINISHED](state: ICreditBillingState, action: IAction<CBVDocTypeModel[]>): ICreditBillingState {
    return {
      ...state,
      CBVDocType: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_DROPDOWN_BILLING_PERIODE_FINISHED](state: ICreditBillingState, action: IAction<DropDownBillingPeriodModel[]>): ICreditBillingState {
    return {
      ...state,
      DropDownBilling: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  [CreditBillingActions.REQUEST_FILTER_MAIN_CBV_FINISHED](state: ICreditBillingState, action: IAction<CreditBillingEnvelope>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      listData: action.payload!,
    };
  },

  [CreditBillingActions.DEL_ATTACHMENT_BILLING_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CreditBillingActions.REMOVE_SUBMIT_RESULT_FINISHED](state: ICreditBillingState, action: IAction<ResultActions>): ICreditBillingState {
    const clearResult = new ResultActions({})
    return {
    ...state,
    error: action.error!,
    refreshPage: action.error ? false : true,
    resultActions: clearResult!,
    };
  },

  [CreditBillingActions.REQUEST_CBVTYPEVOUCHER_FINISHED](state: ICreditBillingState, action: IAction<CBVTypeVoucherModel[]>): ICreditBillingState {
    return {
      ...state,
      dataVoucherType: action.payload!,
    };
  },

  [CreditBillingActions.REQUEST_ENTITLEMENT_FINISHED](state: ICreditBillingState, action: IAction<CBVEntitlementModel>): ICreditBillingState {
    return {
      ...state,
      CBVCreditEntitlement: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },

  // [CreditBillingActions.REQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED](state:ICreditBillingState, action:IAction<any>): ICreditBillingState{
  //   return {
  //     ...state,
  //     fileDownload:action.payload!,
  //     error:false,
  //     refreshPage:false
  //   }

  // }, 

});

export default creditBillingReducer;
