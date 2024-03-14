import * as CreditBillingEffects from './CreditBillingEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CreditBillingModel from './models/CreditBillingModel';
import CreditBillingEnvelope from './models/CreditBillingEnvelope';
/* import SoftwareSearchModel from './models/SoftwareSearchModel';
import SoftwareMainModel from './models/SoftwareMainModel';
import SoftwareTypeModel from './models/SoftwareTypeModel';
import SoftwareHeaderModel from './models/SoftwareHeaderModel';
import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
import SoftwareEnvelope from './models/SoftwareEnvelope';
import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd'; */
import ResultActions from 'models/ResultActions';
import CBVCreditBillingModels from './models/CBVCreditBillingModels';
import SearchProjectNameModel from './models/SearchProjectNameModel';
import CBVAttachment from './models/CBVAttachment';
import CBVCreditBillingModel from './models/CBVCreditBillingModel';
import CBVAttachmentModel from './models/CBVAttachmentModel';
import CBVAssignModel from './models/CBVAssignModel';
import CBVDetail from './models/CBVDetail';
import CBVCreditByIDModel from './models/CBVCreditByIDModel';
import ChangeCreditBilling from './models/ChangeCreditBilling';
import CBVUsageDetailEnvelope from './models/Detail_Usage_CBV/CBVUsageDetailEnvelope';
import CBVDocTypeModel from './models/CBVDocTypeModel';
import DropDownBillingPeriodModel from './models/DropDownBillingPeriodModel';
import FilterMainCBV from './models/FilterMainCBV';
import CBVTypeVoucherModel from './models/CBVTypeVoucherModel';
import CBVEntitlementModel from './models/CBVEntitlementModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  //| SoftwareModel[]
  //| SoftwareModel
  | CreditBillingEnvelope
  | SearchProjectNameModel
  | CBVAttachment
  | CreditBillingModel
  | CBVAttachmentModel
  | CBVAssignModel
  | CBVDetail
  | CBVCreditByIDModel
  | ChangeCreditBilling
  | CBVUsageDetailEnvelope
  | CBVDocTypeModel
  | DropDownBillingPeriodModel
  | FilterMainCBV
  | CBVTypeVoucherModel
  | CBVEntitlementModel
  //| SoftwareTypeModel[]
  //| SoftwareHeaderModel
  //| SoftwareToolEnvelope
  //| SoftwareMainModel
  //| SoftwareSearchModel
  //| SoftwareUpdateHeaderModel
  //| SoftwareToolModelAdd
  | ResultActions;

/* export const REQUEST_SOFTWARE_HEADER: string = 'SoftwareActions.REQUEST_SOFTWARE';
export const REQUEST_SOFTWARE_HEADER_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_FINISHED';

export const requestSoftwareHeader = (softwareID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareHeaderModel>(dispatch, REQUEST_SOFTWARE_HEADER, SoftwareEffects.requestSoftwareHeader, softwareID);
  };
}; */

export const REQUEST_CREDIT_BILLINGS: string = 'CreditBillingActions.REQUEST_CREDIT_BILLINGS';
export const REQUEST_CREDIT_BILLINGS_FINISHED: string = 'CreditBillingActions.REQUEST_CREDIT_BILLINGS_FINISHED';

export const requestCreditBillings = (userLogin: number, text: string, column: string,sorting: string, page: number, pageSize: number): any => {
  // console.log('Actions', page, pageSize)
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CreditBillingEnvelope>(
      dispatch,
      REQUEST_CREDIT_BILLINGS,
      CreditBillingEffects.requestCreditBillings,
      userLogin,
      text,
      sorting,
      column,
      page,
      pageSize
    );
  };
};

export const POST_CREDIT_BILLINGS: string = "CreditBillingActions.POST_CREDIT_BILLINGS";
export const POST_CREDIT_BILLINGS_FINISHED = "CreditBillingActions.POST_CREDIT_BILLINGS_FINISHED";

export const postCreditBilling = (data: CBVCreditBillingModels): any => {
  // console.log('data',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_CREDIT_BILLINGS, CreditBillingEffects.postCreditBilling, data);
  };
};

export const REQUEST_PROJECT_NAME: string = 'CreditBillingActions.REQUEST_PROJECT_NAME';
export const REQUEST_PROJECT_NAME_FINISHED: string = 'CreditBillingActions.REQUEST_PROJECT_NAME_FINISHED';

export const requestProjectName = (search:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SearchProjectNameModel>(
      dispatch,
      REQUEST_PROJECT_NAME,
      CreditBillingEffects.requestProjectName,
      search
    );
  };
};

