import ResultActions from 'models/ResultActions';
import ActivityReportCategoryModel from './ActivityReportCategoryModel';

export default interface IActivityReportCategoryState {
    readonly activityReportCategory: ActivityReportCategoryModel[];
    readonly firstData: ActivityReportCategoryModel;
    readonly refreshPage: boolean;
    readonly error: boolean;
    readonly resultActions: ResultActions;
};
