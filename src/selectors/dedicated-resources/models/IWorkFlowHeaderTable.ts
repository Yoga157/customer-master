import IWorkFlowHeaderTableRow from './IWorkFlowHeaderTableRow';

export default interface IWorkFlowHeaderTable {
  readonly errorNumber: string;
  readonly resultObj: IWorkFlowHeaderTableRow[];
  readonly bSuccess: boolean;
  readonly message: string;
}
