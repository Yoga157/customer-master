
import { BaseModel } from 'sjs-base-model';

export default class PMOProjectByIDModel extends BaseModel {
    funnelGenId: number  = 0;
    projectAlias: string = '';
    estStartBypmo: string | Date  = '';
    estEndBypmo: string | Date  = '';
    createDate: string | Date  = '';
    createUserID: number  = 0;
    initialMeeting: boolean  = false;


    activityTitle: string = '';
    assignTo: string = '';
    assignCc: string = '';
    activityStart: string | Date  = null;
    activityEnd: string | Date  = null;
    activityText: string = '';
    activityRemark: string = '';
    docNumber: string = '';

  constructor(data: Partial<PMOProjectByIDModel>) {
    super();
    this.update(data);
  }
}
