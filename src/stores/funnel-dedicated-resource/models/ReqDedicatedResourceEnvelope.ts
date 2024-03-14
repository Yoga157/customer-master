import { BaseModel } from 'sjs-base-model';
import ReqDedicatedResourceModel from './ReqDedicatedResourceModel';

export default class ReqDedicatedResourceEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: ReqDedicatedResourceModel[] = [];

  constructor(data: Partial<ReqDedicatedResourceEnvelope>) {
    super();
    this.update(data);
  }
}
