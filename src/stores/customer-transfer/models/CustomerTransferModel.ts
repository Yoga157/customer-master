import { BaseModel } from 'sjs-base-model';

export class CustomerTransferModel extends BaseModel {
  public readonly id: number = 0;
  public readonly funnelGenID: number = 0;
  public readonly customerName: string = '';
  public readonly customerGenID: number = 0;
  public readonly projectName: string = '';
  public readonly totalSellingPrice: string = '';
  public readonly gpmAmount: string = '';
  public readonly dealCloseDate: string = '';
  public readonly funnelStatus: string = '';

  constructor(data: Partial<CustomerTransferModel>) {
    super();
    this.update(data);
  }
}

export class HistoryModel extends BaseModel {
  public readonly id: number = 0;
  public readonly customerName: string = '';
  public readonly funnelID: string = '';
  public readonly fromSales: string = '';
  public readonly toSales: string = '';
  public readonly createDate: string = '';
  public readonly creatorUserID: number = 0;

  constructor(data: Partial<HistoryModel>) {
    super();
    this.update(data);
  }
}

export class dataFunnelModel extends BaseModel {
  public readonly funnelID: number = 0;

  constructor(data: Partial<dataFunnelModel>) {
    super();
    this.update(data);
  }
}

export class dataFunnelCustomerModel extends BaseModel {
  public readonly customerGenID: number = 0;

  constructor(data: Partial<dataFunnelCustomerModel>) {
    super();
    this.update(data);
  }
}

export class InsertModel extends BaseModel {
  public readonly salesIDFrom: number = 0;
  public readonly salesIDTo: number = 0;
  public readonly createUserID: number = 0;
  public readonly listFunnelID: any[] = [];
  constructor(data: Partial<InsertModel>) {
    super();
    this.update(data);
  }
}
