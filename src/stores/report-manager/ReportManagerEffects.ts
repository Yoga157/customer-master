import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios'
import * as EffectUtility from '../../utilities/EffectUtility'
import ReportManagerModel from './models/ReportManagerModel';

export const requestReportCategory = async():Promise<ReportManagerModel[] | HttpErrorResponseModel> => {
  let controllerName = `Udc/GetByEntryKey/ReportCategory`;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);

  return EffectUtility.getToModel<ReportManagerModel[]>(ReportManagerModel, endpoint);
};

export const requestReportItem = async(reportCategoryID:number):Promise<ReportManagerModel[] | HttpErrorResponseModel> => {
  let controllerName = 'Udc/GetListReportItems?ReportCategoryID=' + reportCategoryID;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);

  return EffectUtility.getToModel<ReportManagerModel[]>(ReportManagerModel, endpoint);
};

export const requestReportItemByID = async(ID:number):Promise<ReportManagerModel[] | HttpErrorResponseModel> => {
  let controllerName = 'Udc/' + ID;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);

  return EffectUtility.getToModel<ReportManagerModel[]>(ReportManagerModel, endpoint);
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
