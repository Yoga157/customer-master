import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelSplitListLocalModel extends BaseModel {
  funnelGenID: number = 0;
  funnelISplitID: number = 0;
  createUserID: number = 0;
  modifyUserID: number = 0;
  salesID: number = 0;
  salesName: string = '';
  splitType: number = 0;
  splitTypeStr: string = '';
  splitPercentage: number = 0;

  isUpdate: number = 0;
  isDelete: number = 0;
  isAdd: number = 0;

  createDate: string = '';
  modifyDate: string = '';

  constructor(data: Partial<FunnelSplitListLocalModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelSplitListLocalModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelISplitID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      salesName: ConversionTypeEnum.String,
      splitType: ConversionTypeEnum.Number,
      splitTypeStr: ConversionTypeEnum.String,
      splitPercentage: ConversionTypeEnum.Number,

      isUpdate: ConversionTypeEnum.Number,
      isDelete: ConversionTypeEnum.Number,
      isAdd: ConversionTypeEnum.Number,

      createDate: ConversionTypeEnum.String,
      modifyDate: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
