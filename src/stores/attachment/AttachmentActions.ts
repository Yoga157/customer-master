import AttachmentTopActiveEnvelope from './models/AttachmentTopActiveEnvelope';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import GeneralListEnvelope from './models/GeneralListEnvelope';
import * as ActionUtility from '../../utilities/ActionUtility';
import AttachmentTempModel from './models/AttachmentTempModel';
import AttachmentEnvelope from './models/AttachmentEnvelope';
import AttachmentHistory from './models/AttachmentHistory';
import AttachmentMapper from './models/AttachmentMapper';
import * as AttachmentEffects from './AttachmentEffects';
import { ReduxDispatch } from '../../models/ReduxProps';
import AttachmentModel from './models/AttachmentModel';
import ResultActions from 'models/ResultActions'

type ActionUnion = undefined | HttpErrorResponseModel | boolean | AttachmentModel |
     AttachmentEnvelope | AttachmentTempModel | AttachmentMapper | ResultActions | AttachmentTopActiveEnvelope | GeneralListEnvelope | FunnelHistoryEnvelope[] | AttachmentHistory[]



export const REQUEST_ATTACHMENT_LOCAL: string = 'AttachmentActions.REQUEST_ATTACHMENT_LOCAL';
export const REQUEST_ATTACHMENT_LOCAL_FINISHED: string = 'AttachmentActions.REQUEST_ATTACHMENT_LOCAL_FINISHED';

export const requestAttachmentLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentEnvelope>(dispatch, REQUEST_ATTACHMENT_LOCAL, AttachmentEffects.requestAttachmentLocal);
  };
};

export const REQUEST_POST_ATTACHMENT_LOCAL: string = 'AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL';
export const REQUEST_POST_ATTACHMENT_LOCAL_FINISHED: string = 'AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL_FINISHED';

export const postAttachmentLocal = (data:AttachmentModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentModel>(dispatch, REQUEST_POST_ATTACHMENT_LOCAL, AttachmentEffects.postAttachmentLocal, data);
  };
};

export const REQUEST_DELETE_ATTACHMENT_LOCAL: string = 'AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL';
export const REQUEST_DELETE_ATTACHMENT_LOCAL_FINISHED: string = 'AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL_FINISHED';
export const deleteAttachmentLocal = (id:any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<boolean>(dispatch, REQUEST_DELETE_ATTACHMENT_LOCAL, AttachmentEffects.deleteAttachmentLocal, id);
  };
};

export const POST_TEMP:string ='AttachmentActions.REQUEST_POST_TEMP';
export const POST_TEMP_FINISHED ='AttachmentActions.REQUEST_POST_TEMP_FINISHED';
export const postTemp = (data:any):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,POST_TEMP, AttachmentEffects.postUploadTemp, data );
  }
}

export const POST_TEMP_GENERIC:string ='AttachmentActions.REQUEST_POST_TEMP_GENERIC';
export const POST_TEMP_GENERIC_FINISHED ='AttachmentActions.REQUEST_POST_TEMP_GENERIC_FINISHED';
export const postTempGeneric = (data:any):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,POST_TEMP_GENERIC, AttachmentEffects.postTempGeneric, data );
  }
}

export const REQUEST_ATTACHMENT_SERVER: string = 'AttachmentActions.REQUEST_ATTACHMENT_SERVER';
export const REQUEST_ATTACHMENT_SERVER_FINISHED: string = 'AttachmentActions.REQUEST_ATTACHMENT_SERVER_FINISHED';

export const requestAttachmentServer = (funnelGenID:number,modul:number, page:number, pageSize:number, userLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentEnvelope>(dispatch, REQUEST_ATTACHMENT_SERVER, AttachmentEffects.requestAttachmentServer,funnelGenID, modul, page, pageSize, userLoginID);
  };
};   

export const DEL_ATTACHMENT_SERVER:string ='AttachmentActions.REQUEST_DEL_ATTACHMENT_SERVER';
export const DEL_ATTACHMENT_SERVER_FINISHED ='AttachmentActions.REQUEST_DEL_ATTACHMENT_SERVER_FINISHED';
export const deleteAttachment = (funnelGenID:number, documentType:number,fileName:string,userLogin:number ):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<AttachmentModel>(dispatch,DEL_ATTACHMENT_SERVER, AttachmentEffects.deleteAttachment, funnelGenID, documentType,fileName,userLogin);
  }
}

export const DEL_ACCEPTENCE_DOC_VERSION_ALL:string ='AttachmentActions.REQUEST_DEL_ACCEPTENCE_DOC_VERSION_ALL';
export const DEL_ACCEPTENCE_DOC_VERSION_ALL_FINISHED ='AttachmentActions.REQUEST_DEL_ACCEPTENCE_DOC_VERSION_ALL_FINISHED';
export const deleteDocumentAllVersion = (data: any):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,DEL_ACCEPTENCE_DOC_VERSION_ALL, AttachmentEffects.deleteDocumentAllVersion, data);
  }
}


