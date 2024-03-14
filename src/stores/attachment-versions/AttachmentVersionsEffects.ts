import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios'
import * as EffectUtility from '../../utilities/EffectUtility'
import AttachmentVersionsEnvelope from './models/AttachmentVersionsEnvelope';
import AttachmentVersionModel from './models/AttachmentVersionsModel';

export const requestAttachmentVersions = async(funnelGenID:number,fileName:string, docType:number, modul:number, userLoginID:  number):Promise<AttachmentVersionsEnvelope | HttpErrorResponseModel> => {
  let controllerName = `FileFunnel/${fileName}/${funnelGenID}?modul=${modul}&type=${docType}&UserLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);

  return EffectUtility.getToModel<AttachmentVersionsEnvelope>(AttachmentVersionsEnvelope, endpoint);
};

export const requestAttachmentVersionsPMO = async(docNumber:number, fileName: string, documentTypeID:number, page:number, pageSize?:  number):Promise<AttachmentVersionsEnvelope | HttpErrorResponseModel> => {
  let controllerName = `FileFunnel/GetAcceptanceDocumentHistory?docNumber=${docNumber}&fileName=${fileName}&documentTypeID=${documentTypeID}&page=${page}&pageSize=`;
  
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);

  return EffectUtility.getToModel<AttachmentVersionsEnvelope>(AttachmentVersionsEnvelope, endpoint);
};


export const deleteAttachmentVersion = async(funnelAttachmentID:string, userLogin:number ):Promise<AttachmentVersionModel | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/DeleteVersion?funnelAttachmentID=${funnelAttachmentID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModel<AttachmentVersionModel>(AttachmentVersionModel, endpoint);
};


export const restoreAttachmentVersion = async(funnelAttachmentID:string, userLogin:number ):Promise<AttachmentVersionModel | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/Restore?funnelAttachmentID=${funnelAttachmentID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.putToModel<AttachmentVersionModel>(AttachmentVersionModel, endpoint);
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
