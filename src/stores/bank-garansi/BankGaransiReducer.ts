import IBankGaransiState from './models/IBankGaransiState';
import * as BankGaransiActions from './BankGaransiActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import IAction from '../../models/IAction';
import BankGaransiModel from './models/BankGaransiModel';
import BankGaransiEditViewAdminModel from './models/BankGaransiEditViewAdminModel';
import BankGaransiEditViewRequesterModel from './models/BankGaransiEditViewRequesterModel';
import BankGaransiApproveModel from './models/BankGaransiApproveModel';
import FunnelSATableModel from './models/FunnelSATableModel';
import FunnelPOTableModel from './models/FunnelSATableModel';
import FunnelSALinkToModel from './models/FunnelSALinkToModel';
import BankGaransiEnvelope from './models/BankGaransiEnvelope';
import BankGaransiAdminEnvelope from './models/BankGaransiAdminEnvelope';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import BankRecommended from './models/BankRecommended';
import DropdownFunnelSAModel from './models/DropdownFunnelSAModel';
import FilterSearchModel from './models/FilterSearchModel';
import MasterInsuranceModel from './models/MasterInsuranceModel';
import AttachmentEnvelope from './models/AttachmentEnvelope';
import MasterInsuranceEnvelope from './models/MasterInsuranceEnvelope';
import MasterInsuranceUdcModel from './models/MasterInsuranceUdcModel';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';
import FunnelSARowModel from './models/FunnelSARowModel';
import FunnelPORowModel from './models/FunnelPORowModel';
import ResultActions from 'models/ResultActions';
import BankGaransiDashboardEnvelope from './models/BankGaransiDashboardEnvelope';
import BankGaransiActivityModel from './models/BankGaransiActivityModel';
import ExtendAttachmentModel from './models/ExtendAttachmentModel';
import AttachmentVersionEnvelope from './models/AttachmentVersionEnvelope';
import MaxAmountModel from './models/MaxAmountModel';
import CheckExpireModel from './models/CheckExpireModel';

export const initialState: IBankGaransiState = {
  activePage: 1,
  data: [],
  dropdownFunnelSA: [],
  customerBG: [],
  creatorBG: [],
  dataDivision: [],
  dataPrint: [],
  dataCompany: [],
  dataCompanyApplicant: [],
  dataBankCG: [],
  dataInsurance: new MasterInsuranceEnvelope({}),
  dataAttachment: new AttachmentEnvelope({}),
  firstData: new BankGaransiModel({}),
  firstDataInsurance: new MasterInsuranceUdcModel({}),
  firstDataAdmin: new BankGaransiEditViewAdminModel({}),
  requesterData: new BankGaransiEditViewRequesterModel({}),
  listData: new BankGaransiEnvelope({}),
  listSearch: new BankGaransiDashboardEnvelope({}),
  dataFunnelSA: new FunnelSATableModel({}),
  dataFunnelPO: new FunnelPOTableModel({}),
  dataLinkTo: new FunnelSALinkToModel({}),
  extendAttachment: new ExtendAttachmentModel({}),
  listExpiredData: new BankGaransiEnvelope({}),
  listDataAdmin: new BankGaransiAdminEnvelope({}),
  listExpiredDataAdmin: new BankGaransiDashboardEnvelope({}),
  bankRecomended: new BankRecommended({}),
  bankEstimated: new BankRecommended({}),
  error: false,
  refreshPage: false,
  refreshAdminPage: false,
  refreshRequesterPage: false,
  dataSearch: new FilterSearchModel({}),
  funnelSAObject: new FunnelSARowModel({}),
  funnelPOObject: new FunnelPORowModel({}),
  resultActions: new ResultActions({}),
  mandatoryAttach: new String({}),
  listHistory: [],
  attachmentVersion: new AttachmentVersionEnvelope({}),
  maxAmount: new MaxAmountModel({}),
  expired: new CheckExpireModel({}),
};

