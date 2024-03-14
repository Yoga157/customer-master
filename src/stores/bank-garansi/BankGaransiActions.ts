import * as BankGaransiEffect from './BankGaransiEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BankGaransisModel from './models/BankGaransisModel';
import BankGaransiApproveModel from './models/BankGaransiApproveModel';
import BankGaransisAdminModel from './models/BankGaransisAdminModel';
import BankGaransiModel from './models/BankGaransiModel';
import BankGaransiEditViewRequesterModel from './models/BankGaransiEditViewRequesterModel';
import BankGaransiEditViewAdminModel from './models/BankGaransiEditViewAdminModel';
import FunnelSATableModel from './models/FunnelSATableModel';
import FunnelPOTableModel from './models/FunnelPOTableModel';
import FunnelSearchSAModel from './models/FunnelSearchSAModel';
import FunnelSearchPOModel from './models/FunnelSearchPOModel';
import BankGaransiEnvelope from './models/BankGaransiEnvelope';
import BankRecommended from './models/BankRecommended';
import FunnelSALinkToModel from './models/FunnelSALinkToModel';
import DropdownFunnelSAModel from './models/DropdownFunnelSAModel';
import AttachmentEnvelope from './models/AttachmentEnvelope';
import FilterSearchModel from './models/FilterSearchModel';
import MasterInsuranceModel from './models/MasterInsuranceModel';
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
import AttachmentVersionModel from './models/AttachmentVersionModel';
import CheckExpireModel from './models/CheckExpireModel';
import MaxAmountModel from './models/MaxAmountModel';
import IAction from 'models/IAction';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | BankGaransisModel
  | BankGaransiEnvelope
  | BankGaransiModel
  | BankRecommended
  | BankGaransiApproveModel
  | FunnelSATableModel
  | BankGaransiEditViewAdminModel
  | BankGaransiEditViewRequesterModel
  | FunnelSALinkToModel
  | DropdownFunnelSAModel
  | CompetitorProductModel[]
  | FilterSearchModel
  | AttachmentEnvelope
  | MasterInsuranceModel
  | MasterInsuranceEnvelope
  | MasterInsuranceUdcModel
  | MasterInsuranceUdcModel[]
  | FunnelSARowModel
  | ResultActions
  | BankGaransiDashboardEnvelope
  | BankGaransiActivityModel
  | FunnelSearchPOModel
  | FunnelPORowModel
  | ExtendAttachmentModel
  | AttachmentVersionModel
  | AttachmentVersionEnvelope
  | CheckExpireModel
  | MaxAmountModel;

export const REQUEST_POST_ATTACHMENT: string = 'BankGaransiActions.REQUEST_POST_ATTACHMENT';
export const REQUEST_POST_ATTACHMENT_FINISHED = 'BankGaransiActions.REQUEST_POST_ATTACHMENT_FINISHED';
export const postAttachment = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_ATTACHMENT, BankGaransiEffect.postAttachment, data);
  };
};

export const REQUEST_POST_APPROVE_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_POST_APPROVE_BANK_GARANSI';
export const REQUEST_POST_APPROVE_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_POST_APPROVE_BANK_GARANSI_FINISHED';
export const postApproveBankGaransi = (data: BankGaransiApproveModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiApproveModel>(dispatch, REQUEST_POST_APPROVE_BANK_GARANSI, BankGaransiEffect.postApproval, data);
  };
};

export const REQUEST_POST_VOID_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_POST_VOID_BANK_GARANSI';
export const REQUEST_POST_VOID_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_POST_VOID_BANK_GARANSI_FINISHED';
export const postVoidBankGaransi = (data: BankGaransiApproveModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiApproveModel>(dispatch, REQUEST_POST_VOID_BANK_GARANSI, BankGaransiEffect.postVoid, data);
  };
};

export const REQUEST_POST_RETURN_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_POST_RETURN_BANK_GARANSI';
export const REQUEST_POST_RETURN_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_POST_RETURN_BANK_GARANSI_FINISHED';
export const postReturnBankGaransi = (data: BankGaransiApproveModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiApproveModel>(dispatch, REQUEST_POST_RETURN_BANK_GARANSI, BankGaransiEffect.postReturn, data);
  };
};

