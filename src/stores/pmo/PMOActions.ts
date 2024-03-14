import PMOViewEditProjectStatusEditModel from './models/PMOViewEditProjectStatusEditModel';
import PMORequirementClosingProject from './models/PMORequirementClosingProject';
import CustomerForPmoProjectModel from './models/CustomerForPmoProjectModel';
import PMOProgressDetailMilestone from './models/PMOProgressDetailMilestone';
import PMOViewEditProjectStatus from './models/PMOViewEditProjectStatus';
import CheckAllowedUpdateModel from './models/CheckAllowedUpdateModel';
import PMOViewEditCustommerPO from './models/PMOViewEditCustommerPO';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import PMOGetByEntryKeyModel from './models/PMOGetByEntryKeyModel';
import PMOGetActualDateModel from './models/PMOGetActualDateModel';
import PMOProgressMilestone from './models/PMOProgressMilestone';
import PMOProjectByIDModel from './models/PMOProjectByIDModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import PMOProjectEmplove from './models/PMOProjectEmplove';
import PMOViewEditStatus from './models/PMOViewEditStatus';
import ReassignPmoModel from './models/ReassignPmoModel';
import ApprovalSMOModel from './models/ApprovalSMOModel';
import PMOHandOverModel from './models/PMOHandOverModel';
import PMOListEnvelope from './models/PMOListEnvelope';
import PMOTopListModel from './models/PMOTopListModel';
import PMOSOorOIExist from './models/PMOSOorOIExist';
import PMOSTypeSelect from './models/PMOSTypeSelect';
import { ReduxDispatch } from 'models/ReduxProps';
import PMOListModel from './models/PMOListModel';
import ResultActions from 'models/ResultActions';
import PMOFilter from './models/PMOFilter';
import * as PMOEffects from './PMOEffects';
import IAction from 'models/IAction';


type ActionUnion =
  | HttpErrorResponseModel
  | ResultActions
  | undefined
  | boolean
  | any
  | PMOListModel[]
  | PMOSOorOIExist[]
  | PMOSTypeSelect[]
  | PMOGetByEntryKeyModel[]
  | PMOProjectEmplove
  | PMOViewEditCustommerPO
  | PMOViewEditStatus
  | PMOProgressMilestone
  | PMOProgressDetailMilestone
  | PMOViewEditProjectStatus
  | PMOFilter
  | PMOListEnvelope
  | PMOTopListModel
  | PMOProjectByIDModel
  | CheckAllowedUpdateModel
  | PMORequirementClosingProject
  | ReassignPmoModel
  | PMOGetActualDateModel
  | CustomerForPmoProjectModel

  export const REQUEST_PMO_LIST: string = 'PMOActions.REQUEST_PMO_LIST';
  export const REQUEST_PMO_LIST_FINISHED: string = 'PMOActions.REQUEST_PMO_LIST_FINISHED';

  export const reqPMOList = (page: number, pageSize: number,column: string, sorting: string, userLoginId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOListEnvelope>(
      dispatch,
      REQUEST_PMO_LIST,
      PMOEffects.reqPMOList,
      page,
      pageSize,
      column,
      sorting,
      userLoginId,
    );
  };
};

  export const PMO_LIST_SEARCH: string = 'PMOActions.REQUEST_PMO_LIST_SEARCH';
  export const PMO_LIST_SEARCH_FINISHED: string = 'PMOActions.REQUEST_PMO_LIST_SEARCH_FINISHED';
  
  export const reqPMOListBySearch = (page: number, pageSize: number,column: string, sorting: string, search:string, userLoginId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOListEnvelope>(
      dispatch,
      PMO_LIST_SEARCH,
      PMOEffects.reqPMOListBySearch,
      page,
      pageSize,
      column,
      sorting,
      search,
      userLoginId,
    );
  };
};

export const POST_PMO_FILTER: string = 'PMOActions.REQUEST_POST_PMO_FILTER';
export const POST_PMO_FILTER_FINISHED: string = 'PMOActions.REQUEST_POST_PMO_FILTER_FINISHED';

export const postPMOFilter = (data: PMOFilter): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOListEnvelope>(dispatch, POST_PMO_FILTER, PMOEffects.postPMOFilter, data);
  };
};

export const PMO_PROJECT: string = 'PMOActions.REQUEST_PMO_PROJECT';
export const PMO_PROJECT_FINISHED: string = 'PMOActions.REQUEST_PMO_PROJECT_FINISHED';

export const postPMOProject = (data: PMOProjectEmplove): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PMO_PROJECT, PMOEffects.postPMOProject, data);
  };
};

