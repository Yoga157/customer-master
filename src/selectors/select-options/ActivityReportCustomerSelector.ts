import IStore from "models/IStore";
import { createSelector, Selector } from "reselect";
import ActivityReportCustomer from "stores/activity-report/models/ActivityReportCustomer";
import IOptionsDataString from "./models/IOptionsDataString";

const _selectActivityReportCustomer = (models: ActivityReportCustomer[]): IOptionsDataString[] => {
    return models.map(
        (model: ActivityReportCustomer): IOptionsDataString => ({
            text: model.activityReportCustomerName,
            value: model.activityReportCustomerGenID,
        })
    );
};

export const selectActivityReportCustomerOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.activityReport.activityReportCustomer,
    _selectActivityReportCustomer
)