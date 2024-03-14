import { Selector } from "react-redux";
import IStore from "models/IStore";
import { createSelector, ParametricSelector } from "reselect";
import CollabToolsReviewBySales from "stores/collab-tools/models/CollabToolsReviewBySales";
import CategoryOptionsModel from "stores/collab-tools/models/CategoryOptionsModel";
import ReviewActivity from "stores/collab-tools/models/ReviewActivityModel";
import FunnelInfoModel from "stores/collab-tools/models/FunnelInfoModel";
const _selectReviewBySales = (models: CollabToolsReviewBySales[]): any[] => {
  return models.map((model: any): any => ({
    funnelGenID: model.funnelGenID,
    funnelStatus: model.funnelStatus,
    salesID: model.salesID,
    salesName: model.salesName,
    projectName: model.projectName,
    customerName: model.customerName,
    totalOrderingPrice: model.totalOrderingPrice,
    totalSellingPrice: model.totalSellingPrice,
    gpmPctg: model.gpmPctg,
    gpmAmount: model.gpmAmount,
    deptName: model.deptName,
    dealCloseDate: model.dealCloseDate,
    createDate: model.createDate,
    lastActivity: model.lastActivity,
    lastActivityDate: model.lastActivityDate,
    flaggingReview7Days: model.flaggingReview7Days,
    flaggingReview14Days: model.flaggingReview14Days,
  }));
};
const _selectActivityHistory = (models: ReviewActivity[]): any[] => {
  return models.map((model: any): any => ({
    funnelActivityID: model?.funnelActivityID,
    funnelGenID: model?.funnelGenID,
    activityTypeID: model?.activityTypeID,
    reviewCategory: model?.reviewCategory,
    reviewActivity: model?.reviewActivity,
    dueDate: model?.dueDate,
    createDate: model?.createDate,
    createUserID: model?.createUserID,
    createUser: model?.createUser,
    roleID: model?.roleID,
    roleName: model?.roleName,
    activityStatusID: model?.activityStatusID
  }));
};
const _selectFunnelInfo = (model: FunnelInfoModel): any => {
  return ({
    funnelGenID: model?.funnelGenID,
    funnelID: model?.funnelID,
    salesID: model?.salesID,
    salesName: model?.salesName,
    deptID: model?.deptID,
    deptName: model?.deptName,
    customerGenID: model?.customerGenID,
    customerName: model?.customerName,
    projectName: model?.projectName,
    totalOrderingPrice: model?.totalOrderingPrice,
    totalSellingPrice: model?.totalSellingPrice,
    gpmPctg: model?.gpmPctg,
    gpmAmount: model?.gpmAmount
  })
};
const _selectCategoryOptions = (models: CategoryOptionsModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData
  }));
};
export const selectReviewBySales: Selector<
  IStore,
  CollabToolsReviewBySales[]
> = createSelector(
  (state: IStore) => state.collabTools.ReviewBySales,
  _selectReviewBySales
);
export const selectCategoryOptions: Selector<
  IStore,
  CategoryOptionsModel[]
> = createSelector(
  (state: IStore) => state.collabTools.CategoryOptions,
  _selectCategoryOptions
);
export const selectActivityHistory: Selector<
  IStore,
  ReviewActivity[]
> = createSelector(
  (state: IStore) => state.collabTools.ReviewActivity,
  _selectActivityHistory
);
export const selectFunnelInfo: Selector<
  IStore,
  FunnelInfoModel
> = createSelector(
  (state: IStore) => state.collabTools.FunnelInfo,
  _selectFunnelInfo
);