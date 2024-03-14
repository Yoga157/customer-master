import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelPORowModel extends BaseModel {
  po: string = '';
  customer: string = '';
  supplier: string = '';
  bu: string = '';
  projectName: string = '';
  projectAmount: number = 0;
  orderDate?: string = '' 
    
    constructor(data: Partial<FunnelPORowModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<FunnelPORowModel>): void {
        const conversionOptions: IConversionOption = {
            po:ConversionTypeEnum.String,
            customer:ConversionTypeEnum.String,
            supplier:ConversionTypeEnum.String,
            bu:ConversionTypeEnum.String,
            projectName:ConversionTypeEnum.String,
            projectAmount:ConversionTypeEnum.Number,
            orderDate:ConversionTypeEnum.String,
        };
  
        super.update(data, conversionOptions);
    }
}
  