export const POST_ATTACHMENT:string ='AttachmentActions.REQUEST_POST_ATTACHMENT';
export const POST_ATTACHMENT_FINISHED ='AttachmentActions.REQUEST_POST_ATTACHMENT_FINISHED';
export const postAttachment = (data:any):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,POST_ATTACHMENT, AttachmentEffects.postAttachment, data );
  }
}

export const UPDATE_NOTES_TOP_ACCEPTENCE:string ='AttachmentActions.REQUEST_UPDATE_NOTES_TOP_ACCEPTENCE';
export const UPDATE_NOTES_TOP_ACCEPTENCE_FINISHED ='AttachmentActions.REQUEST_UPDATE_NOTES_TOP_ACCEPTENCE_FINISHED';
export const updateNotesAndTopNumber = (data:any):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,UPDATE_NOTES_TOP_ACCEPTENCE, AttachmentEffects.updateNotesAndTopNumber, data );
  }
}

export const GET_ATTACHMENT_AND_ACCEPTENCE_TRUE:string ='AttachmentActions.REQUEST_GET_ATTACHMENT_AND_ACCEPTENCE_TRUE';
export const GET_ATTACHMENT_AND_ACCEPTENCE_TRUE_FINISHED ='AttachmentActions.REQUEST_GET_ATTACHMENT_AND_ACCEPTENCE_TRUE_FINISHED';
export const GET_ATTACHMENT_AND_ACCEPTENCE:string ='AttachmentActions.REQUEST_GET_ATTACHMENT_AND_ACCEPTENCE';
export const GET_ATTACHMENT_AND_ACCEPTENCE_FINISHED ='AttachmentActions.REQUEST_GET_ATTACHMENT_AND_ACCEPTENCE_FINISHED';
export const getAttachmentAndtAcceptence = ( funnelGenID: number, docNumber: number, page:number, pageSize:number, isDocTypeInvoice: boolean
):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<AttachmentTopActiveEnvelope>(dispatch,!isDocTypeInvoice ? GET_ATTACHMENT_AND_ACCEPTENCE_TRUE : GET_ATTACHMENT_AND_ACCEPTENCE, AttachmentEffects.getAttachmentAndtAcceptence,
        funnelGenID,
        docNumber,
        page,
        pageSize,
        isDocTypeInvoice );
  }
}

export const GET_LIST_GENERAL:string ='AttachmentActions.REQUEST_GET_LIST_GENERAL';
export const GET_LIST_GENERAL_FINISHED ='AttachmentActions.REQUEST_GET_LIST_GENERAL_FINISHED';
export const getListGeneral = ( funnelGenID: number, page:number, pageSize:number
):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<GeneralListEnvelope>(
        dispatch,
        GET_LIST_GENERAL, 
        AttachmentEffects.getListGeneral,
        funnelGenID,
        page,
        pageSize,
      )
  }
}

export const GET_HISTORY_FILE_ATTACHMENT: string = 'AttachmentActions.REQUEST_GET_HISTORY_FILE_ATTACHMENT';
export const GET_HISTORY_FILE_ATTACHMENT_FINISHED: string = 'AttachmentActions.REQUEST_GET_HISTORY_FILE_ATTACHMENT_FINISHED';

export const getHistoryFileAttachment = (docNumber:number, modul: number, docType: number, UserLoginID:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentHistory[]>(
      dispatch, 
      GET_HISTORY_FILE_ATTACHMENT, 
      AttachmentEffects.getHistoryFileAttachment, 
      docNumber,
      modul,
      docType,
      UserLoginID
);
  };
};


export const REQUEST_DOWNLOAD_ATTACHMENT_SERVER: string = 'AttachmentActions.REQUEST_DOWNLOAD_ATTACHMENT_SERVER';
export const REQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED: string = 'AttachmentActions.RREQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED';

export const requestFileAttachment = (funnelAttachmentID:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentEnvelope>(dispatch, REQUEST_ATTACHMENT_SERVER, AttachmentEffects.requestFileAttachment,funnelAttachmentID);
  };
};



export const REMOVE_ATTACHMENT_RESULT:string ='AttachmentActions.REMOVE_ATTACHMENT_RESULT';
export const REMOVE_ATTACHMENT_RESULT_FINISHED = 'AttachmentActions.REMOVE_ATTACHMENT_RESULT_FINISHED';

export const removeResult = ():any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,REMOVE_ATTACHMENT_RESULT, AttachmentEffects.removeResult );
  }
}

