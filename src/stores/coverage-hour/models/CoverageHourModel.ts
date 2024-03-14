import { BaseModel } from 'sjs-base-model';

export default class CoverageHourModel extends BaseModel {
  public readonly id: number = 0;
  public readonly name: string = '';
  public readonly createUserID: string = '';

  constructor(data: Partial<CoverageHourModel>) {
    super();

    this.update(data);
  }
}
