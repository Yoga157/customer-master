import * as AttachmentVersionsActions from './AttachmentVersionsActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import AttachmentVersionsModel from './models/AttachmentVersionsModel';
import AttachmentVersionsEnvelope from './models/AttachmentVersionsEnvelope';
import IAttachmentVersionsState from './models/IAttachmentVersionsState';

export const initialState: IAttachmentVersionsState = {
  listData: new AttachmentVersionsEnvelope({}) ,
  listDataPMO: new AttachmentVersionsEnvelope({}) ,
  firstData: new AttachmentVersionsModel({}),
  error:false,
  refreshPage:false
};

const attachmentVersionsReducer: Reducer = baseReducer(initialState,
  {
    [AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_FINISHED](state:IAttachmentVersionsState, action:IAction<AttachmentVersionsEnvelope>): IAttachmentVersionsState{
        return {
          ...state,
          listData:action.payload!,
          error:action.error!
        }
      },

    [AttachmentVersionsActions.REQUEST_ATTACHMENT_VERSIONS_HISTORY_PMO_FINISHED](state:IAttachmentVersionsState, action:IAction<AttachmentVersionsEnvelope>): IAttachmentVersionsState{
        return {
          ...state,
          listData:action.payload!,
          error:action.error!
        }
      },

      [AttachmentVersionsActions.RESTORE_ATTACHMENT_VERSION_FINISHED](state:IAttachmentVersionsState,
        action:IAction<AttachmentVersionsModel>):IAttachmentVersionsState{
        return {
          ...state,
          error:action.error!,
          refreshPage:(action.error) ? false : true    
        }
      },

      [AttachmentVersionsActions.DEL_ATTACHMENT_VERSION_FINISHED](state:IAttachmentVersionsState,
        action:IAction<AttachmentVersionsModel>):IAttachmentVersionsState{
        return {
          ...state,
          error:action.error!,
          refreshPage:(action.error) ? false : true    
        }
      },
  }
);

export default attachmentVersionsReducer;
