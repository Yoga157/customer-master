import IGeneratedState from './models/IGeneratedState';
import * as GenerateFormActions from './GenerateFormActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelSATableModel from './models/FunnelSATableModel';
import ResultActions from 'models/ResultActions';
import FormTypeModel from './models/FormTypeModel';
import FunnelSARowModel from './models/FunnelSARowModel';

export const initialState: IGeneratedState = {
  dataFunnelSA: new FunnelSATableModel({}),
  dataGeneratedForm: [],
  employee: [],
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  dataById: [],
  listDirektorat: [],
  checkData: "",
  listFormType: [],
  funnelSAObject: new FunnelSARowModel({}),
  projectList: []
};

const funnelReducer: Reducer = baseReducer(initialState,
  {
  

    [GenerateFormActions.REQUEST_FUNNEL_SA_TABLE_FINISHED](state:IGeneratedState, action:IAction<FunnelSATableModel>): IGeneratedState{
      return {
        ...state,
        dataFunnelSA:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED](state:IGeneratedState, action:IAction<FunnelSATableModel>): IGeneratedState{
      return {
        ...state,
        dataFunnelSA:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.REQUEST_GENERATED_FORM_TABLE_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        dataGeneratedForm:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    
    [GenerateFormActions.REQUEST_SEARCH_GENERATED_FORM_TABLE_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        dataGeneratedForm:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    // [GenerateFormActions.REQUEST_PROJECT_FUNNEL_SA_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
    //   return {
    //     ...state,
    //     projectList:action.payload!,
    //     error:false,
    //     refreshPage:false
    //   }

    // },

    [GenerateFormActions.REQUEST_DROPDOWN_FORM_TYPE_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        listFormType:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.REQUEST_POST_GENERATED_FORM_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.REQUEST_PUT_GENERATED_FORM_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    
    [GenerateFormActions.REQUEST_DELETE_GENERATED_FORM_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.INSERT_FUNNEL_SA_OBJECT_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        funnelSAObject:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.CLEAR_FUNNEL_SA_OBJECT_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {
        ...state,
        funnelSAObject:action.payload!,
        error:false,
        refreshPage:false
      }

    },

    [GenerateFormActions.CLEAR_RESULT_GENERATE_FINISHED](state:IGeneratedState, action:IAction<any>): IGeneratedState{
      return {  
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage:false
      }

    },


    // [GenerateFormActions.REQUEST_FUNNELS_OPPORTUNITY_SALES_FINISHED](state:IFunnelState, action:IAction<FunnelOpportunityModel>): IFunnelState{
    //   return {
    //     ...state,
    //     data:action.payload!,
    //     error:false,
    //     refreshPage:false
    //   }

    // },

   
    
    
    
  }
);

export default funnelReducer;
