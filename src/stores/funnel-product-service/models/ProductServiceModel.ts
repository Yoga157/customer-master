import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ProductServiceModel extends BaseModel {
  funnelItemsID: number = 0;
  funnelGenID: number = 0;
  itemType: number = 0;
  itemID: number = 0;
  itemName: string = '';
  itemSubID: number = 0;
  itemSubName: string = '';
  processorType: number = 0;
  processorTypeName: string = '';
  itemDescription: string = '';
  orderingPrice: number = 0;
  sellingPrice: number = 0;
  dealRegNo: string = '';
  dealRegExpiryDate?: Date = undefined;
  createUserID: number = 0;
  supplierName: string = '';
  supplierID: any = null;
  serviceCatalogFlag: string = '';
  flagEdit: string = '';
  isRental: number = 0;
  isUpdate: number = 0;
  isDelete: number = 0;
  isAdd: number = 0;
  //Buat State
  cbvNo: string = '';
  flagSalesSpesialis: number = 0;
  salesSpesialis: string = '';

  constructor(data: Partial<ProductServiceModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ProductServiceModel>): void {
    const conversionOptions: IConversionOption = {
      funnelItemsID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      itemType: ConversionTypeEnum.Number,
      itemID: ConversionTypeEnum.Number,
      itemName: ConversionTypeEnum.String,
      itemSubID: ConversionTypeEnum.Number,
      itemSubName: ConversionTypeEnum.String,
      processorType: ConversionTypeEnum.Number,
      processorTypeName: ConversionTypeEnum.String,
      itemDescription: ConversionTypeEnum.String,
      orderingPrice: ConversionTypeEnum.Float,
      sellingPrice: ConversionTypeEnum.Float,
      dealRegNo: ConversionTypeEnum.String,
      supplierName: ConversionTypeEnum.String,
      serviceCatalogFlag: ConversionTypeEnum.String,
      flagEdit: ConversionTypeEnum.String,
      isRental: ConversionTypeEnum.Number,
      isUpdate: ConversionTypeEnum.Number,
      isDelete: ConversionTypeEnum.Number,
      isAdd: ConversionTypeEnum.Number,
      flagSalesSpesialis: ConversionTypeEnum.Number,
      salesSpesialis: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
