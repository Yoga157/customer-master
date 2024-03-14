/* eslint-disable prefer-spread */
import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import { Table, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {  Button } from 'views/components/UI';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as UserActions from 'stores/users/UserActions';
import AWSCredentialModel from 'stores/aws-credential/models/AWSCredentialModel';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';


interface IProps {
  type: string;
  rowData: any;
  enableRow: any;
  indexItem: number;
}
const RowFormAWSCredentialSplit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, type } = props;

  const [form,setForm] = useState({
    AwsID: "",
    AccessKey: "",
    SecretKey: "",
    Note: ""
  })
  const [edit, setEdit] = useState('')
  const [activePage, setActivePage] = useState(1);
  const [pageSize] = useState(15);
  
  useEffect(() => {
    dispatch(UserActions.requestCurrentUser())
    setEdit(type)
  },[rowData, type])

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  
  const onSubmitHandler = () => {
    const now = moment();
    const newItems = new AWSCredentialModel({});
    newItems.awsid = form.AwsID;
    newItems.accessKey = form.AccessKey;
    newItems.secretKey = form.SecretKey;
    newItems.notes = form.Note;
    newItems.userLoginID = currentUser.employeeID;
    newItems.createDate = moment(now).format('yyyy-MM-DD');
    newItems.createUserID = currentUser.employeeID;
    newItems.modifyUserID = currentUser.employeeID;
    newItems.modifyDate = moment(now).format('yyyy-MM-DD');
    // console.log('newItems',newItems)
    if(edit === 'edit')
    {
      dispatch(AWSCredentialActions.putAWSCredential(newItems)).then(() => {
        reset();
        setEdit('')
      })
    } else {
      dispatch(AWSCredentialActions.postAWSCredential(newItems)).then(() => {
        reset();
        setEdit('')
      });
    }

    if (!disableComponent) {
      setDisableComponent(true);
    }

  }

  const reset = () => {
      setForm({
        AwsID: '',
        AccessKey: '',
        SecretKey: '',
        Note: ''
      })
    };

  const [disableComponent, setDisableComponent] = useState(true);
  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };
  
  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
      setForm({
        AwsID: '',
        AccessKey: '',
        SecretKey: '',
        Note: ''
      })
    }
  };

  
  const [validasiPermission,setValidasiPermission] = useState(false)
  const permission = useSelector((state: IStore) => selectPermission(state))
  useEffect(() => {
    permission.map((item) => {
      if(item.text1 === currentUser.userName)
      {
        setValidasiPermission(true)
      }
    })
  },[permission, validasiPermission])
  return (
    <Table.Row>
      <Table.Cell textAlign="left" collapsing>
        {disableComponent && (
          <Button
              content="Add New"
              style={{backgroundColor:'#FFD500'}}
              onClick={(e: Event) => onHeaderSubmitHandler(e)}
            />
        )}
        {!disableComponent && (
          <Fragment>
            <Button disabled={form.AwsID === '' || 
              form.AccessKey === '' || 
              form.SecretKey === '' || validasiPermission === false } onClick={() => onSubmitHandler()} icon="save" color='blue' circular />
            <Button onClick={onCancel} type="button" color='red' icon="cancel"  circular />
          </Fragment>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          disabled={disableComponent}
          value={form.AwsID}
          placeholder="Type AWS ID here.."
          fluid
          onChange={(e, data) => setForm({ ...form, AwsID: String(data.value) })}
        />
      </Table.Cell>

      <Table.Cell textAlign="center">
        <Input
        disabled={disableComponent}
          value={form.AccessKey}
          placeholder="Type access key here.."
          fluid
          onChange={(e, data) => setForm({ ...form, AccessKey: String(data.value) })}
        />
      </Table.Cell>

      <Table.Cell textAlign="center">
        <Input
          disabled={disableComponent}
          value={form.SecretKey}
          placeholder="Type secreet key here.."
          fluid
          onChange={(e, data) => setForm({ ...form, SecretKey: String(data.value) })}
        />
      </Table.Cell>

      <Table.Cell textAlign="center">
        <Input
          disabled={disableComponent}
          value={form.Note}
          placeholder="Type your note here.."
          fluid
          onChange={(e, data) => setForm({ ...form, Note: String(data.value) })}
        />
      </Table.Cell>
      
      <Table.Cell textAlign="center">
        
      </Table.Cell>

      <Table.Cell textAlign="center">
       
      </Table.Cell>

      <Table.Cell textAlign="center">
       
      </Table.Cell>

      <Table.Cell textAlign="center">
        
      </Table.Cell>

      <Table.Cell textAlign="center">
      </Table.Cell>

    </Table.Row>
  );
};

export default RowFormAWSCredentialSplit;
