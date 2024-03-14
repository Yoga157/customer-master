export default interface IFunnelActivitiesItem {
  readonly funnelGenID: number;
  readonly funnelActivityID: number;
  readonly activityTypeID: number;
  readonly activityName: string;
  readonly activityTitle: string;
  readonly activityStartTime?: Date;
  readonly activityEndTime?: Date;
  readonly descriptions: string;
  readonly link: string;
  readonly photoProfile: string;
  readonly createUserID: number;
  readonly createUsername: string;
  readonly createDate?: Date;
  readonly displayTime: string;
  readonly assignedTo: string;
  readonly assignedToArr: string[];
}
