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
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import * as DocumentTypeActions from 'stores/document-type/DocumentTypeAction';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

import * as ToastAction from 'stores/toasts/ToastsAction';
interface IProps {
  isLocalFirst: boolean;
  funnelGenID: string;
  bankGuaranteeID: string;
  popupLevel: number;
  modul: number;
}

const AttachmentForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { popupLevel, isLocalFirst, bankGuaranteeID, modul } = props;
  const [fileAttachment, setFileAttachment] = useState('');
  const [docType, setDocType] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(DocumentTypeActions.requestDocumentTypeByRole(currentUser.role, '1'));
  }, [dispatch]);

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const documentTypeStore = useSelector((state: IStore) => selectDocumentTypeOptions(state));

  const onSaveToLocal = (values: any) => {
    if (localStorage.getItem('funnelAttachment') != null) {
      if (
        JSON.parse(localStorage.getItem('funnelAttachment')!).some(
          (el: any) => el.fileName === values.fileName && el.documentType !== values.documentType
        )
      ) {
        dispatch(ToastAction.add('Sudah ada nama file yang sama dengan Document Type yang berbeda!', ToastStatusEnum.Error));
      } else {
        const data = new FormData();
        data.append('file', fileAttachment);
        data.append('domainName', currentUser.userName);

        dispatch(AttachmentActions.postAttachmentLocal(values));
        dispatch(AttachmentActions.postTemp(data)).then(() => {
          dispatch(AttachmentActions.requestAttachmentLocal());
          dispatch(ToastsAction.add(`Data has been saved`, ToastStatusEnum.Success));
        });
        onCloseHandler();
      }
    } else {
      const data = new FormData();
      data.append('file', fileAttachment);
      data.append('domainName', currentUser.userName);

      dispatch(AttachmentActions.postAttachmentLocal(values));
      //dispatch(AttachmentActions.postTemp(data));
      dispatch(AttachmentActions.postTemp(data)).then(() => {
        dispatch(AttachmentActions.requestAttachmentLocal());
        dispatch(ToastsAction.add(`Data has been saved`, ToastStatusEnum.Success));
      });
      onCloseHandler();
    }
  };

  const onSaveToServer = (values: any) => {
    const newObject = new AttachmentMapper();
    const data = new FormData();
    newObject.Attachment = new AttachmentModel(values);
    newObject.Attachment.funnelAttachmentID = uuidv4();
    newObject.File = fileAttachment;

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

    dispatch(BankGaransiActions.postAttachment(data));
  };

  const onChangeDocument = (event: any) => {
    const docTypes = documentTypeStore.filter((item: any) => {
      return item.value === event;
    });
    setDocType(docTypes[0].text);
  };

  const onSubmitHandler = (values: any) => {
    const now = moment();
    const newItems = new AttachmentModel(values);
    newItems.funnelGenID = 0;
    newItems.docNumber = bankGuaranteeID;
    newItems.versionNumber = 1;
    newItems.activeFlag = 1;
    newItems.fileSize = 1;
    newItems.createUserID = currentUser.employeeID;
    newItems.uploadTime = moment(now).format('yyyy-MM-DD') + ' ' + moment(now).format('HH:mm');
    newItems.createDate = moment(now).format('yyyy-MM-DD');
    newItems.uploadBy = currentUser.userName;
    newItems.fileName = fileAttachment['name'];
    newItems.modul = modul;
    newItems.documentType = docType;

    if (isLocalFirst) {
      onSaveToLocal(newItems);
    } else {
      onSaveToServer(newItems);
    }
  };

  const onCloseHandler = () => {
    if (popupLevel === 1) {
      dispatch(ModalFirstLevelActions.CLOSE());
    } else if (popupLevel === 2) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else if (popupLevel === 3) {
      dispatch(ModalThirdLevelActions.CLOSE());
    }
  };

  const validate = combineValidators({
    documentName: isRequired('Document Name'),
    documentTypeID: isRequired('Document Type'),
  });

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_TEMP,
      AttachmentActions.POST_ATTACHMENT,
      AttachmentActions.DEL_ATTACHMENT_SERVER,
      AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL,
      BankGaransiActions.REQUEST_POST_ATTACHMENT,
    ])
  );

  if (bRefreshPage) {
    if (isLocalFirst) {
      dispatch(AttachmentActions.requestAttachmentLocal());
      dispatch(ToastsAction.add(`Data has been saved`, ToastStatusEnum.Success));
      onCloseHandler();
    } else {
      dispatch(BankGaransiActions.requestAttachmentServer(1, 5, bankGuaranteeID, currentUser.employeeID, 2));
      dispatch(ModalSecondLevelActions.CLOSE());
    }
  }

  return (
    <Fragment>
      <Card.Header>Add Attachment </Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field name="documentName" component={TextInput} placeholder="Document Name" labelName="Document Name" mandatory={false} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field
                    name="documentTypeID"
                    component={SelectInput}
                    options={documentTypeStore}
                    placeholder="Document Type"
                    labelName="Document Type"
                    onChanged={onChangeDocument}
                    mandatory={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" labelName="Notes" />
                </Grid.Column>
              </Grid.Row>
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
            <Button type="submit" color="blue" floated="right" disabled={pristine || fileAttachment.length === 0}>
              Save
            </Button>
            <Button type="button" onClick={onCloseHandler} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default AttachmentForm;
