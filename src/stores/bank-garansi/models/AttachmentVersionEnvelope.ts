import { BaseModel } from 'sjs-base-model';
import AttachmentVersionModel from './AttachmentVersionModel';

export default class AttachmentVersionEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AttachmentVersionModel[] = [];

  constructor(data: Partial<AttachmentVersionEnvelope>) {
    super();
    this.update(data);
  }
}
