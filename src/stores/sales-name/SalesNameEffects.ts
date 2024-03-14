import environment from "environment";
import * as EffectUtility from "../../utilities/EffectUtility";
import SalesNameModel from './models/SalesNameModel';
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";

export const requestSearchSalesName = async (
    search: string
  ): Promise<SalesNameModel | HttpErrorResponseModel> => {
    const controllerName = "SalesName?search=" + search;
    const endpoint: string = environment.api.customer.replace(
      ":controller",
      controllerName
    );

    return EffectUtility.getToModel<SalesNameModel>(SalesNameModel, endpoint);
  };