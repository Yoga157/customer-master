import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class ReleaseAccounts extends BaseModel {
  customerID: number = 0;
  salesID: number = 0;
  modifyUserID: number = 0;

  constructor(data: Partial<ReleaseAccounts>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ReleaseAccounts>): void {
    const conversionOptions: IConversionOption = {
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
