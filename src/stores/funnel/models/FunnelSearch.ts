import { BaseModel } from 'sjs-base-model';

export default class FunnelSearch extends BaseModel {
  salesID: string = '';
  text: string = '';
  column: string = '';
  sorting: string = '';
  page: number = 0;
  pageSize: number = 0;

  constructor(data: Partial<FunnelSearch>) {
    super();
    this.update(data);
  }
}
