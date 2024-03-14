import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IFunnelActivitiesItem from './models/IFunnelActivitiesItem';
import { Selector } from 'react-redux';
import FunnelActivitiesModel from 'stores/funnel-activity/models/FunnelActivitiesModel';
import FunnelActivityModel from 'stores/funnel-activity/models/FunnelActivityModel';
import IFunnelActivityItem from './models/IFunnelActivityItem';

const _selectFunnelActivities = (models: FunnelActivitiesModel[]): IFunnelActivitiesItem[] => {
  return models.map((model: FunnelActivitiesModel): IFunnelActivitiesItem => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: FunnelActivitiesModel): IFunnelActivitiesItem => {
  return {
    funnelGenID: model.funnelGenID,
    createDate: model.createDate,
    activityName: model.activityName,
    activityTitle: model.activityTitle,
    activityTypeID: model.activityTypeID,
    createUserID: model.createUserID,
    createUsername: model.createUsername,
    descriptions: model.descriptions,
    displayTime: model.displayTime,
    funnelActivityID: model.funnelActivityID,
    link: model.link,
    photoProfile: model.photoProfile,
    activityEndTime: model.activityEndTime,
    activityStartTime: model.activityStartTime,
    assignedTo: model.assignedTo === 'undefined' ? '' : model.assignedTo,
    assignedToArr: model.assignedTo === 'undefined' ? [] : model.assignedTo.split(','),
  };
};

export const selectFunnelActivities: ParametricSelector<IStore, string[], IFunnelActivitiesItem[]> = createSelector(
  (state: IStore) => state.funnelActivity.data,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelActivities
);

const _selectFunnelActivity = (models: FunnelActivityModel): IFunnelActivityItem => {
  return _mappingObjectActivityTableRow(models);
};

const _mappingObjectActivityTableRow = (model: FunnelActivityModel): IFunnelActivityItem => {
  return {
    funnelGenID: model.funnelGenID,
    activityTitle: model.activityTitle,
    activityTypeID: model.activityTypeID,
    createUserID: model.createUserID,
    funnelActivityID: model.funnelActivityID.toString() === 'NaN' ? 0 : model.funnelActivityID,
    activityText1: model.activityText1 === 'undefined' ? '' : model.activityText1,
    activityText2: model.activityText2 === 'undefined' ? '' : model.activityText2,
    activityText3: model.activityText3 === 'undefined' ? '' : model.activityText3,
    activityText4: model.activityText4 === 'undefined' ? '' : model.activityText4,
    activityText5: model.activityText5 === 'undefined' ? '' : model.activityText5,
    activityStatusID: model.activityStatusID.toString() === 'NaN' ? 0 : model.activityStatusID,
  };
};

export const selectFunnelActivity: Selector<IStore, IFunnelActivityItem> = createSelector(
  (state: IStore) => state.funnelActivity.firstData!,
  _selectFunnelActivity
);
