import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ServiceAreaBufferResource extends BaseModel {
  funnelGenID: number = 0;
  numOfMaxResource: number = 0;
  numOfBufferResource: number = 0;
  modifyUserID: number = 0;
  createUserID: number = 0;

  constructor(data: Partial<ServiceAreaBufferResource>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ServiceAreaBufferResource>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      numOfMaxResource: ConversionTypeEnum.Number,
      numOfBufferResource: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
