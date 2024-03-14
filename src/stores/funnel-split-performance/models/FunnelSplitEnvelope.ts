import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import FunnelSplitModel from './FunnelSplitModel';

export default class FunnelSplitEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: FunnelSplitModel[] = [];

  constructor(data: Partial<FunnelSplitEnvelope>) {
    super();

    this.update(data);
  }
}
