import { BaseModel } from 'sjs-base-model';
export default class FunnelAuthorization extends BaseModel {
  employeeID: number = 0;
  employeeKey: number = 0;
  email: string = '';
  employeeName: string = '';
  levelKey: number = 0;
  ruleFunnel: string = '';
  isEditorIndex: number = 0;

  constructor(data: Partial<FunnelAuthorization>) {
    super();
    this.update(data);
  }
}
