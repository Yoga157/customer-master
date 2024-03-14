import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import CommissionIndexModel from './models/CommissionIndexModel';

export const requestCommissionIndex = async (): Promise<CommissionIndexModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/CommissionIndex';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CommissionIndexModel[]>(CommissionIndexModel, endpoint);
};
