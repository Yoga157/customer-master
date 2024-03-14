import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';
import IStore from 'models/IStore';
import ListDelegationModel from './models/ListDelegationModel';

import * as DelegationEffects from './DelegationEffects'
import DelegationModel from './models/DelegationModel';
import ListAplicationModel from './models/ListAplicationModel';


type ActionUnion =
    HttpErrorResponseModel
  | ResultActions
  | undefined
  | boolean
  | ListDelegationModel
  | ListAplicationModel[]
  | DelegationModel

export const REQUEST_DELEGATION: string = 'delegationActions.REQUEST_DELEGATION';
export const REQUEST_DELEGATION_FINISHED: string = 'delegationActions.REQUEST_DELEGATION_FINISHED';

  export const requestDelegation = (userLoginID: number, page: number, pageSize: number,searchText?: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ListDelegationModel>(
      dispatch,
      REQUEST_DELEGATION,
      DelegationEffects.requestDelegation,
      userLoginID,
      page,
      pageSize,
      searchText
    );
  };
};

export const REQUEST_POST_DELEGATION: string = 'delegationActions.REQUEST_POST_DELEGATION';
export const REQUEST_POST_DELEGATION_FINISHED: string = 'delegationActions.REQUEST_POST_DELEGATION_FINISHED';

export const postDelegation = (data: DelegationModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_DELEGATION, DelegationEffects.postDelegation, data);
  };
};

export const REQUEST_PUT_DELEGATION: string = 'delegationActions.REQUEST_PUT_DELEGATION';
export const REQUEST_PUT_DELEGATION_FINISHED: string = 'delegationActions.REQUEST_PUT_DELEGATION_FINISHED';

export const putDelegation = (data: DelegationModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_DELEGATION, DelegationEffects.putDelegation, data);
  };
};

export const REQUEST_DELETE_DELEGATIONBY_ID: string = 'delegationActions.REQUEST_DELETE_DELEGATIONBY_ID';
export const REQUEST_DELETE_DELEGATIONBY_ID_FINISHED: string = 'delegationActions.REQUEST_DELETE_DELEGATIONBY_ID_FINISHED';

export const deleteDelegation = (id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DELETE_DELEGATIONBY_ID, DelegationEffects.deleteDelegation, id);
  };
};

export const REQUEST_DELEGATION_BY_ID: string = 'BrandModelActions.REQUEST_DELEGATION_BY_ID';
export const REQUEST_DELEGATION_BY_ID_FINISHED: string = 'BrandModelActions.REQUEST_DELEGATION_BY_ID_FINISHED';

export const requestDelegationById = (DelegationByID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<DelegationModel>(
      dispatch,
      REQUEST_DELEGATION_BY_ID,
      DelegationEffects.requestDelegationById,
      DelegationByID
    );
  };
};

export const REQUEST_APPLICATION: string = 'delegationActions.REQUEST_APPLICATION';
export const REQUEST_APPLICATION_FINISHED: string = 'delegationActions.REQUEST_APPLICATION_FINISHED';

export const requestApplication = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ListAplicationModel[]>(dispatch, REQUEST_APPLICATION, DelegationEffects.requestApplication);
  };
};



export const REMOVE_ATTACHMENT_RESULT:string ='delegationActions.REMOVE_ATTACHMENT_RESULT';
export const REMOVE_ATTACHMENT_RESULT_FINISHED = 'delegationActions.REMOVE_ATTACHMENT_RESULT_FINISHED';

export const removeResult = ():any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,REMOVE_ATTACHMENT_RESULT, DelegationEffects.removeResult );
  }
}