export const REQUEST_POST_ATTACHMENT: string = 'CreditBillingActions.REQUEST_POST_ATTACHMENT';
export const REQUEST_POST_ATTACHMENT_FINISHED: string = 'CreditBillingActions.REQUEST_POST_ATTACHMENT_FINISHED';

export const postAttachmentBilling = (data: any): any => {
  // console.log('dataattachment',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_ATTACHMENT, CreditBillingEffects.postAttachmentBilling, data);
  };
};

export const REQUEST_ATTACHMENT_BILLING: string = 'CreditBillingActions.REQUEST_ATTACHMENT_BILLING';
export const REQUEST_ATTACHMENT_BILLING_FINISHED: string = 'CreditBillingActions.REQUEST_ATTACHMENT_BILLING_FINISHED';

export const requestAttachmentBilling = (creditId: number, UserLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVAttachmentModel>(
      dispatch,
      REQUEST_ATTACHMENT_BILLING,
      CreditBillingEffects.requestAttachmentBilling,
      creditId,
      UserLoginID
    );
  };
};

export const REQUEST_POST_ASSIGN_CBV: string = 'CreditBillingActions.REQUEST_POST_ASSIGN_CBV';
export const REQUEST_POST_ASSIGN_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_POST_ASSIGN_CBV_FINISHED';

export const postAssignCBVBilling = (data: any): any => {
  // console.log('dataattachment',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_ASSIGN_CBV, CreditBillingEffects.postAssignCBVBilling, data);
  };
};

export const REQUEST_ASSIGN_CBV: string = 'CreditBillingActions.REQUEST_ASSIGN_CBV';
export const REQUEST_ASSIGN_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_ASSIGN_CBV_FINISHED';

export const requestAssignCBVBilling = (CreditId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVAssignModel>(
      dispatch,
      REQUEST_ASSIGN_CBV,
      CreditBillingEffects.requestAssignCBVBilling,
      CreditId,
    );
  };
};

export const REQUEST_UPDATE_ASSIGN_CBV: string = 'CreditBillingActions.REQUEST_UPDATE_ASSIGN_CBV';
export const REQUEST_UPDATE_ASSIGN_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_UPDATE_ASSIGN_CBV_FINISHED';

export const uploadAssignCBV = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_ASSIGN_CBV,
      CreditBillingEffects.uploadAssignCBV,
      data,
    );
  };
};

export const DEL_CREDIT_BILLINGS:string ='CreditBillingActions.DEL_CREDIT_BILLINGS';
export const DEL_CREDIT_BILLINGS_FINISHED ='CreditBillingActions.DEL_CREDIT_BILLINGS_FINISHED';
export const deleteCreditBilling = (creditId:string):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,DEL_CREDIT_BILLINGS, CreditBillingEffects.deleteCreditBilling, creditId);
  }
}

export const REQUEST_DELETE_DETAIL:string ='CreditBillingActions.REQUEST_DELETE_DETAIL';
export const REQUEST_DELETE_DETAIL_FINISHED ='CreditBillingActions.REQUEST_DELETE_DETAIL_FINISHED';
export const deleteCreditDetail = (CreditDetailId:number):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,REQUEST_DELETE_DETAIL, CreditBillingEffects.deleteCreditDetail, CreditDetailId);
  }
}

export const REQUEST_DETAIL_CBV: string = 'CreditBillingActions.REQUEST_DETAIL_CBV';
export const REQUEST_DETAIL_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_DETAIL_CBV_FINISHED';

export const requestDetailCBV = (CreditId: number, UserLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVDetail>(
      dispatch,
      REQUEST_DETAIL_CBV,
      CreditBillingEffects.requestDetailCBV,
      CreditId,
      UserLogin
    );
  };
};

export const REQUEST_DETAIL_USAGE_CBV: string = 'CreditBillingActions.REQUEST_DETAIL_USAGE_CBV';
export const REQUEST_DETAIL_USAGE_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_DETAIL_USAGE_CBV_FINISHED';

export const requestDetailUsageCBV = (billingPeriod:string, voucherNo:string, PICName: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVUsageDetailEnvelope>(
      dispatch,
      REQUEST_DETAIL_USAGE_CBV,
      CreditBillingEffects.requestDetailUsageCBV,
      billingPeriod,
      voucherNo,
      PICName,
      page,
      pageSize
    );
  };
};

export const REQUEST_CBV_CREDIT_ID: string = 'CreditBillingActions.REQUEST_CBV_CREDIT_ID';
export const REQUEST_CBV_CREDIT_ID_FINISHED: string = 'CreditBillingActions.REQUEST_CBV_CREDIT_ID_FINISHED';

