import DedicatedResourcesModel from './DedicatedResourcesModel';
import { BaseModel } from 'sjs-base-model';

export default class DedicatedResourcesEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: DedicatedResourcesModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';
  public readonly filter: any = null;
  public readonly search: any = null;
  public readonly status: any = null;

  constructor(data: Partial<DedicatedResourcesEnvelope>) {
    super();
    this.update(data);
  }
}
