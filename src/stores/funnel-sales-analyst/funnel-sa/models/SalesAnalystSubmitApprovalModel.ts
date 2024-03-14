import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';


export default class SalesAnalystSubmitApprovalModel extends BaseModel {
  userLogin: number = 0;
  funnelGenID: number = 0;
  notes: string = "";
  process: string = "";
  role: number = 0;
  assignedTo: number = 0;

  constructor(data: Partial<SalesAnalystSubmitApprovalModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SalesAnalystSubmitApprovalModel>): void {
    const conversionOptions: IConversionOption = {
      userLogin: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      process: ConversionTypeEnum.String,
      role: ConversionTypeEnum.Number,
      assignedTo: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
