import { BaseModel } from 'sjs-base-model';

export default class PMOGetByEntryKeyModel extends BaseModel {
  public readonly udcid: number = 0;
  public readonly entryKey: string = '';
  public readonly text1: string = '';
  public readonly text2: string = '';
  public readonly text3: string = '';
  public readonly text4: string = '';
  public readonly text5: string = '';
  public readonly text6: string = '';
  public readonly text7: string = '';
  public readonly inum1: string = '';
  public readonly inum2: string = '';

  constructor(data: Partial<PMOGetByEntryKeyModel>) {
    super();

    this.update(data);
  }
}