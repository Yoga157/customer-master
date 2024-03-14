import * as AttachmentActions from './AttachmentActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import AttachmentModel from './models/AttachmentModel';
import AttachmentEnvelope from './models/AttachmentEnvelope';
import IAttachmentState from './models/IAttachmentState';
import AttachmentMapper from './models/AttachmentMapper';
import ResultActions from 'models/ResultActions'
import AttachmentTopActiveEnvelope from './models/AttachmentTopActiveEnvelope';
import FunnelTopHistoryEnvelope from 'stores/funnel-top/models/FunnelTopHistoryEnvelope';
import AttachmentHistory from './models/AttachmentHistory';
import GeneralListEnvelope from './models/GeneralListEnvelope';

export const initialState: IAttachmentState = {
  listData: new AttachmentEnvelope({}) ,
  firstData: new AttachmentModel({}),
  ResultActions: new ResultActions({}),
  attachmentNullTrue: new AttachmentTopActiveEnvelope({}),
  attachmentTopActive: new AttachmentTopActiveEnvelope({}),
  generalList: new GeneralListEnvelope({}),
  fileDownload:new Blob,
  attachmentTopHistory: [],
  error:false,
  refreshPage:false
};

const attachmentReducer: Reducer = baseReducer(initialState,
  {
    [AttachmentActions.POST_TEMP_FINISHED](state:IAttachmentState, action:IAction<ResultActions>): IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage: false
      }

    },

    [AttachmentActions.POST_TEMP_GENERIC_FINISHED](state:IAttachmentState, action:IAction<ResultActions>): IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage: false
      }

    },

    [AttachmentActions.REQUEST_ATTACHMENT_SERVER_FINISHED](state:IAttachmentState, action:IAction<AttachmentEnvelope>): IAttachmentState{
      return {
        ...state,
        listData:action.payload!,
        error:false,
        refreshPage:false
      }

    },
    
    [AttachmentActions.REQUEST_DOWNLOAD_ATTACHMENT_SERVER_FINISHED](state:IAttachmentState, action:IAction<any>): IAttachmentState{
      return {
        ...state,
        fileDownload:action.payload!,
        error:false,
        refreshPage:false
      }

    }, 

    [AttachmentActions.REQUEST_ATTACHMENT_LOCAL_FINISHED](state:IAttachmentState, action:IAction<AttachmentEnvelope>): IAttachmentState{
      return {
        ...state,
        listData:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL_FINISHED](state:IAttachmentState,
      action:IAction<AttachmentModel>):IAttachmentState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL_FINISHED](state:IAttachmentState,
      action:IAction<AttachmentModel>):IAttachmentState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.POST_ATTACHMENT_FINISHED](state:IAttachmentState,
      action:IAction<ResultActions>):IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.UPDATE_NOTES_TOP_ACCEPTENCE_FINISHED](state:IAttachmentState,
      action:IAction<ResultActions>):IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.GET_ATTACHMENT_AND_ACCEPTENCE_TRUE_FINISHED](state:IAttachmentState,
      action:IAction<AttachmentTopActiveEnvelope>):IAttachmentState{
      return {
        ...state,
        attachmentNullTrue: action.payload!,
        error:action.error!,
        refreshPage: false   
      }
    },

    [AttachmentActions.GET_ATTACHMENT_AND_ACCEPTENCE_FINISHED](state:IAttachmentState,
      action:IAction<AttachmentTopActiveEnvelope>):IAttachmentState{
      return {
        ...state,
        attachmentTopActive: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.GET_LIST_GENERAL_FINISHED](state:IAttachmentState,
      action:IAction<GeneralListEnvelope>):IAttachmentState{
      return {
        ...state,
        generalList: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.GET_HISTORY_FILE_ATTACHMENT_FINISHED](state: IAttachmentState, action: IAction<AttachmentHistory[]>): IAttachmentState {
      return {
        ...state,
        attachmentTopHistory: action.payload!,
        error: false,
        refreshPage: false,
      };
    },

    [AttachmentActions.REMOVE_ATTACHMENT_RESULT_FINISHED](state:IAttachmentState,
      action:IAction<ResultActions>):IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.DEL_ATTACHMENT_SERVER_FINISHED](state:IAttachmentState,
      action:IAction<AttachmentModel>):IAttachmentState{
      return {
        ...state,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },

    [AttachmentActions.DEL_ACCEPTENCE_DOC_VERSION_ALL_FINISHED](state:IAttachmentState,
      action:IAction<ResultActions>):IAttachmentState{
      return {
        ...state,
        ResultActions: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },
  }
);

export default attachmentReducer;
