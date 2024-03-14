import * as COSTEffects from './COSTEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import CostTypeModel from './models/CostTypeModel';
import CostNameModel from './models/CostNameModel';
import TableRowModel from './models/TableRowModel';
import CostRequestModel from './models/COSTRequestModel';
import COFModel from './models/COFModel';
import PersenModel from './models/PersenModel';
import { StrictCommentGroupProps } from 'semantic-ui-react';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CostRequestModel
  | CostTypeModel
  | CostNameModel
  | TableRowModel
  | TableRowModel[]
  | COFModel
  | PersenModel
  | FunnelHistoryEnvelope[];

//Hendz PMT
export const REQUEST_PMT: string = 'COSTActions.REQUEST_PMT';
export const REQUEST_PMT_FINISHED: string = 'COSTActions.REQUEST_PMT_FINISHED';

export const requestPMT = (cost: number, duration: number, TOP: string, bunga: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<COFModel>(dispatch, REQUEST_PMT, COSTEffects.requestPMT, cost, duration, TOP, bunga);
  };
};
export const REQUEST_PMT_LOCAL: string = 'COSTActions.REQUEST_PMT_LOCAL';
export const REQUEST_PMT_LOCAL_FINISHED: string = 'COSTActions.REQUEST_PMT_LOCAL_FINISHED';

export const requestPMTLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<any>(dispatch, REQUEST_PMT_LOCAL, COSTEffects.requestPMTLocal);
  };
};

export const REQUEST_DROPDOWN_COF: string = 'COSTActions.REQUEST_DROPDOWN_COF';
export const REQUEST_DROPDOWN_COF_FINISHED: string = 'COSTActions.REQUEST_DROPDOWN_COF_FINISHED';

export const requestDropdownCOF = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostTypeModel>(dispatch, REQUEST_DROPDOWN_COF, COSTEffects.requestDropdownCOF, funnelGenID);
  };
};

export const REQUEST_PERSEN_COF: string = 'COSTActions.REQUEST_PERSEN_COF';
export const REQUEST_PERSEN_COF_FINISHED: string = 'COSTActions.REQUEST_PERSEN_COF_FINISHED';

export const requestPersenCOF = (entryKey: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PersenModel>(dispatch, REQUEST_PERSEN_COF, COSTEffects.requestPersenCOF, entryKey);
  };
};

//-----------------------------------------

export const REQUEST_COSTTYPE: string = 'COSTActions.REQUEST_COSTTYPE';
export const REQUEST_COSTTYPE_FINISHED: string = 'COSTActions.REQUEST_COSTTYPE_FINISHED';

export const requestCostType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostTypeModel>(dispatch, REQUEST_COSTTYPE, COSTEffects.requestCostType);
  };
};

export const REQUEST_COSTNAME: string = 'COSTActions.REQUEST_COSTNAME';
export const REQUEST_COSTNAME_FINISHED: string = 'COSTActions.REQUEST_COSTNAME_FINISHED';

export const requestCostNameById = (costTypeId: number, userLoginID: number, funnelStatusID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostNameModel>(
      dispatch,
      REQUEST_COSTNAME,
      COSTEffects.requestCostNameById,
      costTypeId,
      userLoginID,
      funnelStatusID
    );
  };
};

export const REQUEST_INSERT_COSTNAME: string = 'COSTActions.REQUEST_INSERT_COSTNAME';
export const REQUEST_INSERT_COSTNAME_FINISHED: string = 'COSTActions.REQUEST_INSERT_COSTNAME_FINISHED';

export const postCostName = (data: CostNameModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostNameModel>(dispatch, REQUEST_INSERT_COSTNAME, COSTEffects.postCostName, data);
  };
};

export const REQUEST_FUNNEL_TABLEROW: string = 'COSTActions.REQUEST_FUNNEL_TABLEROW';
export const REQUEST_FUNNEL_TABLEROW_FINISHED: string = 'COSTActions.REQUEST_FUNNEL_TABLEROW_FINISHED';

export const getFunnelById = (funnelId): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<TableRowModel>(dispatch, REQUEST_FUNNEL_TABLEROW, COSTEffects.getFunnelById, funnelId);
  };
};

export const REQUEST_POST_FUNNEL_COST: string = 'COSTActions.REQUEST_POST_FUNNEL_COST';
export const REQUEST_POST_FUNNEL_COST_FINISHED: string = 'COSTActions.REQUEST_POST_FUNNEL_COST_FINISHED';

