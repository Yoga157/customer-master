import IDocumentTypeState from './models/IDocumentTypeState';
import * as DocumentTypeAction from './DocumentTypeAction';
import IAction from '../../models/IAction';
import DocumentTypeModel from './models/DocumentTypeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IDocumentTypeState = {
  data: [],
  invoiceCategory: [],
  error: false,
};

const documentTypeReducer: Reducer = baseReducer(initialState, {
  [DocumentTypeAction.REQUEST_DOCUMENT_TYPE_FINISHED](state: IDocumentTypeState, action: IAction<DocumentTypeModel[]>): IDocumentTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
  [DocumentTypeAction.REQUEST_DOCUMENT_TYPE_BY_ROLE_FINISHED](state: IDocumentTypeState, action: IAction<DocumentTypeModel[]>): IDocumentTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
  [DocumentTypeAction.INVOICE_CATEGORY_FINISHED](state: IDocumentTypeState, action: IAction<DocumentTypeModel[]>): IDocumentTypeState {
    return {
      ...state,
      invoiceCategory: action.payload!,
      error: action.error!,
    };
  },
});

export default documentTypeReducer;
