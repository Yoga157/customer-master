import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import * as ToastActions from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ResultActions from 'models/ResultActions';
import IStore from 'models/IStore';

function ProjectGundamHooks() {
  const dispatch: Dispatch = useDispatch();

  const resultAction: ResultActions = useSelector((state: IStore) => state.projectGundam.resultActions);
  const resultAttachment: ResultActions = useSelector((state: IStore) => state.attachment.ResultActions);
  const resultWork: ResultActions = useSelector((state: IStore) => state.workList.resultActions);

  useEffect(() => {
    if (resultAction.errorNumber === '666') {
      dispatch(ToastActions.add(resultAction.message, ToastStatusEnum.Error));
      dispatch(ProjectGundamActions.removeResult());
    }
    if (resultAction.errorNumber === '0') {
      dispatch(ProjectGundamActions.removeResult());
      dispatch(ToastActions.add(resultAction.message, ToastStatusEnum.Success));
    }
  }, [resultAction]);

  useEffect(() => {
    if (resultAttachment.errorNumber === '666') {
      dispatch(ToastActions.add(resultAttachment.message, ToastStatusEnum.Error));
      dispatch(AttachmentActions.removeResult());
    }
    if (resultAttachment.errorNumber === '0') {
      dispatch(AttachmentActions.removeResult());
      dispatch(ToastActions.add(resultAttachment.message, ToastStatusEnum.Success));
    }
  }, [resultAttachment]);

  useEffect(() => {
    if (resultWork.errorNumber === '666') {
      dispatch(ToastActions.add(resultWork.message, ToastStatusEnum.Error));
      dispatch(WorkListActions.clearResult());
    }
    if (resultWork.errorNumber === '0') {
      dispatch(WorkListActions.clearResult());
      dispatch(ToastActions.add(resultWork.message, ToastStatusEnum.Success));
    }
  }, [resultWork]);

  return null;
}

export default ProjectGundamHooks;
