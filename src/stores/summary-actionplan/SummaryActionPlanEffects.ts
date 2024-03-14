import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import SummaryActionPlanModel from './models/SummaryActionPlanModel';
import SummaryActionPlanHeaderModel from './models/SummaryActionPlanHeaderModel';
import SummaryActionPlanHistoryModel from './models/SummaryActionPlanHistoryModel';
import SummaryActionPlanSubordinateModel from './models/SummaryActionPlanSubordinateModel';

export const requestHistory = async (year: number, userLoginID: number): Promise<SummaryActionPlanHistoryModel | HttpErrorResponseModel> => {
  const controllerName = 'ReportSummaryPlan/GetHistoryForm?year=' + year + '&userLoginID=' + userLoginID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<SummaryActionPlanHistoryModel>(SummaryActionPlanHistoryModel, endpoint);
};

export const requestSubOrdinate = async (
  month: string,
  year: number,
  userLoginID: number,
  direktoratname: string
): Promise<SummaryActionPlanSubordinateModel | HttpErrorResponseModel> => {
  const controllerName =
    'ReportSummaryPlan/GetSubordinateForm?month=' + month + '&year=' + year + '&userLoginID=' + userLoginID + '&direktoratName=' + direktoratname;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<SummaryActionPlanSubordinateModel>(SummaryActionPlanSubordinateModel, endpoint);
};

export const requestSummaryActionPlanById = async (
  accName: string,
  month: string,
  year: number,
  user: number,
  direktoratname: string
): Promise<SummaryActionPlanHeaderModel | HttpErrorResponseModel> => {
  const controllerName =
    'ReportSummaryPlan/GetHeaderForm?AccName=' +
    accName +
    '&month=' +
    month +
    '&year=' +
    year +
    '&userLoginID=' +
    user +
    '&direktoratName=' +
    direktoratname;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SummaryActionPlanHeaderModel>(SummaryActionPlanHeaderModel, endpoint);
};

export const postSummaryActionPlan = async (data: SummaryActionPlanModel): Promise<SummaryActionPlanModel | HttpErrorResponseModel> => {
  const controllerName = 'ReportSummaryPlan/Insert';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<SummaryActionPlanModel>(SummaryActionPlanModel, endpoint, data);
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
