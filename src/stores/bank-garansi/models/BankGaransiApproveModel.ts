import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

 export default class BankGaransiApproveModel extends BaseModel {
    public bankGuaranteeNo:string = '';
    public userLogin:string = '';
    public status:string = '';
    public notes:string = '';
    public returnDate?:Date = undefined;
    public submitDate?:Date = undefined;
    public process:string = ''
    public letterNo:string = ''
    public companyApplicant:string = ''
    public increamentNo:number = 0
    public claimPeriod:number =0
    public publishDate?:Date = undefined;
    public effectiveDate?:Date = undefined;
    public expiredDate?:Date = undefined;
    public suratPerjanjianNo:string = ''

  constructor(data: Partial<BankGaransiApproveModel>){
    super();
    this.update(data)
  }

  public update(data: Partial<BankGaransiApproveModel>): void {
    const conversionOptions: IConversionOption = {
      bankGuaranteeNo:ConversionTypeEnum.String,
      status:ConversionTypeEnum.String,
      letterNo:ConversionTypeEnum.String,
      userLogin:ConversionTypeEnum.String,
      notes:ConversionTypeEnum.String,
      process:ConversionTypeEnum.String,
      increamentNo:ConversionTypeEnum.Number,
      claimPeriod:ConversionTypeEnum.Number,
      suratPerjanjianNo:ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
}
}
  


