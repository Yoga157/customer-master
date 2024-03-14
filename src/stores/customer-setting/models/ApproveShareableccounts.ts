import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class ApproveShareableAccounts extends BaseModel {
  customerID: number = 0;
  salesID: number = 0;
  isApprove: boolean = false;
  modifyUserID: number = 0;

  constructor(data: Partial<ApproveShareableAccounts>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ApproveShareableAccounts>): void {
    const conversionOptions: IConversionOption = {
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      isApprove: ConversionTypeEnum.Boolean,
      modifyUserID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
