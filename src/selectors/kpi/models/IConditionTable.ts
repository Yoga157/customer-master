import IConditionListsTableRow from './IConditionTableRow';

export default interface IConditionTable {
    readonly totalRow: number;
    readonly rows: IConditionListsTableRow[];
};