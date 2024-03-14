import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SoftwareModel extends BaseModel {
  softwareToolID: number = 0;
  softwareID: number = 0;
  softwareName: string = '';
  subSoftwareName: string = '';
  leaders: string = '';
  challengers: string = '';
  visionaires: string = '';
  nichePlayers: string = '';
  createdBy: string = '';
  createdDate: string = '';
  modifiedBy: string = '';
  modifiedDate: string = '';

  constructor(data: Partial<SoftwareModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<SoftwareModel>): void {
    const conversionOptions: IConversionOption = {
      softwareToolID: ConversionTypeEnum.Number,
      softwareID: ConversionTypeEnum.Number,
      softwareName: ConversionTypeEnum.String,
      subSoftwareName: ConversionTypeEnum.String,
      leaders: ConversionTypeEnum.String,
      challengers: ConversionTypeEnum.String,
      visionaires: ConversionTypeEnum.String,
      nichePlayers: ConversionTypeEnum.String,
      createdBy: ConversionTypeEnum.String,
      createdDate: ConversionTypeEnum.String,
      modifiedBy: ConversionTypeEnum.String,
      modifiedDate: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
