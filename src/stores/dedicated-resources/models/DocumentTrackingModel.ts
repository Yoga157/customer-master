import { BaseModel } from 'sjs-base-model';

export default class DocumentTrackingModel extends BaseModel {
    public trackingID: number = 0;
    public contractID: number = 0;
    public sentByName: string = '';
    public sentDate: string = '';
    public receivedByName: string = '';
    public receivedDate: string = '';
    public remarkHR: string = '';
    public remarkSender: string = '';
    public confirmType: string = '';
    public remarkReceiver: string = '';
    public returnByName: string = '';
    public returnDate: string = '';
    public remarkReturn: string = '';
    public modifiedDate: string = '';
    public modifiedByID: number = 0;
  
    constructor(data: Partial<DocumentTrackingModel>) {
      super();
      this.update(data);
    }
}
