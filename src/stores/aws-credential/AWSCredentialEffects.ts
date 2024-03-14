import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
//import SoftwareModel from './models/SoftwareModel';
//import SoftwareSearchModel from './models/SoftwareSearchModel';
//import SoftwareMainModel from './models/SoftwareMainModel';
//import SoftwareTypeModel from './models/SoftwareTypeModel';
//import SoftwareHeaderModel from './models/SoftwareHeaderModel';
// import CreditBillingEnvelope from './models/CreditBillingEnvelope';
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd';
import ResultActions from 'models/ResultActions';
// import CBVCreditBillingModels from './models/CBVCreditBillingModels';
import AWSCredentialEnvelope from './models/AWSCredentialEnvelope';
import AWSCredentialModel from './models/AWSCredentialModel';
import AWSCredentialPutModel from './models/AWSCredentialPutModel';

/* export const requestSoftwareHeader = async (softwareID: number): Promise<SoftwareHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetSoftwareToolEditHeader?SoftwareID=' + softwareID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareHeaderModel>(SoftwareHeaderModel, endpoint);
}; */

export const requestAWSCredentials = async (
  userLogin: number,
  text: string,
  sorting: string,
  column: string,
  activePage: number,
  pageSize: number
): Promise<AWSCredentialEnvelope | HttpErrorResponseModel> => {
  console.log('userLogin',userLogin)
  const controllerName = 'AWSCredential/GetListDashboardAwsCredential?userLoginID=' + userLogin + '&text=' + text + '&sorting=' + sorting + '&column=' + column + '&page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSCredentialEnvelope>(AWSCredentialEnvelope, endpoint);
};

export const postAWSCredential = async (data: AWSCredentialModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'AWSCredential/InsertAwsCredential';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putAWSCredential= async (
  data: AWSCredentialPutModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'AWSCredential';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(
      ResultActions,
      endpoint,
      data
  );
};

export const deleteAWSCredential = async(AccessKey:string):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = `AWSCredential?AccessKey=${AccessKey}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};
