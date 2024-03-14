/*{
    "funnelActivityID": 5,
    "funnelGenID": 40,
    "activityTypeID": 141,
    "activityName": "Notes",
    "activityTitle": "<p>testing notes dari UI 2</p>",
    "activityStartTime": null,
    "activityEndTime": null,
    "descriptions": "<p>testing notes dari UI 2</p>",
    "link": ""
  }*/

import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelActivitiesModel extends BaseModel {
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
  assignedToArr: string[] = [];

  constructor(data: Partial<FunnelActivitiesModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelActivitiesModel>): void {
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
