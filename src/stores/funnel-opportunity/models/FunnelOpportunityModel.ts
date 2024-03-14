import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import FunnelOpportunityRow from './FunnelOpportunityRow';

export default class FunnelOpportunity extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelOpportunityRow[] = [];

  constructor(data: Partial<FunnelOpportunity>) {
    super();

    this.update(data);
  }
}
