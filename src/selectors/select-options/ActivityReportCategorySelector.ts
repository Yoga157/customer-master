import { createSelector, Selector } from 'reselect';
import IStore from '../../models/IStore';
import IOptionsDataString from './models/IOptionsDataString';
import ActivityReportCategoryModel from 'stores/activity-report-category/models/ActivityReportCategoryModel';

const _selectActivityReportCategory = (models: ActivityReportCategoryModel[]): IOptionsDataString[] => {
    return models.map(
        (model: ActivityReportCategoryModel): IOptionsDataString => ({
            text: model.activityReportCategoryName,
            value: model.activityReportCategoryName,
        })
    );
};

export const selectActivityReportCategoryOptions: Selector<IStore, IOptionsDataString[]> = createSelector(
    (state: IStore) => state.activityReportCategory.activityReportCategory,
    _selectActivityReportCategory
);