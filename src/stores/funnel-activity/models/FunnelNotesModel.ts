import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelNotesModel extends BaseModel {
  funnelGenID: number = 0;
  createUserID: number = 0;
  notes: string = '';

  constructor(data: Partial<FunnelNotesModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelNotesModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
