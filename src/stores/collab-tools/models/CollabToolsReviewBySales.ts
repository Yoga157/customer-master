import { BaseModel } from 'sjs-base-model';

export default class CollabToolsReviewBySales extends BaseModel {
    funnelGenID: number = 0;
    funnelStatus: string = '';
    salesID: number = 0;
    salesName: string = '';
    projectName: string = '';
    customerName: string = '';
    totalOrderingPrice: number = 0;
    totalSellingPrice: number = 0;
    gpmPctg: number = 0;
    gpmAmount: number = 0;
    dealCloseDate: string = '';
    createDate: string = '';
    lastActivity: string = '';  
    lastActivityDate: any = '';
    flaggingReview7Days: any;
    flaggingReview14Days: any;
    deptName: string = '';
  constructor(data: Partial<CollabToolsReviewBySales>) {
    super();
    this.update(data);
  }

}
