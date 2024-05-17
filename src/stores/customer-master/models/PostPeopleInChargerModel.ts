import { BaseModel } from "sjs-base-model";

// "customerPICID": 0,
//   "customerGenID": 0,
//   "picName": "string",
//   "picJobTitle": "string",
//   "picEmailAddr": "string",
//   "picMobilePhone": "string",
//   "picAddress": "string",
//   "pinFlag": true,
//   "capFlag": true,
//   "createDate": "2024-05-16T04:00:36.887Z",
//   "createUserID": 0,
//   "modifyDate": "2024-05-16T04:00:36.887Z",
//   "modifyUserID": 0

export default class PostPeopleInChargerModel extends BaseModel {
  customerPICID?: number = 0;
  customerGenID?: number = 0;
  picName: string = "";
  picJobTitle: string = "";
  picEmailAddr: string = "";
  picAddress: string = "";
  picMobilePhone: string = "";
  pinFlag: boolean = false;
  capFlag: boolean = false;
  createDate?: Date = undefined;
  createdUserID?: number = 0;
  modifyDate?: Date = undefined;
  modifyUserID?: number = 0;

  constructor(data: Partial<PostPeopleInChargerModel>) {
    super();
    this.update(data);
  }
}