const bankGaransiReducer: Reducer = baseReducer(initialState, {
  [BankGaransiActions.REQUEST_MANDATORY_ATTACHMENT_FINISHED](state: IBankGaransiState, action: IAction<any>): IBankGaransiState {
    return {
      ...state,
      mandatoryAttach: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  //Attachment
  [BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER_FINISHED](state: IBankGaransiState, action: IAction<AttachmentEnvelope>): IBankGaransiState {
    return {
      ...state,
      dataAttachment: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  //Attachment Version
  [BankGaransiActions.REQUEST_ATTACHMENT_VERSIONS_FINISHED](state: IBankGaransiState, action: IAction<AttachmentVersionEnvelope>): IBankGaransiState {
    return {
      ...state,
      attachmentVersion: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [AttachmentActions.REQUEST_ATTACHMENT_LOCAL_FINISHED](state: IBankGaransiState, action: IAction<AttachmentEnvelope>): IBankGaransiState {
    return {
      ...state,
      dataAttachment: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  /* [AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL_FINISHED](state:IBankGaransiState, action:IAction<AttachmentEnvelope>): IBankGaransiState{
      return {
        ...state,
        error:false,
        refreshPage:(action.error) ? false : true   
      }

    }, */
  [BankGaransiActions.REQUEST_POST_ATTACHMENT_FINISHED](state: IBankGaransiState, action: IAction<ResultActions>): IBankGaransiState {
    return {
      ...state,
      //ResultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  //Update Requester
  [BankGaransiActions.REQUEST_PUT_BANK_GARANSI_REQUESTER_FINISHED](state: IBankGaransiState, action: IAction<ResultActions>): IBankGaransiState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshRequesterPage: action.error ? false : true,
    };
  },

  //Update Admin
  [BankGaransiActions.PUT_BANK_GARANSI_ADMIN_FINISHED](state: IBankGaransiState, action: IAction<ResultActions>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      resultActions: action.payload!,
      refreshAdminPage: action.error ? false : true,
    };
  },
  //Update Master Insurance
  [BankGaransiActions.PUT_MASTER_INSURANCE_FINISHED](state: IBankGaransiState, action: IAction<MasterInsuranceModel>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  //Edit View Requester
  [BankGaransiActions.REQUEST_BG_VIEWEDIT_REQUESTER_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiEditViewRequesterModel>
  ): IBankGaransiState {
    return {
      ...state,
      requesterData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  //Edit View Admin
  [BankGaransiActions.REQUEST_BG_VIEWEDIT_ADMIN_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiEditViewAdminModel>
  ): IBankGaransiState {
    return {
      ...state,
      firstDataAdmin: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  //Funnel Link To
  [BankGaransiActions.REQUEST_LINKTO_FUNNEL_SA_FINISHED](state: IBankGaransiState, action: IAction<FunnelSALinkToModel>): IBankGaransiState {
    return {
      ...state,
      dataLinkTo: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  //Service Extend Terbaru
  [BankGaransiActions.REQUEST_POST_RETURN_EXTEND_FINISHED](state: IBankGaransiState, action: IAction<ResultActions>): IBankGaransiState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [BankGaransiActions.INSERT_FUNNEL_SA_OBJECT_FINISHED](state: IBankGaransiState, action: IAction<any>): IBankGaransiState {
    return {
      ...state,
      funnelSAObject: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BankGaransiActions.INSERT_FUNNEL_PO_OBJECT_FINISHED](state: IBankGaransiState, action: IAction<any>): IBankGaransiState {
    return {
      ...state,
      funnelPOObject: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BankGaransiActions.REQUEST_DIVISION_FINISHED](state: IBankGaransiState, action: IAction<CompetitorProductModel[]>): IBankGaransiState {
    return {
      ...state,
      dataDivision: action.payload!,
    };
  },

  [BankGaransiActions.REQUEST_MASTER_INSURANCE_FINISHED](state: IBankGaransiState, action: IAction<MasterInsuranceEnvelope>): IBankGaransiState {
    return {
      ...state,
      dataInsurance: action.payload!,
      refreshPage: false,
    };
  },

  [BankGaransiActions.REQUEST_SELECT_PRINT_FINISHED](state: IBankGaransiState, action: IAction<CompetitorProductModel[]>): IBankGaransiState {
    return {
      ...state,
      dataPrint: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_COMPANY_FINISHED](state: IBankGaransiState, action: IAction<MasterInsuranceUdcModel[]>): IBankGaransiState {
    return {
      ...state,
      dataCompany: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_COMPANY_APPLICANT_FINISHED](state: IBankGaransiState, action: IAction<MasterInsuranceUdcModel[]>): IBankGaransiState {
    return {
      ...state,
      dataCompanyApplicant: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_BANK_CG_FINISHED](state: IBankGaransiState, action: IAction<DropdownFunnelSAModel[]>): IBankGaransiState {
    return {
      ...state,
      dataBankCG: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED](state: IBankGaransiState, action: IAction<FunnelSATableModel>): IBankGaransiState {
    return {
      ...state,
      dataFunnelSA: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [BankGaransiActions.REQUEST_SEARCH_FUNNEL_PO_TABLE_FINISHED](state: IBankGaransiState, action: IAction<FunnelPOTableModel>): IBankGaransiState {
    return {
      ...state,
      dataFunnelPO: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [BankGaransiActions.REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE_FINISHED](
    state: IBankGaransiState,
    action: IAction<DropdownFunnelSAModel[]>
  ): IBankGaransiState {
    return {
      ...state,
      dropdownFunnelSA: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BankGaransiActions.REQUEST_FUNNEL_SA_TABLE_FINISHED](state: IBankGaransiState, action: IAction<FunnelSATableModel>): IBankGaransiState {
    return {
      ...state,
      dataFunnelSA: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [BankGaransiActions.POST_BANK_GARANSI_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiModel[]>): IBankGaransiState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [BankGaransiActions.POST_MASTER_INSURANCE_FINISHED](state: IBankGaransiState, action: IAction<MasterInsuranceModel>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [BankGaransiActions.REQUEST_FILTERSEARCH_BANK_GARANSI_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiDashboardEnvelope>
  ): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      listSearch: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_FILTERSEARCH_EX_BANK_GARANSI_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiDashboardEnvelope>
  ): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      listExpiredDataAdmin: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_MAX_AMOUNT_FINISHED](state: IBankGaransiState, action: IAction<MaxAmountModel>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      maxAmount: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_CHECK_EXPIRED_FINISHED](state: IBankGaransiState, action: IAction<CheckExpireModel>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      expired: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_POST_BANK_GARANSI_ADMIN_FINISHED](state: IBankGaransiState, action: IAction<ResultActions>): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },
  [BankGaransiActions.REQUEST_POST_APPROVE_BANK_GARANSI_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiApproveModel[]>
  ): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [BankGaransiActions.CLEAR_RESULT_GENERATE_FINISHED](state: IBankGaransiState, action: IAction<any>): IBankGaransiState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [BankGaransiActions.REQUEST_POST_VOID_BANK_GARANSI_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiApproveModel[]>
  ): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [BankGaransiActions.REQUEST_POST_RETURN_BANK_GARANSI_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiApproveModel[]>
  ): IBankGaransiState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [BankGaransiActions.REQUEST_BANK_GARANSIS_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiEnvelope>): IBankGaransiState {
    return {
      ...state,
      listData: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_BG_SEARCH_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiDashboardEnvelope>): IBankGaransiState {
    return {
      ...state,
      listSearch: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_BG_SEARCH_EX_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiDashboardEnvelope>): IBankGaransiState {
    return {
      ...state,
      listExpiredDataAdmin: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_BANK_GARANSI_ADMINS_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiDashboardEnvelope>
  ): IBankGaransiState {
    return {
      ...state,
      listSearch: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
  [BankGaransiActions.REQUEST_BANK_GARANSI_ADMINEXS_FINISHED](
    state: IBankGaransiState,
    action: IAction<BankGaransiDashboardEnvelope>
  ): IBankGaransiState {
    return {
      ...state,
      listExpiredDataAdmin: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_BANK_GARANSI_BY_ID_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiModel>): IBankGaransiState {
    return {
      ...state,
      firstData: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_MASTER_INSURANCE_BY_ID_FINISHED](
    state: IBankGaransiState,
    action: IAction<MasterInsuranceUdcModel>
  ): IBankGaransiState {
    return {
      ...state,
      firstDataInsurance: action.payload!,
      error: action.error!,
    };
  },

  [BankGaransiActions.REQUEST_BANK_RECOMMENDED_FINISHED](state: IBankGaransiState, action: IAction<BankRecommended>): IBankGaransiState {
    return {
      ...state,
      bankRecomended: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_BANK_ESTIMATED_FINISHED](state: IBankGaransiState, action: IAction<BankRecommended>): IBankGaransiState {
    return {
      ...state,
      bankEstimated: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_CUSTOMER_BG_FINISHED](state: IBankGaransiState, action: IAction<DropdownFunnelSAModel[]>): IBankGaransiState {
    return {
      ...state,
      customerBG: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_CREATOR_BG_FINISHED](state: IBankGaransiState, action: IAction<DropdownFunnelSAModel[]>): IBankGaransiState {
    return {
      ...state,
      creatorBG: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_HISTORY_BG_FINISHED](state: IBankGaransiState, action: IAction<BankGaransiActivityModel[]>): IBankGaransiState {
    return {
      ...state,
      listHistory: action.payload!,
      error: action.error!,
    };
  },
  [BankGaransiActions.REQUEST_EXTEND_ATTACHMENT_FINISHED](state: IBankGaransiState, action: IAction<ExtendAttachmentModel>): IBankGaransiState {
    return {
      ...state,
      extendAttachment: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [BankGaransiActions.SET_PAGE](state: IBankGaransiState, action: IAction<number>): IBankGaransiState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },
});

export default bankGaransiReducer;
