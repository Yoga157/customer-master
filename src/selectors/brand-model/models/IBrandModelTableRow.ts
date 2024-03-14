export default interface IBrandModelTableRow {
  readonly brandModelGenID: number;
  readonly brandName: string;
  readonly subBrandName: string;
  readonly brandID: number;
  readonly subBrandID: number;
  readonly modelName: string;
  readonly productManagerID: string;
  readonly productManager: string;
  readonly presales: string;
  readonly postsales: string;
  readonly maintenanceService: string;
  readonly createDate?: Date;
  readonly effectiveDate?: Date;
  readonly expireDate?: Date;
  readonly createUserID: number;
  readonly creatorName: string;
  readonly modifyDate?: Date | null | undefined;
  readonly modifyUserID: number;
  readonly modifyName: string;
  readonly status: string;
}
