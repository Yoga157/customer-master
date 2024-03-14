import FunnelVerificationModel from './FunnelVerificationModel';
import { BaseModel } from 'sjs-base-model';

export default class FunnelVerificationModelEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelVerificationModel[] = [];
  public readonly status: string = '';

  constructor(data: Partial<FunnelVerificationModelEnvelope>) {
    super();
    this.update(data);
  }
}
