import { BaseModel } from "sjs-base-model";

export class PMOTopRowModel extends BaseModel {
  funnelGenID: number = 0;
  topNumber: string = '';
  invoiceNumber: number = 0;
  invoiceDescription: string = '';
  invoiceDate: string = '';
  productDesc: number = 0;
  productDescStr: string = '';
  productPercentage: number = 0;
  serviceDesc: number = 0;
  serviceDescStr: string = '';
  servicePercentage: number = 0;
  supportDoc: string = '';
  docCollectionDate: Date = new Date();
  notes: string = '';

  constructor(data: Partial<PMOTopRowModel>) {
    super();
    this.update(data);
  }
}

export default class PMOTopListModel extends BaseModel {
   readonly totalRows: number = 0;
   readonly rows: PMOTopRowModel[];

  constructor(data: Partial<PMOTopListModel>) {
    super();
    this.update(data);
  }
}