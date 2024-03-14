import * as AttachmentVersionsEffects from './AttachmentVersionsEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import AttachmentVersionsModel from './models/AttachmentVersionsModel';
import AttachmentVersionsEnvelope from './models/AttachmentVersionsEnvelope';
import IStore from '../../models/IStore';

type ActionUnion = undefined | HttpErrorResponseModel | boolean | AttachmentVersionsModel | AttachmentVersionsEnvelope

export const REQUEST_ATTACHMENT_VERSIONS: string = 'AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS';
export const REQUEST_ATTACHMENT_VERSIONS_FINISHED: string = 'AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_FINISHED';

export const requestAttachmentVersions =(funnelGenID:number,fileName:string, docType:number, modul:number, userLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentVersionsEnvelope>(dispatch, REQUEST_ATTACHMENT_VERSIONS, AttachmentVersionsEffects.requestAttachmentVersions,funnelGenID, fileName, docType, modul, userLoginID);
  };
};

export const REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO: string = 'AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO';
export const REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO_FINISHED: string = 'AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO_FINISHED';

export const requestAttachmentVersionsPMO =(docNumber:number, fileName: string, documentTypeID:number, page:number, pageSize?:  number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AttachmentVersionsEnvelope>(dispatch, REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO, AttachmentVersionsEffects.requestAttachmentVersionsPMO,
      docNumber,
      fileName,
      documentTypeID,
      page,
      pageSize,
  )};
};


export const DEL_ATTACHMENT_VERSION:string ='AttachmentVersionsActions.REQUEST_DEL_ATTACHMENT_VERSION';
export const DEL_ATTACHMENT_VERSION_FINISHED ='AttachmentVersionsActions.REQUEST_DEL_ATTACHMENT_VERSION_FINISHED';
export const deleteAttachment = (funnelAttachmentID:string, userLogin:number ):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<AttachmentVersionsModel>(dispatch,DEL_ATTACHMENT_VERSION, AttachmentVersionsEffects.deleteAttachmentVersion, funnelAttachmentID,userLogin);
  }
}

export const RESTORE_ATTACHMENT_VERSION:string ='AttachmentVersionsActions.REQUEST_RESTORE_ATTACHMENT_VERSION';
export const RESTORE_ATTACHMENT_VERSION_FINISHED ='AttachmentVersionsActions.REQUEST_RESTORE_ATTACHMENT_VERSION_FINISHED';
export const restoreAttachment = (funnelAttachmentID:string, userLogin:number ):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<AttachmentVersionsModel>(dispatch,RESTORE_ATTACHMENT_VERSION, AttachmentVersionsEffects.restoreAttachmentVersion, funnelAttachmentID,userLogin);
  }
}

