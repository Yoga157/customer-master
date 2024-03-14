import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import BrandSummaryModel from "stores/brand-summary/models/BrandSummaryModel";
import ResultActions from "models/ResultActions";

export default interface IBrandSummary {
    readonly brandName: string;
    readonly years: string;
    readonly purchase: string;
}

const _selectBrandSummary = (models: ResultActions): IBrandSummary[] => {
    if (Array.isArray(models.resultObj)) {
      return models.resultObj.map(
        (model: BrandSummaryModel): IBrandSummary => ({
          brandName: model.brandName,
          years: model.years,
          purchase: model.purchase.toString() + " %"
        })
      );
    } else {
      return [];
    }
  };
  
  export const selectBrandSummary: Selector<
    IStore,
    IBrandSummary[]
  > = createSelector(
    (state: IStore) => state.brandSummary.data,
    _selectBrandSummary
  );