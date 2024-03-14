export default interface IFunnelTopTableRow {
  funnelTopID: number;
  funnelGenID: number;
  topType: number;
  topTypeStr: string;
  productDesc: number;
  productDescStr: string;
  productPercentage: number;
  serviceDesc: number;
  serviceDescStr: string;
  servicePercentage: number;
  amount: number;
  totalAmount: number;
  notes: string;
  supportDoc: string;
  supportDocStr: string;
  docCollectionDate: Date;
  createUserID: number;
  modifyUserID: number;
  createDate: string;
  invoiceNumber: number;
  invoiceDate: string;
  // modifyDate:string;
  isAdd: number;
  isDelete: number;
  isUpdate: number;
}
