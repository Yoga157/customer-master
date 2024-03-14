import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelTopHistoryModel extends BaseModel {
  public topType: string = '';
  public productDesc: string = '';
  public productPercentage: number = 0;
  public serviceDesc: string = '';
  public servicePercentage: number = 0;
  public supportDoc: string = '';
  public docCollectionDate: string = '';
  public modifyDate: string = '';

  constructor(data: Partial<FunnelTopHistoryModel>) {
    super();

    this.update(data);
  }
}
