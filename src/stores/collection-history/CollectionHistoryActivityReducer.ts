import ICollectionHistoryState from "./models/CollectionHistoryState";
import * as CollectionHistoryActions from "./CollectionHistoryActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CollectionHistoryModel from "./models/CollectionHistoryModel";
import ResultActions from "models/ResultActions";

export const initialState: ICollectionHistoryState = {
    data: new ResultActions({})
}

const CollectionHistoryReducer: Reducer = baseReducer(initialState, {
    [CollectionHistoryActions.REQUEST_GET_COLLECTION_HISTORY_FINISHED](state: ICollectionHistoryState, action: IAction<ResultActions>): ICollectionHistoryState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default CollectionHistoryReducer;