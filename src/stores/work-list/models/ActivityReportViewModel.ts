import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewModel extends BaseModel {
    public funnelGenId: number = 0;
    public activityReportGenID: number = 0;
    public ticketId: string = "";
    public so: number = 0;
    public customerName: string = "";
    public phone: string = "";
    public contactName: string = "";
    public address: string = "";
    public activityCategory: string = "";
    public startDate: string | Date = "";
    public endDate: string | Date = "";
    public departureDate: string | Date = "";
    public arrivalDate: string | Date = "";
    public engineerList: string = "";
    public status: string = "";
    public notes: string = "";
    public description: string = "";
    public symptom: string = "";
    public actionTaken: string = "";
    public totalCustomerExperience: string = "";
    public superiorID: string = "";
    public superiorName: string = "";
    public reviewDate: string = "";
    public reviewNotes: string = "";
    public customerSignName: string = "";
    public customerSignDate: string = "";
    public customerSignImage: string = "";
    public reviewStatus: boolean = false;
    public customerSignStatus: boolean = false;
    public projectName: string = "";
    public department: string = "";
    public isDraft: boolean = false;
    public isDelete: boolean = false;
    public createDate: string | Date = "";
    public createUserID: number = 0;
    public modifyDate: string | Date = "";
    public modifyUserID: number = 0;

  constructor(data: Partial<ActivityReportViewModel>) {
    super();

    this.update(data);
  }
}
