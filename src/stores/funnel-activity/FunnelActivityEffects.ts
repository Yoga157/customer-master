import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelActivitiesModel from './models/FunnelActivitiesModel';
import FunnelActivityModel from './models/FunnelActivityModel';
import FunnelActivitySearch from './models/FunnelActivitySearch';
import FunnelNotesModel from './models/FunnelNotesModel';

export const postFunnelActivitieSearch = async (data: FunnelActivitySearch): Promise<FunnelActivitiesModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelActivity/Search';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelActivitiesModel[]>(FunnelActivitiesModel, endpoint, data);
};

export const requestFunnelActivities = async (funnelGenID: number): Promise<FunnelActivitiesModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelActivity/' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelActivitiesModel[]>(FunnelActivitiesModel, endpoint);
};

export const requestFunnelActivity = async (activityID: number): Promise<FunnelActivitiesModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelActivity/activityID=' + activityID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelActivitiesModel>(FunnelActivitiesModel, endpoint);
};

export const postActivity = async (data: FunnelActivityModel): Promise<FunnelActivityModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelActivity';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelActivityModel>(FunnelActivityModel, endpoint, data);
};

export const postFunnelNotes = async (data: FunnelNotesModel): Promise<FunnelNotesModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelNotes';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelNotesModel>(FunnelNotesModel, endpoint, data);
};
