import IActivityReportsGroupingModel from "./IActivityReportsGroupingModel"

export default interface IActivityReportGroupingDetail {
    readonly activityReportGroupGenId: number 
    readonly uid: string 
    readonly so: number 
    readonly customerName: string 
    readonly contactName: string 
    readonly phone: string 
    readonly superiorReview: string 
    readonly createDate: string 
    readonly createUserID: number 
    readonly createUserName: string 
    readonly activityReports: IActivityReportsGroupingModel[];
}