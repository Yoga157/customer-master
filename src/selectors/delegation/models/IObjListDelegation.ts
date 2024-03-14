export default interface IObjListDelegation {
  readonly delegasiID: number;
  readonly fromUser: number;
  readonly fromUserStr: string;
  readonly toUser: string;
  readonly effDateStr: string;
  readonly effDate?: Date ;
  readonly expDateStr: string;
  readonly expDate?: Date ;
  readonly remarks: string;
  readonly application: string;
  readonly createDate?: Date ;
  readonly modifyDate?: Date ;
}
