import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import ActionPlanNotesModel from './models/ActionPlanNotesModel';
import ActionPlanNotesHeaderModel from './models/ActionPlanNotesHeaderModel';
import ActionPlanNotesHistoryModel from './models/ActionPlanNotesHistoryModel';

export const requestHistory = async (funnelGenID: number, sourceNotes: string): Promise<ActionPlanNotesHistoryModel | HttpErrorResponseModel> => {
  const controllerName = 'ReportUnUpdateFunnel/GetHistoryForm?funnelGenID=' + funnelGenID + '&sourceNotes=' + sourceNotes;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ActionPlanNotesHistoryModel>(ActionPlanNotesHistoryModel, endpoint);
};

export const requestActionPlanById = async (
  funnelGenID: number,
  sourceNotes: string
): Promise<ActionPlanNotesHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'ReportUnupdateFunnel/GetHeaderForm?funnelGenID=' + funnelGenID + '&sourceNotes=' + sourceNotes;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ActionPlanNotesHeaderModel>(ActionPlanNotesHeaderModel, endpoint);
};

export const postActionPlanNotes = async (data: ActionPlanNotesModel): Promise<ActionPlanNotesModel | HttpErrorResponseModel> => {
  const controllerName = 'ReportUnupdateFunnel/Insert';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ActionPlanNotesModel>(ActionPlanNotesModel, endpoint, data);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
