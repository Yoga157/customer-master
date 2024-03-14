import * as DocumentTypeEffect from './DocumentTypeEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import DocumentTypeModel from './models/DocumentTypeModel';

type ActionUnion = undefined | HttpErrorResponseModel | DocumentTypeModel[];

export const REQUEST_DOCUMENT_TYPE: string = 'DocumentTypeAction.REQUEST_DOCUMENT_TYPE';
export const REQUEST_DOCUMENT_TYPE_FINISHED: string = 'DocumentTypeAction.REQUEST_DOCUMENT_TYPE_FINISHED';

export const requestDocumentType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DocumentTypeModel[]>(dispatch, REQUEST_DOCUMENT_TYPE, DocumentTypeEffect.requestDocumentType);
  };
};

export const REQUEST_DOCUMENT_TYPE_BY_ROLE: string = 'DocumentTypeAction.REQUEST_DOCUMENT_TYPE_BY_ROLE';
export const REQUEST_DOCUMENT_TYPE_BY_ROLE_FINISHED: string = 'DocumentTypeAction.REQUEST_DOCUMENT_TYPE_BY_ROLE_FINISHED';

export const requestDocumentTypeByRole = (role: string,modul: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DocumentTypeModel[]>(dispatch, REQUEST_DOCUMENT_TYPE, DocumentTypeEffect.requestDocumentTypeByRole, role, modul);
  };
};

export const INVOICE_CATEGORY: string = 'DocumentTypeAction.REQUEST_INVOICE_CATEGORY';
export const INVOICE_CATEGORY_FINISHED: string = 'DocumentTypeAction.REQUEST_INVOICE_CATEGORY_FINISHED';
export const reqInvoiceCategory = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DocumentTypeModel[]>(dispatch, INVOICE_CATEGORY, DocumentTypeEffect.reqInvoiceCategory);
  };
};
