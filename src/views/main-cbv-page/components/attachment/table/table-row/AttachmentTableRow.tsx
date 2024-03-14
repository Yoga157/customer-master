import React, {useState,useEffect} from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import fileDownload from 'js-file-download';
import axios from 'axios';
import environment from 'environment';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ModalDeleteRow from './modal-delete-row/ModalDeleteRow';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import { selectCBVCreditById } from 'selectors/main-cbv/CreditBillingServiceSelector';

interface IProps {
  readonly rowData: any;
  readonly type: string;
  readonly tableData: any;
  setDataAttachment?: any;
  dataAttachment? :any;
  setValidasiAttachment?: any;
  typecbv?: any;
}

const AttachmentTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const CBVCreditId = useSelector((state: IStore) => selectCBVCreditById(state));
  const { rowData, type, tableData, setDataAttachment, dataAttachment, setValidasiAttachment, typecbv } = props;

  const [validasiPermission,setValidasiPermission] = useState(false)
  useEffect(() => {
    permission.map((item) => {
      if(item.text1 === currentUser.userName)
      {
        setValidasiPermission(true)
      }
    })
  },[])

  const permission = useSelector((state: IStore) => selectPermission(state))

  const handleDeleteRow = (item) => {
    
    if(type === "Edit")
    {
      dispatch(ModalSecondLevelActions.OPEN(
        <ModalDeleteRow item={item} userLoginId={currentUser.employeeID} />,
      ModalSizeEnum.Tiny
      ))
    } 
    else
    {
      if(typecbv === 4930)
      {
        if(item.DocumentTypeName === "Email" || item.DocumentTypeName === "PO")
        {
          setValidasiAttachment(false)
        }
      }
      setDataAttachment(dataAttachment.filter(value => value.fileName !== item.fileName))
    }
  }

  useEffect(() => {
  },[dataAttachment])

  const onDownloadFile = (rowData) => {
    const controllerName = `CBVAttachment/download-file/${rowData.attachmentId}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    handleDownload(endpoint, rowData.fileName);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <>
        <Table.Row>
            <Table.Cell width="1">
                <Dropdown pointing="left" icon="ellipsis vertical">
                    <Dropdown.Menu>
                      {type === "Edit" && (<Dropdown.Item text="Download" icon="download" onClick={() => onDownloadFile(rowData)} />)}
                        
                      {type === "Edit" && tableData.length > 1  ? 
                        CBVCreditId.creditTypeStr === "Credit Memo" && rowData.documentType
                        === "Email" || rowData.documentType
                        === "PO" ? null : validasiPermission === true && (<Dropdown.Item text="Delete" icon="trash" onClick={() => handleDeleteRow(rowData)} />)
                      : null}

                      {type === "Add" && (<Dropdown.Item text="Delete" icon="trash" onClick={() => handleDeleteRow(rowData)} />)}
                    </Dropdown.Menu>
                </Dropdown>
            </Table.Cell>
            <Table.Cell> {rowData.documentName} </Table.Cell>
            <Table.Cell> {type === "Add" ? rowData.DocumentTypeName : rowData.documentType} </Table.Cell>
            <Table.Cell> {type === "Add" ? rowData.createDate : rowData.createdDate} </Table.Cell>
            <Table.Cell> {type === "Add" ? rowData.UploadBy : rowData.createdBy} </Table.Cell>
        </Table.Row>
    </>
  );
};

export default AttachmentTableRow;
