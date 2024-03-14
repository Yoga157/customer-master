import { createSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import IFunnelSalesAnalys from './models/IFunnelSalesAnalys';

const _mappingObjectFunnelWorkflow = (models: any): IFunnelSalesAnalys => {    
    if(models){
     return models.map((model: any): IFunnelSalesAnalys => ({
      employeeEmail: model.employeeEmail,
      employeeID: model.employeeID,
      employeeName: model.employeeName,
      notes: model.notes,
      status: model.status,
      stepName: model.stepName,
      tanggal: model.tanggal,
      workflowDetailGenID: model.workflowDetailGenID,
      workflowHeaderGenID: model.workflowHeaderGenID,
    }));
  }
};

export const selectFunnelAnalysWorkflow: Selector<IStore, any, string> = createSelector(
  (state: IStore, type:string) => 
  type === "commercial workflow" ? state.funnelSalesAnalyst.listWorkFlow?.resultObj?.commercialWorkflow  : state.funnelSalesAnalyst.listWorkFlow?.resultObj?.serviceWorkflow,
  _mappingObjectFunnelWorkflow
);
