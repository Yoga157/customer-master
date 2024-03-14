import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareMainModel extends BaseModel {
  softwareToolID: number = 0;
  softwareID: number = 0;
  subSoftwareID: number = 0;
  softwareToolName: string = '';
  softwareToolType: number = 0;
  createDate?: Date = undefined;
  createUserID: number = 0;
  modifyUserID: number = 0;
  modifyDate?: Date = undefined;

  constructor(data: Partial<SoftwareMainModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareMainModel>): void {
    const conversionOptions: IConversionOption = {
      softwareID: ConversionTypeEnum.Number,
      subSoftwareID: ConversionTypeEnum.Number,
      softwareToolID: ConversionTypeEnum.Number,
      softwareToolName: ConversionTypeEnum.String,
      softwareToolType: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
