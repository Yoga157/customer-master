import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataDashboardDeptModel extends BaseModel {
  deptId: string = '';
  totalPic: number = 0;
  totalPoint: number = 0;
  dept: string = '';

  constructor(data: Partial<KpiDataDashboardDeptModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataDashboardDeptModel>) {
    const conversionOptions: IConversionOption = {
      totalPic: ConversionTypeEnum.Number,
      totalPoint: ConversionTypeEnum.Number,
      deptId: ConversionTypeEnum.String,
      dept: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
