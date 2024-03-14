import AttachmentTopActiveEnvelope from './models/AttachmentTopActiveEnvelope';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import AttachmentTempModel from './models/AttachmentTempModel';
import GeneralListEnvelope from './models/GeneralListEnvelope';
import * as EffectUtility from '../../utilities/EffectUtility'
import AttachmentEnvelope from './models/AttachmentEnvelope';
import AttachmentHistory from './models/AttachmentHistory';
import AttachmentMapper from './models/AttachmentMapper';
import AttachmentModel from './models/AttachmentModel';
import ResultActions from 'models/ResultActions';
import environment from 'environment'
import { v4 as uuidv4 } from 'uuid';

export const requestAttachmentLocal = async():Promise<AttachmentEnvelope | HttpErrorResponseModel> => {
  let jsonString =  localStorage.getItem("funnelAttachment")

  var listAttachment:AttachmentModel[] =[];
  let totalRows:number = 0;
  if(jsonString !== null)
  {
    listAttachment = JSON.parse(jsonString);
    totalRows = listAttachment.length
  }
  var result = new AttachmentEnvelope({totalRows:totalRows,rows:listAttachment})
  return result;
};

export const postAttachmentLocal = async(data:AttachmentModel):Promise<AttachmentModel| HttpErrorResponseModel> => {
  let jsonString = localStorage.getItem("funnelAttachment")
  var listAttachment:AttachmentModel[] = []

  if(jsonString !== null && jsonString !== "[]")
  {
    listAttachment = JSON.parse(jsonString);
    listAttachment.map((item) => {
      return item.funnelAttachmentID;  
    })
    data.funnelAttachmentID = uuidv4();
  }else{
    data.funnelAttachmentID = uuidv4();
  }

  var attachment = new AttachmentModel(data);
  listAttachment.push(attachment);
  localStorage.setItem('funnelAttachment', JSON.stringify(listAttachment));
  return attachment;
};

export const deleteAttachmentLocal = async(id:any):Promise<boolean | HttpErrorResponseModel> => {
  let jsonString = localStorage.getItem("funnelAttachment")
  var listAttachment:AttachmentModel[] = [];

  if(jsonString !== null && jsonString !== "[]")
  {
    listAttachment = JSON.parse(jsonString);
  }


  const newValue = listAttachment.filter((item:any) => {
    return item.funnelAttachmentID !== id
  })

  localStorage.setItem('funnelAttachment', JSON.stringify(newValue));
  return true;
};

export const postUploadTemp = async(data:AttachmentTempModel):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'FileFunnel/SaveAttachmentTemp';
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const postTempGeneric = async(data:AttachmentTempModel):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'FileFunnel/SaveAttachmentTempGeneric';
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};


export const requestAttachmentServer = async(funnelGenID:number,modul:number, page:number, pageSize:number, userLoginID: number):Promise<AttachmentEnvelope | HttpErrorResponseModel> => {
  let controllerName = `FileFunnel/funnelGenID=${funnelGenID}?modul=${modul}&page=${page}&pageSize=${pageSize}&UserLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);

  return EffectUtility.getToModel<AttachmentEnvelope>(AttachmentEnvelope, endpoint);
};

export const deleteAttachment = async(funnelGenID:number, documentType:number,fileName:string,userLogin:number ):Promise<AttachmentModel | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/Delete`;
  const data = {
    funnelGenID:funnelGenID,
    documentType:documentType,
    fileName:fileName,
    userLogin:userLogin
  }
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.postToModel<AttachmentModel>(AttachmentModel, endpoint,data);
};

export const deleteDocumentAllVersion = async(data: any):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/DeleteAcceptanceDocumentAllVersion`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModelBody<ResultActions>(ResultActions, endpoint, data);
};

export const postAttachment= async(data:AttachmentMapper):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'FileFunnel/Upload';
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const updateNotesAndTopNumber= async(data: any):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'FileFunnel/UpdateNotesAndTopNumber';
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const getAttachmentAndtAcceptence= async(funnelGenID: number, docNumber: number, page:number, pageSize:number, isDocTypeInvoice: boolean ):Promise<AttachmentTopActiveEnvelope | HttpErrorResponseModel > => {
  // let controllerName = `FileFunnel/GetAcceptanceDocument?docNumber=${docNumber}&modul=${modul}&documentTypeID=${documentTypeID}&page=${page}&pageSize=${pageSize}&userLoginID=${UserLoginID}&isAllowNullTopNumber=${isAllowNullTopNumber}`;
  let controllerName = `FileFunnel/GetAcceptanceByDocNumberAndFunnelGenId?funnelGenID=${funnelGenID}&docNumber=${docNumber}&page=${page}&pageSize=${pageSize}&isDocTypeInvoice=${isDocTypeInvoice}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);     
  return EffectUtility.getToModel<AttachmentTopActiveEnvelope>(AttachmentTopActiveEnvelope, endpoint);
};

export const getListGeneral= async(funnelGenID: number, page:number, pageSize:number ):Promise<GeneralListEnvelope | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/GetAcceptanceByFunnelGenId?funnelGenID=${funnelGenID}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);     
  return EffectUtility.getToModel<GeneralListEnvelope>(GeneralListEnvelope, endpoint);
};

export const getHistoryFileAttachment = async (docNumber:number, modul: number, docType: number, UserLoginID:number): Promise<AttachmentHistory[] | HttpErrorResponseModel> => {                    
  const controllerName = `FileFunnel/GetAcceptanceDocumentHistoryGroupDate?docNumber=${docNumber}&modul=${modul}&documentTypeID=${docType}&userLoginID=${UserLoginID}`;                     
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<AttachmentHistory[]>(AttachmentHistory, endpoint);
};

export const requestFileAttachment= async(funnelAttachmentID:string):Promise<any | HttpErrorResponseModel > => {
  let controllerName = `FileFunnel/download-file/${funnelAttachmentID}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.getToDownload<any>(Blob, endpoint);
};

export const removeResult= async(data:AttachmentMapper):Promise<ResultActions | HttpErrorResponseModel > => {
 let clearResult = new ResultActions({})

  return clearResult
};

