import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class RelatedCustomerModel extends BaseModel {
  rCustomerID: number = 0;
  customerID: number = 0;
  relatedCustomerName: string = "";
  customerGenID: number = 0;
  address: string = "";
  avgAR: number = 0;
  blacklist: boolean = false;
  holdshipment: boolean = false;

  constructor(data: Partial<RelatedCustomerModel>) {
    super();
    this.update(data);
  }
}
