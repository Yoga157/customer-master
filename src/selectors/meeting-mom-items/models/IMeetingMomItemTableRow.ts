/*public activityMomID:number = 0;
public activityMomItemsID:number = 0;
public topic:string = '';
public action:string = '';
public pic:string = '';
public createUserID: number = 0;
public modifyUserID:number = 0;
public picArr:string[] = []*/

export default interface IMeetingMomItemTableRow {
  readonly activityMomID: number;
  readonly activityMomItemsID: number;
  readonly topic: string;
  readonly action: string;
  readonly pic: string;
  readonly createUserID: number;
  readonly modifyUserID: number;
}