export const postFunnelCost = (data: CostRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostRequestModel>(dispatch, REQUEST_POST_FUNNEL_COST, COSTEffects.postFunnelCost, data);
  };
};

export const DEL_FUNNEL_COST: string = 'COSTActions.DEL_FUNNEL_COST';
export const DEL_FUNNEL_COST_FINISHED: string = 'COSTActions.DEL_FUNNEL_COST_FINISHED';

export const deleteFunnelCost = (funnelCostID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostRequestModel>(dispatch, DEL_FUNNEL_COST, COSTEffects.deleteFunnelCost, funnelCostID);
  };
};

export const REQUEST_PUT_FUNNEL_COST: string = 'COSTActions.REQUEST_PUT_FUNNEL_COST';
export const REQUEST_PUT_FUNNEL_COST_FINISHED: string = 'COSTActions.REQUEST_PUT_FUNNEL_COST_FINISHED';

export const putFunnelCost = (data: CostRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostRequestModel>(dispatch, REQUEST_PUT_FUNNEL_COST, COSTEffects.putFunnelCost, data);
  };
};

export const REQUEST_FUNNEL_TABLEROW_LOCAL: string = 'COSTActions.REQUEST_FUNNEL_TABLEROW_LOCAL';
export const REQUEST_FUNNEL_TABLEROW_LOCAL_FINISHED: string = 'COSTActions.REQUEST_FUNNEL_TABLEROW_LOCAL_FINISHED';

export const getFunnelByIdLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<TableRowModel>(dispatch, REQUEST_FUNNEL_TABLEROW_LOCAL, COSTEffects.getFunnelByIdLocal);
  };
};

export const POST_FUNNEL_COST_LOCAL: string = 'COSTActions.POST_FUNNEL_COST_LOCAL';
export const POST_FUNNEL_COST_LOCAL_FINISHED: string = 'COSTActions.POST_FUNNEL_COST_LOCAL_FINISHED';

export const postFunnelCostLocal = (data: CostRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CostRequestModel>(dispatch, POST_FUNNEL_COST_LOCAL, COSTEffects.postFunnelCostLocal, data);
  };
};

export const DEL_FUNNEL_COST_LOCAL: string = 'COSTActions.DEL_FUNNEL_COST_LOCAL';
export const DEL_FUNNEL_COST_LOCAL_FINISHED: string = 'COSTActions.DEL_FUNNEL_COST_LOCAL_FINISHED';

export const deleteFunnelCostLocal = (data: TableRowModel, funnelCostID: number, isSalesAnalis?: boolean): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<TableRowModel>(
      dispatch,
      DEL_FUNNEL_COST_LOCAL,
      COSTEffects.deleteFunnelCostLocal,
      data,
      funnelCostID,
      isSalesAnalis
    );
  };
};

export const PUT_FUNNEL_COST_LOCAL: string = 'COSTActions.PUT_FUNNEL_COST_LOCAL';
export const PUT_FUNNEL_COST_LOCAL_FINISHED: string = 'COSTActions.PUT_FUNNEL_COST_LOCAL_FINISHED';

export const putFunnelCostLocal = (data: TableRowModel, funnelCostID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<TableRowModel>(dispatch, PUT_FUNNEL_COST_LOCAL, COSTEffects.putFunnelCostLocal, data, funnelCostID);
  };
};

// export const ADD_COST: string = 'COSTActions.REQUEST_USER';
// export const ADD_COST_FINISHED: string = 'COSTActions.REQUEST_USER_FINISHED';

// export const requestAddCost = (userId): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
//     await ActionUtility.createThunkEffect<User>(dispatch, ADD_COST, COSTEffects.requestAddCost,userId);
//   };
// };

export const REQUEST_FUNNEL_COST_HISTORY: string = 'COSTActions.REQUEST_FUNNEL_COST_HISTORY';
export const REQUEST_FUNNEL_COST_HISTORY_FINISHED: string = 'COSTActions.REQUEST_FUNNEL_COST_HISTORY_FINISHED';

export const requestFunnelCostHistoryById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHistoryEnvelope[]>(
      dispatch,
      REQUEST_FUNNEL_COST_HISTORY,
      COSTEffects.requestFunnelCostHistoryById,
      funnelGenID
    );
  };
};
