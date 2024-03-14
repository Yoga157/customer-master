import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
export default class BankGaransiActivityModel extends BaseModel {
    funnelActivityID: number = 0;
    funnelGenID: number = 0;
    activityTypeID: number = 0;
    activityName: string = '';
    activityTitle: string = '';
    activityStartTime: string = '';
    activityEndTime: string = '';
    descriptions: string = '';
    link: string = '';
    status: string = '';
    createDate?:Date = undefined;
    displayTime: string = '';
    createUserID: number = 0;
    createUsername: string = '';
    photoProfile: string = '';
    assignedTo: string = '';
    docNumber: string = '';
  

  constructor(data: Partial<BankGaransiActivityModel>) {
    super();
    this.update(data);
  }
}
