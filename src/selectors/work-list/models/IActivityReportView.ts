
export default interface IActivityReportView {
    readonly funnelGenId: number;
    readonly activityReportGenID: number 
    readonly ticketId: string 
    readonly so: number 
    readonly customerName: string 
    readonly phone: string 
    readonly contactName: string 
    readonly address: string 
    readonly activityCategory: string 
    readonly startDate: string | Date 
    readonly endDate: string | Date 
    readonly departureDate: string | Date 
    readonly arrivalDate: string | Date 
    readonly engineerList: string 
    readonly status: string 
    readonly notes: string 
    readonly description: string 
    readonly symptom: string 
    readonly actionTaken: string 
    readonly totalCustomerExperience: string 
    readonly superiorID: string 
    readonly superiorName: string 
    readonly reviewDate: string 
    readonly reviewNotes: string 
    readonly customerSignName: string 
    readonly customerSignDate: string 
    readonly customerSignImage: string 
    readonly reviewStatus: boolean 
    readonly customerSignStatus: boolean 
    readonly projectName: string 
    readonly department: string 
    readonly isDraft: boolean 
    readonly isDelete: boolean 
    readonly createDate: string | Date 
    readonly createUserID: number 
    readonly modifyDate: string | Date 
    readonly modifyUserID: number 

}