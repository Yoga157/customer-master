import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import ConfigItemModel from "stores/config-item/models/ConfigItemModel";
import ResultActions from "models/ResultActions";

const _selectConfigItem = (models: ResultActions): any => {
    if (Array.isArray(models.resultObj)) {
        return models.resultObj.map((model: ConfigItemModel): any => ({
            productNumber: model.productNumber,
            soNumber: model.soNumber,
            poNumber: model.poNumber,
            poDate: model.poDate,
            etaByPurchasing: model.etaByPurchasing,
            etaByPMO: model.etaByPMO,
            doDate: model.doDate,
            descriptionItem: model.descriptionItem,
            brand: model.brand,
            quantity: model.quantity,
            warrantyStartDate: model.quantity
        }))
    } else {
        return [];
    }
}

export const selectConfigItem: Selector<IStore, any> = createSelector(
    (state: IStore) => state.configItem.data, _selectConfigItem
)