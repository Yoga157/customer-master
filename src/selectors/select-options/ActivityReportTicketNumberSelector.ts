import IStore from "models/IStore";
import { Selector } from "react-redux";
import { createSelector, ParametricSelector } from "reselect";
import ActivityReportTicketNumberOptions from "stores/activity-report/models/ActivityReportTicketNumberOptions";

const _selectActivityReportTicketNumberOptions = (models: ActivityReportTicketNumberOptions[]): any => {
    if (models) {
        return models.map((model: any, index): any => ({
            title: model.textData,
            descriptions: '',
            price: model.valueData,
            index: index,
            key: index,
        }));
    }
};

export const selectActivityReportTicketNumberOptions: Selector<IStore, ActivityReportTicketNumberOptions[]> = createSelector(
    (state: IStore) => state.activityReport.activityReportTicketNumberOptions,
    _selectActivityReportTicketNumberOptions
);
// ============================================================================