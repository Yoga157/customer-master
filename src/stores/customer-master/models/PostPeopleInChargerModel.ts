import { BaseModel } from "sjs-base-model";

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
