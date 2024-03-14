import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelActivityModel extends BaseModel {
  funnelGenID: number = 0;
  funnelActivityID: number = 0;
  assignedTo: string = '';
  activityTypeID: number = 0;
  activityTitle: string = '';
  activityStartTime?: string = '';
  activityEndTime?: string = '';
  activityText1: string = '';
  activityText2: string = '';
  activityText3: string = '';
  activityText4: string = '';
  activityText5: string = '';
  activityStatusID: number = 0;
  createUserID: number = 0;
  assignedToArr: string[] = [];
  ccToArr: string[] = [];

  constructor(data: Partial<FunnelActivityModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelActivityModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelActivityID: ConversionTypeEnum.Number,
      activityTypeID: ConversionTypeEnum.Number,
      activityTitle: ConversionTypeEnum.String,
      assignedTo: ConversionTypeEnum.String,
      activityText1: ConversionTypeEnum.String,
      activityText2: ConversionTypeEnum.String,
      activityText3: ConversionTypeEnum.String,
      activityText5: ConversionTypeEnum.String,
      activityStatusID: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      activityStartTime: ConversionTypeEnum.String,
      activityEndTime: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
