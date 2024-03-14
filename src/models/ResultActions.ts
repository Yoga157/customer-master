import { BaseModel } from 'sjs-base-model';
export default class ResultActions extends BaseModel {
  bSuccess: boolean = true;
  errorNumber: string = '';
  message: string = '';
  resultObj: any = '' as any;
  data: string = '';

  constructor(data: Partial<ResultActions>) {
    super();
    this.update(data);
  }
}
