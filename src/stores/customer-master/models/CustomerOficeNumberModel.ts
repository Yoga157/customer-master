import { BaseModel } from "sjs-base-model";

export default class CustomerOfficeNumberModel extends BaseModel {
  addressOfficeNumberID?: number = 0;
  customerGenID?: number = 0;
  customerID?: number = 0;
  type: string = "BRANCH";
  fullAddress: string = "";
  phoneNumber: string = "";
  alternateNumber: string = "";
  faxNumber: string = "";
  country: string = "";
  city: string = "";
  zipCode: string = "";
  createDate?: Date = undefined;
  createUserID?: number = 0;
  modifyDate?: Date = undefined;
  modifyUserID?: number = 0;

  constructor(data: Partial<CustomerOfficeNumberModel>) {
    super();
    this.update(data);
  }
}
