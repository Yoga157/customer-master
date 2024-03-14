import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class WorklistHistoryModel extends BaseModel {
  projectId:number = 0;
  activityTitle: string = '';
  activityText: string = '';
  taskRemark: string | Date = '' ;
  
  constructor(data: Partial<WorklistHistoryModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<WorklistHistoryModel>): void {
    const conversionOptions: IConversionOption = {
      projectId: ConversionTypeEnum.Number,
      activityTitle: ConversionTypeEnum.String,
      activityText: ConversionTypeEnum.String,
      taskRemark: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}