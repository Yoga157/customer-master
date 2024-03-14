import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class BrandTypeModel extends BaseModel {
  brandModelGenID: number = 0;
  brandID: number = 0;
  subBrandID: number = 0;
  brandName: string = '';
  subBrandName: string = '';
  modelName: string = '';
  modelLongName: string = '';
  productManagerID: string = '';
  productManager: string = '';
  presales: string = '';
  postsales: string = '';
  maintenanceService: string = '';
  createDate?: Date = undefined;
  createUserID: number = 0;
  creatorName: string = '';
  modifyDate?: Date = undefined;
  modifyUserID: number = 0;
  modifyName: string = '';
  status: string = '';
  effectiveDate: any = null;
  expireDate: any = null;

  constructor(data: Partial<BrandTypeModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<BrandTypeModel>): void {
    const conversionOptions: IConversionOption = {
      brandModelGenID: ConversionTypeEnum.Number,
      brandID: ConversionTypeEnum.Number,
      subBrandID: ConversionTypeEnum.Number,
      brandName: ConversionTypeEnum.String,
      subBrandName: ConversionTypeEnum.String,
      productManagerID: ConversionTypeEnum.String,
      productManager: ConversionTypeEnum.String,
      modelName: ConversionTypeEnum.String,
      presales: ConversionTypeEnum.String,
      postsales: ConversionTypeEnum.String,
      maintenanceService: ConversionTypeEnum.String,
      modelLongName: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      creatorName: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
      modifyName: ConversionTypeEnum.String,
      status: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
