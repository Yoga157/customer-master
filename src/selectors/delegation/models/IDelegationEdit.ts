export default interface IDelegationEdit {

  readonly delegasiID: number;
  readonly fromUser: number;
  readonly fromUserStr: string;
  readonly effDate: Date ;
  readonly effDateStr: string;
  readonly expDate: Date ;
  readonly expDateStr: string;
  readonly remarks: string;
  readonly userLoginID: number;
  readonly detailDelegasi: any;
}
