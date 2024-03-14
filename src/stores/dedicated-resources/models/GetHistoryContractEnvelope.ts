import DedicatedResourcesModel from './DedicatedResourcesModel';
import { BaseModel } from 'sjs-base-model';
import GetHistoryContractModel from './GetHistoryContractModel';

export default class GetHistoryContractEnvelope extends BaseModel {
  public readonly totalRows: number = 0;
  public readonly employeeID: number = 0;   
  public readonly employeeName: string = '';
  public readonly rows: GetHistoryContractModel[];
  public readonly column: string = '';
  public readonly sorting: string = '';

  constructor(data: Partial<GetHistoryContractEnvelope>) {
    super();
    this.update(data);
  }
}
