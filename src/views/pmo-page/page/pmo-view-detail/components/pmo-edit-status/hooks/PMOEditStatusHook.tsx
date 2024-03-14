import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { selectPMOProjectViewEditStatus } from 'selectors/pmo/PMOSelector';
import IPMOViewEditStatus from 'selectors/pmo/models/IPMOViewEditStatus';
import * as PMOActions from 'stores/pmo/PMOActions';
import IStore from 'models/IStore';

interface IProps {
  projectId?: number;
}

function PMOEditStatusHook({ projectId }: IProps) {
  const dispatch: Dispatch = useDispatch();

  const pmoViewEditStatus: IPMOViewEditStatus = useSelector((state: IStore) => selectPMOProjectViewEditStatus(state));

  const getProjectStatus = () => {
    if (projectId) dispatch(PMOActions.reqViewEditProjectStatus(+projectId));
  };

  return { pmoViewEditStatus, getProjectStatus, statusProject: pmoViewEditStatus.projectStatus.toLocaleLowerCase() };
}

export default PMOEditStatusHook;
