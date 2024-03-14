import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareHeaderModel extends BaseModel {
  softwareID: number = 0;
  softwareIDName: string = '';
  subSoftwareID: number = 0;
  subSoftwareIDName: string = '';

  constructor(data: Partial<SoftwareHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      softwareID: ConversionTypeEnum.Number,
      softwareIDName: ConversionTypeEnum.String,
      subSoftwareID: ConversionTypeEnum.Number,
      subSoftwareIDName: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