export const PMO_PROJECT_BY_PROJECTID: string = 'PMOActions.REQUEST_PMO_PROJECT_BY_PROJECTID';
export const PMO_PROJECT_BY_PROJECTID_FINISHED: string = 'PMOActions.REQUEST_PMO_PROJECT_BY_PROJECTID_FINISHED';

export const getPMOProjectBy = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOProjectByIDModel>(dispatch, PMO_PROJECT_BY_PROJECTID, PMOEffects.getPMOProjectBy, projectId);
  };
};

  export const FUNNEL_SO_OI_EXIST: string = 'PMOActions.REQUEST_FUNNEL_SO_OI_EXIST';
  export const FUNNEL_SO_OI_EXIST_FINISHED: string = 'PMOActions.REQUEST_FUNNEL_SO_OI_EXIST_FINISHED';

  export const reqFunnelSOorOiExist = (funnelGenID?:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSOorOIExist[]>(
      dispatch,
      FUNNEL_SO_OI_EXIST,
      PMOEffects.reqFunnelSOorOiExist,
      funnelGenID
    );
  };
};

  export const CUSTOMER_FOR_PMO_PROJECT: string = 'PMOActions.REQUEST_CUSTOMER_FOR_PMO_PROJECT';
  export const CUSTOMER_FOR_PMO_PROJECT_FINISHED: string = 'PMOActions.REQUEST_CUSTOMER_FOR_PMO_PROJECT_FINISHED';

  export const getCustomerForPmoProject = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerForPmoProjectModel>(
      dispatch,
      CUSTOMER_FOR_PMO_PROJECT,
      PMOEffects.getCustomerForPmoProject,
      funnelGenID
    );
  };
};

  export const PROJECT_DROPDOWN: string = 'PMOActions.REQUEST_PROJECT_DROPDOWN';
  export const PROJECT_DROPDOWN_FINISHED: string = 'PMOActions.REQUEST_PROJECT_DROPDOWN_FINISHED';

  export const reqProjectDrp = (userLoginId:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSTypeSelect[]>(
      dispatch,
      PROJECT_DROPDOWN,
      PMOEffects.reqProjectDrp,
      userLoginId
    );
  };
};

  export const CUSTOMER_DROPDOWN: string = 'PMOActions.REQUEST_CUSTOMER_DROPDOWN';
  export const CUSTOMER_DROPDOWN_FINISHED: string = 'PMOActions.REQUEST_CUSTOMER_DROPDOWN_FINISHED';

  export const reqCustomerDrp = (userLoginId:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSTypeSelect[]>(
      dispatch,
      CUSTOMER_DROPDOWN,
      PMOEffects.reqCustomerDrp,
      userLoginId
    );
  };
};

  export const ASSIGN_DROPDOWN: string = 'PMOActions.REQUEST_ASSIGN_DROPDOWN';
  export const ASSIGN_DROPDOWN_FINISHED: string = 'PMOActions.REQUEST_ASSIGN_DROPDOWN_FINISHED';

  export const reqAssignDrp = (userLoginId:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSTypeSelect[]>(
      dispatch,
      ASSIGN_DROPDOWN,
      PMOEffects.reqAssignDrp,
      userLoginId
    );
  };
};

  export const SALES_DROPDOWN: string = 'PMOActions.REQUEST_SALES_DROPDOWN';
  export const SALES_DROPDOWN_FINISHED: string = 'PMOActions.REQUEST_SALES_DROPDOWN_FINISHED';

  export const reqSalesDrp = (userLoginId:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSTypeSelect[]>(
      dispatch,
      SALES_DROPDOWN,
      PMOEffects.reqSalesDrp,
      userLoginId
    );
  };
};

  export const PMO_SUMMARY_STATUS: string = 'PMOActions.REQUEST_PMO_SUMMARY_STATUS';
  export const PMO_SUMMARY_STATUS_FINISHED: string = 'PMOActions.REQUEST_PMO_SUMMARY_STATUS_FINISHED';

  export const reqPMOSummaryStatus = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOSTypeSelect[]>(
      dispatch,
      PMO_SUMMARY_STATUS,
      PMOEffects.reqPMOSummaryStatus
    );
  };
};

  export const PMO_VIEW_EDIT_PO: string = 'PMOActions.REQUEST_PMO_VIEW_EDIT_PO';
  export const PMO_VIEW_EDIT_PO_FINISHED: string = 'PMOActions.REQUEST_PMO_VIEW_EDIT_PO_FINISHED';

  export const reqPMOCustommerViewEditPO = (projectId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOViewEditCustommerPO>(
      dispatch,
      PMO_VIEW_EDIT_PO,
      PMOEffects.reqPMOCustommerViewEditPO,
      projectId
    );
  };
};

  export const VIEW_EDIT_STATUS_PROJECT_SUMMARY: string = 'PMOActions.REQUEST_VIEW_EDIT_STATUS_PROJECT_SUMMARY';
  export const VIEW_EDIT_STATUS_PROJECT_SUMMARY_FINISHED: string = 'PMOActions.REQUEST_VIEW_EDIT_STATUS_PROJECT_SUMMARY_FINISHED';
  export const VIEW_EDIT_STATUS_LATEST_MILESTONE: string = 'PMOActions.REQUEST_VIEW_EDIT_STATUS_LATEST_MILESTONE';
  export const VIEW_EDIT_STATUS_LATEST_MILESTONE_FINISHED: string = 'PMOActions.REQUEST_VIEW_EDIT_STATUS_LATEST_MILESTONE_FINISHED';

  export const reqStatusProjectViewEdit = (status:string,projectId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOViewEditStatus>(
      dispatch,
      status === "ProjectSummary" ? VIEW_EDIT_STATUS_PROJECT_SUMMARY : VIEW_EDIT_STATUS_LATEST_MILESTONE,
      PMOEffects.reqStatusProjectViewEdit,
      status,
      projectId
    );
  };
};

  export const VIEW_EDIT_PROGRESS_MILESTONE: string = 'PMOActions.REQUEST_VIEW_EDIT_PROGRESS_MILESTONE';
  export const VIEW_EDIT_PROGRESS_MILESTONE_FINISHED: string = 'PMOActions.REQUEST_VIEW_EDIT_PROGRESS_MILESTONE_FINISHED';

  export const reqProgressMilestone = (projectId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOProgressMilestone>(
      dispatch,
      VIEW_EDIT_PROGRESS_MILESTONE,
      PMOEffects.reqProgressMilestone,
      projectId
    );
  };
};

  export const PROGRESS_DETAIL_MILESTONE: string = 'PMOActions.REQUEST_PROGRESS_DETAIL_MILESTONE';
  export const PROGRESS_DETAIL_MILESTONE_FINISHED: string = 'PMOActions.REQUEST_PROGRESS_DETAIL_MILESTONE_FINISHED';

  export const reqProgressDetailMilestone = (projectId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOProgressDetailMilestone>(
      dispatch,
      PROGRESS_DETAIL_MILESTONE,
      PMOEffects.reqProgressDetailMilestone,
      projectId
    );
  };
};

  export const PMO_VIEW_EDIT_STATUS: string = 'PMOActions.REQUEST_PMO_VIEW_EDIT_STATUS';
  export const PMO_VIEW_EDIT_STATUS_FINISHED: string = 'PMOActions.REQUEST_PMO_VIEW_EDIT_STATUS_FINISHED';

  export const reqViewEditProjectStatus = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOViewEditProjectStatus>(
      dispatch,
      PMO_VIEW_EDIT_STATUS,
      PMOEffects.reqViewEditProjectStatus,
      projectId,
    );
  };
};

  export const REQUIREMENT_CLOSING_PROJECT: string = 'PMOActions.REQUEST_REQUIREMENT_CLOSING_PROJECT';
  export const REQUIREMENT_CLOSING_PROJECT_FINISHED: string = 'PMOActions.REQUEST_REQUIREMENT_CLOSING_PROJECT_FINISHED';

  export const reqRequirementClosingProject = (projectId:number,funnelGenId:number, projectStatus: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMORequirementClosingProject>(
      dispatch,
      REQUIREMENT_CLOSING_PROJECT,
      PMOEffects.reqRequirementClosingProject,
      projectId,
      funnelGenId,
      projectStatus
    );
  };
};

