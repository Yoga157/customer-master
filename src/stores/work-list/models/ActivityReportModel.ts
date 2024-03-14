import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

import ProductListModel from './ProductListModel';



export class activityReport extends BaseModel {
  public activityReportGenID: number = 0;
  public ticketId: string = '';
  public so: number = 0;
  public customerName: string = '';
  public phone: string = '';
  public contactName: string = '';
  public address: string = '';
  public activityCategory: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public departureDate: string = '';
  public arrivalDate: string = '';
  public engineerList: string = '';
  public status: string = '';
  public notes: string = '';
  public description: string = '';
  public symptom: string = '';
  public actionTaken: string = '';
  public projectName: string = '';
  public createDate: string = '';
  public createUserID: number = 0;
  public modifyDate: string = '';
  public modifyUserID: number = 0;

  constructor(data: Partial<activityReport>) {
    super();
    this.update(data);
  }

  public update(data: Partial<activityReport>): void {
    const conversionOptions: IConversionOption = {
      phone: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}


export default class ActivityReportModel extends BaseModel {
  public  activityReport: activityReport;
  public  activityReportItem: ProductListModel[];

  constructor(data: Partial<ActivityReportModel>) {
    super();

    this.update(data);
  }
}
