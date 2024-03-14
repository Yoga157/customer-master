import { BaseModel } from 'sjs-base-model';
import SoftwareModel from './SoftwareModel';

export default class SoftwareEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: SoftwareModel[] = [];

  constructor(data: Partial<SoftwareEnvelope>) {
    super();
    this.update(data);
  }
}
