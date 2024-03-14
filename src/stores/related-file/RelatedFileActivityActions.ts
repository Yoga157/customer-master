import * as RelatedFileEffect from "./RelatedFileActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import RelatedFileModel from "./models/RelatedFileModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | RelatedFileModel
  | ResultActions;

export const REQUEST_GET_RELATED_FILE: string = "RelatedCustomerActions.REQUEST_GET_RELATED_FILE";
export const REQUEST_GET_RELATED_FILE_FINISHED: string = "RelatedCustomerActions.REQUEST_GET_RELATED_FILE_FINISHED";

export const requestRelatedFile = (customerSettingID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_RELATED_FILE,
            RelatedFileEffect.requestRelatedFile,
            customerSettingID
        )
    }
}

export const DEL_RELATED_FILE: string = "RelatedFILEActions.DEL_RELATED_FILE";
export const DEL_RELATED_FILE_FINISHED: string = "RelatedFILEActions.DEL_RELATED_CUSTOMER_FINISHED";

export const deleteRelatedFile = (id: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(
        dispatch,
        DEL_RELATED_FILE,
        RelatedFileEffect.deleteRelatedFile,
        id
      );
    };
  };