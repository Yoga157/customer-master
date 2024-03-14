import ResultActions from 'models/ResultActions';
import CollabToolsReviewBySales from './CollabToolsReviewBySales';
import CategoryOptionsModel from './CategoryOptionsModel';
import ReviewActivity from './ReviewActivityModel';
import FunnelInfoModel from './FunnelInfoModel';

export default interface ICollabToolsState {
  readonly ReviewBySales: CollabToolsReviewBySales[];
  readonly ReviewActivity: ReviewActivity[];
  readonly CategoryOptions: CategoryOptionsModel[];
  readonly FunnelInfo: FunnelInfoModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly resultActions: ResultActions;
}
