export default interface ISoftwareTableRow {
  readonly softwareID: number;
  readonly softwareName: string;
  readonly subSoftwareName: string;
  readonly leaders: string;
  readonly challengers: string;
  readonly visionaires: string;
  readonly nichePlayers: string;
  readonly createdBy: string;
  readonly createdDate: string;
  readonly modifiedBy: string;
  readonly modifiedDate: string;
}
