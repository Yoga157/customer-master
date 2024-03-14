import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class GeneratedTableRowModel extends BaseModel {
  createdBy: string = '';
  createdDate: string = '';
  customerName: string = '';
  customerPICName: string = '';
  engineerPMName: string = '';
  formID: string = '';
  formType: string = '';
  funnelGenID: number = 0
  notes: string = '';
  saNo: string = '';
    
    constructor(data: Partial<GeneratedTableRowModel>){
      super();
      this.update(data)
    } 

    public update(data: Partial<GeneratedTableRowModel>): void {
        const conversionOptions: IConversionOption = {
            createdBy:ConversionTypeEnum.String,
            createdDate:ConversionTypeEnum.String,
            customerName:ConversionTypeEnum.String,
            customerPICName:ConversionTypeEnum.String,
            engineerPMName:ConversionTypeEnum.String,
            formID:ConversionTypeEnum.String,
            formType:ConversionTypeEnum.String,
            funnelGenID:ConversionTypeEnum.Number,
            notes:ConversionTypeEnum.String,
            saNo:ConversionTypeEnum.String
        };
  
        super.update(data, conversionOptions);
    }
}
  