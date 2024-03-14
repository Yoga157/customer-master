import { TicketListRowModel } from 'stores/ticket/models/TicketListModel';

export default interface ITicketList {
   readonly totalRows: number
   readonly rows: TicketListRowModel[]
   readonly column: string 
   readonly sorting: string 
   readonly search: string 
   readonly filter: string 

}
