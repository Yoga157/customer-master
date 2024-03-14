import SummaryActionPlanHeaderModel from './SummaryActionPlanHeaderModel';
import SummaryActionPlanHistoryModel from './SummaryActionPlanHistoryModel';
import SummaryActionPlanSubordinateModel from './SummaryActionPlanSubordinateModel';

export default interface ISummaryActionPlanState {
  //readonly data:ActionPlanNotesModel[]
  readonly history: SummaryActionPlanHistoryModel[];
  readonly subordinate: SummaryActionPlanSubordinateModel[];
  readonly firstData: SummaryActionPlanHeaderModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
