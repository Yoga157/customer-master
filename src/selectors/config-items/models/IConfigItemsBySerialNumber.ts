
export interface IConfigItemsBySNRow {
   readonly configItemGenID: number 
   readonly poNumber: string 
   readonly poDate: string | Date
   readonly vendorName: string 
   readonly brand: string 
   readonly productDescription: string 
   readonly productNumber: string 
   readonly serialNumber: string 
   readonly warranty: string | Date 
}

export default interface IConfigItemsBySerialNumber {
  readonly totalRows: number;
  readonly rows: IConfigItemsBySNRow[];
  readonly column: string ;
  readonly sorting: string ;
  readonly search: string ;
  readonly filter: string ;
}
