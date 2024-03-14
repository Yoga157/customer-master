/*"activityMomItemsID": 0,
"activityMomID": 0,
"topic": "string",
"action": "string",
"pic": "string",
"createDate": "2020-09-24T00:34:45.373Z",
"createUserID": 0,
"modifyDate": "2020-09-24T00:34:45.373Z",
"modifyUserID": 0*/

import { BaseModel } from 'sjs-base-model';

export default class MeetingMomItemModel extends BaseModel {
  public activityMomID: number = 0;
  public activityMomItemsID: number = 0;
  public topic: string = '';
  public action: string = '';
  public pic: string = '';
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public picArr: string[] = [];

  constructor(data: Partial<MeetingMomItemModel>) {
    super();
    this.update(data);
  }
}
