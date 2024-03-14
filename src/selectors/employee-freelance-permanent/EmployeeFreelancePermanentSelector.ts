import { createSelector, Selector } from 'reselect';
import IStore from "models/IStore";
import ISearchResult from "selectors/select-options/models/ISearchResult";
import EmployeeFreelancePermanent from 'stores/employee-freelance-permanent/models/EmployeeFreelancePermanent';

const _selectEmployeeFreelancePermanentSearch = (models: EmployeeFreelancePermanent[]): ISearchResult[] => {
    return models.map(
        (model: EmployeeFreelancePermanent): ISearchResult => ({
            title: model.employeeEmail,
            descriptions: model.employeeID.toString() + '##' + model.employeeName,
            price: model.employeeEmail,
        })
    );
};

export const selectEmployeeFreelancePermanentSearchOptions: Selector<IStore, ISearchResult[]> = createSelector(
    (state: IStore) => state.employeeFreelancePermanent.listData,
    _selectEmployeeFreelancePermanentSearch
);

