import { BaseModel } from 'sjs-base-model';

export default class ReportManagerModel extends BaseModel {
    public readonly udcid: number = 0;
    public readonly text1: string = '';
    public readonly entryKey: string = '';
    public readonly text2: string = '';
    public readonly text3: string = '';

    constructor(data: Partial<ReportManagerModel>) {
      super();
  
      this.update(data);
    }
  }