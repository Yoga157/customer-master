import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelViewEditCommisionIndex extends BaseModel {
  funnelGenID: number = 0;
  indexCreator: number = 0;
  indexDirectSuperior: number = 0;
  indexSuperiorLevel2: number = 0;
  modifiedUserID: number = 0;

  constructor(data: Partial<FunnelViewEditCommisionIndex>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditCommisionIndex>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      indexCreator: ConversionTypeEnum.Float,
      indexDirectSuperior: ConversionTypeEnum.Float,
      indexSuperiorLevel2: ConversionTypeEnum.Float,
      modifiedUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
