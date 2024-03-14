import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelWarrantySupportModel extends BaseModel {
  warrantySupportID: number = 0;
  funnelGenID: number = 0;
  preventivePolicy: string = '';
  correctivePolicy: string = '';
  startDateWarranty?: Date = undefined;
  serviceLocation: string = '';
  createDate?: Date = undefined;

  constructor(data: Partial<FunnelWarrantySupportModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelWarrantySupportModel>): void {
    const conversionOptions: IConversionOption = {
      warrantySupportID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      preventivePolicy: ConversionTypeEnum.String,
      correctivePolicy: ConversionTypeEnum.String,
      serviceLocation: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
