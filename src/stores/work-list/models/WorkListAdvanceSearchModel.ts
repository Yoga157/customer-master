
import { BaseModel } from 'sjs-base-model';

export default class WorkListAdvanceSearchModel extends BaseModel {
  public workTypeList: string = '';
  public workStatusList: string = '';
  public projectList: string = '';
  public customerList: string = '';
  public engineerList: string = '';
  public estimationStartDate: string = '';
  public estimationEndDate: string = '';
  public actualStartDate: string = '';
  public actualEndDate: string = '';
  public column: string = '';
  public sorting: string = '';
  public page: number = 0;
  public pageSize: number = 0;
  public userLoginId: number = 0;

  constructor(data: Partial<WorkListAdvanceSearchModel>) {
    super();

    this.update(data);
  }
}
