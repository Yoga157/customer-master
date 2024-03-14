import LetterTypeModel from './LetterTypeModel';

export default interface ILetterTypeState {
  readonly data: LetterTypeModel[];
  readonly error: boolean;
}
