import CompetitorModel from './CompetitorModel';

export default interface ICompetitorState {
  readonly data: CompetitorModel[];
  readonly error: boolean;
}
