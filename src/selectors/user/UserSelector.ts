import { createSelector } from 'reselect';
import IStore from '../../models/IStore';
import { Selector } from 'react-redux';
import IUserResult from './models/IUserResult';
import UserResultModel from 'stores/users/models/UserResultModel';

const _mappingObject = (model: UserResultModel): IUserResult => {
  return {
    status: model.status,
    email: model.email,
    employeeID: model.employeeID,
    fullName: model.fullName,
    token: model.token,
    userName: model.userName,
    message: model.message,
    role: model.role,
    employeeKey: model.employeeKey,
    hirarki: model.hirarki,
    permission: model.permission,
    direktoratID: model.direktoratID,
    direktoratName: model.direktoratName,
    dashboardSecurity: model.dashboardSecurity,
  };
};

const _selectUserResult = (model: UserResultModel): IUserResult => {
  return _mappingObject(model);
};

export const selectUserResult: Selector<IStore, IUserResult> = createSelector((state: IStore) => state.userLogin.data!, _selectUserResult);
