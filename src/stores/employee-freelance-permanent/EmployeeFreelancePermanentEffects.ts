import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ResultActions from 'models/ResultActions';
import EmployeeFreelancePermanent from './models/EmployeeFreelancePermanent';

// ============================================================================
export const requestEmployeeFreelancePermanent = async(search: string) : Promise<EmployeeFreelancePermanent | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/GetEmployeeFreelancePermanent?search=${search}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<EmployeeFreelancePermanent>(EmployeeFreelancePermanent, endpoint);
};
// ============================================================================