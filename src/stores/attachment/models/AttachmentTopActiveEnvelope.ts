import { BaseModel } from 'sjs-base-model';
import AttachmentTopActiveModel from './AttachmentTopActiveModel';

export default class AttachmentTopActiveEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AttachmentTopActiveModel[] = [];

  constructor(data: Partial<AttachmentTopActiveEnvelope>) {
    super();
    this.update(data);
  }
}
