import { BaseModel } from 'sjs-base-model';

export default class PersenModel extends BaseModel {
  public udcid: number = 0;
  public inum1: number = 0;
  public rnum1: number = 0;

  constructor(data: Partial<PersenModel>) {
    super();

    this.update(data);
  }
}
