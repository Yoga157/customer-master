import { BaseModel } from 'sjs-base-model';

export default class ObjListDelegationModel extends BaseModel {
  public readonly delegasiID: number = 0;
  public readonly fromUser: number = 0;
  public readonly fromUserStr: string = '';
  public readonly toUser: string = '';
  public readonly effDateStr: string = '';
  public readonly effDate?: Date = undefined;
  public readonly expDateStr: string = '';
  public readonly application: string = '';
  public readonly expDate?: Date = undefined;
  public readonly remarks: string = '';
  public readonly createDate?: Date = undefined;
  public readonly modifyDate?: Date = undefined;

  constructor(data: Partial<ObjListDelegationModel>) {
    super();

    this.update(data);
  }
}
