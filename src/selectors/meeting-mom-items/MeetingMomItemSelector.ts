import { createSelector } from 'reselect';
import IStore from 'models/IStore';
import IMeetingMomItemTable from './models/IMeetingMomItemTable';
import IMeetingMomItemTableRow from './models/IMeetingMomItemTableRow';
import MeetingMomItemsEnvelope from 'stores/meeting-mom-items/models/MeetingMomItemsEnvelope';
import { Selector } from 'react-redux';
import MeetingMomItemModel from 'stores/meeting-mom-items/models/MeetingMomItemModel';

const _selectMeetingMomItems = (models: MeetingMomItemsEnvelope): IMeetingMomItemTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: MeetingMomItemModel[]): IMeetingMomItemTableRow[] => {
  return models.map((model: MeetingMomItemModel): IMeetingMomItemTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: MeetingMomItemModel): IMeetingMomItemTableRow => {
  return {
    activityMomID: model.activityMomID,
    activityMomItemsID: model.activityMomItemsID,
    action: model.action,
    createUserID: model.createUserID,
    modifyUserID: model.modifyUserID,
    pic: model.pic,
    topic: model.topic,
  };
};

export const selectMeetingMomItems: Selector<IStore, IMeetingMomItemTable> = createSelector(
  (state: IStore) => state.meetingMomItems.listData!,
  _selectMeetingMomItems
);
