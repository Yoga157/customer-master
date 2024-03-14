import * as SupportRoleEffects from './SupportRoleEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import SupportRoleModel from './models/SupportRoleModel';

type ActionUnion = undefined | HttpErrorResponseModel | SupportRoleModel[];

export const REQUEST_SUPPORT_ROLE: string = 'SupportRoleActions.REQUEST_SUPPORT_ROLE';
export const REQUEST_SUPPORT_ROLE_FINISHED: string = 'SupportRoleActions.REQUEST_SUPPORT_ROLE_FINISHED';

export const requestSupportRole = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SupportRoleModel[]>(dispatch, REQUEST_SUPPORT_ROLE, SupportRoleEffects.requestSupportRole);
  };
};
