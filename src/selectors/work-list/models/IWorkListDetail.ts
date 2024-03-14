
export default interface IWorkListDetail {
  readonly taskId: number
  readonly taskUID: string 
  readonly pmoName: string 
  readonly pmoId: number
  readonly pmoEmail: string 
  readonly projectId: number
  readonly funnelGenId: number
  readonly customerName: string 
  readonly projectName: string 
  readonly projectStatus: string 
  readonly projectAlias: string 
  readonly workType: string 
  readonly estStartDate: string | Date 
  readonly estEndDate: string | Date 
  readonly actualStartDate: string | Date 
  readonly actualEndDate: string | Date 
  readonly taskTitle: string 
  readonly taskDescription: string 
  readonly taskStatus: string 
  readonly primaryResources: string 
  readonly secondaryResources: string 
  readonly slaAssignment: string 
  readonly remark: string 
  readonly category: string 
  readonly subcategory: string 
  readonly issueType: string 
  readonly issueSubtype: string 
  readonly so: string 
  readonly brand: string 
  readonly subBrand: string 
  readonly emailReceiver: string 
  readonly emailCc: string 
  readonly customerPhone: string 
  readonly customerAddress: string 
  readonly customerPicName: string 
}
