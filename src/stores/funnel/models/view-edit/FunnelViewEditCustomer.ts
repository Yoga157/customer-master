import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class FunnelViewEditCustomer extends BaseModel {
  funnelGenID: number = 0;
  funnelID: string = '';
  customerGenID: number = 0;
  customerName: string = '';
  endUserCustomerGenID: number = 0;
  endUserCustomerName: string = '';
  projectName: string = '';
  actStartProjectDate?: Date = undefined;
  actEndProjectDate?: Date = undefined;
  estStartProjectDate?: Date = undefined;
  estEndProjectDate?: Date = undefined;
  estStartByPmo?: Date = undefined;
  estEndByPmo?: Date = undefined;
  estDurationProject: number = 0;
  estDurationType: string = '';
  presalesDeptID: string = '';
  pmoDeptID: string = '';
  smoDeptID: string = '';
  modifyUserID: number = 0;
  reqDedicatedResource: number = 0;
  preSalesDeptArr: string[] = [];
  customerAddress: string = '';
  phoneNumber: string = '';
  npwpNumber: string = '';
  customerPICID: number = 0;
  picName: string = '';
  picMobilePhone: string = '';
  picEmailAddr: string = '';
  chkSMODeptID: boolean = false;
  chkPMODeptID: boolean = false;
  customerCardID: string = '';
  fileDownload: string = '';
  flagCustomerBlacklist: string = '';
  flagEndCustomerBlacklist: string = '';
  deliveryDate?: Date = undefined;
  projectAlias: string = '';
  projectCategory: string = '';
  referTo: string = '';
  manDays: number = 0;
  complexity: number = 0;
  presalesNameList: string = '';
  constructor(data: Partial<FunnelViewEditCustomer>) {
    super();
    this.update(data);
  }

  public update(data: Partial<FunnelViewEditCustomer>): void {
    const conversionOptions: IConversionOption = {
      funnelGenID: ConversionTypeEnum.Number,
      funnelID: ConversionTypeEnum.String,
      customerGenID: ConversionTypeEnum.Number,
      customerName: ConversionTypeEnum.String,
      endUserCustomerGenID: ConversionTypeEnum.Number,
      endUserCustomerName: ConversionTypeEnum.String,
      projectName: ConversionTypeEnum.String,
      estDurationProject: ConversionTypeEnum.Number,
      estDurationType: ConversionTypeEnum.String,
      pmoDeptID: ConversionTypeEnum.String,
      smoDeptID: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
      reqDedicatedResource: ConversionTypeEnum.Number,
      customerAddress: ConversionTypeEnum.String,
      phoneNumber: ConversionTypeEnum.String,
      npwpNumber: ConversionTypeEnum.String,
      customerPICID: ConversionTypeEnum.Number,
      picName: ConversionTypeEnum.String,
      picMobilePhone: ConversionTypeEnum.String,
      picEmailAddr: ConversionTypeEnum.String,
      chkSMODeptID: ConversionTypeEnum.Boolean,
      chkPMODeptID: ConversionTypeEnum.Boolean,
      customerCardID: ConversionTypeEnum.String,
      fileDownload: ConversionTypeEnum.String,
      flagCustomerBlacklist: ConversionTypeEnum.String,
      flagEndCustomerBlacklist: ConversionTypeEnum.String,
      projectAlias: ConversionTypeEnum.String,
      projectCategory: ConversionTypeEnum.String,
      referTo: ConversionTypeEnum.String,
      manDays: ConversionTypeEnum.Number,
      complexity: ConversionTypeEnum.Number,
      presalesNameList: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
