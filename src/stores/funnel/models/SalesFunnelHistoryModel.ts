import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';
export default class SalesFunnelHistoryModel extends BaseModel {
  funnelGenID: number = 0;
  funnelStatus: string = '';
  dealCloseDate: string = '';
  salesName: string = '';
  pOCustomerNo: string = '';
  pOCustomerDate: string = '';
  contractNo: string = '';
  contractStartDate: string = '';
  contractEndDate: string = '';
  customerName: string = '';
  endCustomerName: string = '';
  projectName: string = '';
  estStartProjectDate?: Date = undefined;
  estEndProjectDate?: Date = undefined;
  estDurationProject: number = 0;
  reqDedicatedResource: number = 0;
  presales: string = '';
  pmo: string = '';
  smo: string = '';
  totalSellingPrice: number = 0;
  totalOrderingPrice: number = 0;
  gpmPctg: number = 0;
  gpmAmount: number = 0;
  modifyDate?: Date = undefined;

  constructor(data: Partial<SalesFunnelHistoryModel>) {
    super();
    this.update(data);
  }
}
