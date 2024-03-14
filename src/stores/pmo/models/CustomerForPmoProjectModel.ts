import { BaseModel } from 'sjs-base-model';

export default class CustomerForPmoProjectModel extends BaseModel {
  funnelGenID: number = 0;
  salesName: string = '';
  presalesNameList: string = '';
  customerName: string = '';
  projectName: string = '';
  projectAlias: string = '';
  estStartProjectDate?: Date | string = undefined;
  estEndProjectDate?: Date | string = undefined;

  constructor(data: Partial<CustomerForPmoProjectModel>) {
    super();
    this.update(data);
  }
}