//Service Extend Terbaru
export const REQUEST_POST_RETURN_EXTEND: string = 'BankGaransiActions.REQUEST_POST_RETURN_EXTEND';
export const REQUEST_POST_RETURN_EXTEND_FINISHED = 'BankGaransiActions.REQUEST_POST_RETURN_EXTEND_FINISHED';
export const postExtendReturn = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_RETURN_EXTEND, BankGaransiEffect.postExtendReturn, data);
  };
};

export const POST_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_POST_BANK_GARANSI';
export const POST_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_POST_BANK_GARANSI_FINISHED';
export const postBankGaransi = (data: BankGaransisModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransisModel>(dispatch, POST_BANK_GARANSI, BankGaransiEffect.postBankGaransi, data);
  };
};

export const REQUEST_POST_BANK_GARANSI_ADMIN: string = 'BankGaransiActions.REQUEST_POST_BANK_GARANSI_ADMIN';
export const REQUEST_POST_BANK_GARANSI_ADMIN_FINISHED = 'BankGaransiActions.REQUEST_POST_BANK_GARANSI_ADMIN_FINISHED';
export const postBankGaransiAdmin = (data: BankGaransisAdminModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_BANK_GARANSI_ADMIN, BankGaransiEffect.postBankGaransiAdmin, data);
  };
};

export const REQUEST_BANK_GARANSIS: string = 'BankGaransiActions.REQUEST_BANK_GARANSIS';
export const REQUEST_BANK_GARANSIS_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_GARANSIS_FINISHED';

export const requestBankGaransis = (id: number, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiEnvelope>(
      dispatch,
      REQUEST_BANK_GARANSIS,
      BankGaransiEffect.requestBankGaransis,
      id,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_BANK_GARANSI_ADMINS: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_ADMINS';
export const REQUEST_BANK_GARANSI_ADMINS_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_ADMINS_FINISHED';

export const requestBankGaransiAdmins = (
  userLogin: string,
  activePage: number,
  pageSize: number,
  flagExpired: number,
  column: string,
  sorting: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_BANK_GARANSI_ADMINS,
      BankGaransiEffect.requestBankGaransiAdmins,
      userLogin,
      activePage,
      pageSize,
      flagExpired,
      column,
      sorting
    );
  };
};

export const REQUEST_BANK_GARANSI_ADMINEXS: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_ADMINEXS';
export const REQUEST_BANK_GARANSI_ADMINEXS_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_ADMINEXS_FINISHED';

export const requestBankGaransiAdminExs = (
  userLogin: string,
  activePage: number,
  pageSize: number,
  flagExpired: number,
  column: string,
  sorting: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_BANK_GARANSI_ADMINEXS,
      BankGaransiEffect.requestBankGaransiAdminExs,
      userLogin,
      activePage,
      pageSize,
      flagExpired,
      column,
      sorting
    );
  };
};

export const REQUEST_BANK_GARANSI_BY_ID: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_BY_ID';
export const REQUEST_BANK_GARANSI_BY_ID_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_GARANSI_BY_ID_FINISHED';

export const requestBankGaransiById = (bankGuaranteeID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiModel>(
      dispatch,
      REQUEST_BANK_GARANSI_BY_ID,
      BankGaransiEffect.requestBankGaransiById,
      bankGuaranteeID
    );
  };
};

//Edit View Admin
export const REQUEST_BG_VIEWEDIT_ADMIN: string = 'BankGaransiActions.REQUEST_BG_VIEWEDIT_ADMIN';
export const REQUEST_BG_VIEWEDIT_ADMIN_FINISHED: string = 'BankGaransiActions.REQUEST_BG_VIEWEDIT_ADMIN_FINISHED';

export const requestBGViewEditAdmin = (bankGuaranteeID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiEditViewAdminModel>(
      dispatch,
      REQUEST_BG_VIEWEDIT_ADMIN,
      BankGaransiEffect.requestBGViewEditAdmin,
      bankGuaranteeID
    );
  };
};

