import { BaseModel } from 'sjs-base-model';
import MeetingMomItemModel from './MeetingMomItemModel';

export default class MeetingMomItemsEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly rows: MeetingMomItemModel[] = [];

  constructor(data: Partial<MeetingMomItemsEnvelope>) {
    super();
    this.update(data);
  }
}
