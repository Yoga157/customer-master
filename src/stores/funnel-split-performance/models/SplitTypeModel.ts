import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class SplitTypeModel extends BaseModel {
  textData: string = '';
  valueData: number = 0;

  constructor(data: Partial<SplitTypeModel>) {
    super();

    this.update(data);
  }
}
