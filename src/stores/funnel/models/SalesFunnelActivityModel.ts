import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
export default class SalesFunnelActivityModel extends BaseModel {
  funnelActivityID: number = 0;
  funnelGenID: number = 0;
  activityTypeID: number = 0;
  assignedTo: string = '';
  activityTitle: string = '';
  activityStartTime: string = '';
  activityEndTime: string = '';
  activityText1: string = '';
  activityText2: string = '';
  activityText3: string = '';
  activityText4: string = '';
  activityText5: string = '';
  activityStatusID: number = 0;
  createUserID: number = 0;

  constructor(data: Partial<SalesFunnelActivityModel>) {
    super();
    this.update(data);
  }
}
