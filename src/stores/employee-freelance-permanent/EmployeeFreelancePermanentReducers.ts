import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IEmployeeFreelancePermanentState from './models/IEmployeeFreelancePermanentState';
import * as EmployeeFreelancePermanentActions from './EmployeeFreelancePermanentActions';
import EmployeeFreelancePermanent from './models/EmployeeFreelancePermanent';

export const initialState: IEmployeeFreelancePermanentState = {
    listData: []
};

const EmployeeFreelancePermanentReducers: Reducer = baseReducer(initialState, {
    [EmployeeFreelancePermanentActions.REQUEST_EMPLOYEE_FREELANCE_PERMANENT_FINISHED](
        state: IEmployeeFreelancePermanentState,
        action: IAction<EmployeeFreelancePermanent[]>
    ): IEmployeeFreelancePermanentState {
        return {
            ...state,
            listData: action.payload!,
        };
    },
});

export default EmployeeFreelancePermanentReducers;