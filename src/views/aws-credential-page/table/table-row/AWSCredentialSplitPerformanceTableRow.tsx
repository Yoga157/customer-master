import React, { useState, Fragment, useEffect } from 'react';
import { Table, Input } from 'semantic-ui-react';
import { Tooltips, Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ModalDeleteRow from './modal-delete-row/ModalDeleteRow';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IAWSCredentialTableRow from 'selectors/aws-credential/models/IAWSCredentialTableRow';
import moment from 'moment';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';
import AWSCredentialPutModel from 'stores/aws-credential/models/AWSCredentialPutModel';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';

interface IProps {
  readonly rowData: IAWSCredentialTableRow;
}

const AWSCredentialSplitPerformanceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [dataLive, setDataLive] = useState(null)

  const handleDelete = (item) => {
    dispatch(ModalFirstLevelActions.OPEN(
      <ModalDeleteRow item={item}/>,
    ModalSizeEnum.Tiny
    ))
  }
  const [disableComponent, setDisableComponent] = useState(true);

  const handleGetId = (awsId: any) => {
    setDataLive(prev => prev === awsId ? null : awsId)
    if (disableComponent) {
      setForm({
        ...form,
        AwsID: rowData.awsid,
        AccessKey: rowData.accessKey,
        SecretKey: rowData.secretKey,
        Note: rowData.notes
      })
      setDisableComponent(false);
    }
  }

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };
  const [form,setForm] = useState({
    AwsID: "",
    AccessKey: "",
    SecretKey: "",
    Note: ""
  })
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  useEffect(() => {
    if(rowData)
    {
      setForm({
        ...form,
        AwsID: rowData.awsid,
        AccessKey: rowData.accessKey,
        SecretKey: rowData.secretKey,
        Note: rowData.notes
      })
    }
  },[rowData])

  const reset = () => {
    setForm({
      AwsID: '',
      AccessKey: '',
      SecretKey: '',
      Note: ''
    })
  };

  const onSubmitHandler = () => {
    const now = moment();
    const newItems = new AWSCredentialPutModel({});
    newItems.awsid = form.AwsID;
    newItems.accessKey = form.AccessKey;
    newItems.secretKey = form.SecretKey;
    newItems.notes = form.Note;
    // newItems.userLoginID = currentUser.employeeID;
    newItems.createDate = moment(rowData.createDate).format('yyyy-MM-DD')
    newItems.createUserID = rowData.createUserID;
    newItems.modifyDate = moment(now).format('yyyy-MM-DD');
    newItems.modifyUserID = currentUser.employeeID;
    console.log('newItems',newItems)
    dispatch(AWSCredentialActions.putAWSCredential(newItems)).then(() => {
      reset()
    })

    if (!disableComponent) {
      setDisableComponent(true);
    }

  }

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
    <Fragment>
        <>
          <Table.Row>
            <Table.Cell  textAlign="left">
              {!disableComponent ? (
                <Fragment>
                  <Tooltips
                    content="Update"
                    trigger={<Button disabled={form.AwsID === '' || 
                      form.AccessKey === '' || 
                      form.SecretKey === '' || validasiPermission === false} onClick={() => onSubmitHandler()} type="button" color='blue' circular icon="save" />}
                  />
                  <Tooltips
                    content="Cancel"
                    trigger={<Button onClick={onCancel} type="button" color='red' circular icon="cancel"  />}
                  />
                  
                </Fragment>
               ) : null }

              {
                disableComponent ?
              (
                <Fragment>
                  <Button onClick={() => handleGetId(rowData.awsid)} type="button" color='blue' circular icon="edit outline" />
                  <Button disabled={validasiPermission === false} onClick={() => handleDelete(rowData)} type="button" color='red' circular icon="trash alternate" />
                </Fragment>
              ) : null
              } 
             
            </Table.Cell>
            { disableComponent ? 
            <>
              <Table.Cell textAlign="center">{rowData.awsid}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.accessKey}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.secretKey}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.notes}</Table.Cell>
              <Table.Cell textAlign="center">{moment(rowData.createdDate).format('D MMMM YYYY, h:mm')}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.createdBy}</Table.Cell>
              <Table.Cell textAlign="center">{moment(rowData.modifiedDate).format('D MMMM YYYY, h:mm')}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.modifiedBy}</Table.Cell>
              <Table.Cell textAlign='center'></Table.Cell>
            </>
            :
            <>
              <Table.Cell textAlign="center">
                <Input
                  disabled={disableComponent}
                  value={form.AwsID}
                  placeholder="Type AWS ID here.."
                  fluid
                  onChange={(e, data) => setForm({ ...form, AwsID: String(data.value) })}
                />
              </Table.Cell>

              {/* <Table.Cell textAlign="center">
                <Input
                disabled={disableComponent}
                  value={form.AccessKey}
                  placeholder="Type access key here.."
                  fluid
                  onChange={(e, data) => setForm({ ...form, AccessKey: String(data.value) })}
                />
              </Table.Cell> */}
              <Table.Cell textAlign="center">{rowData.accessKey}</Table.Cell>

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
                  placeholder="Type note here.."
                  fluid
                  onChange={(e, data) => setForm({ ...form, Note: String(data.value) })}
                />
              </Table.Cell>
              <Table.Cell textAlign="center">{rowData.createdDate}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.createdBy}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.modifiedDate}</Table.Cell>
              <Table.Cell textAlign="center">{rowData.modifiedBy}</Table.Cell>
              <Table.Cell textAlign="center">

              </Table.Cell>
            </>
          }
          </Table.Row>{' '}
        </>
    </Fragment>
  );
};

export default AWSCredentialSplitPerformanceTableRow;