//Edit View Requester
export const REQUEST_BG_VIEWEDIT_REQUESTER: string = 'BankGaransiActions.REQUEST_BG_VIEWEDIT_REQUESTER';
export const REQUEST_BG_VIEWEDIT_REQUESTER_FINISHED: string = 'BankGaransiActions.REQUEST_BG_VIEWEDIT_REQUESTER_FINISHED';

export const requestBGViewEditRequester = (bankGuaranteeID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiEditViewRequesterModel>(
      dispatch,
      REQUEST_BG_VIEWEDIT_REQUESTER,
      BankGaransiEffect.requestBGViewEditRequester,
      bankGuaranteeID
    );
  };
};

//Get Funnel PO
export const REQUEST_FUNNEL_PO_TABLE: string = 'BankGaransiActions.REQUEST_FUNNEL_PO_TABLE';
export const REQUEST_FUNNEL_PO_TABLE_FINISHED: string = 'BankGaransiActions.REQUEST_FUNNEL_PO_TABLE_FINISHED';

export const requestFunnelPO = (page: number, pageSize: number, userLogin: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSATableModel>(
      dispatch,
      REQUEST_FUNNEL_SA_TABLE,
      BankGaransiEffect.requestFunnelSA,
      page,
      pageSize,
      userLogin
    );
  };
};

//Search PO Funnel
export const REQUEST_SEARCH_FUNNEL_PO_TABLE: string = 'BankGaransiActions.REQUEST_SEARCH_FUNNEL_PO_TABLE';
export const REQUEST_SEARCH_FUNNEL_PO_TABLE_FINISHED: string = 'BankGaransiActions.REQUEST_SEARCH_FUNNEL_PO_TABLE_FINISHED';

export const requestSearchFunnelPO = (searchObject: FunnelSearchPOModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelPOTableModel>(
      dispatch,
      REQUEST_SEARCH_FUNNEL_PO_TABLE,
      BankGaransiEffect.requestSearchFunnelPO,
      searchObject
    );
  };
};

//Get Funnel SA
export const REQUEST_FUNNEL_SA_TABLE: string = 'BankGaransiActions.REQUEST_FUNNEL_SA_TABLE';
export const REQUEST_FUNNEL_SA_TABLE_FINISHED: string = 'BankGaransiActions.REQUEST_FUNNEL_SA_TABLE_FINISHED';

export const requestFunnelSA = (page: number, pageSize: number, userLogin: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSATableModel>(
      dispatch,
      REQUEST_FUNNEL_SA_TABLE,
      BankGaransiEffect.requestFunnelSA,
      page,
      pageSize,
      userLogin
    );
  };
};

//Search SA Funnel
export const REQUEST_SEARCH_FUNNEL_SA_TABLE: string = 'BankGaransiActions.REQUEST_SEARCH_FUNNEL_SA_TABLE';
export const REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED: string = 'BankGaransiActions.REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED';

export const requestSearchFunnelSA = (searchObject: FunnelSearchSAModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSATableModel>(
      dispatch,
      REQUEST_SEARCH_FUNNEL_SA_TABLE,
      BankGaransiEffect.requestSearchFunnelSA,
      searchObject
    );
  };
};

//Dropdown Funnel SA
export const REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE: string = 'BankGaransiActions.REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE';
export const REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE_FINISHED: string = 'BankGaransiActions.REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE_FINISHED';

export const requestDropdownSearchFunnelSA = (userLogin: string, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownFunnelSAModel>(
      dispatch,
      REQUEST_DROPDOWN_SEARCH_FUNNEL_SA_TABLE,
      BankGaransiEffect.requestDropdownSearchFunnelSA,
      userLogin,
      search
    );
  };
};

