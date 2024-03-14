
import { BaseModel } from 'sjs-base-model';

export default class TaskFormTemplateModel extends BaseModel {
  
  public readonly templateName: string;
  public readonly category: string;
  public readonly subcategory: string;
  public readonly issueType: string;
  public readonly issueSubtype: string;
  public readonly description: string;
  public readonly primaryResource: string;
  public readonly secondaryResource: string;

  constructor(data: Partial<TaskFormTemplateModel>) {
    super();

    this.update(data);
  }
}
