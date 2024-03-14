import { BaseModel } from 'sjs-base-model';

export default class FunnelRateModel extends BaseModel {
  rate: number = 0;

  constructor(data: Partial<FunnelRateModel>) {
    super();
    this.update(data);
  }
}
