import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class BankGaransiEditViewRequesterModel extends BaseModel {
  public bankGuaranteeGenID: number = 0;
  public funnelGenID: number = 0;
  public linkTo: string = '';
  public process: string = '';
  public stepName: string = '';
  public bankGuaranteeNo: string = '';
  public bankGuaranteeID: string = '';
  public bondType: string = '';
  public letterType: string = '';
  public letterNo: string = '';
  public companyApplicant: string = '';
  public projectName: string = '';
  public customerName: string = '';
  public customerAddress: string = '';
  public language: string = '';
  public requireOn?: Date = undefined;
  public bondIssuerType: string = '';
  public bondIssuer: string = '';
  public reqEffectiveDate?: Date = undefined;
  public reqExpireDate?: Date = undefined;
  public tenderNo: string = '';
  public createUserdomain: string = '';
  public tenderAnnouncementDate?: Date = undefined;
  public nilai: number = 0;
  public projectAmount: number = 0;
  public cocode: number = 0;
  public status: string = '';
  public createDate?: Date = undefined;
  public createUserID: number = 0;
  public modifyDate?: Date = undefined;
  public modifyUserID: number = 0;

  constructor(data: Partial<BankGaransiEditViewRequesterModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<BankGaransiEditViewRequesterModel>): void {
    const conversionOptions: IConversionOption = {
      bankGuaranteeGenID: ConversionTypeEnum.Number,
      bankGuaranteeNo: ConversionTypeEnum.String,
      process: ConversionTypeEnum.String,
      stepName: ConversionTypeEnum.String,
      status: ConversionTypeEnum.String,
      funnelGenID: ConversionTypeEnum.Number,
      bondType: ConversionTypeEnum.String,
      companyApplicant: ConversionTypeEnum.String,
      letterType: ConversionTypeEnum.String,
      createUserdomain: ConversionTypeEnum.String,
      language: ConversionTypeEnum.String,
      bondIssuerType: ConversionTypeEnum.String,
      bondIssuer: ConversionTypeEnum.String,
      tenderNo: ConversionTypeEnum.String,
      nilai: ConversionTypeEnum.Float,
      cocode: ConversionTypeEnum.Number,
      projectAmount: ConversionTypeEnum.Float,
      projectName: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      customerAddress: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
