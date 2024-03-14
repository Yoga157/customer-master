import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class PMOFilter extends BaseModel {
  estimationStartDate: string = '';
  estimationEndDate: string = '';
  actualStartDate: string = '';
  actualEndDate: string = '';
  projectStatusList: string = '';
  warrantyStatusList: string = '';
  projectList: string = '';
  pmoAssignIdList: string = '';
  customerIdList: string = '';
  salesIdList: string = '';
  userLoginId: number = 0;

  column: string = '';
  sorting: string = '';
  page: number = 0;
  pageSize: number = 0;

  constructor(data: Partial<PMOFilter>) {
    super();
    this.update(data);
  }

  public update(data: Partial<PMOFilter>): void {
    const conversionOptions: IConversionOption = {
      userLoginId: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
