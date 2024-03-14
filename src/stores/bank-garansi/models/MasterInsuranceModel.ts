import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class MasterInsuranceModel extends BaseModel {
  id:number = 0;
  udcId:number = 0;
  userLoginID: string = '';
  name: string = '';
  insuranceName: string = '';
  entryKey: string = '';
  addr1: string = '';
  addr2: string = '';
  city: string = '';
  postalCode: string = '';
  email: string = '';
  insuranceEmail: string = '';
  rekening: string = '';
  waktuProses: number = 0;
  activeFlag: number = 0;

  constructor(data: Partial<MasterInsuranceModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<MasterInsuranceModel>): void {
    const conversionOptions: IConversionOption = {
      id: ConversionTypeEnum.Number,
      udcId: ConversionTypeEnum.Number,
      userLoginID: ConversionTypeEnum.String,
      name: ConversionTypeEnum.String,
      insuranceName: ConversionTypeEnum.String,
      entryKey: ConversionTypeEnum.String,
      addr1: ConversionTypeEnum.String,
      addr2: ConversionTypeEnum.String,
      city: ConversionTypeEnum.String,
      postalCode: ConversionTypeEnum.String,
      email: ConversionTypeEnum.String,
      rekening: ConversionTypeEnum.String,
      insuranceEmail: ConversionTypeEnum.String,
      waktuProses: ConversionTypeEnum.Number,
      activeFlag: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
