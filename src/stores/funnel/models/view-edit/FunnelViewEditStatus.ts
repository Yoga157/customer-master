import { BaseModel } from 'sjs-base-model';

export default class FunnelViewEditStatus extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  funnelStatusID: number = 0;
  funnelStatus: string = '';
  salesID: number = 0;
  salesName: string = '';
  deptName: string = '';
  dealCloseDate?: Date = undefined;
  flagOpen: string = '';
  createDate: string = '';

  constructor(data: Partial<FunnelViewEditStatus>) {
    super();
    this.update(data);
  }
}
