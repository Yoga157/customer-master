import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

 export default class BankGaransiModel extends BaseModel {
    public bankGuaranteeGenID:number = 0;
    public bankGuaranteeNo:string = '';
    public status:string = '';
    public funnelGenID:number = 0;
    public bondType:string = '';
    public letterType:string = '';
    public language:string = '';
    public requireOn?:Date = undefined;
    public bondIssuerType:string = '';
    public bondIssuer:string = '';
    public reqEffectiveDate?:Date = undefined;
    public reqExpireDate?:Date = undefined
    public adminEffectiveDate?:Date = undefined;
    public adminExpireDate?:Date = undefined
    public tenderNo:string = '';
    public tenderAnnouncementDate?:Date = undefined;
    public submitDate?:Date = undefined
    public createDate?:Date = undefined;
    public createUserID:number = 0;
    public modifyDate?:Date = undefined;
    public modifyUserID:number = 0;
    public nilai:number = 0;
    public linkTo:string = '';
    public projectAmount:number = 0;

  constructor(data: Partial<BankGaransiModel>){
    super();
    this.update(data)
  }

  public update(data: Partial<BankGaransiModel>): void {
    const conversionOptions: IConversionOption = {
      bankGuaranteeGenID:ConversionTypeEnum.Number,
      bankGuaranteeNo:ConversionTypeEnum.String,
      status:ConversionTypeEnum.String,
      funnelGenID:ConversionTypeEnum.Number,
      bondType:ConversionTypeEnum.String,
      letterType:ConversionTypeEnum.String,
      language:ConversionTypeEnum.String,
      bondIssuerType:ConversionTypeEnum.String,
      bondIssuer:ConversionTypeEnum.String,
      tenderNo:ConversionTypeEnum.String,
      nilai:ConversionTypeEnum.Number,
      projectAmount:ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
}
}
  


