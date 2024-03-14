import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class TopServiceModel extends BaseModel {
  funnelTopID: number = 0;
  funnelGenID: number = 0;
  topType: number = 0;
  topTypeStr: string = '';
  productDesc: number = 0;
  productDescStr: string = '';
  productPercentage: number = 0;
  serviceDesc: number = 0;
  serviceDescStr: string = '';
  servicePercentage: number = 0;
  amount: number = 0;
  totalAmount: number = 0;
  notes: string = '';
  supportDoc: string = '';
  supportDocStr: string = '';
  docCollectionDate: Date = new Date();
  createUserID: number = 0;
  modifyUserID: number = 0;
  createDate: string = '';
  invoiceNumber: number = 0;
  invoiceDate: string = '';
  isUpdate: number = 0;
  isDelete: number = 0;
  isAdd: number = 0;

  constructor(data: Partial<TopServiceModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<TopServiceModel>): void {
    const conversionOptions: IConversionOption = {
      funnelTopID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      topType: ConversionTypeEnum.Number,
      topTypeStr: ConversionTypeEnum.String,
      productDesc: ConversionTypeEnum.Number,
      productDescStr: ConversionTypeEnum.String,
      productPercentage: ConversionTypeEnum.Number,
      serviceDesc: ConversionTypeEnum.Number,
      serviceDescStr: ConversionTypeEnum.String,
      servicePercentage: ConversionTypeEnum.Number,
      amount: ConversionTypeEnum.Number,
      totalAmount: ConversionTypeEnum.Number,
      notes: ConversionTypeEnum.String,
      supportDoc: ConversionTypeEnum.String,
      supportDocStr: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      isUpdate: ConversionTypeEnum.Number,
      isDelete: ConversionTypeEnum.Number,
      isAdd: ConversionTypeEnum.Number,
      // docCollectionDate: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
