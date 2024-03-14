import { BaseModel } from 'sjs-base-model';

export default class POCRequestModel extends BaseModel {
  public funnelGenID: number = 0;
  public pocGenHID: number = 0;
  public pocActualDate?: Date = undefined;
  public pocExpectedDate?: Date = undefined;
  public pocNotes: string = '';
  public pocPresalesDeptID: string = '';
  public pocPresalesDeptIDArr: string[] = [];
  public pocStatusID: number = 0;
  public createUserID: number = 0;
  public modifyUserID: number = 0;
  public createDate?: Date = undefined;
  public modifyDate?: Date = undefined;
  public requestor: string = '';
  public lastUpdateBy: string = '';
  public picName: string = '';
  public pocStatus: string = '';

  constructor(data: Partial<POCRequestModel>) {
    super();
    this.update(data);
  }
}
