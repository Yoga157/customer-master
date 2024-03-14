import { BaseModel } from 'sjs-base-model';
export default class CustomerExisting extends BaseModel {
  existing: number = 0;

  constructor(data: Partial<CustomerExisting>) {
    super();
    this.update(data);
  }
}
