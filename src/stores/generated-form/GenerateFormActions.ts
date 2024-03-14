import * as GeneratedEffect from './GenerateFormEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import FunnelSATableModel from './models/FunnelSATableModel';
import FormTypeModel from './models/FormTypeModel';
import GeneratedTableModel from './models/GeneratedTableModel';
import GeneratedFormModel from './models/GeneratedFormModel';
import FunnelSARowModel from './models/FunnelSARowModel';
import ResultActions from 'models/ResultActions';
import GeneratedFormEnvelope from './models/GeneratedFormEnvelope';
import FunnelSASearchModel from './models/FunnelSASearchModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | FunnelSATableModel
  | FormTypeModel
  | GeneratedTableModel
  | GeneratedFormModel
  | FunnelSARowModel
  | ResultActions
  | FunnelSASearchModel
  | GeneratedFormEnvelope
  | any[];

export const REQUEST_GENERATED_FORM_TABLE: string = 'GenerateFormActions.REQUEST_GENERATED_FORM_TABLE';
export const REQUEST_GENERATED_FORM_TABLE_FINISHED: string = 'GenerateFormActions.REQUEST_GENERATED_FORM_TABLE_FINISHED';

export const requestGeneratedForm = (page: number, pageSize: number, UserLoginID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<GeneratedTableModel>(
      dispatch,
      REQUEST_GENERATED_FORM_TABLE,
      GeneratedEffect.requestGeneratedForm,
      page,
      pageSize,
      UserLoginID
    );
  };
};

export const REQUEST_SEARCH_GENERATED_FORM_TABLE: string = 'GenerateFormActions.REQUEST_SEARCH_GENERATED_FORM_TABLE';
export const REQUEST_SEARCH_GENERATED_FORM_TABLE_FINISHED: string = 'GenerateFormActions.REQUEST_SEARCH_GENERATED_FORM_TABLE_FINISHED';

export const requestSearchGeneratedForm = (page: number, pageSize: number, UserLoginID: number, search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<GeneratedTableModel>(
      dispatch,
      REQUEST_SEARCH_GENERATED_FORM_TABLE,
      GeneratedEffect.requestSearchGeneratedForm,
      page,
      pageSize,
      UserLoginID,
      search
    );
  };
};

export const REQUEST_FUNNEL_SA_TABLE: string = 'GenerateFormActions.REQUEST_FUNNEL_SA_TABLE';
export const REQUEST_FUNNEL_SA_TABLE_FINISHED: string = 'GenerateFormActions.REQUEST_FUNNEL_SA_TABLE_FINISHED';

export const requestFunnelSA = (page: number, pageSize: number, formType: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSATableModel>(
      dispatch,
      REQUEST_FUNNEL_SA_TABLE,
      GeneratedEffect.requestFunnelSA,
      page,
      pageSize,
      formType
    );
  };
};

export const REQUEST_DROPDOWN_FORM_TYPE: string = 'GenerateFormActions.REQUEST_DROPDOWN_FORM_TYPE';
export const REQUEST_DROPDOWN_FORM_TYPE_FINISHED: string = 'GenerateFormActions.REQUEST_DROPDOWN_FORM_TYPE_FINISHED';

export const requestFormType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FormTypeModel>(dispatch, REQUEST_DROPDOWN_FORM_TYPE, GeneratedEffect.requestFormType);
  };
};

export const REQUEST_SEARCH_FUNNEL_SA_TABLE: string = 'GenerateFormActions.REQUEST_SEARCH_FUNNEL_SA_TABLE';
export const REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED: string = 'GenerateFormActions.REQUEST_SEARCH_FUNNEL_SA_TABLE_FINISHED';

export const requestSearchFunnelSA = (searchObject: FunnelSASearchModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSATableModel>(
      dispatch,
      REQUEST_SEARCH_FUNNEL_SA_TABLE,
      GeneratedEffect.requestSearchFunnelSA,
      searchObject
    );
  };
};

export const REQUEST_POST_GENERATED_FORM: string = 'GenerateFormActions.REQUEST_POST_GENERATED_FORM';
export const REQUEST_POST_GENERATED_FORM_FINISHED: string = 'GenerateFormActions.REQUEST_POST_GENERATED_FORM_FINISHED';

export const requestPostGeneratedForm = (data: GeneratedFormEnvelope): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_GENERATED_FORM, GeneratedEffect.requestPostGeneratedForm, data);
  };
};

export const REQUEST_PUT_GENERATED_FORM: string = 'GenerateFormActions.REQUEST_PUT_GENERATED_FORM';
export const REQUEST_PUT_GENERATED_FORM_FINISHED: string = 'GenerateFormActions.REQUEST_PUT_GENERATED_FORM_FINISHED';

export const requestPutGeneratedForm = (data: GeneratedFormEnvelope): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_PUT_GENERATED_FORM, GeneratedEffect.requestPutGeneratedForm, data);
  };
};

export const REQUEST_DELETE_GENERATED_FORM: string = 'GenerateFormActions.REQUEST_DELETE_GENERATED_FORM';
export const REQUEST_DELETE_GENERATED_FORM_FINISHED: string = 'GenerateFormActions.REQUEST_DELETE_GENERATED_FORM_FINISHED';

export const requestDeleteGeneratedForm = (formID: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DELETE_GENERATED_FORM, GeneratedEffect.requestDeleteGeneratedForm, formID);
  };
};

export const INSERT_FUNNEL_SA_OBJECT: string = 'GenerateActions.INSERT_FUNNEL_SA_OBJECT';
export const INSERT_FUNNEL_SA_OBJECT_FINISHED: string = 'GenerateActions.INSERT_FUNNEL_SA_OBJECT_FINISHED';

export const insertFunnelSAObject = (data: FunnelSARowModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSARowModel>(dispatch, INSERT_FUNNEL_SA_OBJECT, GeneratedEffect.insertFunnelSAObject, data);
  };
};

export const CLEAR_RESULT_GENERATE: string = 'GenerateActions.CLEAR_RESULT_GENERATE';
export const CLEAR_RESULT_GENERATE_FINISHED: string = 'GenerateActions.CLEAR_RESULT_GENERATE_FINISHED';

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, CLEAR_RESULT_GENERATE, GeneratedEffect.clearResult);
  };
};

// export const REQUEST_PROJECT_FUNNEL_SA: string = 'GenerateActions.REQUEST_PROJECT_FUNNEL_SA';
// export const REQUEST_PROJECT_FUNNEL_SA_FINISHED: string = 'GenerateActions.REQUEST_PROJECT_FUNNEL_SA_FINISHED';

// export const requestProjectFunnelSA = (projectName: string): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<any[]>(dispatch, REQUEST_PROJECT_FUNNEL_SA, GeneratedEffect.requestProjectFunnelSA, projectName);
//   };
// };

export const CLEAR_FUNNEL_SA_OBJECT: string = 'GenerateActions.CLEAR_FUNNEL_SA_OBJECT';
export const CLEAR_FUNNEL_SA_OBJECT_FINISHED: string = 'GenerateActions.CLEAR_FUNNEL_SA_OBJECT_FINISHED';

export const clearFunnelSAObject = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSARowModel>(dispatch, CLEAR_FUNNEL_SA_OBJECT, GeneratedEffect.insertFunnelSAObject);
  };
};