//Update BG Admin
export const PUT_BANK_GARANSI_ADMIN: string = 'BankGaransiActions.PUT_BANK_GARANSI_ADMIN';
export const PUT_BANK_GARANSI_ADMIN_FINISHED = 'BankGaransiActions.PUT_BANK_GARANSI_ADMIN_FINISHED';
export const putBankGaransiAdmin = (data: BankGaransiEditViewAdminModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_BANK_GARANSI_ADMIN, BankGaransiEffect.putBGAdmin, data);
  };
};

//Update BG Requester
export const REQUEST_PUT_BANK_GARANSI_REQUESTER: string = 'BankGaransiActions.REQUEST_PUT_BANK_GARANSI_REQUESTER';
export const REQUEST_PUT_BANK_GARANSI_REQUESTER_FINISHED = 'BankGaransiActions.REQUEST_PUT_BANK_GARANSI_REQUESTER_FINISHED';
export const putBankGaransiRequester = (data: BankGaransiEditViewRequesterModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_BANK_GARANSI_REQUESTER, BankGaransiEffect.putBGRequester, data);
  };
};

//Edit Link To
export const REQUEST_LINKTO_FUNNEL_SA: string = 'BankGaransiActions.REQUEST_LINKTO_FUNNEL_SA';
export const REQUEST_LINKTO_FUNNEL_SA_FINISHED: string = 'BankGaransiActions.REQUEST_LINKTO_FUNNEL_SA_FINISHED';

export const requestLinkToFunnelSA = (userLogin: string, linkTo: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSALinkToModel>(
      dispatch,
      REQUEST_LINKTO_FUNNEL_SA,
      BankGaransiEffect.requestLinkToFunnelSA,
      userLogin,
      linkTo
    );
  };
};

//Get Division
export const REQUEST_DIVISION: string = 'BankGaransiActions.REQUEST_DIVISION';
export const REQUEST_DIVISION_FINISHED: string = 'BankGaransiActions.REQUEST_DIVISION_FINISHED';

export const requestDivision = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorProductModel[]>(dispatch, REQUEST_DIVISION, BankGaransiEffect.requestDivision);
  };
};

//Request Mandatory
export const REQUEST_MANDATORY_ATTACHMENT: string = 'BankGaransiActions.REQUEST_MANDATORY_ATTACHMENT';
export const REQUEST_MANDATORY_ATTACHMENT_FINISHED: string = 'BankGaransiActions.REQUEST_MANDATORY_ATTACHMENT_FINISHED';

export const requestMandatoryAttachment = (BondType: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<any>(dispatch, REQUEST_MANDATORY_ATTACHMENT, BankGaransiEffect.requestMandatoryAttachment, BondType);
  };
};

//Get Select Print
export const REQUEST_SELECT_PRINT: string = 'BankGaransiActions.REQUEST_SELECT_PRINT';
export const REQUEST_SELECT_PRINT_FINISHED: string = 'BankGaransiActions.REQUEST_SELECT_PRINT_FINISHED';

export const requestPrint = (bankGuaranteeID: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorProductModel[]>(dispatch, REQUEST_SELECT_PRINT, BankGaransiEffect.requestPrint, bankGuaranteeID);
  };
};

//Advance Search
export const REQUEST_FILTERSEARCH_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_FILTERSEARCH_BANK_GARANSI';
export const REQUEST_FILTERSEARCH_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_FILTERSEARCH_BANK_GARANSI_FINISHED';
export const postFilterSearch = (data: FilterSearchModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_FILTERSEARCH_BANK_GARANSI,
      BankGaransiEffect.postFilterSearch,
      data
    );
  };
};

export const REQUEST_FILTERSEARCH_EX_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_FILTERSEARCH_EX_BANK_GARANSI';
export const REQUEST_FILTERSEARCH_EX_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_FILTERSEARCH_EX_BANK_GARANSI_FINISHED';
export const postFilterSearchEx = (data: FilterSearchModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_FILTERSEARCH_EX_BANK_GARANSI,
      BankGaransiEffect.postFilterSearch,
      data
    );
  };
};

//Get Attachment
export const REQUEST_ATTACHMENT_BG_SERVER: string = 'BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER';
export const REQUEST_ATTACHMENT_BG_SERVER_FINISHED: string = 'BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER_FINISHED';

