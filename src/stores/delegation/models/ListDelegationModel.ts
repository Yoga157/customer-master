import { BaseModel } from 'sjs-base-model';
import ObjListDelegationModel from './ObjListDelegationModel';

export default class ListDelegationModel extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: ObjListDelegationModel[] = [];

  constructor(data: Partial<ListDelegationModel>) {
    super();
    this.update(data);
  }
}
