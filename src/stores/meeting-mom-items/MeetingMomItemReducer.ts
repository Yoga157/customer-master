import * as MeetingMomItemActions from './MeetingMomItemActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IMeetingMomItemState from './models/IMeetingMomItemState';
import MeetingMomItemModel from './models/MeetingMomItemModel';
import MeetingMomItemsEnvelope from './models/MeetingMomItemsEnvelope';

export const initialState: IMeetingMomItemState = {
  listData: new MeetingMomItemsEnvelope({}),
  firstData: new MeetingMomItemModel({}),
  error: false,
  refreshPage: false,
};

const meetingMomItemReducer: Reducer = baseReducer(initialState, {
  [MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM_LOCAL_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemModel>
  ): IMeetingMomItemState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS_LOCAL_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemsEnvelope>
  ): IMeetingMomItemState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemsEnvelope>
  ): IMeetingMomItemState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemModel>
  ): IMeetingMomItemState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemModel>
  ): IMeetingMomItemState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM_FINISHED](
    state: IMeetingMomItemState,
    action: IAction<MeetingMomItemModel>
  ): IMeetingMomItemState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default meetingMomItemReducer;
