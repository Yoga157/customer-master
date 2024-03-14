import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as TicketActions from 'stores/ticket/TicketActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ResultActions from 'models/ResultActions';
import IStore from 'models/IStore';

function PMOViewDetailHooks() {
  const dispatch: Dispatch = useDispatch();

  const resultAttachment: ResultActions = useSelector((state: IStore) => state.attachment.ResultActions);

  const result = useSelector((state: IStore) => state.ticket.resultActions);

  useEffect(() => {
    if (resultAttachment.errorNumber === '666') {
      dispatch(ToastsAction.add(resultAttachment.message, ToastStatusEnum.Error));
      dispatch(AttachmentActions.removeResult());
    }
    if (resultAttachment.errorNumber === '0') {
      dispatch(AttachmentActions.removeResult());
      dispatch(ToastsAction.add(resultAttachment.message, ToastStatusEnum.Success));
    }
  }, [resultAttachment]);

  useEffect(() => {
    if (result.errorNumber === '666') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Error));
      dispatch(TicketActions.clearResult());
    } else if (result.errorNumber === '0') {
      dispatch(ToastsAction.add(`${result.message}`, ToastStatusEnum.Success));
      dispatch(TicketActions.clearResult());
    }
  }, [result]);
  return;
}

export default PMOViewDetailHooks;
