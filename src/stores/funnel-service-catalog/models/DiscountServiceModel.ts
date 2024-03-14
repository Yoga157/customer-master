/*{
    "funnelGenID": 0,
    "svcCatGenID": 0,
    "discPercent": 0,
    "discAmount": 0,
    "notes": "string",
    "createUserID": "string",
    "discountStatus": "string"
  }
*/

import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelServiceCatalogModel extends BaseModel {
  funnelSvcCatGenID: number = 0;
  funnelGenID: number = 0;
  svcCatGenID: number = 0;
  discPercent: number = 0;
  discAmount: number = 0;
  notes: string = '';
  createUserID: string = '';
  discountStatus: string = '';

  constructor(data: Partial<FunnelServiceCatalogModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelServiceCatalogModel>): void {
    const conversionOptions: IConversionOption = {
      funnelSvcCatGenID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      svcCatGenID: ConversionTypeEnum.Number,
      discPercent: ConversionTypeEnum.Float,
      discAmount: ConversionTypeEnum.Float,
      notes: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.String,
      discountStatus: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
