//   "reqResourceGenID": 1,
//   "funnelGenID": 10252,
//   "engineerDeptID": "1070607000",
//   "engineerDeptName": "SSS Integration",
//   "requirementDescription": "Test",
//   "projectBudget": 10000000,
//   "paymentType": "Mandays",
//   "createName": "Stephanus Andreas Tantohandojo",
//   "lastModifyBy": null,
//   "status": "1",
//   "createDate": "2020-10-17T00:00:00",
//   "createUserID": 831,
//   "modifyDate": null,
//   "modifyUserID": 0

import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ReqDedicatedResourceModel extends BaseModel {
  reqResourceGenID: number = 0;
  funnelGenID: number = 0;
  engineerDeptID: string = '';
  engineerDeptName: string = '';
  numOfResource: number = 0;
  requirementDescription: string = '';
  projectBudget: number = 0;
  paymentType: string = '';
  createUserID: number = 0;
  createName: string = '';
  lastModifyBy: string = '';
  status: string = '';
  createDate?: Date = undefined;
  modifyDate?: Date = undefined;
  modifyUserID: number = 0;

  constructor(data: Partial<ReqDedicatedResourceModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ReqDedicatedResourceModel>): void {
    const conversionOptions: IConversionOption = {
      reqResourceGenID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      numOfResource: ConversionTypeEnum.Number,
      engineerDeptID: ConversionTypeEnum.String,
      engineerDeptName: ConversionTypeEnum.String,
      requirementDescription: ConversionTypeEnum.String,
      projectBudget: ConversionTypeEnum.Number,
      paymentType: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      createName: ConversionTypeEnum.String,
      lastModifyBy: ConversionTypeEnum.String,
      status: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