export const requestAttachmentServer = (page: number, pageSize: number, bgID: string, UserLoginID: number, modul: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentEnvelope>(
      dispatch,
      REQUEST_ATTACHMENT_BG_SERVER,
      BankGaransiEffect.requestAttachmentServer,
      page,
      pageSize,
      bgID,
      UserLoginID,
      modul
    );
  };
};

// Master Insurance
export const POST_MASTER_INSURANCE: string = 'BankGaransiActions.POST_MASTER_INSURANCE';
export const POST_MASTER_INSURANCE_FINISHED = 'BankGaransiActions.POST_MASTER_INSURANCE_FINISHED';
export const postMasterInsurance = (data: MasterInsuranceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceModel>(dispatch, POST_MASTER_INSURANCE, BankGaransiEffect.postMasterInsurance, data);
  };
};

//Get Master Insurance
export const REQUEST_MASTER_INSURANCE: string = 'BankGaransiActions.REQUEST_MASTER_INSURANCE';
export const REQUEST_MASTER_INSURANCE_FINISHED: string = 'BankGaransiActions.REQUEST_MASTER_INSURANCE_FINISHED';
export const requestMasterInsurance = (activePage: number, pageSize: number, text: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceEnvelope>(
      dispatch,
      REQUEST_MASTER_INSURANCE,
      BankGaransiEffect.requestMasterInsurance,
      activePage,
      pageSize,
      text
    );
  };
};

//Get Company
export const REQUEST_COMPANY: string = 'BankGaransiActions.REQUEST_COMPANY';
export const REQUEST_COMPANY_FINISHED: string = 'BankGaransiActions.REQUEST_COMPANY_FINISHED';

export const requestCompany = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceUdcModel[]>(dispatch, REQUEST_COMPANY, BankGaransiEffect.requestCompany);
  };
};

//Get Company Applicant
export const REQUEST_COMPANY_APPLICANT: string = 'BankGaransiActions.REQUEST_COMPANY_APPLICANT';
export const REQUEST_COMPANY_APPLICANT_FINISHED: string = 'BankGaransiActions.REQUEST_COMPANY_APPLICANT_FINISHED';

export const requestCompanyApplicant = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceUdcModel[]>(dispatch, REQUEST_COMPANY_APPLICANT, BankGaransiEffect.requestCompanyApplicant);
  };
};

//Get Bank CG
export const REQUEST_BANK_CG: string = 'BankGaransiActions.REQUEST_BANK_CG';
export const REQUEST_BANK_CG_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_CG_FINISHED';

export const requestBankCG = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownFunnelSAModel>(dispatch, REQUEST_BANK_CG, BankGaransiEffect.requestBankCG);
  };
};

//Get Master Insurance By Id
export const REQUEST_MASTER_INSURANCE_BY_ID: string = 'BankGaransiActions.REQUEST_MASTER_INSURANCE_BY_ID';
export const REQUEST_MASTER_INSURANCE_BY_ID_FINISHED: string = 'BankGaransiActions.REQUEST_MASTER_INSURANCE_BY_ID_FINISHED';

export const requestMasterInsuranceById = (ID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceUdcModel>(
      dispatch,
      REQUEST_MASTER_INSURANCE_BY_ID,
      BankGaransiEffect.requestMasterInsuranceById,
      ID
    );
  };
};

//Update Master Insurance
export const PUT_MASTER_INSURANCE: string = 'BankGaransiActions.PUT_MASTER_INSURANCE';
export const PUT_MASTER_INSURANCE_FINISHED = 'BankGaransiActions.PUT_MASTER_INSURANCE_FINISHED';
export const putMasterInsurance = (data: MasterInsuranceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MasterInsuranceModel>(dispatch, PUT_MASTER_INSURANCE, BankGaransiEffect.putMasterInsurace, data);
  };
};

//Customer BG
export const REQUEST_CUSTOMER_BG: string = 'CustomerActions.REQUEST_CUSTOMER_BG';
export const REQUEST_CUSTOMER_BG_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_BG_FINISHED';

