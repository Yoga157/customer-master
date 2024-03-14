import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import RelatedCustomerModel from "stores/related-customer/models/RelatedCustomerModel";
import ResultActions from "models/ResultActions";

const _selectRelatedCustomer = (models: ResultActions): any => {
    if (Array.isArray(models.resultObj)){
        return models.resultObj.map((model: RelatedCustomerModel): any => ({
            relatedID: model.rCustomerID,
            customerGenID: model.customerID,
            customerName: model.relatedCustomerName,
            address: model.address,
            avgAR: model.avgAR,
            blacklist: model.blacklist,
            holdshipment: model.holdshipment
        }))
    } else {
        return []
    }
}

export const selectRelatedCustomer: Selector<IStore, any> = createSelector(
    (state: IStore) => state.relatedCustomer.data, _selectRelatedCustomer
)