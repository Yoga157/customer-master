import ResultActions from "models/ResultActions";
import IndustryClassModel from "./IndustryClassModel";

export default interface IServiceCatalogCategoryState {
  readonly data: IndustryClassModel[];
  readonly error: boolean;
  readonly industryClassOption: ResultActions;
  refreshPage: boolean;
  resultActions: any;
}
