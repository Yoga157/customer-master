export default interface IPMOViewEditStatus {
  readonly   projectId: number
  readonly   projectStatus: string 
  readonly   projectStatusId: number
  readonly   warrantyStatus: string 
  readonly   funnelGenId: number
  readonly   soDate: string | Date
  readonly   oiDate: string | Date
  readonly   pmoName: string 
  readonly   pmoId: number
  readonly   isApprove: boolean 
}