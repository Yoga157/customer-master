import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import SoftwareModel from './models/SoftwareModel';
import SoftwareSearchModel from './models/SoftwareSearchModel';
import SoftwareMainModel from './models/SoftwareMainModel';
import SoftwareTypeModel from './models/SoftwareTypeModel';
import SoftwareHeaderModel from './models/SoftwareHeaderModel';
import SoftwareEnvelope from './models/SoftwareEnvelope';
import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd';
import ResultActions from 'models/ResultActions';

export const requestSoftwareHeader = async (softwareID: number): Promise<SoftwareHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetSoftwareToolEditHeader?SoftwareID=' + softwareID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareHeaderModel>(SoftwareHeaderModel, endpoint);
};

export const requestSoftwares = async (activePage: number, pageSize: number): Promise<SoftwareEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListSoftware?page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareEnvelope>(SoftwareEnvelope, endpoint);
};

export const requestSoftwareTools = async (
  activePage: number,
  pageSize: number,
  softwareID: number
): Promise<SoftwareToolEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListBySoftwareID?page=' + activePage + '&pageSize=' + pageSize + '&softwareID=' + softwareID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareToolEnvelope>(SoftwareToolEnvelope, endpoint);
};

export const postSoftware = async (data: SoftwareMainModel): Promise<SoftwareMainModel | HttpErrorResponseModel> => {
  const controllerName = 'Software';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<SoftwareMainModel>(SoftwareMainModel, endpoint, data);
};

export const putSoftware = async (data: SoftwareMainModel): Promise<SoftwareMainModel | HttpErrorResponseModel> => {
  const controllerName = 'Software';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<SoftwareMainModel>(SoftwareMainModel, endpoint, data);
};

export const putSoftwareHeader = async (data: SoftwareUpdateHeaderModel): Promise<SoftwareUpdateHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/UpdateHeader';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<SoftwareUpdateHeaderModel>(SoftwareUpdateHeaderModel, endpoint, data);
};

export const requestSoftwareById = async (softwareToolID: number): Promise<SoftwareMainModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/SoftwareToolID=' + softwareToolID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareMainModel>(SoftwareMainModel, endpoint);
};

export const requestSoftwareType = async (): Promise<SoftwareTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = `Software/GetListSoftwareType`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareTypeModel[]>(SoftwareTypeModel, endpoint);
};
export const requestSubSoftwareType = async (softwareType: number): Promise<SoftwareTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListSubSoftwareType=' + softwareType;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareTypeModel[]>(SoftwareTypeModel, endpoint);
};
export const requestSoftwareToolType = async (): Promise<SoftwareTypeModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListSoftwareToolType';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareTypeModel[]>(SoftwareTypeModel, endpoint);
};
export const requestSoftwareSearch = async (
  textSearch: string,
  activePage: number,
  pageSize: number
): Promise<SoftwareEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Software/Search?page=' + activePage + '&pageSize=' + pageSize + '&text=' + textSearch;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareEnvelope>(SoftwareEnvelope, endpoint);
};

export const requestSoftwareByName = async (software: string): Promise<SoftwareSearchModel | HttpErrorResponseModel> => {
  const controllerName = `Software/DropdownSoftware?text=${software}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareSearchModel>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareByGenId = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};

// export const requestSoftwareByType = async():Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
//   let controllerName = '/Software/GetListDropdownBySoftwareType?SoftwareType='+ softwareType
//   const endpoint: string = environment.api.generic.replace(':controller',controllerName);
//   return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
// };

export const requestSoftwareByBusiness = async (search: string): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListDropdownBySoftwareType?SoftwareType=Business Software' + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareByInfra = async (search: string): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListDropdownBySoftwareType?SoftwareType=Infrastructure Software' + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareByProgramming = async (search: string): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListDropdownBySoftwareType?SoftwareType=Programming Software' + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareByDB = async (search: string): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListDropdownBySoftwareType?SoftwareType=Database' + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareByOS = async (search: string): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetListDropdownBySoftwareType?SoftwareType=Operating System' + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareEditOsByGenId = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?SoftwareType=Operating System' + '&FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareEditDBByGenId = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?SoftwareType=Database' + '&FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareEditInfraByGenId = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?SoftwareType=Infrastructure Software' + '&FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareEditBusinessById = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?SoftwareType=Business Software' + '&FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestSoftwareEditProgrammingByGenId = async (funnelGenID: number): Promise<SoftwareSearchModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSoftware/GetByFunnelGenID?SoftwareType=Programming Software' + '&FunnelGenID=' + funnelGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SoftwareSearchModel[]>(SoftwareSearchModel, endpoint);
};

export const requestPostSoftwareToolType = async (value: string, empID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `Software/InsertSoftwaretype?value=${value}&empID=${empID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint);
};

export const requestPostSoftwareToolSub = async (
  softwareTypeID: number,
  value: string,
  empID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `Software/InsertSubSoftwaretype?softwareTypeID=${softwareTypeID}&value=${value}&empID=${empID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint);
};

export const delSoftwareTool = async (softwareToolID: number): Promise<SoftwareMainModel | HttpErrorResponseModel> => {
  const controllerName = `Software?SoftwareToolID=${softwareToolID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.delToModel<SoftwareMainModel>(SoftwareMainModel, endpoint);
};
