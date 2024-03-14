import ResultActions from "models/ResultActions";

export default interface ITicketState {
  readonly resultActions: ResultActions;
  readonly refreshPage: boolean;
  readonly activePage: number;
  readonly error: boolean;
}
