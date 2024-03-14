import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class RowData extends BaseModel {
  public funnelCostID: number = 0;
  public funnelGenID: number = 0;
  public funnelCostType: number = 0;
  public costID: number = 0;
  public cost: number = 0;
  public createDate: string = '';
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public modifyDate: string = '';
  public funnelCostTypeName: string | null = '';
  public costName: string | null | undefined = '';
  public isUpdate: number | undefined = 0;
  public isDelete: number | undefined = 0;
  public isAdd: number | undefined = 0;
  public costRemark: string | undefined | null = '';
  constructor(data: Partial<RowData>) {
    super();

    this.update(data);
  }

  public update(data: Partial<RowData>): void {
    const conversionOptions: IConversionOption = {
      funnelCostID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      funnelCostType: ConversionTypeEnum.Number,
      costID: ConversionTypeEnum.Number,
      // costRemark: ConversionTypeEnum.String,
      cost: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      createDate: ConversionTypeEnum.String,
      modifyDate: ConversionTypeEnum.String,
      funnelCostTypeName: ConversionTypeEnum.String,
      costName: ConversionTypeEnum.String,
      isUpdate: ConversionTypeEnum.Number,
      isDelete: ConversionTypeEnum.Number,
      isAdd: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
