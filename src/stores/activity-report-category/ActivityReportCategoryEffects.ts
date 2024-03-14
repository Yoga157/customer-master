import environment from 'environment'
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios'
import * as EffectUtility from '../../utilities/EffectUtility'
import ResultActions from 'models/ResultActions';
import ActivityReportCategoryModel from './models/ActivityReportCategoryModel';
import ActivityReportCategoryCheckAndAddModel from './models/ActivityReportCategoryCheckAndAddModel';

export const requestActivityReportCategory = async (): Promise<ActivityReportCategoryModel[] | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportCategory`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.getToModel<ActivityReportCategoryModel[]>(ActivityReportCategoryModel, endpoint);
};

export const requestPostActivityReportCategory = async (data: ActivityReportCategoryModel) : Promise<ActivityReportCategoryModel | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportCategory`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ActivityReportCategoryModel>(ActivityReportCategoryModel, endpoint, data);
};

export const requestPostActivityReportCategoryCheckAndAdd = async (data: ActivityReportCategoryCheckAndAddModel) : Promise<ActivityReportCategoryCheckAndAddModel | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportCategory/CheckAndAdd`;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<ActivityReportCategoryCheckAndAddModel>(ActivityReportCategoryCheckAndAddModel, endpoint, data);
};