export const PUT_WARRANTY_DATE_PROJECT: string = 'PMOActions.REQUEST_PUT_WARRANTY_DATE_PROJECT';
export const PUT_WARRANTY_DATE_PROJECT_FINISHED: string = 'PMOActions.REQUEST_PUT_WARRANTY_DATE_PROJECT_FINISHED';
export const putWarrantyDateProject = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_WARRANTY_DATE_PROJECT, PMOEffects.putWarrantyDateProject, data);
  };
};

export const PUT_HANDOVER: string = 'PMOActions.REQUEST_PUT_HANDOVER';
export const PUT_HANDOVER_FINISHED: string = 'PMOActions.REQUEST_PUT_HANDOVER_FINISHED';
export const putHandover = (data: PMOHandOverModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_HANDOVER, PMOEffects.putHandover, data);
  };
};

export const PUT_PMO_PROJECT_STATUS: string = 'PMOActions.REQUEST_PUT_PMO_PROJECT_STATUS';
export const PUT_PMO_PROJECT_STATUS_FINISHED: string = 'PMOActions.REQUEST_PUT_PMO_PROJECT_STATUS_FINISHED';
export const putPMOProjectStatus = (data: PMOViewEditProjectStatusEditModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_PMO_PROJECT_STATUS, PMOEffects.putPMOProjectStatus, data);
  };
};

