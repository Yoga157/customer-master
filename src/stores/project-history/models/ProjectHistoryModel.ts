import { BaseModel } from "sjs-base-model";

export default class ProjectHistoryModel extends BaseModel {
    funnelID: number = 0;
    so: number = 0;
    projectName: string = "";
    customerName: string = "";
    salesName: string = "";
    salesDept: string = "";
    soCloseDate: string = "";
    soAmount: number = 0;
    successStory: string = "";
    modifiedStoryBy: any[] = [];
    
    constructor(data: Partial<ProjectHistoryModel>) {
        super();
        this.update(data);
    }
}