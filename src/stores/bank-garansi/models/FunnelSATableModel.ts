import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import FunnelSARowModel  from './FunnelSARowModel'

export default class FunnelSATableModel extends BaseModel {
  public readonly totalRows:number = 0;
  public readonly rows: FunnelSARowModel[] = [];
    
    constructor(data: Partial<FunnelSATableModel>) {
      super();
  
      this.update(data);
    }

  }