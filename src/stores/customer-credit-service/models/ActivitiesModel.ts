import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class ActivitiesModel extends BaseModel {
    funnelGenID: number = 0;
    funnelActivityID: number = 0;
    activityTypeID: number = 0;
    activityName: string = '';
    activityTitle: string = '';
    activityStartTime?: Date;
    activityEndTime?: Date;
    descriptions: string = '';
    link: string = '';
    photoProfile: string = '';
    createUserID: number = 0;
    createUsername: string = '';
    createDate?: Date;
    displayTime: string = '';
    assignedTo: string = '';

  constructor(data: Partial<ActivitiesModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<ActivitiesModel>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelActivityID: ConversionTypeEnum.Number,
      activityTypeID: ConversionTypeEnum.Number,
      activityName: ConversionTypeEnum.String,
      activityTitle: ConversionTypeEnum.String,
      descriptions: ConversionTypeEnum.String,
      link: ConversionTypeEnum.String,
      photoProfile: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      displayTime: ConversionTypeEnum.String,
      createUsername: ConversionTypeEnum.String,
      assignedTo: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
