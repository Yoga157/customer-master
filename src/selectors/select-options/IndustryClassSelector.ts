import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import IOptionsData from "./models/IOptionsData";
import IClassIndustryResultFilter from "./models/IClassIndustryResultFilter";
import ResultActions from "models/ResultActions";

import IndustryClassModel from "stores/industry-class/models/IndustryClassModel";
import value from "environment";

const _selectIndustry = (models: IndustryClassModel[]): IOptionsData[] => {
  return models.map(
    (model: IndustryClassModel): IOptionsData => ({
      text: model.textData,
      value: model.valueData,
    })
  );
};

export const selectIndustryOptions: Selector<
  IStore,
  IOptionsData[]
> = createSelector(
  (state: IStore) => state.industryClass.data,
  _selectIndustry
);

const _selectIndustryClass = (
  models: ResultActions
): IClassIndustryResultFilter[] => {
  if (Array.isArray(models.resultObj)) {
    return models.resultObj.map(
      (model: any): IClassIndustryResultFilter => ({
        value: {
          industryClass: model.industryClass,
          industryClassID: model.industryClassID,
        },
        text: model.industryClass,
      })
    );
  } else {
    return [];
  }
};

export const selectIndustryDropdown: Selector<
  IStore,
  IClassIndustryResultFilter[]
> = createSelector(
  (state: IStore) => state.industryClass.industryClassOption,
  _selectIndustryClass
);
