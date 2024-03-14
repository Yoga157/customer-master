import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import MeetingMomItemModel from './models/MeetingMomItemModel';
import MeetingMomItemsEnvelope from './models/MeetingMomItemsEnvelope';

export const postMeetingMomItemsLocal = async (data: MeetingMomItemModel): Promise<MeetingMomItemModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('meetingMomItems');
  let listMeetingMom: MeetingMomItemModel[] = [];
  let activityMomItemID;

  if (jsonString !== null && jsonString !== '[]') {
    listMeetingMom = JSON.parse(jsonString);
    listMeetingMom.map((item) => {
      return (activityMomItemID = item.activityMomItemsID);
    });
    data.activityMomItemsID = Number(activityMomItemID) + 1;
  } else {
    data.activityMomItemsID = 1;
  }

  const momItems = new MeetingMomItemModel(data);
  listMeetingMom.push(momItems);
  localStorage.setItem('meetingMomItems', JSON.stringify(listMeetingMom));
  return momItems;
};

export const requestMeetingMomItemsLocal = async (): Promise<MeetingMomItemsEnvelope | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('meetingMomItems');
  let listMeetingMom: MeetingMomItemModel[] = [];
  let total: number = 0;
  if (jsonString !== null) {
    listMeetingMom = JSON.parse(jsonString);
    total = listMeetingMom.length;
  }
  const result = new MeetingMomItemsEnvelope({ rows: listMeetingMom });
  return result;
};

export const deleteMeetingMomItemsLocal = async (id: any): Promise<MeetingMomItemModel[] | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('meetingMomItems');
  let listMeetingMomItems: MeetingMomItemModel[] = [];

  if (jsonString !== null && jsonString !== '[]') {
    listMeetingMomItems = JSON.parse(jsonString);
  }

  const newValue = listMeetingMomItems.filter((item: MeetingMomItemModel) => {
    return item.activityMomItemsID !== id;
  });

  localStorage.setItem('meetingMomItems', JSON.stringify(newValue));
  return listMeetingMomItems;
};

export const requestMeetingMomItem = async (
  activityMomID: number,
  pageSize: number,
  page: number
): Promise<MeetingMomItemsEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'MeetingMomItem/' + activityMomID + '?page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<MeetingMomItemsEnvelope>(MeetingMomItemsEnvelope, endpoint);
};

export const postMeetingMomItem = async (data: MeetingMomItemModel): Promise<MeetingMomItemModel | HttpErrorResponseModel> => {
  const controllerName = 'MeetingMomItem';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<MeetingMomItemModel>(MeetingMomItemModel, endpoint, data);
};

export const delMeetingMomItem = async (activityMomItemsID: number): Promise<MeetingMomItemModel | HttpErrorResponseModel> => {
  const controllerName = 'MeetingMomItem/' + activityMomItemsID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<MeetingMomItemModel>(MeetingMomItemModel, endpoint);
};
