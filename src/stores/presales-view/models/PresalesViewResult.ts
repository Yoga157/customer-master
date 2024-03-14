import { BaseModel } from 'sjs-base-model';


export default class PresalesViewResult extends BaseModel {
  public readonly udcid: string = '';
  public readonly entryKey: string = '';
  public readonly text1: string = '';
  public readonly text2: string = '';
  public readonly text3: number = 0;
  public readonly inum1: number = 0;
  public readonly creator: string = '';
  public readonly lastModifyUser: string = '';
  public readonly lastModifyDate: string = '';
  public readonly dateTime1: string = '';
  public readonly dateTime2: string = '';
  constructor(data: Partial<PresalesViewResult>) {
    super();

    this.update(data);
  }
}
