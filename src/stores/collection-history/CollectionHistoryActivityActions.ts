import * as CollectionHistoryEffect from "./CollectionHistoryActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import CollectionHistoryModel from "./models/CollectionHistoryModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CollectionHistoryModel
  | ResultActions;

export const REQUEST_GET_COLLECTION_HISTORY: string = "CollectionHistoryActions.REQUEST_GET_COLLECTION_HISTORY";
export const REQUEST_GET_COLLECTION_HISTORY_FINISHED: string = "CollectionHistoryActions.REQUEST_GET_COLLECTION_HISTORY_FINISHED";

export const requestCollectionHistory = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_COLLECTION_HISTORY,
            CollectionHistoryEffect.requestCollectionHistory,
            customerID
        )
    }
}