import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingPutModel extends BaseModel {
  customerID: number = 0;
  customerCategory: string = "";
  pmoCustomer: boolean = false;
  capFlag: boolean = false;
  industryClass: number = 0;
  modifyUserID: number = 0;

  constructor(data: Partial<CustomerSettingPutModel>) {
    super();
    this.update(data);
  }
}
