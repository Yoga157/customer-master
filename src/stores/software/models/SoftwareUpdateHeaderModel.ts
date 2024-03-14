import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareUpdateHeaderModel extends BaseModel {
  existingSoftwareID: number = 0;
  updateSoftwareID: number = 0;
  userID: number = 0;

  constructor(data: Partial<SoftwareUpdateHeaderModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareUpdateHeaderModel>): void {
    const conversionOptions: IConversionOption = {
      existingSoftwareID: ConversionTypeEnum.Number,
      updateSoftwareID: ConversionTypeEnum.Number,
      userID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
