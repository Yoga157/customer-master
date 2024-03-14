import ActionPlanNotesModel from './ActionPlanNotesModel';
import ActionPlanNotesHeaderModel from './ActionPlanNotesHeaderModel';
import ActionPlanNotesHistoryModel from './ActionPlanNotesHistoryModel';

export default interface IActionPlanNotesState {
  readonly data: ActionPlanNotesModel[];
  readonly history: ActionPlanNotesHistoryModel[];
  readonly firstData: ActionPlanNotesHeaderModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
}
