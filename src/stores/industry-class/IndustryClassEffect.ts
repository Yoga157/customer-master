import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as HttpUtility from "../../utilities/HttpUtility";
import { AxiosResponse } from "axios";
import * as EffectUtility from "../../utilities/EffectUtility";
import IndustryClassModel from "./models/IndustryClassModel";
import ResultActions from "models/ResultActions";

export const requestIndustry = async (): Promise<
  IndustryClassModel[] | HttpErrorResponseModel
> => {
  const controllerName = `IndustryClass`;
  const endpoint: string = environment.api.generic.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<IndustryClassModel[]>(
    IndustryClassModel,
    endpoint
  );
};

export const requestIndustryDropdown = async (): Promise<
  ResultActions | HttpErrorResponseModel
> => {
  const controllerName = "CustomerSetting/GetIndustryClass";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response:
    | AxiosResponse
    | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
