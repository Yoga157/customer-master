import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceCatalogManHourModel extends BaseModel {
  svcCatGenID: number = 0;
  manHour: number = 0;
  afterHour: number = 0;
  difficultyLevel: number = 0;
  modifyUserID: number = 0;

  constructor(data: Partial<ServiceCatalogManHourModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceCatalogManHourModel>): void {
    const conversionOptions: IConversionOption = {
      svcCatGenID: ConversionTypeEnum.Number,
      manHour: ConversionTypeEnum.Number,
      afterHour: ConversionTypeEnum.Number,
      difficultyLevel: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
