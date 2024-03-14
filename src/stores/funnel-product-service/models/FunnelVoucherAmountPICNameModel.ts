import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelVoucherAmountPICNameModel extends BaseModel {
    value: number = 0;

  constructor(data: Partial<FunnelVoucherAmountPICNameModel>) {
    super();
    this.update(data);
  }
}
