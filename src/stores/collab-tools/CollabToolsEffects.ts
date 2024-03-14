import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import ResultActions from 'models/ResultActions';
import CollabToolsReviewBySales from './models/CollabToolsReviewBySales';
import CategoryOptionsModel from './models/CategoryOptionsModel';
import ReviewModel from './models/ReviewModel';
import ReviewActivity from './models/ReviewActivityModel';
import FunnelInfoModel from './models/FunnelInfoModel';
export const requestReviewBySales = async (
  data: any,
): Promise<CollabToolsReviewBySales | HttpErrorResponseModel> => {
  // const controllerName = `GetDataReviewBySalesID?salesID=${salesID}`;
  // const endpoint: string = environment.api.weekly.replace(':controller', controllerName);
  // const controllerName = `GetDataReviewBySalesID?salesID=${salesID}`;
  const controllerName = `GetDataReviewBySalesID?salesID=${data.salesID}`;
  const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
  return EffectUtility.getToModel<CollabToolsReviewBySales>(CollabToolsReviewBySales, endpoint);
};

export const getReviewCategoryOption = async (
  
): Promise<CategoryOptionsModel | HttpErrorResponseModel> => {
  // const controllerName = `GetDataReviewBySalesID?salesID=${salesID}`;
  // const endpoint: string = environment.api.weekly.replace(':controller', controllerName);
  // const controllerName = `GetDataReviewBySalesID?salesID=${salesID}`;
  const controllerName = `GetReviewCategoryOption`;
  const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
  return EffectUtility.getToModel<CategoryOptionsModel>(CategoryOptionsModel, endpoint);
};
export const getReviewActivityHistoryList = async ( funnelGenId: number, category?: string, includeSystemActivity?: boolean
  ): Promise<ReviewActivity | HttpErrorResponseModel> => {
    const controllerName = `GetReviewActivityHistoryList?funnelGenID=${funnelGenId}&category=${category}&includeSystemActivity=${includeSystemActivity}`;
    const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
    return EffectUtility.getToModel<ReviewActivity>(ReviewActivity, endpoint);
};
export const getFunnelInfo = async ( funnelGenId: number
  ): Promise<FunnelInfoModel | HttpErrorResponseModel> => {
    const controllerName = `GetFunnelInfoData?funnelGenID=${funnelGenId}`;
    const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
    return EffectUtility.getToModel<FunnelInfoModel>(FunnelInfoModel, endpoint);
  };
export const postReview = async (data: ReviewModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'AddNewReview';
  const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};
export const postCompleted = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `SetAsCompleted?funnelActivityID=${data.funnelActivityID}&remark=${data.remark}&modifiedUserID=${data.modifiedUserID}`;
  const endpoint: string = environment.api.collabTools.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};