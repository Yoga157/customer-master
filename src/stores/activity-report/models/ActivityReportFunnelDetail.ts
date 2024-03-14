import { BaseModel, IConversionOption, ConversionTypeEnum } from 'sjs-base-model';

export default class ActivityReportFunnelDetail extends BaseModel {
    public readonly projectName: string = '';
    public readonly accountName: string = '';
    public readonly accountAddress: string = '';
    public readonly contactName: string = '';
    public readonly accountPhone: string = '';

    constructor(data: Partial<ActivityReportFunnelDetail>) {
      super();
      this.update(data);
    }

    public update(data: Partial<ActivityReportFunnelDetail>): void {
      const conversionOptions: IConversionOption = {
        projectName: ConversionTypeEnum.String,
        accountName:ConversionTypeEnum.String,
        accountAddress:ConversionTypeEnum.String,
        contactName: ConversionTypeEnum.String,
        accountPhone: ConversionTypeEnum.String,
      };

    super.update(data, conversionOptions);
  }
}
