import IRelatedFileState from "./models/IRelatedFileState";
import * as RelatedFileActions from "./RelatedFileActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import RelatedFileModel from "./models/RelatedFileModel";
import ResultActions from "models/ResultActions";

export const initialState: IRelatedFileState = {
    data: new ResultActions({})
}

const RelatedFileReducer: Reducer = baseReducer(initialState, {
    [RelatedFileActions.REQUEST_GET_RELATED_FILE_FINISHED](state: IRelatedFileState, action: IAction<ResultActions>): IRelatedFileState {
        return {
            ...state,
            data: action.payload!
        }
    },

    [RelatedFileActions.DEL_RELATED_FILE_FINISHED](state: IRelatedFileState, action: IAction<ResultActions>): IRelatedFileState {
        return {
            ...state,
            data: action.payload!
        }
    },
})

export default RelatedFileReducer