import * as AWSCredentialEffects from './AWSCredentialEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
// import CreditBillingModel from './models/CreditBillingModel';
// import CreditBillingEnvelope from './models/CreditBillingEnvelope';
/* import SoftwareSearchModel from './models/SoftwareSearchModel';
import SoftwareMainModel from './models/SoftwareMainModel';
import SoftwareTypeModel from './models/SoftwareTypeModel';
import SoftwareHeaderModel from './models/SoftwareHeaderModel';
import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
import SoftwareEnvelope from './models/SoftwareEnvelope';
import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd'; */
import ResultActions from 'models/ResultActions';
import AWSCredentialEnvelope from './models/AWSCredentialEnvelope';
import AWSCredentialModel from './models/AWSCredentialModel';
import AWSCredentialPutModel from './models/AWSCredentialPutModel';
// import CBVCreditBillingModels from './models/CBVCreditBillingModels';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | AWSCredentialEnvelope
  | AWSCredentialModel
  | AWSCredentialPutModel
  | ResultActions;
export const REQUEST_AWS_CREDENTIAL: string = 'AWSCredentialActions.REQUEST_AWS_CREDENTIAL';
export const REQUEST_AWS_CREDENTIAL_FINISHED: string = 'AWSCredentialActions.REQUEST_AWS_CREDENTIAL_FINISHED';

export const requestAWSCredentials = (userLogin: number, text: string,sorting: string, column: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<AWSCredentialEnvelope>(
      dispatch,
      REQUEST_AWS_CREDENTIAL,
      AWSCredentialEffects.requestAWSCredentials,
      userLogin,
      text,
      sorting,
      column,
      activePage,
      pageSize
    );
  };
};

export const POST_AWS_CREDENTIAL: string = "AWSCredentialActions.POST_AWS_CREDENTIAL";
export const POST_AWS_CREDENTIAL_FINISHED = "AWSCredentialActions.POST_AWS_CREDENTIAL_FINISHED";

export const postAWSCredential = (data: AWSCredentialModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_AWS_CREDENTIAL, AWSCredentialEffects.postAWSCredential, data);
  };
};

export const UPDATE_AWS_CREDENTIAL: string = 'AWSCredentialActions.UPDATE_AWS_CREDENTIAL';
export const UPDATE_AWS_CREDENTIAL_FINISHED: string = 'AWSCredentialActions.UPDATE_AWS_CREDENTIAL_FINISHED';
export const putAWSCredential = (data: AWSCredentialPutModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            UPDATE_AWS_CREDENTIAL,
            AWSCredentialEffects.putAWSCredential,
            data
        );
    };
};

export const DEL_AWS_CREDENTIAL:string ='AWSCredentialActions.DEL_AWS_CREDENTIAL';
export const DEL_AWS_CREDENTIAL_FINISHED ='AWSCredentialActions.DEL_AWS_CREDENTIAL_FINISHED';
export const deleteAWSCredential = (AccessKey:string):any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,DEL_AWS_CREDENTIAL, AWSCredentialEffects.deleteAWSCredential, AccessKey);
  }
}

export const REMOVE_SUBMIT_RESULT: string = 'AWSCredentialActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'AWSCredentialActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, AWSCredentialEffects.removeResult);
  };
};
// export const POST_SOFTWARE: string = 'SoftwareActions.REQUEST_POST_SOFTWARE';
// export const POST_SOFTWARE_FINISHED = 'SoftwareActions.REQUEST_POST_SOFTWARE_FINISHED';
// export const postSoftware = (data: SoftwareMainModel): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<SoftwareMainModel>(dispatch, POST_SOFTWARE, SoftwareEffects.postSoftware, data);
//   };
// };

