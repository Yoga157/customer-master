import * as IndustryClassEffect from "./IndustryClassEffect";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import IStore from "../../models/IStore";
import IndustryClassModel from "./models/IndustryClassModel";
import ResultActions from "models/ResultActions";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | IndustryClassModel[]
  | ResultActions;

export const REQUEST_INDUSTRY: string = "IndustryClassAction.REQUEST_INDUSTRY";
export const REQUEST_INDUSTRY_FINISHED: string =
  "IndustryClassAction.REQUEST_INDUSTRY_FINISHED";

export const requestIndustry = (): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<IndustryClassModel[]>(
      dispatch,
      REQUEST_INDUSTRY,
      IndustryClassEffect.requestIndustry
    );
  };
};

//Get List Industry for Dropdown
export const REQUEST_INDUSTRY_LIST: string =
  "IndustryClassAction.REQUEST_INDUSTRY_LIST";
export const REQUEST_INDUSTRY_LIST_FINISHED: string =
  "IndustryClassAction.REQUEST_INDUSTRY_LIST_FINISHED";

export const requestIndustryDropdown = (): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_INDUSTRY_LIST,
      IndustryClassEffect.requestIndustryDropdown
    );
  };
};
