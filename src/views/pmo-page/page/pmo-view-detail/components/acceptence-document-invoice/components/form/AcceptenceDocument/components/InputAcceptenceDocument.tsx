import React, { useEffect, useState } from 'react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';
import { Grid, Form, Icon, Divider, Label, Button, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import { useLocation, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import moment from 'moment';

import { FileUpload, InfoInputEnter, LabelName, LabelNameIC, RichTextEditor, SearchInput, SelectInput, TextInput } from 'views/components/UI';
import IAttachmentTopActiveTableRow from 'selectors/attachment/models/IAttachmentAndAcceptenceTableRow';
import AttachmentModel, { AttachmentEditModel } from 'stores/attachment/models/AttachmentModel';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectDocTypeInvCategory } from 'selectors/select-options/DocumentTypeSelector';
import { selectSearchTopNumber } from 'selectors/select-options/FunnelTopTypeSelector';
import * as DocumentTypeActions from 'stores/document-type/DocumentTypeAction';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import AttachmentMapper from 'stores/attachment/models/AttachmentMapper';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import { selectDocumentTypeOptions } from 'selectors/select-options';
import LabelButton from 'views/components/UI/Label/LabelButton';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import './InputAcceptenceDocument.scss';
import IStore from 'models/IStore';

interface IProps {
  type: string;
  rowData: IAttachmentTopActiveTableRow;
}

const InputAcceptenceDocument: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { type, rowData } = props;

  const funnelGenId = useLocation()?.pathname?.split('/')[2];
  const projectId = useLocation()?.pathname?.split('/')[3];
  const dispatch: Dispatch = useDispatch();

  const [reqNewTopNumber, setReqNewTopNumber] = useState(false);
  const [fileAttachment, setFileAttachment] = useState('');
  const [valTopNumber, setValTopNumber] = useState(null);
  const [selectTop, setSelectTop] = useState(true);
  const [topNumber, setTopNumber] = useState('');
  const [docType, setDocType] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [AttachmentActions.POST_ATTACHMENT, AttachmentActions.UPDATE_NOTES_TOP_ACCEPTENCE])
  );
  const isReqSearchTop: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelTopActions.SEARCH_TOP_NUMBER]));
  const resSearchTopNumber: any = useSelector((state: IStore) => selectSearchTopNumber(state));
  const documentTypeStore = useSelector((state: IStore) => selectDocumentTypeOptions(state));
  const invoiceCategory = useSelector((state: IStore) => selectDocTypeInvCategory(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const AttachmentResult = useSelector((state: IStore) => state.attachment.ResultActions);

  useEffect(() => {
    if (type === 'EDIT') {
      if (rowData.topNumber) {
        setSelectTop(false);
        setValTopNumber(rowData.topNumber);
      }
    }
  }, [rowData]);

  useEffect(() => {
    dispatch(DocumentTypeActions.reqInvoiceCategory());
  }, [dispatch]);

  useEffect(() => {
    if (AttachmentResult.errorNumber === '666') {
      dispatch(AttachmentActions.removeResult());
    }
    if (AttachmentResult.errorNumber === '0') {
      dispatch(ModalFirstLevelActions.CLOSE());
      dispatch(AttachmentActions.removeResult());

      dispatch(AttachmentActions.getAttachmentAndtAcceptence(+funnelGenId, +projectId, 1, 5, true)); // acceptence
    }
  }, [AttachmentResult]);

  const onSubmitHandler = (values: any) => {
    const now = moment();
    const newItems = new AttachmentModel(values);
    newItems.funnelGenID = +funnelGenId;
    newItems.topNumber = valTopNumber;
    newItems.versionNumber = 1;
    newItems.activeFlag = 1;
    newItems.fileSize = 1;
    newItems.createUserID = currentUser.employeeID;
    newItems.uploadTime = moment(now).format('yyyy-MM-DD') + ' ' + moment(now).format('HH:mm');
    newItems.createDate = moment(now).format('yyyy-MM-DD');
    newItems.uploadBy = currentUser.userName;
    newItems.modul = 4;
    newItems.docNumber = projectId;
    newItems.documentType = docType;

    if (type !== 'EDIT') {
      newItems.fileName = fileAttachment['name'];
      onSaveToServer(newItems);
    } else {
      newItems.modifyDate = moment(now).format('yyyy-MM-DD');
      newItems.modifyUserID = currentUser.employeeID;
      newItems.versionNumber = rowData.versionNumber;

      let editItem = new AttachmentEditModel(newItems);

      dispatch(AttachmentActions.updateNotesAndTopNumber(editItem));
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

    dispatch(AttachmentActions.postAttachment(data));
  };

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const onChangeDocument = (event: any) => {
    const docTypes = invoiceCategory.filter((item: any) => {
      return item.value === event;
    });
    setDocType(docTypes[0].text);
  };

  const handleSearchTopNumber = (e) => {
    setTopNumber(e);
    // dispatch(FunnelTopActions.searchTOPNumber(+funnelGenId, e));
    // setSelectTop(true);
    // setValTopNumber(null);
  };

  const onResSelectSearchTopNo = (e) => {
    setSelectTop(false);
    setValTopNumber(e.result.title);
  };

  const isValidTopNumber = createValidator(
    (message) => (value) => {
      if (!value && !reqNewTopNumber) {
        return 'TOP Number is required';
      } else if (value && selectTop) {
        return message;
      }
    },
    'Invalid top number'
  );

  const validate = combineValidators({
    documentName: isRequired('Document Name'),
    documentTypeID: isRequired('Document Type'),
    topNumber: composeValidators(isValidTopNumber, isRequired('TOP Number'))(),
    notes: isRequired('Document Description'),
  });
  const validateEdit = combineValidators({
    topNumber: composeValidators(isValidTopNumber)(),
    notes: isRequired('Document Description'),
  });

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      validate={type === 'EDIT' ? validateEdit : validate}
      initialValues={
        type === 'EDIT'
          ? rowData
          : (values: any) => {
              return { ...values, topNumber: reqNewTopNumber ? 0 : values.topNumber };
            }
      }
      render={({ handleSubmit, pristine, invalid, errors }) => (
        <Form loading={isRequesting}>
          <Grid>
            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0">
                {type !== 'EDIT' ? (
                  <Field
                    name="documentName"
                    component={TextInput}
                    placeholder="e.g.Document BAST Ver 001.."
                    labelName="Document Name"
                    mandatory={false}
                  />
                ) : (
                  <Field name="documentName" component={LabelName} labelName="Document Name" placeholder="e.g.Document BAST Ver 001.." />
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} className="pb-0">
              <Grid.Column className="pb-0">
                {type !== 'EDIT' ? (
                  <Field
                    name="documentTypeID"
                    component={SelectInput}
                    options={invoiceCategory}
                    placeholder="e.g.Bast.."
                    labelName="Document Type"
                    onChanged={onChangeDocument}
                    mandatory={false}
                  />
                ) : (
                  <Field name="documentType" component={LabelName} labelName="Document Type" placeholder="e.g.Bast.." />
                )}
              </Grid.Column>

              {type !== 'EDIT' && (
                <Grid.Column className="pb-0">
                  <Field
                    name="imageFile"
                    component={FileUpload}
                    placeholder="e.g..."
                    labelName="Upload File"
                    mandatory={false}
                    onChanged={fileChange}
                    // values={picJobTitle}
                  />
                </Grid.Column>
              )}
            </Grid.Row>

            <Grid.Row className="pb-0">
              <Grid.Column className="pb-0" width={8}>
                <Field
                  name="topNumber"
                  component={SearchInput}
                  placeholder="e.g.T019345 .."
                  labelName="TOP Number"
                  mandatory={false}
                  loading={isReqSearchTop}
                  onResultSelect={onResSelectSearchTopNo}
                  handleSearchChange={(e) => handleSearchTopNumber(e)}
                  results={resSearchTopNumber}
                  disabled={reqNewTopNumber}
                  values={valTopNumber}
                  // resultRenderer={resultRenderer}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      topNumber && dispatch(FunnelTopActions.searchTOPNumber(+funnelGenId, topNumber));
                      setSelectTop(true);
                      setValTopNumber(null);
                    }
                  }}
                />

                {topNumber.length === 0 && <InfoInputEnter />}
              </Grid.Column>
              <Grid.Column className="pb-0" width={8} verticalAlign="middle">
                <Field
                  name="requestNewTOPNumber"
                  component={LabelButton}
                  labelName=""
                  content="Request New TOP Number"
                  disabled={reqNewTopNumber}
                  action={() => {
                    setReqNewTopNumber(!reqNewTopNumber);
                    setSelectTop(false);
                    setValTopNumber('0');
                  }}
                />
              </Grid.Column>
            </Grid.Row>

            {reqNewTopNumber && (
              <Grid.Row columns={1} className=" row-yellow">
                <Grid.Column textAlign="center">
                  <Header as="p" className="font-1rem bold-2 text-red ph-20px">
                    Your new TOP Number request has been sent to Sales Admin. The new TOP Number will update automatically when it ready.
                  </Header>
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row columns={1} className="pb-0">
              <Grid.Column className="pb-0">
                <Field
                  name="notes"
                  component={RichTextEditor}
                  placeholder="e.g.Description.."
                  labelName="Document Description"
                  mandatorys={false}
                  // onChange={(e) => setInitValTemplate({ ...initValTemplate, description: e })}
                  // initialValues={initValTemplate.description}
                  // values={initValTemplate.description}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />
          <Grid className="ph-1-5r mt-1">
            <Grid.Row columns={1} centered className="pb-0">
              <Grid.Column textAlign="center" className="pb-0">
                <Button type="button" className="mr-1r" size="small" onClick={() => dispatch(ModalFirstLevelActions.CLOSE())}>
                  Cancel
                </Button>
                <Button
                  className=""
                  color="blue"
                  size="small"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={invalid || selectTop || (fileAttachment.length === 0 && type !== 'EDIT') || isRequesting || isReqSearchTop}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default InputAcceptenceDocument;
