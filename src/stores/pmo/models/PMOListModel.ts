import { BaseModel } from 'sjs-base-model';

export default class PMOListModel extends BaseModel {
  public readonly projectId: number = 0;
  public readonly funnelGenId: string = '';
  public readonly oiNumber: string = '';
  public readonly soNumber: string = '';
  public readonly salesName: string = '';
  public readonly salesDepartment: string = '';
  public readonly pmoName: string = '';
  public readonly pmoDepartment: string = '';
  public readonly customerName: string = '';
  public readonly projectName: string = '';
  public readonly projectAlias: string = '';
  public readonly estStartBypmo: string = '';
  public readonly estEndBypmo: string = '';
  public readonly actualStartBypmo: string = '';
  public readonly actualEndBypmo: string = '';
  public readonly milestone: string = '';
  public readonly projectStatus: string = '';
  public readonly warrantyStatus: string = '';
  public readonly createDate: string = '';
  public readonly createUserID: number = 0;
  public readonly modifyUserID: number = 0;
  public readonly modifyDate: string = '';

  constructor(data: Partial<PMOListModel>) {
    super();

    this.update(data);
  }
}
