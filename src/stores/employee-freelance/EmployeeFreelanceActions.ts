import * as EmployeeFreelanceEffects from './EmployeeFreelanceEffects';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import ResultActions from "models/ResultActions";
import EmployeeFreelanceDashboardEnvelope from "./models/EmployeeFreelanceDashboardEnvelope";
import EmployeeFreelanceModel from './models/EmployeeFreelanceModel';
import EmployeeFreelanceCheckEmailExist from './models/EmployeeFreelanceCheckEmailExist';
import EmployeeFreelanceCheckEmailExistRequest from './models/EmployeeFreelanceCheckEmailExistRequest';
import EmployeeFreelanceFilter from './models/EmployeeFreelanceFilter';
import EmployeeFreelanceCheckNIKKTPExistRequest from './models/EmployeeFreelanceCheckNIKKTPExistRequest';
import EmployeeFreelanceCheckNIKKTPExist from './models/EmployeeFreelanceCheckNIKKTPExist';
import EmployeeFreelanceMenuAccess from './models/EmployeeFreelanceMenuAccess';
import EmployeeFreelanceMenuAccessRequest from './models/EmployeeFreelanceMenuAccessRequest';


type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    EmployeeFreelanceDashboardEnvelope |
    EmployeeFreelanceModel |
    EmployeeFreelanceCheckEmailExist |
    EmployeeFreelanceCheckNIKKTPExist |
    EmployeeFreelanceMenuAccess;

// ============================================================================
export const REQUEST_EMPLOYEE_FREELANCES: string = 'EmployeeFreelanceActions.REQUEST_EMPLOYEE_FREELANCES';
export const REQUEST_EMPLOYEE_FREELANCES_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_EMPLOYEE_FREELANCES_FINISHED';
export const requestEmployeeFreelances = (
    activePage: number, 
    pageSize: number, 
    column: string, 
    sorting: string,
    userLogin: string
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceDashboardEnvelope>(
            dispatch,
            REQUEST_EMPLOYEE_FREELANCES,
            EmployeeFreelanceEffects.requestEmployeeFreelances,
            activePage,
            pageSize,
            column,
            sorting,
            userLogin
        );
    };
};
// ============================================================================
// export const REQUEST_POST_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_POST_EMPLOYEE_FREELANCE';
// export const REQUEST_POST_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_POST_EMPLOYEE_FREELANCE_FINISHED';
// export const requestPostEmployeeFreelance = (data: EmployeeFreelanceModel): any => {
//     return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//         await ActionUtility.createThunkEffect<ResultActions>(
//             dispatch, 
//             REQUEST_POST_EMPLOYEE_FREELANCE, 
//             EmployeeFreelanceEffects.requestPostEmployeeFreelance, 
//             data)
//     };    
// };
export const REQUEST_POST_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_POST_EMPLOYEE_FREELANCE';
export const REQUEST_POST_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_POST_EMPLOYEE_FREELANCE_FINISHED';
export const requestPostEmployeeFreelance = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch, 
            REQUEST_POST_EMPLOYEE_FREELANCE, 
            EmployeeFreelanceEffects.requestPostEmployeeFreelance, 
            data)
    };    
};
// ============================================================================
export const REQUEST_VIEW_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_VIEW_EMPLOYEE_FREELANCE';
export const REQUEST_VIEW_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_VIEW_EMPLOYEE_FREELANCE_FINISHED';
export const requestViewEmployeeFreelance = (
    employeeFreelanceGenID: number
): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceModel>(
            dispatch,
            REQUEST_VIEW_EMPLOYEE_FREELANCE,
            EmployeeFreelanceEffects.requestViewEmployeeFreelance,
            employeeFreelanceGenID
        );
    };
};
// ============================================================================
// export const REQUEST_PUT_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_PUT_EMPLOYEE_FREELANCE';
// export const REQUEST_PUT_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_PUT_EMPLOYEE_FREELANCE_FINISHED';
// export const requestPutEmployeeFreelance = (data: EmployeeFreelanceModel): any => {
//     return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//         await ActionUtility.createThunkEffect<ResultActions>(
//             dispatch, 
//             REQUEST_PUT_EMPLOYEE_FREELANCE, 
//             EmployeeFreelanceEffects.requestPutEmployeeFreelance, 
//             data);
//     };    
// };

