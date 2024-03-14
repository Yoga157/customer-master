import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import ResultActions from 'models/ResultActions';

export const requestWhatsNew = async (year: string): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'GoogleAPI/GetBuildDeploy?year=' + year;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};
