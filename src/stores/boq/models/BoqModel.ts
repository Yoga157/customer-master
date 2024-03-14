/*"boqGenID": 0,
  "funnelGenID": 0,
  "productNumber": "string",
  "qty": 0,
  "brandID": 0,
  "subBrandID": 0,
  "warranty": 0,
  "warrantyDurationType": "string",
  "warrantyInDays": 0,
  "createDate": "2020-09-30T23:55:02.379Z",
  "createUserID": 0,
  "modifyDate": "2020-09-30T23:55:02.379Z",
  "modifyUserID": 0*/

import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class BoqModel extends BaseModel {
  boqGenID: number = 0;
  funnelGenID: number = 0;
  productNumber: string = ' ';
  serialNumber: string = ' ';
  description: string = ' ';
  qty: number = 0;
  brandID: number = 0;
  brandName: string = ' ';
  subBrandID: number = 0;
  subBrandName: string = ' ';
  warranty: number = 0;
  warrantyDurationType: string = ' ';
  coverageHour: string = ' ';
  responseTimeType: string = ' ';
  responseTimeValue: number = 0;
  resolutionTimeType: string = ' ';
  resolutionTimeValue: number = 0;
  preventiveDate?: Date = undefined;
  preventiveSchedule: string = ' ';
  createUserID: number = 0;
  modifyUserID?: number = 0;
  constructor(data: Partial<BoqModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<BoqModel>): void {
    const conversionOptions: IConversionOption = {
      // boqGenID: ConversionTypeEnum.Number,
      // funnelGenID: ConversionTypeEnum.Number,
      // productNumber: ConversionTypeEnum.String,
      // description: ConversionTypeEnum.String,
      // qty: ConversionTypeEnum.Number,
      // brandID: ConversionTypeEnum.Number,
      // brandName: ConversionTypeEnum.String,
      // subBrandID: ConversionTypeEnum.Number,
      // subBrandName: ConversionTypeEnum.String,
      warranty: ConversionTypeEnum.Number,
      // coverageHour: ConversionTypeEnum.String,
      // warrantyDurationType: ConversionTypeEnum.String,
      // resolutionTimeValue: ConversionTypeEnum.Number,
      // resolutionTimeType: ConversionTypeEnum.String,
      // responseTimeValue: ConversionTypeEnum.Number,
      // responseTimeType: ConversionTypeEnum.String,
      // createUserID: ConversionTypeEnum.Number,
      // modifyUserID: ConversionTypeEnum.Number,
      // preventiveSchedule: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
