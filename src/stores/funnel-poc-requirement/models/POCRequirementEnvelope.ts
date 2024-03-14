import { BaseModel } from 'sjs-base-model';
import POCRequirementDashboard from './POCRequirementDashboard';

export default class POCRequirementEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: POCRequirementDashboard[] = [];

  constructor(data: Partial<POCRequirementEnvelope>) {
    super();
    this.update(data);
  }
}
