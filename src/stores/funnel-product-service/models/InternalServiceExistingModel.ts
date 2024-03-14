import { BaseModel } from 'sjs-base-model';
export default class InternalServiceExistingModel extends BaseModel {
  existing: number = 0;

  constructor(data: Partial<InternalServiceExistingModel>) {
    super();
    this.update(data);
  }
}
