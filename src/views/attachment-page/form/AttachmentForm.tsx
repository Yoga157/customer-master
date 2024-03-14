import React, { useEffect, Fragment, useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { Form, Grid, Card, Divider, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { serialize } from 'object-to-formdata';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import moment from 'moment';

import { SelectInput, TextInput, Button, RichTextEditor, SearchInput, FileUpload, InfoInputEnter } from 'views/components/UI';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as DocumentTypeActions from 'stores/document-type/DocumentTypeAction';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import AttachmentMapper from 'stores/attachment/models/AttachmentMapper';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';
import { selectDocumentTypeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IStore from 'models/IStore';

import { selectSearchTopNumber } from 'selectors/select-options/FunnelTopTypeSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import LabelButton from 'views/components/UI/Label/LabelButton';
import * as ToastAction from 'stores/toasts/ToastsAction';

interface IProps {
  isLocalFirst: boolean;
  funnelGenID: string;
  popupLevel: number;
  modul: number;
  page?: string;
}

const AttachmentForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { popupLevel, isLocalFirst, funnelGenID, modul, page } = props;
  const [onChangeTopNumber, setOChangeTopNumber] = useState('');
  const [requireTopNumber, setRequireTopNumber] = useState(false);
  const [reqNewTopNumber, setReqNewTopNumber] = useState(false);
  const [fileAttachment, setFileAttachment] = useState('');
  const [valTopNumber, setValTopNumber] = useState(null);
  const [docType, setDocType] = useState('');

  const isReqSearchTop: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelTopActions.SEARCH_TOP_NUMBER]));
  const resSearchTopNumber: any = useSelector((state: IStore) => selectSearchTopNumber(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const projectId = useLocation()?.pathname?.split('/')[3];

  useEffect(() => {
    dispatch(DocumentTypeActions.requestDocumentTypeByRole(currentUser.role, page === 'pmo-view-edit' ? '1,4' : '1'));
    page === 'pmo-view-edit' && dispatch(FunnelTopActions.searchTOPNumber(+funnelGenID, ''));
  }, [dispatch]);

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const documentTypeStore = useSelector((state: IStore) => selectDocumentTypeOptions(state));

  const onSaveToLocal = (values: any) => {
    if (localStorage.getItem('funnelAttachment') != null) {
      if (
        JSON.parse(localStorage.getItem('funnelAttachment')!).some((el) => el.fileName === values.fileName && el.documentType !== values.documentType)
      ) {
        dispatch(ToastAction.add('There is already the same file name with a different Document Type!', ToastStatusEnum.Error));
      } else {
        const data = new FormData();
        data.append('file', fileAttachment);
        data.append('domainName', currentUser.userName);

        dispatch(AttachmentActions.postAttachmentLocal(values));
        dispatch(AttachmentActions.postTemp(data)).then(() => {
          dispatch(AttachmentActions.requestAttachmentLocal());
        });
        onCloseHandler();
      }
    } else {
      const data = new FormData();
      data.append('file', fileAttachment);
      data.append('domainName', currentUser.userName);

      dispatch(AttachmentActions.postAttachmentLocal(values));
      dispatch(AttachmentActions.postTemp(data)).then(() => {
        dispatch(AttachmentActions.requestAttachmentLocal());
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

    let selectedStatusID;
    if (page !== 'pmo-view-edit') {
      const FunnelStatus = document.querySelector(
        '#root > div.ui.container > div > div.eleven.wide.column > form > div > div.equal.width.row > div:nth-child(1) > div > div.ui.search.selection.dropdown > div.text'
      )! as HTMLInputElement;
      const Status = FunnelStatus.textContent;

      if (Status === 'Above Funnel') {
        selectedStatusID = 1;
      } else if (Status === 'In Funnel') {
        selectedStatusID = 2;
      } else if (Status === 'Best Few') {
        selectedStatusID = 3;
      } else if (Status === 'Close Win') {
        selectedStatusID = 4;
      } else if (Status === 'Close Lose') {
        selectedStatusID = 5;
      } else if (Status === 'Cancel') {
        selectedStatusID = 6;
      }
    }

    dispatch(AttachmentActions.postAttachment(data)).then(() => {
      if (page !== 'pmo-view-edit') {
        dispatch(FunnelActions.requestVerificationFunnel(+funnelGenID, selectedStatusID ? selectedStatusID : 0));
      } else {
        dispatch(AttachmentActions.getAttachmentAndtAcceptence(+funnelGenID, +projectId, 1, 5, false)); // attachment
        dispatch(AttachmentActions.getAttachmentAndtAcceptence(+funnelGenID, +projectId, 1, 5, true)); // acceptence
        onCloseHandler();
      }
    });
  };

  const onChangeDocument = (event: any) => {
    const docTypes = documentTypeStore.filter((item: any) => {
      return item.value === event;
    });
    const type = docTypes[0].text;
    setDocType(type);

    if (type === 'DO' || type === 'BAPP' || type === 'WAC' || type === 'BAST' || type === 'FORM WTCR' || type === 'GR FORM') {
      setRequireTopNumber(true);
    } else {
      setRequireTopNumber(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    const now = moment();
    const newItems = new AttachmentModel(values);
    newItems.funnelGenID = +funnelGenID;
    newItems.versionNumber = 1;
    newItems.activeFlag = 1;
    newItems.fileSize = 1;
    newItems.notes = values.notes ? values.notes : null;
    newItems.createUserID = currentUser.employeeID;
    newItems.uploadTime = moment(now).format('yyyy-MM-DD') + ' ' + moment(now).format('HH:mm');
    newItems.createDate = moment(now).format('yyyy-MM-DD');
    newItems.uploadBy = currentUser.userName;
    newItems.fileName = fileAttachment['name'];
    newItems.modul = projectId ? 4 : modul;
    newItems.documentType = docType;
    newItems.topNumber = values.topNumber ? values.topNumber : '';
    newItems.topNumber = valTopNumber === null ? '' : valTopNumber;

    if (projectId) {
      newItems.docNumber = projectId;
    }

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

  const isValidTopNumber = createValidator(
    (message) => (value) => {
      if (requireTopNumber) {
        if (value && valTopNumber === null) {
          return message;
        }
      }
    },
    'Top Number is required'
  );

  const isValidNotes = createValidator(
    (message) => (value) => {
      if (requireTopNumber) {
        if (!value) {
          return message;
        }
      }
    },
    'Notes is required'
  );

  const validate = combineValidators({
    documentName: isRequired('Document Name'),
    documentTypeID: isRequired('Document Type'),
  });

  const validatePagePMO = combineValidators({
    documentName: isRequired('Document Name'),
    documentTypeID: isRequired('Document Type'),
    imageFile: isRequired('Upload File'),
    topNumber: composeValidators(isValidTopNumber)(),
    notes: composeValidators(isValidNotes)(),
  });

  const bRefreshPage: boolean = useSelector((state: IStore) => state.attachment.refreshPage);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_ATTACHMENT,
      AttachmentActions.DEL_ATTACHMENT_SERVER,
      AttachmentActions.REQUEST_DELETE_ATTACHMENT_LOCAL,
    ])
  );

  if (bRefreshPage) {
    if (page !== 'pmo-view-edit') {
      if (isLocalFirst) {
        dispatch(AttachmentActions.requestAttachmentLocal());
      } else {
        dispatch(AttachmentActions.requestAttachmentServer(+funnelGenID, modul, 1, 5, currentUser.employeeID));
      }
      onCloseHandler();
    }
  }

  const handleSearchTopNumber = (e) => {
    setOChangeTopNumber(e);
    setValTopNumber(null);
  };

  const onResSelectSearchTopNo = (e) => {
    setValTopNumber(e.result.title);
  };

  return (
    <Fragment>
      <Card.Header>Add Attachment </Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={page === 'pmo-view-edit' ? validatePagePMO : validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Field name="documentName" component={TextInput} placeholder="Document Name" labelName="Document Name" mandatory={false} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="equal">
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

                {page === 'pmo-view-edit' && (
                  <Grid.Column>
                    <Field
                      name="imageFile"
                      component={FileUpload}
                      placeholder="e.g..."
                      labelName="Upload File"
                      mandatory={false}
                      // values={picJobTitle}
                      onChanged={fileChange}
                    />
                  </Grid.Column>
                )}
              </Grid.Row>

              {page === 'pmo-view-edit' && (
                <Grid.Row columns="equal">
                  <Grid.Column width={8} className="pb-0">
                    <Field
                      name="topNumber"
                      component={SearchInput}
                      placeholder="e.g.T019345 .."
                      labelName="TOP Number"
                      results={resSearchTopNumber}
                      loading={isReqSearchTop}
                      onResultSelect={onResSelectSearchTopNo}
                      handleSearchChange={(e) => handleSearchTopNumber(e)}
                      onKeyPress={(event) => {
                        if (event.charCode === 13) {
                          dispatch(FunnelTopActions.searchTOPNumber(+funnelGenID, onChangeTopNumber));
                        }
                      }}
                      mandatory={!requireTopNumber}
                      disabled={reqNewTopNumber}
                      values={valTopNumber}
                      // resultRenderer={resultRenderer}
                    />
                    {onChangeTopNumber.length === 0 && <InfoInputEnter />}
                  </Grid.Column>
                  {requireTopNumber && (
                    <Grid.Column className="pb-0" width={8} verticalAlign="middle">
                      <Field
                        name="requestNewTOPNumber"
                        component={LabelButton}
                        labelName=""
                        content="Request New TOP Number"
                        disabled={reqNewTopNumber}
                        action={() => {
                          setReqNewTopNumber(!reqNewTopNumber);
                          setValTopNumber('0');
                        }}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
              )}

              {reqNewTopNumber && (
                <Grid.Row columns={1} className=" row-yellow">
                  <Grid.Column textAlign="center">
                    <Header as="p" className="font-1rem bold-2 text-red ph-20px">
                      Your new TOP Number request has been sent to Sales Admin. The new TOP Number will update automatically when it ready.
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              )}

              <Grid.Row>
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} placeholder="Notes" labelName="Notes" mandatorys={!requireTopNumber} />
                </Grid.Column>
              </Grid.Row>

              {page !== 'pmo-view-edit' && (
                <Grid.Row>
                  <Grid.Column>
                    <label style={{ fontWeight: 'bold' }}>
                      File
                      <label style={{ color: 'red' }}> *</label>
                    </label>
                    <input type="file" name="imageFile" onChange={fileChange} />
                  </Grid.Column>
                </Grid.Row>
              )}

              <br />
              <Grid.Row>
                <Grid.Column width={16} textAlign="center">
                  {page !== 'pmo-view-edit' ? (
                    <>
                      <Button type="submit" color="blue" floated={'right'} disabled={pristine || invalid || fileAttachment.length === 0}>
                        Save
                      </Button>
                      <Button type="button" onClick={onCloseHandler} floated={'right'}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" onClick={onCloseHandler} f>
                        Cancel
                      </Button>

                      <Button type="submit" color="blue" disabled={pristine || invalid || isReqSearchTop}>
                        Save
                      </Button>
                    </>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default AttachmentForm;
