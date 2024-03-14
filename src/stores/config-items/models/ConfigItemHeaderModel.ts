import { BaseModel } from 'sjs-base-model';

export default class ConfigItemHeaderModel extends BaseModel {  
  public readonly projectId: number  = 0;
  public readonly funnelGenId: number  = 0;
  public readonly projectName: string = '';
  public readonly employeeName: string = '';
  public readonly projectAlias: string = '';
  public readonly customerName: string = '';

  constructor(data: Partial<ConfigItemHeaderModel>) {
    super();

    this.update(data);
  }
}
