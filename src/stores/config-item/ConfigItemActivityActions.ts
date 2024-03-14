import * as ConfigItemEffect from "./ConfigItemActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import ConfigItemModel from "./models/ConfigItemModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ConfigItemModel
  | ResultActions;

export const REQUEST_GET_CONFIG_ITEM: string = "ConfigItemActions.REQUEST_GET_CONFIG_ITEM";
export const REQUEST_GET_CONFIG_ITEM_FINISHED: string = "ConfigItemActions.REQUEST_GET_CONFIG_ITEM_FINISHED";

export const requestConfigItem = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_CONFIG_ITEM,
            ConfigItemEffect.requestConfigItem,
            customerID
        )
    }
}