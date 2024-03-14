import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
import GeneratedTableRowModel  from './GeneratedTableRowModel'

export default class GeneratedTableModel extends BaseModel {
  public readonly totalRows:number = 0;
  public readonly rows: GeneratedTableRowModel[] = [];
    
    constructor(data: Partial<GeneratedTableModel>) {
      super();
  
      this.update(data);
    }

  }