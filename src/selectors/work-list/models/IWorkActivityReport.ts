import { WorkActivityReportRowModel } from 'stores/work-list/models/WorkActivityReportModel';

export default interface IWorkActivityReport {
   readonly totalRows: number
   readonly rows: WorkActivityReportRowModel[]
   readonly column: string 
   readonly sorting: string 
   readonly search: string 
   readonly filter: string 

}