import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditTicketInformation extends BaseModel {
    activityReportGenID: number = 0;
    ticketId: string = '';
    so?: number = 0;    
    funnelGenId?: number= 0;
    customerName: string = '';
    phone: string = '';
    contactName: string = '';
    address: string = '';
    projectName: string = '';
    activityCategory: string = '';
    activityCategoryArr: string[] = [];
    engineerList: string = '';
    symptom: string = '';
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;
    isAllowEdit: boolean = false;
    isDraft: boolean = false;

    constructor(data: Partial<ActivityReportViewEditTicketInformation>) {
        super();
        this.update(data);
    }
};