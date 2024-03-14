import { createSelector,  ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';


interface IOptionsData {
  readonly value: number;
  readonly text: string;
}




const _selectGeneratedForm = (models: any): any => {
  console.log(models)
  return {
    totalRow:models.totalRows,
    rows:_createTableRows(models.rows)
  };
};


const _createTableRows = (models: any[]): any => {
  if (models) {
    return models.map(
      (model: any): any => (_mappingObjectTableRow(model))
    );
    }
};


const _mappingObjectTableRow = (model: any): any => {
  return {
    createdBy: (model.createdBy == '' ? '' : model.createdBy),
    createdDate:(model.createdDate == '' ? '' : model.createdDate),
    customerName:(model.customerName === '' ? '' :model.customerName ),
    customerPICName: (model.customerPICName == '' ? '' : model.customerPICName),
    engineerPMName: (model.engineerPMName == '' ? '' : model.engineerPMName),
    formID:  (model.formID == '' ? '' : model.formID),
    formType: (model.formType == '' ? '' : model.formType),
    funnelGenID: (model.funnelGenID.toString() === 'undefined' ? 0 : model.funnelGenID),
    notes: (model.notes == '' ? '' : model.notes),
    saNo: (model.saNo == '' ? '' : model.saNo),
    projectName: (model.projectName == '' ? '' : model.projectName),
    salesName: (model.salesName == '' ? '' : model.salesName),

  };
};

export const selectGenerateForm: Selector<IStore, any> = createSelector(
  (state: IStore) => state.generatedForm.dataGeneratedForm!,
  _selectGeneratedForm);


  
    
 const _selectFunnelSA = (models: any): any => {
  return {
    totalRow:models.totalRows,
    rows: _createTableRowsSA(models.rows),
  };
};

const _createTableRowsSA = (models: any[]): any[] => {
  return models.map(
    (model: any): any => (_mappingObjectTableRowSA(model))
  );
};


const  _mappingObjectTableRowSA = (model: any): any => {
  return {
        funnelGenID:(model.funnelGenID === null ? null :model.funnelGenID ),
        saNo:(model.saNo == '' ? '' :  model.saNo ),
        projectName:(model.projectName === '' ? '' :model.projectName ),
        eventName:(model.eventName  === ''? '' :model.eventName ),
        customerName:(model.customerName === '' ? '' :model.customerName ),
        salesName:(model.salesName ===  '' ? '' :model.salesName ),
        funnelDate:(model.funnelDate === '' ? '':model.funnelDate ),
        saDate:(model.saDate === '' ? '' :model.saDate ),
        customerGenID: (model.customerGenID ===  '' ? '' : model.customerGenID),
        so: (model.so === '' ? '' : model.so)
        };
};



export const selectObjectFunnelSA: Selector<IStore, any> = createSelector(
  (state: IStore) => state.generatedForm.funnelSAObject!,
  _mappingObjectTableRowSA);


export const selectFunnelSA: Selector<IStore, any> = createSelector(
  (state: IStore) => state.generatedForm.dataFunnelSA!,
  _selectFunnelSA);

const _selectFormType = (models: any[]): any[] => {
  return models.map(
    (model: any): any => ({
        text:model.textData,
        value:model.valueData
    })
  );
};

export const selectFormType: Selector<IStore,IOptionsData[]> = createSelector(
  (state: IStore) => state.generatedForm.listFormType,
  _selectFormType);


const _selectFunnelSAOutside = (models: any): any => {
  if (models.rows) {
        return models.rows.map(
          (model: any, index): any => ({
            title: model.projectName.toString(),
            description: model.customerName.toString(),
            price: model.saNo.toString(),
            funnelGenID: (model.funnelGenID === null ? null : model.funnelGenID),
            saNo: (model.saNo == '' ? '' : model.saNo),
            projectName: (model.projectName === '' ? '' : model.projectName),
            customerName: (model.customerName === '' ? '' : model.customerName),
            salesName: (model.salesName === '' ? '' : model.salesName),
            funnelDate: (model.funnelDate === '' ? '' : model.funnelDate),
            saDate: (model.saDate === '' ? '' : model.saDate),
            customerGenID: (model.customerGenID === '' ? '' : model.customerGenID),
            so: (model.so === '' ? '' : model.so),
            key: index
      })
    );
    }
  // console.log("selectorModel",models.rows)
  };
  
  export const selectFunnelSAOutside: Selector<IStore,any[]> = createSelector(
    (state: IStore) => state.generatedForm.dataFunnelSA!,
    _selectFunnelSAOutside);
  
  