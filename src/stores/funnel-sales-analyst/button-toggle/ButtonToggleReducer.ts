import { Reducer } from "redux"
import baseReducer from "utilities/BaseReducer"
import IButtonToggleState from "./models/IButtonToggleState"
import * as ButtonToggleActions from './ButtonToggleActions'
import IAction from "models/IAction"

export const initialState:IButtonToggleState = {
  bOpen:false
}

const buttonToggleReducer: Reducer = baseReducer(initialState,{
  [ButtonToggleActions.OPEN_WORKFLOW](state: IButtonToggleState, action: IAction<boolean>): IButtonToggleState {
    return {
      ...state,
      bOpen: true,
    };
  },

  [ButtonToggleActions.CLOSE_WORKFLOW](state: IButtonToggleState, action: IAction<boolean>): IButtonToggleState {
    return {
      ...state,
      bOpen: false,
    };
  },
})

export default buttonToggleReducer