import { WorklistRowsModel } from 'stores/work-list/models/WorkListModel';

export default interface IWorkList {
   readonly totalRows: number
   readonly rows: WorklistRowsModel[]
   readonly column: string 
   readonly sorting: string 
   readonly search: string 
   readonly filter: string 

}