export const REQUEST_PUT_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_PUT_EMPLOYEE_FREELANCE';
export const REQUEST_PUT_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_PUT_EMPLOYEE_FREELANCE_FINISHED';
export const requestPutEmployeeFreelance = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch, 
            REQUEST_PUT_EMPLOYEE_FREELANCE, 
            EmployeeFreelanceEffects.requestPutEmployeeFreelance, 
            data);
    };    
};
// ============================================================================
export const REQUEST_CHECK_EMAIL_EXIST: string = 'EmployeeFreelanceActions.REQUEST_CHECK_EMAIL_EXIST';
export const REQUEST_CHECK_EMAIL_EXIST_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_CHECK_EMAIL_EXIST_FINISHED';
export const checkEmailExist = (data: EmployeeFreelanceCheckEmailExistRequest) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceCheckEmailExist>(
            dispatch,
            REQUEST_CHECK_EMAIL_EXIST,
            EmployeeFreelanceEffects.checkEmailExist,
            data  
        );
    };
};
// ============================================================================
export const REQUEST_CHECK_NIKKTP_EXIST: string = 'EmployeeFreelanceActions.REQUEST_CHECK_NIKKTP_EXIST';
export const REQUEST_CHECK_NIKKTP_EXIST_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_CHECK_NIKKTP_EXIST_FINISHED';
export const checkNIKKTPExist = (data: EmployeeFreelanceCheckNIKKTPExistRequest) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceCheckNIKKTPExist>(
            dispatch,
            REQUEST_CHECK_NIKKTP_EXIST,
            EmployeeFreelanceEffects.checkNIKKTPExist,
            data  
        );
    };
};
// ============================================================================
export const REQUEST_SEARCH_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_SEARCH_EMPLOYEE_FREELANCE';
export const REQUEST_SEARCH_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_SEARCH_EMPLOYEE_FREELANCE_FINISHED';
export const requestEmployeeFreelanceSearch = (
    page: number,
    pageSize: number,
    column: string,
    sorting: string,
    search: string,
    userLogin: string
): any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceDashboardEnvelope>(
            dispatch,
            REQUEST_SEARCH_EMPLOYEE_FREELANCE,
            EmployeeFreelanceEffects.requestSearchEmployeeFreelance,
            page, 
            pageSize,
            column,
            sorting,
            search,
            userLogin
        );
    };
};
// ============================================================================
export const REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE';
export const REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE_FINISHED';
export const requestEmployeeFreelanceFilterSearch = (data: EmployeeFreelanceFilter): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceDashboardEnvelope>(
            dispatch,
            REQUEST_FILTER_SEARCH_EMPLOYEE_FREELANCE,
            EmployeeFreelanceEffects.requestFilterSearchEmployeeFreelance,
            data
        );
    };
};
// ============================================================================
export const REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE: string = 'EmployeeFreelanceActions.REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE';
export const REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE_FINISHED';
export const requestEmployeeFreelanceMenuAccess = (data: EmployeeFreelanceMenuAccessRequest) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceMenuAccess>(
            dispatch,
            REQUEST_MENU_ACCESS_EMPLOYEE_FREELANCE,
            EmployeeFreelanceEffects.requestMenuAccess,
            data  
        );
    };
};
// ============================================================================
export const REQUEST_POST_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL: string = 'EmployeeFreelanceActions.REQUEST_POST_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL';
export const REQUEST_POST_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_POST_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED';
export const requestPostEmployeeFreelanceMenuAccessLocal = (data: EmployeeFreelanceMenuAccess) : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceMenuAccess>(
            dispatch,
            REQUEST_POST_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL,
            EmployeeFreelanceEffects.requestPostMenuAccessLocal,
            data  
        );
    };
};
// ============================================================================
export const REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL: string = 'EmployeeFreelanceActions.REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL';
export const REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED';
export const requestGetEmployeeFreelanceMenuAccessLocal = () : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceMenuAccess>(
            dispatch,
            REQUEST_GET_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL,
            EmployeeFreelanceEffects.requestGetMenuAccessLocal  
        );
    };
};
// ============================================================================
export const REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL: string = 'EmployeeFreelanceActions.REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL';
export const REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED: string = 'EmployeeFreelanceActions.REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL_FINISHED';
export const requestRemoveEmployeeFreelanceMenuAccessLocal = () : any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelanceMenuAccess>(
            dispatch,
            REQUEST_REMOVE_MENU_ACCESS_EMPLOYEE_FREELANCE_LOCAL,
            EmployeeFreelanceEffects.requestRemoveMenuAccessLocal  
        );
    };
};
// ============================================================================