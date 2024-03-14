import LanguageModel from './LanguageModel';

export default interface ILanguageState {
  readonly data: LanguageModel[];
  readonly error: boolean;
}
