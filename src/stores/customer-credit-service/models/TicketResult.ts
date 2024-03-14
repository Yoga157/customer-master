import { BaseModel } from 'sjs-base-model';
import TicketModel from './TicketModel';

export default class TicketResult extends BaseModel {
  public readonly existing: number = 0;
  public readonly salesCustomerCreditService: TicketModel = new TicketModel({});

  constructor(data: Partial<TicketResult>) {
    super();
    this.update(data);
  }
}
