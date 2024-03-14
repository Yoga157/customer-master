import { BaseModel } from 'sjs-base-model';
export default class FunnelConfigColumnModel extends BaseModel {
  flagManual:  boolean = true;
  lastNotesActivityThisWeek:  boolean = false;
  lastNotesActivityPrevWeek:  boolean = false;

  constructor(data: Partial<FunnelConfigColumnModel>) {
    super();
    this.update(data);
  }
}
