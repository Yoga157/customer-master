import React, { useEffect, Fragment, useState } from 'react';
import moment from 'moment';
import AttachmentMapper from 'stores/attachment/models/AttachmentMapper';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import { SelectInput, TextInput, Button, RichTextEditor } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { serialize } from 'object-to-formdata';
import { v4 as uuidv4 } from 'uuid';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, isRequired } from 'revalidate';
import { selectDocumentTypeOptions } from 'selectors/select-options';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';

import * as FunnelOpportunityA from 'stores/funnel-opportunity/FunnelActivityActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import OppUpload from 'stores/funnel-opportunity/models/OppUpload';
import { selectResultOpp } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import FormErrorUpload from './FormErrorUpload';

interface IProps {}

const AttachmentForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [fileAttachment, setFileAttachment] = useState('');
  const [docType, setDocType] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: any = useSelector((state: IStore) => state.funnelOpportunity.refreshPage);
  const resultMsg: any = useSelector((state: IStore) => state.funnelOpportunity.resultActions);

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const handleSave = () => {
    const userId: any = localStorage.getItem('userLogin');

    const formData = new FormData();
    formData.append('file', fileAttachment);
    formData.append('UserID', JSON.parse(userId).employeeID);

    dispatch(FunnelOpportunityA.postFileOpp(formData));
  };

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const validate = combineValidators({
    documentName: isRequired('Document Name'),
    documentTypeID: isRequired('Document Type'),
  });

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_ATTACHMENT,
      AttachmentActions.DEL_ATTACHMENT_SERVER,
      AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL,
    ])
  );
  const result = useSelector((state: IStore) => selectResultOpp(state));
  if (bRefreshPage) {
    if (result.length > 0) {
      dispatch(ModalSecondLevelActions.OPEN(<FormErrorUpload />, ModalSizeEnum.Small));
    } else {
      if (resultMsg.bSuccess) {
        dispatch(ModalAction.CLOSE());
        dispatch(ToastsAction.add('Success import excel', ToastStatusEnum.Success));
        dispatch(FunnelOpportunityA.requestFunnelOpp(1, 10, 'FunnelOpportunityID', 'ascending'));
      } else {
        dispatch(ModalAction.CLOSE());
        dispatch(ToastsAction.add('Error when import excel', ToastStatusEnum.Error));
        dispatch(FunnelOpportunityA.requestFunnelOpp(1, 10, 'FunnelOpportunityID', 'ascending'));
      }
    }
  }

  console.log(result);
  return (
    <Fragment>
      <Card.Header>Import Excel </Card.Header>
      <Divider></Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <label style={{ fontWeight: 'bold' }}>
              File<label style={{ color: 'red' }}> *</label>
            </label>
            <input type="file" name="imageFile" onChange={fileChange} />
          </Grid.Column>
        </Grid.Row>
      </Grid>{' '}
      <br />
      <Button type="submit" color="blue" floated="right" onClick={handleSave} disabled={fileAttachment === ''}>
        Save
      </Button>
      <Button type="button" onClick={onCloseHandler} floated="right">
        Cancel
      </Button>
    </Fragment>
  );
};

export default AttachmentForm;
