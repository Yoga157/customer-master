import React from 'react';
import { serialize } from 'object-to-formdata';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import ProjectGundamImportModel from 'stores/project-gundam/models/ProjectGundamImportExcelModel';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

function UploadFile() {
  const dispatch: Dispatch = useDispatch();

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const uploadFile = (isMpp, file, projectId, funnelGenID) => {
    const newObject = new ProjectGundamImportModel({});
    const data = new FormData();
    newObject.ProjectId = +projectId;
    newObject.FunnelGenId = +funnelGenID;
    newObject.File = file;
    newObject.ModifyDate = moment().format('yyyy-MM-DD');
    newObject.ModifyUserID = currentUser.employeeID;

    const options = {
      /**
       * include array indices in FormData keys
       * defaults to false
       */
      indices: false,

      /**
       * treat null values like undefined values and ignore them
       * defaults to false
       */
      nullsAsUndefineds: false,

      /**
       * convert true or false to 1 or 0 respectively
       * defaults to false
       */
      booleansAsIntegers: false,

      /**
       * store arrays even if they're empty
       * defaults to false
       */
      allowEmptyArrays: false,
    };

    serialize(
      newObject,
      options, // optional
      data // optional
    );

    if (isMpp) {
      dispatch(ProjectGundamActions.gundamImport(data, true)).then(() => {
        reGetData(projectId);
      });
    } else {
      dispatch(ProjectGundamActions.gundamImport(data, false)).then(() => {
        reGetData(projectId);
      });
    }
  };

  const reGetData = (projectId) => {
    dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
    dispatch(ModalFirstLevelActions.CLOSE());
  };

  return [uploadFile];
}

export default UploadFile;
