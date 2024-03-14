import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class SalesAssignPostModel extends BaseModel {
  assignID: number = 0;
  SalesID: number = 0;
  CustomerSettingID: number = 0;
  AssignStartDate: string;
  AssignedBy: number = 0;

  constructor(data: Partial<SalesAssignPostModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<SalesAssignPostModel>): void {
    const conversionOptions: IConversionOption = {
      assignID: ConversionTypeEnum.Number,
      SalesID: ConversionTypeEnum.Number,
      CustomerSettingID: ConversionTypeEnum.Number,
      AssignStartDate: ConversionTypeEnum.String,
      AssignedBy: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