export const PUT_APPROVAL_SMO: string = 'PMOActions.REQUEST_PUT_APPROVAL_SMO';
export const PUT_APPROVAL_SMO_FINISHED: string = 'PMOActions.REQUEST_PUT_APPROVAL_SMO_FINISHED';
export const putApprovalSmo = (data: ApprovalSMOModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_APPROVAL_SMO, PMOEffects.putApprovalSmo, data);
  };
};

export const PUT_RESUBMIT: string = 'PMOActions.REQUEST_PUT_RESUBMIT';
export const PUT_RESUBMIT_FINISHED: string = 'PMOActions.REQUEST_PUT_RESUBMIT_FINISHED';
export const putResubmit = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_RESUBMIT, PMOEffects.putResubmit, data);
  };
};


export const PMO_TOP: string = 'PMOActions.REQUEST_PMO_TOP';
export const PMO_TOP_FINISHED: string = 'PMOActions.REQUEST_PMO_TOP_FINISHED';
export const reqPMOTop = (funnelGenID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOTopListModel>(
      dispatch,
      PMO_TOP,
      PMOEffects.reqPMOTop,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REASSIGN_PMO: string = 'PMOActions.REQUEST_REASSIGN_PMO';
export const REASSIGN_PMO_FINISHED: string = 'PMOActions.REQUEST_REASSIGN_PMO_FINISHED';
export const reqPutPMOReassign = (data: ReassignPmoModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REASSIGN_PMO,
      PMOEffects.reqPutPMOReassign,
      data
    );
  };
};

export const GET_SMO_MAPPING: string = 'PMOActions.REQUEST_GET_SMO_MAPPING';
export const GET_SMO_MAPPING_FINISHED: string = 'PMOActions.REQUEST_GET_SMO_MAPPING_FINISHED';
export const reqGetByEntryKey = (key: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOGetByEntryKeyModel[]>(
      dispatch,
      GET_SMO_MAPPING,
      PMOEffects.reqGetByEntryKey,
      key
    );
  };
};

export const GET_ACTUAL_DATE: string = 'PMOActions.REQUEST_GET_ACTUAL_DATE';
export const GET_ACTUAL_DATE_FINISHED: string = 'PMOActions.REQUEST_GET_ACTUAL_DATE_FINISHED';
export const reqGetActualDate = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PMOGetActualDateModel>(
      dispatch,
      GET_ACTUAL_DATE,
      PMOEffects.reqGetActualDate,
      projectId
    );
  };
};

export const PUT_ACTUAL_START: string = 'PMOActions.REQUEST_PUT_ACTUAL_START';
export const PUT_ACTUAL_START_FINISHED: string = 'PMOActions.REQUEST_PUT_ACTUAL_START_FINISHED';
export const PUT_ACTUAL_END: string = 'PMOActions.REQUEST_PUT_ACTUAL_END';
export const PUT_ACTUAL_END_FINISHED: string = 'PMOActions.REQUEST_PUT_ACTUAL_END_FINISHED';
export const putActual = (actual: string, projectId: number, actualDate: string, modifyUserId: number, projectStatus?: string ): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      actual === "actualStart" ? PUT_ACTUAL_START : PUT_ACTUAL_END,
      PMOEffects.putActual,
      actual,
      projectId,
      actualDate,
      modifyUserId,
      projectStatus,
    );
  };
};

export const GET_ALLOW_UPDATE: string = 'PMOActions.REQUEST_GET_ALLOW_UPDATE';
export const GET_ALLOW_UPDATE_FINISHED: string = 'PMOActions.REQUEST_GET_ALLOW_UPDATE_FINISHED';
export const getAllowUpdate = (projectId:number, userLoginId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CheckAllowedUpdateModel>(
      dispatch,
      GET_ALLOW_UPDATE,
      PMOEffects.getAllowUpdate,
      projectId,
      userLoginId,
    );
  };
};

export const SET_IS_EXPORT_EXCEL: string = 'PMOActions.SET_IS_EXPORT_EXCEL';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_IS_EXPORT_EXCEL, isExport);
};

export const SET_PAGE: string = 'PMOActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const CLEAR_RESULT: string = 'PMOActions.CLEAR_RESULT';
export const clearResult = (): IAction<number> => {
  return ActionUtility.createAction(CLEAR_RESULT);
};
