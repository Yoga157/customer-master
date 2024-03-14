import ProjectGundamTaskWithLinkModel from "./ProjectGundamTaskWithLinkModel";
import ProjectGundamTaskListModel from "./ProjectGundamTaskListModel";
import TaskFormTemplateModel from "./TaskFormTemplateModel";
import GundamByEntryKeyModel from "./GundamByEntryKeyModel";
import GundamValueEmailModel from "./GundamValueEmailModel";
import DropdownGunadamModel from "./DropdownGunadamModel";
import GundamHistoryModel from "./GundamHistoryModel";
import IsEscalationModel from "./IsEscalationModel";
import ResultActions from "models/ResultActions";

export default interface IProjectGundamState {
  readonly dropdownTaskSubCategory: GundamByEntryKeyModel[];
  readonly dropdownTaskIssueType: GundamByEntryKeyModel[];
  readonly dropdownTaskSubIssue: GundamByEntryKeyModel[];
  readonly dropdownTaskTemplate: GundamByEntryKeyModel[];
  readonly dropdownTaskCategory: GundamByEntryKeyModel[];
  readonly listTaskLink: ProjectGundamTaskWithLinkModel;
  readonly dropdownTypeTask: DropdownGunadamModel[];
  readonly listData: ProjectGundamTaskListModel[];
  readonly dropdownSLA: DropdownGunadamModel[];
  readonly formTemplate: TaskFormTemplateModel;
  readonly historyTask: GundamHistoryModel[];
  readonly valueEmail: GundamValueEmailModel;
  readonly isEscalation: IsEscalationModel;
  readonly resultActions: ResultActions;
  readonly refreshPage: boolean;
  readonly activePage: number;
  readonly error: boolean;
}
