


export interface IHistoryRow{
 readonly pssDocumentId: number 
 readonly versionNumber: number 
 readonly documentName: string 
 readonly documentType: string 
 readonly projectName: string 
 readonly customerName: string 
 readonly createUserName: string 
 readonly modifyUserName: string 
 readonly createDate: string 
 readonly createUserID: number 
 readonly modifyDate: string 
 readonly modifyUserID: number 
}


export interface IHistory{
  readonly totalRows: number 
  readonly rows: IHistoryRow[]
  readonly column: string 
  readonly sorting: string 
  readonly search: string 
  readonly filter: string
}