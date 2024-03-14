import IConfigItemState from "./models/ConfigItemState";
import * as ConfigItemActions from "./ConfigItemActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ConfigItemModel from "./models/ConfigItemModel";
import ResultActions from "models/ResultActions";

export const initialState: IConfigItemState = {
    data: new ResultActions({})
}

const ConfigItemReducer: Reducer = baseReducer(initialState, {
    [ConfigItemActions.REQUEST_GET_CONFIG_ITEM_FINISHED](state: IConfigItemState, action: IAction<ResultActions>): IConfigItemState {
        return {
            ...state,
            data: action.payload!
        }
    },
})

export default ConfigItemReducer;