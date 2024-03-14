import { BaseModel } from 'sjs-base-model';

export default class ActivityReportViewEditActivityInformation extends BaseModel {
    activityReportGenID: number = 0;
    activityCategory: string = '';
    activityCategoryArr: string[] = [];
    dStartDate?: Date = undefined;
    dEndDate?: Date = undefined;
    dDepartureDate?: Date = undefined;
    dArrivalDate?: Date = undefined;
    startDate: string = '';
    endDate: string = '';
    departureDate: string = '';
    arrivalDate: string = '';    
    engineerList: string = '';
    status: string = '';
    notes: string = '';
    isAllowEdit: boolean = false;
    createDate?: Date = undefined;
    createUserID: number = 0;  
    modifyDate?: Date = undefined;
    modifyUserID: number = 0;
    isAllowAccess: boolean = false;

    constructor(data: Partial<ActivityReportViewEditActivityInformation>) {
        super();
        this.update(data);
    }
};