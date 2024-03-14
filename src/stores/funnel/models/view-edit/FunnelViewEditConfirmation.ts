import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class FunnelViewEditConfirmation extends BaseModel {
  funnelConfirmationID: number = 0;
  funnelGenID: number = 0;
  customerReadiness: number = 0;
  customerReadinessRemark: string = "";
  customerReadinessStr: string = "";
  thirdparty: number = 0;
  thirdPartyRemark: string = "";
  thirdpartyStr: string = "";
  supportSystem: number = 0;
  supportSystemRemark: string = "";
  supportSystemStr: string = "";
  createDate?: string = "";
  createUserID: number = 0;
  modifyDate?: string = "";
  modifyUserID: number = 0;

  constructor(data: Partial<FunnelViewEditConfirmation>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditConfirmation>): void {
    const conversionOptions: IConversionOption = {
      funnelConfirmationID: ConversionTypeEnum.Number,
      funnelGenID: ConversionTypeEnum.Number,
      customerReadiness: ConversionTypeEnum.Number,
      customerReadinessRemark: ConversionTypeEnum.String,
      customerReadinessStr: ConversionTypeEnum.String,
      thirdparty: ConversionTypeEnum.Number,
      thirdPartyRemark: ConversionTypeEnum.String,
      thirdpartyStr: ConversionTypeEnum.String,
      supportSystem: ConversionTypeEnum.Number,
      supportSystemRemark: ConversionTypeEnum.String,
      supportSystemStr: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
