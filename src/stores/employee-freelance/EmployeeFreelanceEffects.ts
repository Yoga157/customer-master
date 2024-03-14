import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ResultActions from 'models/ResultActions';
import EmployeeFreelanceDashboardEnvelope from './models/EmployeeFreelanceDashboardEnvelope';
import EmployeeFreelanceModel from './models/EmployeeFreelanceModel';
import EmployeeFreelanceCheckEmailExist from './models/EmployeeFreelanceCheckEmailExist';
import EmployeeFreelanceCheckEmailExistRequest from './models/EmployeeFreelanceCheckEmailExistRequest';
import EmployeeFreelanceFilter from './models/EmployeeFreelanceFilter';
import EmployeeFreelanceCheckNIKKTPExistRequest from './models/EmployeeFreelanceCheckNIKKTPExistRequest';
import EmployeeFreelanceCheckNIKKTPExist from './models/EmployeeFreelanceCheckNIKKTPExist';
import EmployeeFreelanceMenuAccess from './models/EmployeeFreelanceMenuAccess';
import EmployeeFreelanceMenuAccessRequest from './models/EmployeeFreelanceMenuAccessRequest';
import EmployeeFreelanceMapper from './models/EmployeeFreelanceMapper';

// ============================================================================
export const requestEmployeeFreelances = async (
    activePage: number, 
    pageSize: number, 
    column: string, 
    sorting: string,
    userLogin: string
): Promise<EmployeeFreelanceDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/Dashboard?page=${activePage}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLogin=${userLogin}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<EmployeeFreelanceDashboardEnvelope>(EmployeeFreelanceDashboardEnvelope, endpoint);
};
// ============================================================================
export const requestPostEmployeeFreelance = async (
    data: EmployeeFreelanceMapper
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'EmployeeFreelance';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);    
    return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
}
// ============================================================================
export const requestViewEmployeeFreelance = async(
    employeeFreelanceGenID: number
): Promise<EmployeeFreelanceModel | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance?employeeFreelanceGenID=${employeeFreelanceGenID}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<EmployeeFreelanceModel>(EmployeeFreelanceModel, endpoint);
};
// ============================================================================
export const requestPutEmployeeFreelance = async (
    data: EmployeeFreelanceMapper
): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'EmployeeFreelance';
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);    
    return EffectUtility.putUpload<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
};
// ============================================================================
export const checkEmailExist = async(
    data: EmployeeFreelanceCheckEmailExistRequest
): Promise<EmployeeFreelanceCheckEmailExist | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/CheckEmailExist`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<EmployeeFreelanceCheckEmailExist>(
        EmployeeFreelanceCheckEmailExist,
        endpoint,
        data
    );
};
// ============================================================================
export const checkNIKKTPExist = async(
    data: EmployeeFreelanceCheckNIKKTPExistRequest
): Promise<EmployeeFreelanceCheckNIKKTPExist | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/CheckNIKKTPExist`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<EmployeeFreelanceCheckNIKKTPExist>(
        EmployeeFreelanceCheckNIKKTPExist,
        endpoint,
        data
    );
};
// ============================================================================
export const requestSearchEmployeeFreelance = async(
    page: number,
    pageSize: number,
    column: string,
    sorting: string,
    search: string,
    userLogin: string
) : Promise<EmployeeFreelanceDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/Search?column=${column}&sorting=${sorting}&page=${page}&pageSize=${pageSize}&search=${search}&userLogin=${userLogin}`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<EmployeeFreelanceDashboardEnvelope>(EmployeeFreelanceDashboardEnvelope, endpoint)
}
// ============================================================================
export const requestFilterSearchEmployeeFreelance = async (
    data: EmployeeFreelanceFilter
) : Promise<EmployeeFreelanceDashboardEnvelope | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/FilterSearch`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<EmployeeFreelanceDashboardEnvelope>(EmployeeFreelanceDashboardEnvelope, endpoint, data);
};
// ============================================================================
export const requestMenuAccess = async (data: EmployeeFreelanceMenuAccessRequest) : Promise<EmployeeFreelanceMenuAccess | HttpErrorResponseModel> => {
    const controllerName = `EmployeeFreelance/MenuAccess`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<EmployeeFreelanceMenuAccess>(EmployeeFreelanceMenuAccess, endpoint, data);
};
// ============================================================================
export const requestPostMenuAccessLocal = async (data: EmployeeFreelanceMenuAccess) : Promise<EmployeeFreelanceMenuAccess | HttpErrorResponseModel> => {
    localStorage.setItem("UserAllowedAccessEmployeeFreelance", JSON.stringify(data));
    return data;    
};
// ============================================================================
export const requestGetMenuAccessLocal = async () : Promise<EmployeeFreelanceMenuAccess | HttpErrorResponseModel> => {
    const jsonString = localStorage.getItem("UserAllowedAccessEmployeeFreelance");
    let result: EmployeeFreelanceMenuAccess = new EmployeeFreelanceMenuAccess({});

    if (jsonString !== null) {
        result = JSON.parse(jsonString);
    }

    return result;
};
// ============================================================================
export const requestRemoveMenuAccessLocal = async() : Promise<EmployeeFreelanceMenuAccess | HttpErrorResponseModel> => {
    localStorage.removeItem("UserAllowedAccessEmployeeFreelance");
    const result: EmployeeFreelanceMenuAccess = new EmployeeFreelanceMenuAccess({});

    return result;
};
// ============================================================================