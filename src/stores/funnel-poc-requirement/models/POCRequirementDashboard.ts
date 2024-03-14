import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class POCRequirementDashboard extends BaseModel {
  public pocGenReqID: number = 0;
  public pocGenHID: number = 0;
  public pocReqType: number = 0;
  public requirementType: string = '';
  public sourceType: string = '';
  public itemQty: number = 0;
  public itemDescription: string = '';
  public pocReqPICDeptID: string = '';
  public pocReqDeptName: string = '';
  public pocReqPICID: string = '';
  public pocReqPICName: string = '';
  public pocReqPICAssign: string = '';
  public pocReqRemarks: string = '';
  public pocReqStatusID: number = 0;
  public createBy: string = '';
  public lastModifyBy: string = '';
  public createDate?: Date = undefined;
  public createUserID: number = 0;
  public modifyDate?: Date = undefined;
  public modifyUserID: number = 0;

  constructor(data: Partial<POCRequirementDashboard>) {
    super();
    this.update(data);
  }

  public update(data: Partial<POCRequirementDashboard>): void {
    const conversionOptions: IConversionOption = {
      pocGenReqID: ConversionTypeEnum.Number,
      pocGenHID: ConversionTypeEnum.Number,
      pocReqType: ConversionTypeEnum.Number,
      requirementType: ConversionTypeEnum.String,
      sourceType: ConversionTypeEnum.String,
      itemQty: ConversionTypeEnum.Number,
      itemDescription: ConversionTypeEnum.String,
      pocReqPICDeptID: ConversionTypeEnum.String,
      pocReqDeptName: ConversionTypeEnum.String,
      pocReqPICID: ConversionTypeEnum.String,
      pocReqPICName: ConversionTypeEnum.String,
      pocReqPICAssign: ConversionTypeEnum.String,
      pocReqRemarks: ConversionTypeEnum.String,
      pocReqStatusID: ConversionTypeEnum.Number,
      createBy: ConversionTypeEnum.String,
      lastModifyBy: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
