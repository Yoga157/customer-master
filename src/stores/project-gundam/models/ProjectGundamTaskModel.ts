import { BaseModel } from 'sjs-base-model';

export class ProjectAttachmentModel extends BaseModel {
  public readonly funnelGenId: number = 0;
  public readonly documentTypeID: number = 0;
  public readonly fileName: string = '';
  public readonly modul: number = 0;
  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;
  public readonly isLocal: boolean = true;

  constructor(data: Partial<ProjectAttachmentModel>) {
    super();

    this.update(data);
  }
}

export class ProjectTasktModel extends BaseModel {
  public readonly projectId: number = 0;
  public readonly funnelGenId: number = 0;
  public readonly ganttType: string = '';
  public readonly taskTitle: string = '';
  public readonly taskDescription: string = '';
  public readonly taskDuration: number = 0;
  public readonly taskProgress: number = 0;
  public readonly parentTaskId: number = 0;
  public readonly category: string = '';
  public readonly subcategory: string = '';
  public readonly issueType: string = '';
  public readonly issueSubtype: string = '';
  public readonly primaryResources: string = '';
  public readonly secondaryResources: string = '';
  public readonly slaName: string = '';
  public readonly status: string = '';
  public readonly remark: string = '';
  public readonly estStartDate: string | Date = '';
  public readonly estEndDate: string | Date = '';
  public readonly isMilestone: boolean = false;
  public readonly createDate: string | Date = '';
  public readonly createUserID: number = 0;
  
  public readonly brand: string = '';
  public readonly subBrand: string = '';
  public readonly isApplyTaskResourceToAllChild: boolean = false;
  public readonly isSendEmailNotification: boolean = false;
  public readonly isSendEmailTaskStatusInProgressEscalation: boolean = false;
  public readonly emailReceiver: string = '';
  public readonly emailCc: string = '';
    
  public readonly taskId: number = 0;
  public readonly modifyDate: string | Date = '';
  public readonly modifyUserID: number = 0;

  constructor(data: Partial<ProjectTasktModel>) {
    super();

    this.update(data);
  }
}

export default class ProjectGundamTaskModel extends BaseModel {
  public task: ProjectTasktModel;
  public attachments: ProjectAttachmentModel[];

  constructor(data: Partial<ProjectGundamTaskModel>) {
    super();

    this.update(data);
  }
}