import ReportManagerModel from './ReportManagerModel';

export default interface IReportManagerState {
  readonly data:ReportManagerModel[]
  readonly dataItem:ReportManagerModel[]
  readonly firstData:ReportManagerModel
  readonly error:boolean
}