export const requestCBVCreditId = (CreditId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVCreditByIDModel>(
      dispatch,
      REQUEST_CBV_CREDIT_ID,
      CreditBillingEffects.requestCBVCreditId,
      CreditId,
    );
  };
};


export const UPDATE_CREDIT_BILLING: string = 'CreditBillingActions.UPDATE_CREDIT_BILLING';
export const UPDATE_CREDIT_BILLING_FINISHED: string = 'CreditBillingActions.UPDATE_CREDIT_BILLING_FINISHED';
export const putCreditBilling = (data: ChangeCreditBilling): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            UPDATE_CREDIT_BILLING,
            CreditBillingEffects.putCreditBilling,
            data
        );
    };
};

export const REQUEST_CBV_DOCTYPE: string = 'CreditBillingActions.REQUEST_CBV_DOCTYPE';
export const REQUEST_CBV_DOCTYPE_FINISHED: string = 'CreditBillingActions.REQUEST_CBV_DOCTYPE_FINISHED';

export const requestCBVDocType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVDocTypeModel>(
      dispatch,
      REQUEST_CBV_DOCTYPE,
      CreditBillingEffects.requestCBVDocType,
    );
  };
};


export const REQUEST_DROPDOWN_BILLING_PERIODE: string = 'CreditBillingActions.REQUEST_DROPDOWN_BILLING_PERIODE';
export const REQUEST_DROPDOWN_BILLING_PERIODE_FINISHED: string = 'CreditBillingActions.REQUEST_DROPDOWN_BILLING_PERIODE_FINISHED';

export const DropDownBillingPeriod = (creditId: number, PicNameID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropDownBillingPeriodModel>(
      dispatch,
      REQUEST_DROPDOWN_BILLING_PERIODE,
      CreditBillingEffects.DropDownBillingPeriod,
      creditId,
      PicNameID
    );
  };
};

export const REQUEST_FILTER_MAIN_CBV: string = 'CreditBillingActions.REQUEST_FILTER_MAIN_CBV';
export const REQUEST_FILTER_MAIN_CBV_FINISHED: string = 'CreditBillingActions.REQUEST_FILTER_MAIN_CBV_FINISHED';

export const RequestFilterMainCBV = (data: FilterMainCBV): any => {
  // console.log('dataattachment',data)
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CreditBillingEnvelope>(dispatch, REQUEST_FILTER_MAIN_CBV, CreditBillingEffects.RequestFilterMainCBV, data);
  };
};

export const DEL_ATTACHMENT_BILLING:string ='CreditBillingActions.DEL_ATTACHMENT_BILLING';
export const DEL_ATTACHMENT_BILLING_FINISHED ='CreditBillingActions.DEL_ATTACHMENT_BILLING_FINISHED';
export const deleteAttachmentBilling = (AttachmentID:number, userLogin: number):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,DEL_ATTACHMENT_BILLING, CreditBillingEffects.deleteAttachmentBilling, AttachmentID, userLogin);
  }
}

export const REMOVE_SUBMIT_RESULT: string = 'CreditBillingActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'CreditBillingActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, CreditBillingEffects.removeResult);
  };
};

export const REQUEST_CBVTYPEVOUCHER: string = 'AWSBillingActions.REQUEST_CBVTYPEVOUCHER';
export const REQUEST_CBVTYPEVOUCHER_FINISHED: string = 'AWSBillingActions.REQUEST_CBVTYPEVOUCHER_FINISHED';

export const requestCBVTypeVoucher = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVTypeVoucherModel>(dispatch, REQUEST_CBVTYPEVOUCHER, CreditBillingEffects.requestCBVTypeVoucher);
  };
};

export const REQUEST_ENTITLEMENT: string = 'CreditBillingActions.REQUEST_ENTITLEMENT';
export const REQUEST_ENTITLEMENT_FINISHED: string = 'CreditBillingActions.REQUEST_ENTITLEMENT_FINISHED';

export const requestEntitlement = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CBVEntitlementModel>(
      dispatch,
      REQUEST_ENTITLEMENT,
      CreditBillingEffects.requestEntitlement,
    );
  };
};

// export const REQUEST_DOWNLOAD_ATTACHMENT_SERVER: string = 'CreditBillingActions.REQUEST_DOWNLOAD_ATTACHMENT_SERVER';
// export const REQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED: string = 'CreditBillingActions.RREQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED';

// export const requestFileAttachment = (attachmentId :string): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<CBVAttachmentModel>(dispatch, REQUEST_DOWNLOAD_ATTACHMENT_SERVER, CreditBillingEffects.requestFileAttachmentCBV,attachmentId );
//   };
// };
