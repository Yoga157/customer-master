import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import CustomerPICModel from "stores/customer-pic/models/CustomerPICSettingModel";
import ResultActions from "models/ResultActions";

export default interface ICustomerPIC {
    readonly picName: string;
    readonly picTitle: string;
    readonly phone: string;
    readonly email: string;
    readonly latestProject: string;
}

const _selectCustomerPIC = (models: ResultActions): ICustomerPIC[] => {
    if (Array.isArray(models.resultObj)) {
        return models.resultObj.map(
            (model: CustomerPICModel): ICustomerPIC => ({
                picName: model.picName,
                picTitle: model.picTitle,
                phone: model.phone,
                email: model.email,
                latestProject: model.latestProject
            })
        )
    } else {
        return []
    }
}

export const selectCustomerPIC: Selector<IStore, ICustomerPIC[]> = createSelector(
    (state: IStore) => state.customerPIC.resultActions, _selectCustomerPIC
)