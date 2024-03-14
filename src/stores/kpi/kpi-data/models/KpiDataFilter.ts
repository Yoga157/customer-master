import { BaseModel } from 'sjs-base-model';

export default class KpiDataFilter extends BaseModel {
  tahun: number = 0;
  page: number = 0;
  pageSize: number = 0;
  pic: string = '';
  userLogin: string = '';

  constructor(data: Partial<KpiDataFilter>) {
    super();
    this.update(data);
  }
}
