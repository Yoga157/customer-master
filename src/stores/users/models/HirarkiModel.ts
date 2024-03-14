import { BaseModel } from 'sjs-base-model';

export default class HirarkiModel extends BaseModel {
  public readonly employeeID: number = 0;
  public readonly domain: string = '';
  constructor(data: Partial<HirarkiModel>) {
    super();

    this.update(data);
  }
}
