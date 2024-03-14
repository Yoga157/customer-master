import { BaseModel } from 'sjs-base-model';

export default class ActivityReportSearch extends BaseModel {
  search: string = '';
  column: string = '';
  sorting: string = '';
  page: number = 0;
  pageSize: number = 0;

  constructor(data: Partial<ActivityReportSearch>) {
    super();
    this.update(data);
  }
}
