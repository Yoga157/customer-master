import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class BankGaransiAdminModel extends BaseModel {
  public bankGuaranteeGenID: number = 0;
  public bankGuaranteeNo: string = '';
  public bankGuaranteeID: string = '';
  public status: string = '';
  public funnelGenID: number = 0;
  public cocode: number = 0;
  public bondType: string = '';
  public companyApplicant: string = '';
  public letterType: string = '';
  public letterNo: string = '';
  public language: string = '';
  public requireOn?: Date = undefined;
  public bondIssuerType: string = '';
  public bondIssuer: string = '';
  public reqEffectiveDate?: Date = undefined;
  public reqExpireDate?: Date = undefined;
  public adminEffectiveDate?: Date = undefined;
  public adminExpireDate?: Date = undefined;
  public tenderNo: string = '';
  public tenderAnnouncementDate?: Date = undefined;
  public submitDate?: Date = undefined;
  public createDate?: Date = undefined;
  public createUserID: number = 0;
  public modifyDate?: Date = undefined;
  public modifyUserID: number = 0;
  public nilai: number = 0;
  public linkTo: string = '';
  public stepOwner: string = '';
  public stepName: string = '';
  public projectAmount: number = 0;
  public process: string = '';
  public createBy: string = '';
  public statusProject: string = '';
  public customerName: string = '';
  public projectName: string = '';
  public bu: string = '';
  public so: string = '';
  public workflowID: number = 0;

  constructor(data: Partial<BankGaransiAdminModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<BankGaransiAdminModel>): void {
    const conversionOptions: IConversionOption = {
      bankGuaranteeGenID: ConversionTypeEnum.Number,
      bankGuaranteeNo: ConversionTypeEnum.String,
      bankGuaranteeID: ConversionTypeEnum.String,
      status: ConversionTypeEnum.String,
      funnelGenID: ConversionTypeEnum.Number,
      bondType: ConversionTypeEnum.String,
      letterType: ConversionTypeEnum.String,
      letterNo: ConversionTypeEnum.String,
      language: ConversionTypeEnum.String,
      bondIssuerType: ConversionTypeEnum.String,
      bondIssuer: ConversionTypeEnum.String,
      tenderNo: ConversionTypeEnum.String,
      stepName: ConversionTypeEnum.String,
      stepOwner: ConversionTypeEnum.String,
      nilai: ConversionTypeEnum.Float,
      projectAmount: ConversionTypeEnum.Float,
      workflowID: ConversionTypeEnum.Number,
      process: ConversionTypeEnum.String,
      createBy: ConversionTypeEnum.String,
      statusProject: ConversionTypeEnum.String,
      companyApplicant: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      bu: ConversionTypeEnum.String,
      so: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
