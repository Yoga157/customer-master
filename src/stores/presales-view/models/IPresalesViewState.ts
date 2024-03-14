import PresalesViewResult from "./PresalesViewResult";

export default interface IPresalesView {
  readonly data: PresalesViewResult[];
  readonly error: boolean;
  readonly refreshPage: boolean;
}
