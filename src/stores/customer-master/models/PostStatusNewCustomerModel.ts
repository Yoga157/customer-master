import { BaseModel } from "sjs-base-model";

export default class PostStatusNewCustomerModel extends BaseModel {
  customerGenID: string = "";
  approvalStatus: string = "";
  remark: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<PostStatusNewCustomerModel>) {
    super();
    this.update(data);
  }
}
