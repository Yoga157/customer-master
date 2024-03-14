import { BaseModel } from 'sjs-base-model';
import TopServiceModel from './TopServiceModel';


interface IfunnelTopList{
  totalRows: number,
  rows: TopServiceModel[],
}

export default class FunnelTopEnvelope extends BaseModel {
  public readonly resultObj: IfunnelTopList = {
    totalRows: 0,
    rows: []
  };

  constructor(data: Partial<FunnelTopEnvelope>) {
    super();
    this.update(data);
  }
}
