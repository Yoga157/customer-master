 import { BaseModel } from 'sjs-base-model';

export default class IsEscalationModel extends BaseModel {

  public readonly isAllow: boolean = false;

  constructor(data: Partial<IsEscalationModel>) {
    super();

    this.update(data);
  }
}
