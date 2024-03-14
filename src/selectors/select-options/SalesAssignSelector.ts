import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import IOptionsData from "./models/IOptionsData";
import SalesNameModel from "stores/customer-sales/models/SalesNameModel";
import ISalesResultFilter from "./models/ISalesResultFilter";
import SalesAssignHistoryModel from "stores/customer-sales/models/SalesAssignHistoryModel";
import ResultActions from "models/ResultActions";
import SalesAccountOwner from "stores/customer-sales/models/SalesAccountOwner";

export default interface ISearchResultSales {
  readonly title: string;
  readonly salesID: number;
}

const _selectSalesSearch = (models: ResultActions): ISearchResultSales[] => {
  return models.resultObj.map(
    (model: SalesNameModel): ISearchResultSales => ({
      title: model.salesName,
      salesID: model.salesID,
    })
  );
};

export const selectSalesSearchOptions: Selector<
  IStore,
  ISearchResultSales[]
> = createSelector(
  (state: IStore) => state.customerSalesAssign.sales,
  _selectSalesSearch
);

const _selectSales = (models: ResultActions): ISalesResultFilter[] => {
    if (Array.isArray(models.resultObj)) {
      return models.resultObj.map(
        (model: any): ISalesResultFilter => ({
          value: { salesName: model.salesName, salesID: model.salesID },
          text: model.salesName,
        })
      );
  } else {
    return [];
  }
};

export const selectSalesOptions: Selector<
  IStore,
  ISalesResultFilter[]
> = createSelector(
  (state: IStore) => state.customerSalesAssign.sales,
  _selectSales
);

const _selectSalesHistory = (models: ResultActions): any[] => {
  if (Array.isArray(models.resultObj)) {
    return models.resultObj.map((model: SalesAssignHistoryModel): any => ({
      salesName: model.salesName,
      customerName: model.customerName,
      yearAssign: model.year,
    }));
  }
  else {
    return []
  }
};

export const selectSalesHistory: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerSalesAssign.salesHistory,
  _selectSalesHistory
);

const _selectAccountOwner = (models: ResultActions): any[] => {
  if (Array.isArray(models.resultObj)) {
    return models.resultObj.map((model: SalesAccountOwner): any => ({
      status: model.status,
      salesName: model.salesName,
      requestedBy: model.requestedBy,
      requestedDate: model.requestedDate
    }));
  } else {
    return [];
  }
};

export const selectAccountOwner: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerSalesAssign.accountOwner,
  _selectAccountOwner
);