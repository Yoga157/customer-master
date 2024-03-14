import { BaseModel } from 'sjs-base-model';

export default class FunnelItemHistoryModel extends BaseModel {
  public itemType: string = '';
  public itemDescription: string = '';
  public orderingPrice: number = 0;
  public sellingPrice: number = 0;
  public itemName: string = '';
  public modifyDate: string = '';

  constructor(data: Partial<FunnelItemHistoryModel>) {
    super();
    this.update(data);
  }
}
