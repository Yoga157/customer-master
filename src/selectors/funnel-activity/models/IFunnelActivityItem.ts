export default interface IFunnelActivityItem {
  readonly funnelGenID: number;
  readonly funnelActivityID: number;
  readonly activityTypeID: number;
  readonly activityTitle: string;
  readonly activityStartTime?: Date;
  readonly activityEndTime?: Date;
  readonly activityText1: string;
  readonly activityText2: string;
  readonly activityText3: string;
  readonly activityText4: string;
  readonly activityText5: string;
  readonly activityStatusID: number;
  readonly createUserID: number;
  readonly createDate?: Date;
}
