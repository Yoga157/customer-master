import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class CostName extends BaseModel {
  public pmt: number = 0;
  public totalPMT: number = 0;
  public monthlySelling: number = 0;
  public financing: number = 0;
  public pmtFinancing: number = 0;
  public totalFinancing: number = 0;

  constructor(data: Partial<CostName>) {
    super();

    this.update(data);
  }
}
