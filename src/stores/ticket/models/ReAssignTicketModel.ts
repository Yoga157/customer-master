import { BaseModel } from 'sjs-base-model';

export default class ReAssignTicketModel extends BaseModel {
  ticketId: number = 0;
  ticketUID: string = "";
  primaryResource: string = "";
  modifyDate: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<ReAssignTicketModel>) {
    super();
    this.update(data);
  }
}
