import { BaseModel } from 'sjs-base-model';




class Tasks extends BaseModel {
  public readonly taskId: number = 0;
  public readonly funnelGenId: number = 0;
  public readonly type: string = '';
  public readonly taskUID: string = '';
  public readonly projectId: number = 0;
  public readonly parentTaskId: number = 0;
  public readonly taskType: string = '';
  public readonly ganttType: string = '';
  public readonly category: string = '';
  public readonly subcategory: string = '';
  public readonly issueType: string = '';
  public readonly issueSubtype: string = '';
  public readonly taskName: string = '';
  public readonly description: string = '';
  public readonly primaryResources: string = '';
  public readonly secondaryResources: string = '';
  public readonly slaName: string = '';
  public readonly duration: string | number ;
  public readonly taskProgress: string | number ;
  public readonly estStartDate: string | Date = '';
  public readonly estEndDate: string | Date = '';
  public readonly actualStartDate: string | Date = '';
  public readonly actualEndDate: string | Date = '';
  public readonly status: string = '';
  public readonly remark: string = '';
  public readonly subType: string = '';
  public readonly isMilestone: boolean = false;
  public readonly priority: string = '';
  public readonly complexity: string = '';
  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;
  
  public readonly brand: string = '';
  public readonly subBrand: string = '';
  public readonly emailReceiver: string = '';
  public readonly emailCc: string = '';

  public readonly modifyDate: string | Date = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<Tasks>) {
    super();

    this.update(data);
  }
}


class LinkedTasks extends BaseModel {
  public readonly linkId: number = 0;
  public readonly sourceTaskId: number = 0;
  public readonly targetTaskId: number = 0;
  public readonly type: string = '';
  public readonly lag: string = '';

  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;
  
  public readonly modifyDate: string | Date = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<LinkedTasks>) {
    super();

    this.update(data);
  }
}



export default class ProjectGundamTaskWithLinkModel extends BaseModel {
  public readonly tasks: Tasks[] = [];
  public readonly linkedTasks: LinkedTasks[] = [];
  

  constructor(data: Partial<ProjectGundamTaskWithLinkModel>) {
    super();

    this.update(data);
  }
}
