export default interface IPMOCopyProject {
  readonly   funnelGenId: number
  readonly   projectAlias: string
  readonly   estStartBypmo: string | Date 
  readonly   estEndBypmo: string | Date 
  readonly   createDate: string | Date 
  readonly   createUserID: number
  readonly   initialMeeting: boolean
  readonly   activityTitle: string
  readonly   assignTo: string
  readonly   assignCc: string
  readonly   activityStart: string | Date ;
  readonly   activityEnd: string | Date ;
  readonly   activityText: string
  readonly   activityRemark: string
  readonly   docNumber: string
}