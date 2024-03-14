/*"funneleSvcCatGenID": 0,
  "funnelGenID": 0,
  "brandModelGenID": 0,
  "svcCatGenID": 0,
  "qty": 0,
  "unitPrice": 0,
  "totalPrice": 0,
  "discountPctg": 0,
  "discountAmount": 0,
  "notes": "string",
  "createDate": "2020-09-28T20:37:15.622Z",
  "createUserID": 0,
  "modifyDate": "2020-09-28T20:37:15.622Z",
  "modifyUserID": 0*/

import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelServiceCatalogModel extends BaseModel {
  funnelSvcCatGenID: number = 0;
  funnelGenID: number = 0;
  brandModelGenID: number = 0;
  svcCatGenID: number = 0;
  qty: number = 0;
  unitPrice: number = 0;
  totalPrice: number = 0;
  discountPctg: number = 0;
  discountAmount: number = 0;
  notes: string = '';
  createUserID: number = 0;
  createDate?: Date;
  modifyDate?: Date;
  modifyUser: string = '';

  constructor(data: Partial<FunnelServiceCatalogModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelServiceCatalogModel>): void {
    const conversionOptions: IConversionOption = {
      funnelSvcCatGenID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      brandModelGenID: ConversionTypeEnum.Number,
      svcCatGenID: ConversionTypeEnum.Number,
      qty: ConversionTypeEnum.Float,
      unitPrice: ConversionTypeEnum.Float,
      totalPrice: ConversionTypeEnum.Float,
      discountPctg: ConversionTypeEnum.Float,
      discountAmount: ConversionTypeEnum.Float,
      notes: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      modifyUser: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