/* export const REQUEST_SOFTWARE_TOOLS: string = 'SoftwareActions.REQUEST_SOFTWARE_TOOLS';
export const REQUEST_SOFTWARE_TOOLS_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_TOOLS_FINISHED';

export const requestSoftwareTools = (activePage: number, pageSize: number, softwareID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareToolEnvelope>(
      dispatch,
      REQUEST_SOFTWARE_TOOLS,
      SoftwareEffects.requestSoftwareTools,
      activePage,
      pageSize,
      softwareID
    );
  };
};

export const POST_SOFTWARE: string = 'SoftwareActions.REQUEST_POST_SOFTWARE';
export const POST_SOFTWARE_FINISHED = 'SoftwareActions.REQUEST_POST_SOFTWARE_FINISHED';
export const postSoftware = (data: SoftwareMainModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareMainModel>(dispatch, POST_SOFTWARE, SoftwareEffects.postSoftware, data);
  };
};

export const PUT_SOFTWARE: string = 'SoftwareActions.REQUEST_PUT_SOFTWARE';
export const PUT_SOFTWARE_FINISHED = 'SoftwareActions.REQUEST_PUT_SOFTWARE_FINISHED';
export const putSoftware = (data: SoftwareMainModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareMainModel>(dispatch, PUT_SOFTWARE, SoftwareEffects.putSoftware, data);
  };
};

export const PUT_SOFTWARE_HEADER: string = 'SoftwareActions.REQUEST_PUT_SOFTWARE_HEADER';
export const PUT_SOFTWARE_HEADER_FINISHED = 'SoftwareActions.REQUEST_PUT_SOFTWARE_HEADER_FINISHED';
export const putSoftwareHeader = (data: SoftwareUpdateHeaderModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareUpdateHeaderModel>(dispatch, PUT_SOFTWARE, SoftwareEffects.putSoftwareHeader, data);
  };
};

export const REQUEST_SOFTWARE_BY_ID: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_ID';
export const REQUEST_SOFTWARE_BY_ID_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_ID_FINISHED';

export const requestSoftwareById = (softwareToolID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareMainModel>(dispatch, REQUEST_SOFTWARE_BY_ID, SoftwareEffects.requestSoftwareById, softwareToolID);
  };
};

export const REQUEST_SOFTWARE_TYPE: string = 'SoftwareActions.REQUEST_SOFTWARE_TYPE';
export const REQUEST_SOFTWARE_TYPE_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_TYPE_FINISHED';

export const requestSoftwareType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareTypeModel[]>(dispatch, REQUEST_SOFTWARE_TYPE, SoftwareEffects.requestSoftwareType);
  };
};
export const REQUEST_SUB_SOFTWARE_TYPE: string = 'SoftwareActions.REQUEST_SUB_SOFTWARE_TYPE';
export const REQUEST_SUB_SOFTWARE_TYPE_FINISHED: string = 'SoftwareActions.REQUEST_SUB_SOFTWARE_TYPE_FINISHED';

export const requestSubSoftwareType = (softwareType: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareTypeModel[]>(
      dispatch,
      REQUEST_SUB_SOFTWARE_TYPE,
      SoftwareEffects.requestSubSoftwareType,
      softwareType
    );
  };
};
export const REQUEST_SOFTWARE_TOOL_TYPE: string = 'SoftwareActions.REQUEST_SOFTWARE_TOOL_TYPE';
export const REQUEST_SOFTWARE_TOOL_TYPE_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_TOOL_TYPE_FINISHED';

export const requestSoftwareToolType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareTypeModel[]>(dispatch, REQUEST_SOFTWARE_TOOL_TYPE, SoftwareEffects.requestSoftwareToolType);
  };
};

export const REQUEST_SOFTWARES_SEARCH: string = 'SoftwareActions.REQUEST_SOFTWARES_SEARCH';
export const REQUEST_SOFTWARES_SEARCH_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARES_SEARCH_FINISHED';

export const requestSoftwareSearch = (textSearch: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareEnvelope>(
      dispatch,
      REQUEST_SOFTWARES_SEARCH,
      SoftwareEffects.requestSoftwareSearch,
      textSearch,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_SOFTWARE_BY_NAME: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_NAME';
export const REQUEST_SOFTWARE_BY_NAME_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_NAME_FINISHED';

export const requestSoftwareByName = (software: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel>(dispatch, REQUEST_SOFTWARE_BY_NAME, SoftwareEffects.requestSoftwareByName, software);
  };
};

export const REQUEST_SOFTWARE_BY_FUNNEL: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_FUNNEL';
export const REQUEST_SOFTWARE_BY_FUNNEL_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_FUNNEL_FINISHED';

export const requestSoftwareByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      REQUEST_SOFTWARE_BY_FUNNEL,
      SoftwareEffects.requestSoftwareByGenId,
      funnelGenID
    );
  };
};

export const REQUEST_SOFTWARE_BY_BUSINESS: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_BUSINESS';
export const REQUEST_SOFTWARE_BY_BUSINESS_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_BUSINESS_FINISHED';

export const requestSoftwareByBusiness = (search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      REQUEST_SOFTWARE_BY_BUSINESS,
      SoftwareEffects.requestSoftwareByBusiness,
      search
    );
  };
};

export const REQUEST_SOFTWARE_BY_INFRA: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_INFRA';
export const REQUEST_SOFTWARE_BY_INFRA_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_INFRA_FINISHED';

export const requestSoftwareByInfra = (search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(dispatch, REQUEST_SOFTWARE_BY_INFRA, SoftwareEffects.requestSoftwareByInfra, search);
  };
};

export const REQUEST_SOFTWARE_BY_PROGRAMMING: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_PROGRAMMING';
export const REQUEST_SOFTWARE_BY_PROGRAMMING_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_PROGRAMMING_FINISHED';

export const requestSoftwareByProgramming = (search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      REQUEST_SOFTWARE_BY_PROGRAMMING,
      SoftwareEffects.requestSoftwareByProgramming,
      search
    );
  };
};

export const REQUEST_SOFTWARE_BY_OS: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_OS';
export const REQUEST_SOFTWARE_BY_OS_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_OS_FINISHED';

export const requestSoftwareByOS = (search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(dispatch, REQUEST_SOFTWARE_BY_OS, SoftwareEffects.requestSoftwareByOS, search);
  };
};

export const REQUEST_SOFTWARE_BY_DB: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_DB';
export const REQUEST_SOFTWARE_BY_DB_FINISHED: string = 'SoftwareActions.REQUEST_SOFTWARE_BY_DB_FINISHED';

export const requestSoftwareByDB = (search: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(dispatch, REQUEST_SOFTWARE_BY_DB, SoftwareEffects.requestSoftwareByDB, search);
  };
};

// requestSoftwareEditOsByGenId

export const GET_SOFTWARE_OS: string = 'SoftwareActions.GET_SOFTWARE_OS';
export const GET_SOFTWARE_OS_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_OS_FINISHED';

export const requestSoftwareEditOsByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      GET_SOFTWARE_OS,
      SoftwareEffects.requestSoftwareEditOsByGenId,
      funnelGenID
    );
  };
};

export const GET_SOFTWARE_DB: string = 'SoftwareActions.GET_SOFTWARE_DB';
export const GET_SOFTWARE_DB_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_DB_FINISHED';

export const requestSoftwareEditDBByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      GET_SOFTWARE_DB,
      SoftwareEffects.requestSoftwareEditDBByGenId,
      funnelGenID
    );
  };
};

export const GET_SOFTWARE_PROGRAMMING: string = 'SoftwareActions.GET_SOFTWARE_PROGRAMMING';
export const GET_SOFTWARE_PROGRAMMING_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_PROGRAMMING_FINISHED';

export const requestSoftwareEditProgrammingByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      GET_SOFTWARE_PROGRAMMING,
      SoftwareEffects.requestSoftwareEditProgrammingByGenId,
      funnelGenID
    );
  };
};

export const GET_SOFTWARE_INFRA: string = 'SoftwareActions.GET_SOFTWARE_INFRA';
export const GET_SOFTWARE_INFRA_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_INFRA_FINISHED';

export const requestSoftwareEditInfraByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      GET_SOFTWARE_INFRA,
      SoftwareEffects.requestSoftwareEditInfraByGenId,
      funnelGenID
    );
  };
};

export const GET_SOFTWARE_BUSINESS: string = 'SoftwareActions.GET_SOFTWARE_BUSINESS';
export const GET_SOFTWARE_BUSINESS_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_BUSINESS_FINISHED';

export const requestSoftwareEditBusinessByGenId = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(
      dispatch,
      GET_SOFTWARE_BUSINESS,
      SoftwareEffects.requestSoftwareEditBusinessById,
      funnelGenID
    );
  };
};

export const POST_SOFTWARE_TOOL_TYPE: string = 'SoftwareActions.POST_SOFTWARE_TOOL_TYPE';
export const POST_SOFTWARE_TOOL_TYPE_FINISHED: string = 'SoftwareActions.POST_SOFTWARE_TOOL_TYPE_FINISHED';

export const requestPostSoftwareToolType = (value: string, empID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_SOFTWARE_TOOL_TYPE,
      SoftwareEffects.requestPostSoftwareToolType,
      value,
      empID
    );
  };
};

export const POST_SOFTWARE_TOOL_SUB: string = 'SoftwareActions.POST_SOFTWARE_TOOL_SUB';
export const POST_SOFTWARE_TOOL_SUB_FINISHED: string = 'SoftwareActions.POST_SOFTWARE_TOOL_SUB_FINISHED';

export const requestPostSoftwareToolSub = (softwareTypeID: number, value: string, empID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_SOFTWARE_TOOL_SUB,
      SoftwareEffects.requestPostSoftwareToolSub,
      softwareTypeID,
      value,
      empID
    );
  };
};

export const REQUEST_DELETE_SOFTWARE: string = 'SoftwareActions.REQUEST_DELETE_SOFTWARE';
export const REQUEST_DELETE_SOFTWARE_FINISHED: string = 'SoftwareActions.REQUEST_DELETE_SOFTWARE_FINISHED';

export const delSoftwareTool = (softwareToolID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SoftwareMainModel>(dispatch, REQUEST_DELETE_SOFTWARE, SoftwareEffects.delSoftwareTool, softwareToolID);
  };
}; */

// export const GET_SOFTWARE_BUSINESS: string = 'SoftwareActions.GET_SOFTWARE_BUSINESS';
// export const GET_SOFTWARE_BUSINESS_FINISHED: string = 'SoftwareActions.GET_SOFTWARE_BUSINESS_FINISHED';

// export const requestSoftwareEditBusinessByGenId = (funnelGenID:number): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
//     await ActionUtility.createThunkEffect<SoftwareSearchModel[]>(dispatch, GET_SOFTWARE_BUSINESS, SoftwareEffects.requestSoftwareEditBusinessById, funnelGenID);
//   };
// };

// https://192.168.1.113:5009/api/DQGenericService/Software/GetListDropdownBySoftwareType?SoftwareType=Programming%20Software
