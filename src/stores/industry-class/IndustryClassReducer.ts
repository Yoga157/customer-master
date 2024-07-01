import IIndustryClassState from "./models/IIndustryClassState";
import * as IndustryClassAction from "./IndustryClassActions";
import IAction from "../../models/IAction";
import IndustryClassModel from "./models/IndustryClassModel";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ResultActions from "models/ResultActions";

export const initialState: IIndustryClassState = {
  data: [],
  error: false,
  industryClassOption: new ResultActions({}),
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const industryClassReducer: Reducer = baseReducer(initialState, {
  [IndustryClassAction.REQUEST_INDUSTRY_FINISHED](
    state: IIndustryClassState,
    action: IAction<IndustryClassModel[]>
  ): IIndustryClassState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
  [IndustryClassAction.REQUEST_INDUSTRY_LIST_FINISHED](
    state: IIndustryClassState,
    action: IAction<ResultActions>
  ): IIndustryClassState {
    return {
      ...state,
      industryClassOption: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default industryClassReducer;
