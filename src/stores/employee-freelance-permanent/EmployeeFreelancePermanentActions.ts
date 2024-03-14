import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import ResultActions from "models/ResultActions";
import EmployeeFreelancePermanent from './models/EmployeeFreelancePermanent';
import * as EmployeeFreelancePermanentEffects from './EmployeeFreelancePermanentEffects';

type ActionUnion = undefined | 
    HttpErrorResponseModel | 
    ResultActions |
    EmployeeFreelancePermanent;

// ============================================================================
export const REQUEST_EMPLOYEE_FREELANCE_PERMANENT: string = 'EmployeeFreelancePermanentActions.REQUEST_EMPLOYEE_FREELANCE_PERMANENT';
export const REQUEST_EMPLOYEE_FREELANCE_PERMANENT_FINISHED: string = 'EmployeeFreelancePermanentActions.REQUEST_EMPLOYEE_FREELANCE_PERMANENT_FINISHED';
export const requestEmployeeFreelancePermanent = (search: string): any => {
    return async(dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<EmployeeFreelancePermanent>(
            dispatch,
            REQUEST_EMPLOYEE_FREELANCE_PERMANENT,
            EmployeeFreelancePermanentEffects.requestEmployeeFreelancePermanent,
            search
        );
    };
};
// ============================================================================