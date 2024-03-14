import { BaseModel } from 'sjs-base-model';
import AttachmentModel from './AttachmentModel';

export default class AttachmentEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AttachmentModel[] = [];

  constructor(data: Partial<AttachmentEnvelope>) {
    super();
    this.update(data);
  }
}
