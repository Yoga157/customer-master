import CompetitorProductModel from './CompetitorProductModel';

export default interface ICompetitorState {
  readonly data: CompetitorProductModel[];
  readonly dataService: CompetitorProductModel[];
  readonly error: boolean;
}
