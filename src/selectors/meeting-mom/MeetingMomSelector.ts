import MeetingMomModel from 'stores/meeting-mom/models/MeetingMomModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';

const _selectMomMeeting = (model: MeetingMomModel): MeetingMomModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: MeetingMomModel): MeetingMomModel => {
  return new MeetingMomModel({
    activityMomID: model.activityMomID.toString() === 'undefined' ? 0 : model.activityMomID,
    funnelActivityID: model.funnelActivityID,
    attendees: model.attendees,
  });
};

export const selectMomMeeting: Selector<IStore, MeetingMomModel> = createSelector((state: IStore) => state.meetingMom.firstData!, _selectMomMeeting);
