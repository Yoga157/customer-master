import { BaseModel } from 'sjs-base-model';
import DetailDelegationModel from './DetailDelegationModel';

export default class DelegationModel extends BaseModel {
  public delegasiID: number = 0;
  public fromUser: number = 0;
  public fromUserStr: string = '';
  public effDate?: Date = undefined;
  public effDateStr: string = '';
  public expDate?: Date = undefined;
  public expDateStr: string = '';
  public remarks: string = '';
  public userLoginID: number = 0;
  // public detailDelegasi: any;
  public detailDelegasi: any;

  constructor(data: Partial<DelegationModel>) {
    super();
    this.update(data);
  }
}
