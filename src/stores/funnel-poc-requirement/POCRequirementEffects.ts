import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';

import * as EffectUtility from 'utilities/EffectUtility';
import POCRequirementDashboard from './models/POCRequirementDashboard';
import POCRequirementEnvelope from './models/POCRequirementEnvelope';

export const requestPOCReqByPOCGenHID = async (
  pocGenHID: number,
  page: number,
  pageSize: number
): Promise<POCRequirementEnvelope | HttpErrorResponseModel> => {
  const controllerName = `POCRequirement/${pocGenHID}?page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<POCRequirementEnvelope>(POCRequirementEnvelope, endpoint);
};

export const requestPOCReqByPOCGenReqID = async (pocReqGenID: number): Promise<POCRequirementDashboard | HttpErrorResponseModel> => {
  const controllerName = `POCRequirement/pocReqGenID=${pocReqGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<POCRequirementDashboard>(POCRequirementDashboard, endpoint);
};

export const delPOCRequirement = async (pocReqGenID: number): Promise<POCRequirementDashboard | HttpErrorResponseModel> => {
  const controllerName = `POCRequirement/${pocReqGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<POCRequirementDashboard>(POCRequirementDashboard, endpoint);
};

export const postPOCRequirement = async (data: POCRequirementDashboard): Promise<POCRequirementDashboard | HttpErrorResponseModel> => {
  const controllerName = 'POCRequirement';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<POCRequirementDashboard>(POCRequirementDashboard, endpoint, data);
};

export const putPOCRequirementCompleted = async (
  pocReqGenID: number,
  userlogin: number
): Promise<POCRequirementDashboard | HttpErrorResponseModel> => {
  const controllerName = `POCRequirement/Compeleted?pocReqGenID=${pocReqGenID}&userLogin=${userlogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<POCRequirementDashboard>(POCRequirementDashboard, endpoint);
};
