import React, { useEffect, Fragment, useState } from 'react';
import moment from 'moment';
import AttachmentMapper from 'stores/main-cbv/models/AttachmentMapper';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { SelectInput, TextInput, Button, RichTextEditor } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { serialize } from 'object-to-formdata';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, isRequired } from 'revalidate';
import { selectCBVDocType } from 'selectors/main-cbv/CreditBillingServiceSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import * as DocumentTypeActions from 'stores/document-type/DocumentTypeAction';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions'


import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import CBVAttachmentUploadModel from 'stores/main-cbv/models/CBVAttachmentUploadModel';

interface IProps {
  isLocalFirst: boolean;
  funnelGenID: string;
  bankGuaranteeID: string;
  popupLevel: number;
  modul: number;
  setDataAttachment: any;
  dataAttachment: any;
  type: string;
  rowData: any;
  typecbv: number;
}

const AttachmentForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { setDataAttachment, isLocalFirst, funnelGenID, bankGuaranteeID, popupLevel, modul, type, rowData, dataAttachment, typecbv } = props;
  const [fileAttachment, setFileAttachment] = useState('');
  const [docType, setDocType] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [domainName, setDomainName] = useState('')
  const [validasi, setValidasi] = useState(false)
  const [attachmentTemp, setAttachmentTemp] = useState({})

  useEffect(() => {
    dispatch(DocumentTypeActions.requestDocumentTypeByRole(currentUser.role,'6'));
    const getUserLogin: any = JSON.parse(localStorage.getItem('userLogin'))
    setDomainName(getUserLogin.hirarki[0].domain)
    dispatch(CreditBillingActions.requestCBVDocType())
    if(type === "Add" && validasi === true)
    {
      onSaveToLocal(attachmentTemp);
      setValidasi(false)
    }
  }, [dispatch,rowData, validasi,typecbv]);

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const documentTypeStoreCBV = useSelector((state: IStore) => selectCBVDocType(state));

  const onChangeDocument = (event: any) => {
    const docTypes = documentTypeStoreCBV.filter((item: any) => {
      return item.value === event;
    });
    setDocType(docTypes[0] && docTypes[0].text);
  };

  const onSubmitHandler = (values: any) => {
    
    const now = moment();

    if (type == "Add") {
      const newItems = values
      newItems.attachmentId = 0;
      newItems.creditId = 0 ;
      newItems.documentTypeID = parseInt(values.documentTypeID);
      newItems.fileName = fileAttachment['name'];
      newItems.documentName = values.documentName;
      newItems.notes = values.notes;
      newItems.versionNumber = 0;
      newItems.ActiveFlag = 0;
      // newItems.fileBlob = '';
      newItems.fileExtension = '';
      newItems.fileSize = fileAttachment['size'];
      newItems.fileDownload = '';
      newItems.createDate = moment(now).format('yyyy-MM-DD');
      newItems.createUserID = currentUser.employeeID;
      newItems.modifyDate = moment(now).format('yyyy-MM-DD');
      newItems.modifyUserID = currentUser.employeeID;

      //Untuk State
      newItems.UploadBy = currentUser.fullName
      newItems.DocumentTypeName = docType
      console.log('Kesini Add')
      
      setAttachmentTemp(newItems)
      if(dataAttachment.length > 0) 
      {
        dataAttachment.map((item) => {
          if(item.fileName === fileAttachment['name'])
          {
            onCloseHandler()
            dispatch(ToastsAction.add("DocumentName already available", ToastStatusEnum.Warning));
          }else{
            setValidasi(true)
          }
        })
      } else {
        onSaveToLocal(newItems);
      }

    } else {
      const newItems = values
      newItems.AttachmentId = 0;
      newItems.CreditId = rowData.creditId;
      newItems.DocumentTypeID = parseInt(values.documentTypeID);
      newItems.FileName = fileAttachment['name'];
      newItems.DocumentName = values.documentName;
      newItems.Notes = values.notes;
      newItems.VersionNumber = 0;
      newItems.ActiveFlag = 0;
      // newItems.fileBlob = '';
      newItems.FileExtension = '';
      newItems.FileSize = fileAttachment['size'];
      newItems.FileDownload = '';
      newItems.CreateDate = moment(now).format('yyyy-MM-DD');
      newItems.CreateUserID = currentUser.employeeID;
      newItems.ModifyDate = moment(now).format('yyyy-MM-DD');
      newItems.ModifyUserID = currentUser.employeeID;
      console.log('Kesini Edit')
      onSaveToServer(newItems);
    } 
  };
  
  const onSaveToLocal = (values: any) => {
    // console.log('Local',values)
    const data = new FormData();
    data.append('file', fileAttachment);
    data.append('domainName', domainName);
    dispatch(CreditBillingActions.postAttachmentBilling(data))
    setDataAttachment(oldData => [...oldData, values])
    onCloseHandler()
  }
  
  const onSaveToServer = (values: any) => {
    const newObject = new AttachmentMapper();
    const data = new FormData();
    newObject.Attachment = new CBVAttachmentUploadModel(values);
    // newObject.Attachment.funnelAttachmentID = uuidv4();
    newObject.File = fileAttachment;
    console.log('newObject',newObject)
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

    dispatch(CreditBillingActions.uploadAssignCBV(data))
    onCloseHandler()
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
                <Grid.Column mobile={16} tablet={16} computer={8}>
                  <Field
                    name="documentTypeID"
                    component={SelectInput}
                    options={documentTypeStoreCBV}
                    placeholder="Document Type"
                    labelName="Document Type"
                    onChanged={onChangeDocument}
                    mandatory={false}
                  />
                </Grid.Column>
                <Grid.Column>
                  
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
