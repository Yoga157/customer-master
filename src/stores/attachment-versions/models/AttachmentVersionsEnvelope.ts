import { BaseModel } from 'sjs-base-model';
import AttachmentVersionsModel from './AttachmentVersionsModel';

export default class AttachmentVersionsEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: AttachmentVersionsModel[] = [];

  constructor(data: Partial<AttachmentVersionsEnvelope>) {
    super();
    this.update(data);
  }
}
