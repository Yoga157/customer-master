import { BaseModel } from 'sjs-base-model';

export default class FunnelVerificationModel extends BaseModel {
  no: number = 0;
  verificationItem: string = '';
  verificationStatus: string = '';

  constructor(data: Partial<FunnelVerificationModel>) {
    super();
    this.update(data);
  }
}
