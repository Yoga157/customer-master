/*"activityMomID": 0,
"funnelActivityID": 0,
"attendees": "string",
"createDate": "2020-09-24T00:34:45.372Z",
"createUserID": 0,
"modifyDate": "2020-09-24T00:34:45.373Z",
"modifyUserID": 0*/

import { BaseModel } from 'sjs-base-model';

export default class MeetingMomModel extends BaseModel {
  public activityMomID: number = 0;
  public funnelActivityID: number = 0;
  public attendees: string = '';
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public attendeesArr: string[] = [];

  constructor(data: Partial<MeetingMomModel>) {
    super();
    this.update(data);
  }
}
