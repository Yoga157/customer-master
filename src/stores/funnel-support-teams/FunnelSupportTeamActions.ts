import * as SupportTeamEffects from './FunnelSupportTeamEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import FunnelSupportTeamEnvelope from './models/FunnelSupportTeamEnvelope';
import FunnelSupportTeamModel from './models/FunnelSupportTeamModel';

type ActionUnion = undefined | HttpErrorResponseModel | FunnelSupportTeamEnvelope | FunnelSupportTeamModel;

export const REQUEST_SUPPORT_TEAMS: string = 'FunnelSupportTeamActions.REQUEST_SUPPORT_TEAMS';
export const REQUEST_SUPPORT_TEAMS_FINISHED: string = 'FunnelSupportTeamActions.REQUEST_SUPPORT_TEAMS_FINISHED';

export const requestSupportTeamsByFunnelGenID = (funnelGenId: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSupportTeamEnvelope>(
      dispatch,
      REQUEST_SUPPORT_TEAMS,
      SupportTeamEffects.requestSupportTeamsByFunnelGenID,
      funnelGenId,
      page,
      pageSize
    );
  };
};

export const REQUEST_SUPPORT_TEAM: string = 'FunnelSupportTeamActions.REQUEST_SUPPORT_TEAM';
export const REQUEST_SUPPORT_TEAM_FINISHED: string = 'FunnelSupportTeamActions.REQUEST_SUPPORT_TEAM_FINISHED';

export const requestSupportTeamsBySupportID = (supportID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSupportTeamModel>(
      dispatch,
      REQUEST_SUPPORT_TEAM,
      SupportTeamEffects.requestSupportTeamsBySupportID,
      supportID
    );
  };
};

export const REQUEST_POST_SUPPORT_TEAMS: string = 'FunnelSupportTeamActions.REQUEST_POST_SUPPORT_TEAMS';
export const REQUEST_POST_SUPPORT_TEAMS_FINISHED = 'FunnelSupportTeamActions.REQUEST_POST_SUPPORT_TEAMS_FINISHED';
export const postSupportTeams = (data: FunnelSupportTeamModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSupportTeamModel>(dispatch, REQUEST_POST_SUPPORT_TEAMS, SupportTeamEffects.postSupportTeams, data);
  };
};

export const REQUEST_PUT_SUPPORT_TEAMS: string = 'FunnelSupportTeamActions.REQUEST_PUT_SUPPORT_TEAMS';
export const REQUEST_PUT_SUPPORT_TEAMS_FINISHED = 'FunnelSupportTeamActions.REQUEST_PUT_SUPPORT_TEAMS_FINISHED';
export const putSupportTeams = (data: FunnelSupportTeamModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSupportTeamModel>(dispatch, REQUEST_PUT_SUPPORT_TEAMS, SupportTeamEffects.putSupportTeams, data);
  };
};

export const DEL_SUPPORT_TEAM: string = 'FunnelSupportTeamActions.DEL_SUPPORT_TEAM';
export const DEL_SUPPORT_TEAM_FINISHED = 'FunnelSupportTeamActions.DEL_SUPPORT_TEAM_FINISHED';
export const delSupportTeams = (supportID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSupportTeamModel>(dispatch, DEL_SUPPORT_TEAM, SupportTeamEffects.delSupportTeams, supportID);
  };
};
