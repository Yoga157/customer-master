import React, { Fragment, useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IAttachmentVersionTableRow from 'selectors/bank-garansi/models/IAttachmentVersionTableRow';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';

interface IProps {
  readonly rowData: IAttachmentVersionTableRow;
  readonly modul: number;
}

const AttachmentVersionTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, modul } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [typeActive, setTypeActive] = useState('');
  const showConfirm = (type: string) => {
    setOpenConfirm(true);
    setTypeActive(type);
  };
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const handleCancel = () => setOpenConfirm(false);
  const handleConfirm = () => {
    if (typeActive === 'RESTORE') {
      //dispatch(AttachmentVersionActions.restoreAttachment(rowData.funnelAttachmentID, currentUser.employeeID));
    } else if (typeActive === 'DELETE') {
      //dispatch(AttachmentVersionActions.deleteAttachment(rowData.funnelAttachmentID, currentUser.employeeID));
    }

    const timeout = setTimeout(() => {
      dispatch(BankGaransiActions.requestAttachmentVersions(rowData.docNumber,rowData.fileName,modul,0,currentUser.employeeID))
      //dispatch(AttachmentActions.requestAttachmentServer(rowData.funnelGenID, modul,1,15, currentUser.employeeID))
      setOpenConfirm(false);
    },1000);

   return () => clearTimeout(timeout);
  } 

  return (
    <Fragment>

      <Confirm
      open={openConfirm}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      centered
      size="mini"
    />
      <Table.Row key={rowData.funnelAttachmentID}>
        <Table.Cell textAlign="center">
          {rowData.flagView === 0 &&
            <Dropdown pointing='left' icon='ellipsis vertical' >
            <Dropdown.Menu>
                <Dropdown.Item 
                    onClick={()=>showConfirm("RESTORE")} 
                    text='Restore' 
                    icon='edit'
                />
                <Dropdown.Item
                    onClick={()=>showConfirm("DELETE")} 
                    text='Delete' 
                    icon='trash alternate' 
                />
            </Dropdown.Menu>
          </Dropdown> } 
         
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{rowData.versionNumber}</Table.Cell>
        <Table.Cell>{rowData.uploadTime}</Table.Cell>
        <Table.Cell>{rowData.uploadBy}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default AttachmentVersionTableRow;
