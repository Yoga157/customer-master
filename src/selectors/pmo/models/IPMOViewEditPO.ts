export default interface IPMOViewEditPO {
  readonly   projectID: number;
  readonly   funnelGenID: number;
  readonly   salesName: string;
  readonly   department: string;
  readonly   salesAdminName: string;
  readonly   startWarrantyDate: string | Date ;
  readonly   endWarrantyDate: string | Date ;
}