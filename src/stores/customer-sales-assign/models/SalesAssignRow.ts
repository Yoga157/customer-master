import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class SalesAssignRow extends BaseModel {
  assignID: number = 0;
  salesName: string = "";
  yearAssign: string = "";
  customerName: string = "";

  constructor(data: Partial<SalesAssignRow>) {
    super();
    this.update(data);
  }
  public update(data: Partial<SalesAssignRow>): void {
    const conversionOptions: IConversionOption = {
      assignID: ConversionTypeEnum.Number,
      salesName: ConversionTypeEnum.String,
      yearAssign: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
    };
    super.update(data, conversionOptions);
  }
}
