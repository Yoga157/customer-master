import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class PMOProject extends BaseModel {  
  funnelGenId: number = 0;
  projectAlias: string = '';
  estStartBypmo: string = '';
  estEndBypmo: string = '';
  initialMeeting: boolean  = false;
  
  constructor(data: Partial<PMOProject>) {
    super();

    this.update(data);
  }

  public update(data: Partial<PMOProject>): void {
      const conversionOptions: IConversionOption = {
          funnelGenId:ConversionTypeEnum.Number,
      };

      super.update(data, conversionOptions);
  }
}
