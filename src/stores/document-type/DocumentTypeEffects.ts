import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import DocumentTypeModel from './models/DocumentTypeModel';

export const requestDocumentType = async (): Promise<DocumentTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = `DocType`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<DocumentTypeModel[]>(DocumentTypeModel, endpoint);
};

export const requestDocumentTypeByRole = async (role: string,modul: string): Promise<DocumentTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = `DocType/role=${role}?modul=${modul}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<DocumentTypeModel[]>(DocumentTypeModel, endpoint);
};

export const reqInvoiceCategory = async (): Promise<DocumentTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = `DocType/InvoiceCategory`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<DocumentTypeModel[]>(DocumentTypeModel, endpoint);
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
