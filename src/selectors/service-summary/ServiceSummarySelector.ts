import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import ServiceSummaryModel from "stores/service-summary/models/ServiceSummaryModel";
import ResultActions from "models/ResultActions";

export default interface IServiceSummary {
    readonly serviceName: string;
    readonly years: string;
    readonly purchase: string;
}

const _selectServiceSummary = (models: ResultActions): IServiceSummary[] => {
    if (Array.isArray(models.resultObj)) {
      return models.resultObj.map(
        (model: ServiceSummaryModel): IServiceSummary => ({
          serviceName: model.serviceName,
          years: model.years,
          purchase: model.purchase.toString() + " %"
        })
      );
    } else {
      return [];
    }
  };
  
  export const selectServiceSummary: Selector<
    IStore,
    IServiceSummary[]
  > = createSelector(
    (state: IStore) => state.serviceSummary.data,
    _selectServiceSummary
  );