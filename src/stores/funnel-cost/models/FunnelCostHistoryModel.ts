import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelCostHistoryModel extends BaseModel {
  public costType: string = '';
  public costName: string = '';
  public cost: number = 0;
  public modifyDate: string = '';

  constructor(data: Partial<FunnelCostHistoryModel>) {
    super();

    this.update(data);
  }
}
