
import { BaseModel } from 'sjs-base-model';

export default class CheckAllowedUpdateModel extends BaseModel {
    isAllow: boolean  = false;

  constructor(data: Partial<CheckAllowedUpdateModel>) {
    super();
    this.update(data);
  }
}
