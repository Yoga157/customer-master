import * as RelatedCustomerEffect from "./RelatedCustomerActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import RelatedCustomerPostModel from "./models/RelatedCustomerPostModel"
import RelatedCustomerModel from "./models/RelatedCustomerModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | RelatedCustomerPostModel
  | RelatedCustomerModel
  | ResultActions;

export const REQUEST_GET_RELATED_CUSTOMER: string = "RelatedCustomerActions.REQUEST_GET_RELATED_CUSTOMER";
export const REQUEST_GET_RELATED_CUSTOMER_FINISHED: string = "RelatedCustomerActions.REQUEST_GET_RELATED_CUSTOMER_FINISHED";

export const requestRelatedCustomer = (customerSettingID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_RELATED_CUSTOMER,
            RelatedCustomerEffect.requestRelatedCustomer,
            customerSettingID
        )
    }
}

export const POST_RELATED_CUSTOMER: string = "RelatedCustomerActions.POST_RELATED_CUSTOMER";
export const POST_RELATED_CUSTOMER_FINISHED: string = "RelatedCustomerActions.POST_RELATED_CUSTOMER_FINISHED";

export const postRelatedCustomer = (data: RelatedCustomerPostModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            POST_RELATED_CUSTOMER,
            RelatedCustomerEffect.postRelatedCustomer,
            data
        )
    }
}

export const DEL_RELATED_CUSTOMER: string = "RelatedCustomerActions.DEL_RELATED_CUSTOMER";
export const DEL_RELATED_CUSTOMER_FINISHED: string = "RelatedCustomerActions.DEL_RELATED_CUSTOMER_FINISHED";

export const deleteRelatedCustomer = (id: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        DEL_RELATED_CUSTOMER,
        RelatedCustomerEffect.deleteRelatedCustomer,
        id
      );
    };
  };