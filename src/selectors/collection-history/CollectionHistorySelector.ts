import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CollectionHistoryModel from "stores/collection-history/models/CollectionHistoryModel";
import ResultActions from "models/ResultActions";

function formatMoney(amount: number): string {
    const formattedAmount: string = amount.toLocaleString('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedAmount;
}

const _selectCollectionHistory = (models: ResultActions): any => {
    if (Array.isArray(models.resultObj)) {
        return models.resultObj.map((model: CollectionHistoryModel): any => ({
            invoiceNumber: model.invoiceNumber,
            invoiceDate: model.invoiceDate,
            soid: model.soid,
            collectionAmount: formatMoney(model.collectionAmount),
            collectionDate: model.collectionDate 
        }))
    } else {
        return [];
    }
}

export const selectCollectionHistory: Selector<IStore, any> = createSelector(
    (state: IStore) => state.collectionHistory.data, _selectCollectionHistory
)