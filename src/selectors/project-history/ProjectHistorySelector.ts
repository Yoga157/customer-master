import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import ProjectHistoryModel from "stores/project-history/models/ProjectHistoryModel";
import ResultActions from "models/ResultActions";

function formatMoney(amount: number): string {
  const formattedAmount: string = amount.toLocaleString('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });

  return formattedAmount;
}

const _selectProjectHistory = (models: ResultActions): any[] => {
    if (Array.isArray(models.resultObj)) {
      return models.resultObj.map(
        (model: ProjectHistoryModel): any => ({
          funnelID: model.funnelID,
          so: model.so,
          projectName: model.projectName,
          customerName: model.customerName,
          salesName: model.salesName,
          salesDept: model.salesDept,
          soCloseDate: model.soCloseDate,
          soAmount: formatMoney(model.soAmount),
          successStory: model.successStory,
          modifiedStoryBy: model.modifiedStoryBy
        })
      );
    } else {
      return [];
    }
  };
  
  export const selectProjectHistory: Selector<
    IStore,
    any[]
  > = createSelector(
    (state: IStore) => state.projectHistory.data,
    _selectProjectHistory
  );