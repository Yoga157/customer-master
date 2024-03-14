import IndustryClassModel from './IndustryClassModel';

export default interface IServiceCatalogCategoryState {
  readonly data: IndustryClassModel[];
  readonly error: boolean;
}
