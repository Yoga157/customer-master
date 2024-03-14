import { BaseModel } from 'sjs-base-model';
import SoftwareToolModel from './SoftwareToolModel';

export default class SoftwareToolEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: SoftwareToolModel[] = [];

  constructor(data: Partial<SoftwareToolEnvelope>) {
    super();
    this.update(data);
  }
}
