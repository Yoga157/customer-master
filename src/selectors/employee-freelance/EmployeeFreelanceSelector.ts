import { Selector } from 'react-redux';
import IStore from "models/IStore";
import { createSelector, ParametricSelector } from "reselect";
import EmployeeFreelanceDashboardEnvelope from 'stores/employee-freelance/models/EmployeeFreelanceDashboardEnvelope';
import IEmployeeFreelanceTable from './models/IEmployeeFreelanceTable';
import EmployeeFreelanceDashboardModel from 'stores/employee-freelance/models/EmployeeFreelanceDashboardModel';
import IEmployeeFreelanceTableRow from './models/IEmployeeFreelanceTableRow';
import EmployeeFreelanceModel from 'stores/employee-freelance/models/EmployeeFreelanceModel';
import EmployeeFreelanceCheckEmailExist from 'stores/employee-freelance/models/EmployeeFreelanceCheckEmailExist';
import EmployeeFreelanceCheckNIKKTPExist from 'stores/employee-freelance/models/EmployeeFreelanceCheckNIKKTPExist';
import EmployeeFreelanceMenuAccess from 'stores/employee-freelance/models/EmployeeFreelanceMenuAccess';

// ============================================================================
const _selectEmployeeFreelances = (models: EmployeeFreelanceDashboardEnvelope): IEmployeeFreelanceTable => {
    return {
        totalRow: models.totalRows,
        rows: _createEmployeeFreelanceTableRow(models.rows)
    };
};

const _createEmployeeFreelanceTableRow = (models: EmployeeFreelanceDashboardModel[]): IEmployeeFreelanceTableRow[] => {
    return models.map((model: EmployeeFreelanceDashboardModel): IEmployeeFreelanceTableRow => _mappingEmployeeFreelanceTableRow(model));
};

const _mappingEmployeeFreelanceTableRow = (model: EmployeeFreelanceDashboardModel): IEmployeeFreelanceTableRow => {
    return new EmployeeFreelanceDashboardModel({
        employeeFreelanceGenID: model.employeeFreelanceGenID,
        superiorEmail: model.superiorEmail,
        email: model.email,
        fullname: model.fullname,
        nikktp: model.nikktp,
        phone: model.phone,
        dateOfBirth: model.dateOfBirth,
        status: model.status,
        isHaveActivity: model.isHaveActivity,
        effectiveDate: model.effectiveDate,
        expiredDate: model.expiredDate,
        createDate: model.createDate,
        createUserID: model.createUserID,
        modifyDate: model.modifyDate,
        modifyUserID: model.modifyUserID
    });
};

export const selectEmployeeFreelances: ParametricSelector<IStore, string[], IEmployeeFreelanceTable> = createSelector(
    (state: IStore) => state.employeeFreelance.listData!,
    (state: IStore, actionTypes: string[]) => actionTypes,
    _selectEmployeeFreelances
);
// ============================================================================
const _selectViewEmployeeFreelance = (model: EmployeeFreelanceModel): EmployeeFreelanceModel => {
    return _mappingViewEmployeeFreelanceObject(model);
};

const _mappingViewEmployeeFreelanceObject = (model: EmployeeFreelanceModel): EmployeeFreelanceModel => {
    return new EmployeeFreelanceModel({
        employeeFreelanceGenID: model.employeeFreelanceGenID,
        email: model.email,
        fullname: model.fullname,
        dateOfBirth: model.dateOfBirth,
        effectiveDate: model.effectiveDate,
        expiredDate: model.expiredDate,
        dDateOfBirth: model.dateOfBirth === undefined ? undefined : new Date(model.dateOfBirth),
        dEffectiveDate: model.effectiveDate === undefined ? undefined : new Date(model.effectiveDate),
        dExpiredDate: model.expiredDate === undefined ? undefined : new Date(model.expiredDate),
        superiorEmail: model.superiorEmail,
        phone: model.phone,
        status: model.status,
        nikktp: model.nikktp,
        profilePicImage: model.profilePicImage,
    });
};

export const selectViewEmployeeFreelance: Selector<IStore, EmployeeFreelanceModel> = createSelector(
    (state: IStore) => state.employeeFreelance.data!,
    _selectViewEmployeeFreelance
);
// ============================================================================
const _selectEmployeeFreelanceCheckEmailExist = (model: EmployeeFreelanceCheckEmailExist): EmployeeFreelanceCheckEmailExist => {
    return _mappingEmployeeFreelanceCheckEmailExist(model);
}

const _mappingEmployeeFreelanceCheckEmailExist = (model: EmployeeFreelanceCheckEmailExist): EmployeeFreelanceCheckEmailExist => {
    return new EmployeeFreelanceCheckEmailExist({
        email: model.email,
        isExist: model.isExist
    });
};

export const selectEmployeeFreelanceCheckEmailExist: Selector<IStore, EmployeeFreelanceCheckEmailExist> = createSelector(
    (state: IStore) => state.employeeFreelance.employeeFreelanceCheckEmailExist,
    _selectEmployeeFreelanceCheckEmailExist
);
// ============================================================================
const _selectEmployeeFreelanceCheckNIKKTPExist = (model: EmployeeFreelanceCheckNIKKTPExist): EmployeeFreelanceCheckNIKKTPExist => {
    return _mappingEmployeeFreelanceCheckNIKKTPExist(model);
}

const _mappingEmployeeFreelanceCheckNIKKTPExist = (model: EmployeeFreelanceCheckNIKKTPExist): EmployeeFreelanceCheckNIKKTPExist => {
    return new EmployeeFreelanceCheckNIKKTPExist({
        nikktp: model.nikktp,
        isExist: model.isExist
    });
};

export const selectEmployeeFreelanceCheckNIKKTPExist: Selector<IStore, EmployeeFreelanceCheckNIKKTPExist> = createSelector(
    (state: IStore) => state.employeeFreelance.employeeFreelanceCheckNIKKTPExist,
    _selectEmployeeFreelanceCheckNIKKTPExist
);
// ============================================================================
const _selectEmployeeFreelanceMenuAccess = (model: EmployeeFreelanceMenuAccess): EmployeeFreelanceMenuAccess => {
    return _mappingEmployeeFreelanceMenuAccess(model);
};

const _mappingEmployeeFreelanceMenuAccess = (model: EmployeeFreelanceMenuAccess): EmployeeFreelanceMenuAccess => {
    return new EmployeeFreelanceMenuAccess({
        email: model.email,
        isAllowAccess: model.isAllowAccess,
    });
};

export const selectEmployeeFreelanceMenuAccess: Selector<IStore, EmployeeFreelanceMenuAccess> = createSelector(
    (state: IStore) => state.employeeFreelance.employeeFreelanceMenuAccess,
    _selectEmployeeFreelanceMenuAccess
);
// ============================================================================

