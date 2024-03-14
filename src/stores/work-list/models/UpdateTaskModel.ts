
import { BaseModel } from 'sjs-base-model';

export default class UpdateTaskModel extends BaseModel {
  public taskId: number = 0;
  public taskUID: string = '';
  public projectId: number = 0;
  public funnelGenId: number = 0;
  public taskStatus: string = '';
  public primaryResources: string = '';
  public IsApplyPrimaryResourcesToAllChild: boolean = false;
  public isSendEmailNotification: boolean = false;
  public isSendEmailTaskStatusInProgressEscalation: boolean = false;
  public secondaryResources: string = '';
  public slaAssignment: string = '';
  public remark: string = '';
  public category: string = '';
  public subcategory: string = '';
  public issueType: string = '';
  public issueSubtype: string = '';
  public brand: string = '';
  public subBrand: string = '';
  public emailReceiver: string = '';
  public emailCc: string = '';
  public modifyDate: string = null;
  public modifyUserID: number = 0;
  public isSendNotificationToPmo: boolean = false;

  constructor(data: Partial<UpdateTaskModel>) {
    super();

    this.update(data);
  }
}