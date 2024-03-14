import IStore from "models/IStore";
import { createSelector, Selector } from "reselect";
import ActivityReportEngineer from "stores/activity-report/models/ActivityReportEngineer";
import IOptionsDataString from "./models/IOptionsDataString";

const _selectActivityReportEngineer = (models: ActivityReportEngineer[]): IOptionsDataString[] => {
    return models.map(
        (model: ActivityReportEngineer): IOptionsDataString => ({
            text: model.activityReportEngineerName,
            value: model.activityReportEngineerGenID,
        })
    );
};

export const selectActivityReportEngineerOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.activityReport.activityReportEngineer,
    _selectActivityReportEngineer
)