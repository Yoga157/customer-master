import { BaseModel } from 'sjs-base-model';
import TicketModel from './TicketModel';

export default class TicketModels extends BaseModel {
  public readonly errorNumber: string = '';
  public readonly bSuccess: string = '';
  public readonly message: string = '';
  public readonly resultObj: TicketModel = new TicketModel({});

  constructor(data: Partial<TicketModels>) {
    super();
    this.update(data);
  }
}
