import { BaseModel } from 'sjs-base-model';
import FunnelSupportTeamDashboard from './FunnelSupportTeamDashboard';

export default class FunnelSupportTeamEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelSupportTeamDashboard[] = [];

  constructor(data: Partial<FunnelSupportTeamEnvelope>) {
    super();
    this.update(data);
  }
}
