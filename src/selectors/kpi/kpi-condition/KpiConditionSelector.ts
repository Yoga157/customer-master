import IStore from 'models/IStore';
import { createSelector, Selector } from 'reselect';
import TableRowModel from 'stores/kpi/kpi-condition/models/TableRowModel';

interface TableModel {
  readonly kpiConditionID: number;
  readonly description: string;
  readonly point: string;
  readonly createDate: Date;
  readonly createUserID: number;
  readonly modifyUserID: number;
}

const _selectRows = (models: any) => {
  return models.map((model: TableRowModel): any => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: any) => {
  return {
    kpiConditionID: model.kpiConditionID,
    description: model.description,
    point: model.point,
    createDate: new Date(model.createDate!),
    createUserID: model.createUserID,
    modifyUserID: model.modifyUserID,
    modifyDate: model.modifyDate === null ? null : model.modifyDate,
  };
};

// export const selectRows: Selector<IStore, TableModel[]> = createSelector(
//     (state: IStore) => state.kpiConditionTable.rowTable,
//     _selectRows
// );

export const selectRows: Selector<IStore, TableModel[]> = createSelector((state: IStore) => state.kpiSetting.conditionLocal, _selectRows);
