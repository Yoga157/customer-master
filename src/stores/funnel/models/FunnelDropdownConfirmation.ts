import { BaseModel } from 'sjs-base-model';

export default class FunnelDropdownConfirmation extends BaseModel {
    udcid: number = 0;
    text1: string = "";

  constructor(data: Partial<FunnelDropdownConfirmation>) {
    super();
    this.update(data);
  }
}
