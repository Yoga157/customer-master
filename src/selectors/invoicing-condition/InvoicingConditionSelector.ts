import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import InvoicingConditionModel from "stores/invoicing-condition/models/InvoicingConditionModel";
import ResultActions from "models/ResultActions";

export default interface IInvoicingConditionRow {
    readonly conditionID: number;
    readonly projectType: string;
    readonly documentName: string;
}

const _selectInvoicingCondition = (models: ResultActions): IInvoicingConditionRow[] => {
    if (Array.isArray(models.resultObj)) {
      return models.resultObj.map(
        (model: InvoicingConditionModel): IInvoicingConditionRow => ({
          conditionID: model.iConditionID,
          projectType: model.projectType,
          documentName: model.documentName
        })
      );
    } else {
      return [];
    }
  };
  
  export const selectInvoicingCondition: Selector<
    IStore,
    IInvoicingConditionRow[]
  > = createSelector(
    (state: IStore) => state.invoicingCondition.data,
    _selectInvoicingCondition
  );