import { ListWorkAttachmentRowModel } from 'stores/work-list/models/ListWorkAttachmentModel';

export default interface IListWorkAttachment {
   readonly totalRows: number
   readonly rows: ListWorkAttachmentRowModel[]
   readonly column: string 
   readonly sorting: string 
   readonly search: string 
   readonly filter: string 

}