export const requestCustomerBG = (userLogin: string, flagExpire: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownFunnelSAModel>(
      dispatch,
      REQUEST_CUSTOMER_BG,
      BankGaransiEffect.requestCustomerBG,
      userLogin,
      flagExpire
    );
  };
};

//Creator BG
export const REQUEST_CREATOR_BG: string = 'CustomerActions.REQUEST_CREATOR_BG';
export const REQUEST_CREATOR_BG_FINISHED: string = 'CustomerActions.REQUEST_CREATOR_BG_FINISHED';

export const requestCreatorBG = (userLogin: string, flagExpire: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownFunnelSAModel>(
      dispatch,
      REQUEST_CREATOR_BG,
      BankGaransiEffect.requestCreatorBG,
      userLogin,
      flagExpire
    );
  };
};

//History BG
export const REQUEST_HISTORY_BG: string = 'BankGaransiActions.REQUEST_HISTORY_BG';
export const REQUEST_HISTORY_BG_FINISHED: string = 'BankGaransiActions.REQUEST_HISTORY_BG_FINISHED';

export const requestHistoryBG = (DocNumber: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiActivityModel>(dispatch, REQUEST_HISTORY_BG, BankGaransiEffect.requestHistoryBG, DocNumber);
  };
};

//Extend Attachment
export const REQUEST_EXTEND_ATTACHMENT: string = 'BankGaransiActions.REQUEST_EXTEND_ATTACHMENT';
export const REQUEST_EXTEND_ATTACHMENT_FINISHED: string = 'BankGaransiActions.REQUEST_EXTEND_ATTACHMENT_FINISHED';

export const requestAttachmentExtend = (bg: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ExtendAttachmentModel>(dispatch, REQUEST_EXTEND_ATTACHMENT, BankGaransiEffect.requestAttachmentExtend, bg);
  };
};

//Check Expired
export const REQUEST_CHECK_EXPIRED: string = 'BankGaransiActions.REQUEST_CHECK_EXPIRED';
export const REQUEST_CHECK_EXPIRED_FINISHED: string = 'BankGaransiActions.REQUEST_CHECK_EXPIRED_FINISHED';

export const checkExpired = (userLogin: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CheckExpireModel>(dispatch, REQUEST_CHECK_EXPIRED, BankGaransiEffect.checkExpired, userLogin);
  };
};

//Max Amount
export const REQUEST_MAX_AMOUNT: string = 'BankGaransiActions.REQUEST_MAX_AMOUNT';
export const REQUEST_MAX_AMOUNT_FINISHED: string = 'BankGaransiActions.REQUEST_MAX_AMOUNT_FINISHED';

export const maxAmount = (bondType: string, projectAmount: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<MaxAmountModel>(dispatch, REQUEST_MAX_AMOUNT, BankGaransiEffect.maxAmount, bondType, projectAmount);
  };
};

export const INSERT_FUNNEL_SA_OBJECT: string = 'BankGaransiActions.INSERT_FUNNEL_SA_OBJECT';
export const INSERT_FUNNEL_SA_OBJECT_FINISHED: string = 'BankGaransiActions.INSERT_FUNNEL_SA_OBJECT_FINISHED';

export const insertFunnelSAObject = (data: FunnelSARowModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSARowModel>(dispatch, INSERT_FUNNEL_SA_OBJECT, BankGaransiEffect.insertFunnelSAObject, data);
  };
};

export const INSERT_FUNNEL_PO_OBJECT: string = 'BankGaransiActions.INSERT_FUNNEL_PO_OBJECT';
export const INSERT_FUNNEL_PO_OBJECT_FINISHED: string = 'BankGaransiActions.INSERT_FUNNEL_PO_OBJECT_FINISHED';

export const insertFunnelPOObject = (data: FunnelPORowModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelPORowModel>(dispatch, INSERT_FUNNEL_PO_OBJECT, BankGaransiEffect.insertFunnelPOObject, data);
  };
};

