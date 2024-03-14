export default interface IServiceCatalogTableRow {
  readonly svcCatGenID: number;
  readonly svcCatReffID: string;
  readonly svcCatID: number;
  readonly employeeID: string;
  readonly employeeIDLead: number | string;
  readonly effectiveDate: any;
  readonly expireDate: any;
  readonly brandModelID: string;
  readonly brandModelName: string;
  readonly manHour: number;
  readonly afterHour: number;
  readonly difficultyLevel: number;
  readonly svcName: string;
  readonly svcDescription: string;
  readonly svcPrerequisite: string;
  readonly notes: string;

  readonly priceType: string;
  readonly sourcePrice: string;
  readonly svcPrice: number;
  readonly flagFunnelGenID: number;
  readonly owner: string;
}
