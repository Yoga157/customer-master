import * as MeetingMomItemEffects from './MeetingMomItemEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import MeetingMomItemModel from './models/MeetingMomItemModel';
import MeetingMomItemsEnvelope from './models/MeetingMomItemsEnvelope';

type ActionUnion = undefined | HttpErrorResponseModel | boolean | MeetingMomItemModel | MeetingMomItemsEnvelope | MeetingMomItemModel[];

export const REQUEST_POST_MEETING_MOM_ITEM_LOCAL: string = 'MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM_LOCAL';
export const REQUEST_POST_MEETING_MOM_ITEM_LOCAL_FINISHED: string = 'MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM_LOCAL_FINISHED';

export const postMeetingMomItemsLocal = (data: MeetingMomItemModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemModel>(
      dispatch,
      REQUEST_POST_MEETING_MOM_ITEM_LOCAL,
      MeetingMomItemEffects.postMeetingMomItemsLocal,
      data
    );
  };
};

export const REQUEST_POST_MEETING_MOM_ITEM: string = 'MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM';
export const REQUEST_POST_MEETING_MOM_ITEM_FINISHED: string = 'MeetingMomItemActions.REQUEST_POST_MEETING_MOM_ITEM_FINISHED';

export const postMeetingMomItems = (data: MeetingMomItemModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemModel>(
      dispatch,
      REQUEST_POST_MEETING_MOM_ITEM,
      MeetingMomItemEffects.postMeetingMomItem,
      data
    );
  };
};

export const REQUEST_MEETING_MOM_ITEMS_LOCAL: string = 'MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS_LOCAL';
export const REQUEST_MEETING_MOM_ITEMS_LOCAL_FINISHED: string = 'MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS_LOCAL_FINISHED';

export const requestMeetingMomItemsLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemsEnvelope>(
      dispatch,
      REQUEST_MEETING_MOM_ITEMS_LOCAL,
      MeetingMomItemEffects.requestMeetingMomItemsLocal
    );
  };
};

export const REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL: string = 'MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL';
export const REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL_FINISHED: string = 'MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL_FINISHED';
export const deleteMeetingMomItemsLocal = (id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemModel[]>(
      dispatch,
      REQUEST_DELETE_MEETING_MOM_ITEMS_LOCAL,
      MeetingMomItemEffects.deleteMeetingMomItemsLocal,
      id
    );
  };
};

export const REQUEST_MEETING_MOM_ITEMS: string = 'MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS';
export const REQUEST_MEETING_MOM_ITEMS_FINISHED: string = 'MeetingMomItemActions.REQUEST_MEETING_MOM_ITEMS_FINISHED';

export const requestMeetingMomItems = (activityMomID: number, pageSize: number, page: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemsEnvelope>(
      dispatch,
      REQUEST_MEETING_MOM_ITEMS,
      MeetingMomItemEffects.requestMeetingMomItem,
      activityMomID,
      pageSize,
      page
    );
  };
};

export const REQUEST_DELETE_MEETING_MOM_ITEMS: string = 'MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS';
export const REQUEST_DELETE_MEETING_MOM_ITEMS_FINISHED: string = 'MeetingMomItemActions.REQUEST_DELETE_MEETING_MOM_ITEMS_FINISHED';
export const deleteMeetingMomItems = (id: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<MeetingMomItemModel>(
      dispatch,
      REQUEST_DELETE_MEETING_MOM_ITEMS,
      MeetingMomItemEffects.delMeetingMomItem,
      id
    );
  };
};
