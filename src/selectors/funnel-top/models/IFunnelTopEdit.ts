export default interface IFunnelTop {
  readonly funnelTopID: number;
  readonly funnelGenID: number;
  readonly topType: number;
  readonly topTypeStr: string;
  readonly productDesc: number;
  readonly productDescStr: string;
  readonly productPercentage: number;
  readonly serviceDesc: number;
  readonly serviceDescStr: string;
  readonly servicePercentage: number;
  readonly amount: number;
  readonly totalAmount: number;
  readonly notes: string;
  readonly supportDoc: string;
  readonly supportDocStr: string;
  readonly docCollectionDate: Date;
  readonly createUserID: number;
  readonly modifyUserID: number;
  readonly createDate: string;
  readonly isUpdate: number;
  readonly isDelete: number;
  readonly isAdd: number;
  readonly supportDocArr: string[];
}

export interface IFunnelTopEditModel {
  readonly resultObj: IFunnelTop;
}

export interface IFunnelTopEdit {
  readonly funnelTopID: number;
  readonly funnelGenID: number;
  readonly topType: number;
  readonly productDesc: number;
  readonly productPercentage: number;
  readonly serviceDesc: number;
  readonly servicePercentage: number;
  readonly amount: number;
  readonly totalAmount: number;
  readonly notes: string;
  readonly supportDoc: string;
  readonly docCollectionDate: Date;
  readonly createUserID: number;
  readonly modifyUserID: number;
  readonly createDate: string;
  readonly isUpdate: number;
  readonly isDelete: number;
  readonly isAdd: number;
  readonly supportDocArr: string[];
}