export const PUT_BANK_GARANSI: string = 'BankGaransiActions.REQUEST_PUT_BANK_GARANSI';
export const PUT_BANK_GARANSI_FINISHED = 'BankGaransiActions.REQUEST_PUT_BANK_GARANSI_FINISHED';
export const putBankGaransi = (data: BankGaransiModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiModel>(dispatch, PUT_BANK_GARANSI, BankGaransiEffect.putBankGaransi, data);
  };
};

export const REQUEST_BANK_RECOMMENDED: string = 'BankGaransiActions.REQUEST_BANK_RECOMMENDED';
export const REQUEST_BANK_RECOMMENDED_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_RECOMMENDED_FINISHED';

export const requestBankRecomended = (bandIssuer: string, requireOn: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankRecommended>(
      dispatch,
      REQUEST_BANK_RECOMMENDED,
      BankGaransiEffect.requestBankRecomended,
      bandIssuer,
      requireOn
    );
  };
};

//Attachment Version
export const REQUEST_ATTACHMENT_VERSIONS: string = 'BankGaransiActions.REQUEST_ATTACHMENT_VERSIONS';
export const REQUEST_ATTACHMENT_VERSIONS_FINISHED: string = 'BankGaransiActions.REQUEST_ATTACHMENT_VERSIONS_FINISHED';

export const requestAttachmentVersions = (docNo: string, fileName: string, modul: number, type: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentVersionEnvelope>(
      dispatch,
      REQUEST_ATTACHMENT_VERSIONS,
      BankGaransiEffect.requestAttachmentVersions,
      docNo,
      fileName,
      modul,
      type,
      userLogin
    );
  };
};

export const REQUEST_BANK_ESTIMATED: string = 'BankGaransiActions.REQUEST_BANK_ESTIMATED';
export const REQUEST_BANK_ESTIMATED_FINISHED: string = 'BankGaransiActions.REQUEST_BANK_ESTIMATED_FINISHED';

export const requestBankEstimated = (bandIssuerID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BankRecommended>(dispatch, REQUEST_BANK_ESTIMATED, BankGaransiEffect.requestBankEstimated, bandIssuerID);
  };
};

export const REQUEST_BG_SEARCH: string = 'BankGaransiActions.REQUEST_BG_SEARCH';
export const REQUEST_BG_SEARCH_FINISHED: string = 'BankGaransiActions.REQUEST_BG_SEARCH_FINISHED';

export const requestBGSearch = (
  userLogin: string,
  textSearch: string,
  activePage: number,
  pageSize: number,
  flagExpire: number,
  column: string,
  sorting: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_BG_SEARCH,
      BankGaransiEffect.requestBGSearch,
      userLogin,
      textSearch,
      activePage,
      pageSize,
      flagExpire,
      column,
      sorting
    );
  };
};

export const REQUEST_BG_SEARCH_EX: string = 'BankGaransiActions.REQUEST_BG_SEARCH_EX';
export const REQUEST_BG_SEARCH_EX_FINISHED: string = 'BankGaransiActions.REQUEST_BG_SEARCH_EX_FINISHED';

export const requestBGExSearch = (
  userLogin: string,
  textSearch: string,
  activePage: number,
  pageSize: number,
  flagExpire: number,
  column: string,
  sorting: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BankGaransiDashboardEnvelope>(
      dispatch,
      REQUEST_BG_SEARCH_EX,
      BankGaransiEffect.requestBGExSearch,
      userLogin,
      textSearch,
      activePage,
      pageSize,
      flagExpire,
      column,
      sorting
    );
  };
};

export const CLEAR_RESULT_GENERATE: string = 'BankGaransiActions.CLEAR_RESULT_GENERATE';
export const CLEAR_RESULT_GENERATE_FINISHED: string = 'BankGaransiActions.CLEAR_RESULT_GENERATE_FINISHED';

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, CLEAR_RESULT_GENERATE, BankGaransiEffect.clearResult);
  };
};

export const SET_PAGE: string = 'BankGaransiActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};