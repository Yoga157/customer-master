import { BaseModel } from 'sjs-base-model';

export default class VerificationDataStatusModel extends BaseModel {
    public no: number = 0;
    public verificationItem: string = '';
    public verificationStatus: string = '';
  
    constructor(data: Partial<VerificationDataStatusModel>) {
      super();
      this.update(data);
    }
}
