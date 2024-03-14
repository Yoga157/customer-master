import { BaseModel } from 'sjs-base-model';
import WorkFlowHeaderModel from './WorkFlowHeaderModel';

export default class WorkFlowHeaderEnvelope extends BaseModel {
  public readonly errorNumber: string = "";
  public readonly resultObj: WorkFlowHeaderModel[];
  public readonly bSuccess: boolean = true;
  public readonly message: string = '';

  constructor(data: Partial<WorkFlowHeaderEnvelope>) {
    super();
    this.update(data);
  }
}
