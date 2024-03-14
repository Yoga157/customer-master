import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelStatusUdcModel extends BaseModel {
  public readonly udcid: number = 0;
  public readonly entryKey: string = '';
  public readonly text1: string = '';
  public readonly inum1: number = 0;

  constructor(data: Partial<FunnelStatusUdcModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<FunnelStatusUdcModel>): void {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      entryKey: ConversionTypeEnum.String,
      text1: ConversionTypeEnum.String,
      inum1: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
