import { BaseModel } from "sjs-base-model";

export default class CustomerStoryPostModel extends BaseModel {
    storyID: number = 0;
    funnelID: number = 0;
    story: string = "";
    createUserID: number = 0;
    createDate: Date = undefined;
    
    constructor(data: Partial<CustomerStoryPostModel>) {
        super();
        this.update(data);
    }
}