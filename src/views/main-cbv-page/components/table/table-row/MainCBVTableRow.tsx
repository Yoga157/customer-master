import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import ICreditBillingTableRow from 'selectors/main-cbv/models/ICreditBillingTableRow';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ModalDeleteRow from './modal-delete-row/ModalDeleteRow';

interface IProps {
  readonly rowData: ICreditBillingTableRow;
  trigger: any;
}

const MainCBVTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, trigger } = props;

  const [validasiPermission, setValidasiPermission] = useState(false);
  const permission = useSelector((state: IStore) => selectPermission(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, [permission, validasiPermission]);

  const deleteRow = (rowData) => {
    dispatch(ModalFirstLevelActions.OPEN(<ModalDeleteRow item={rowData} />, ModalSizeEnum.Tiny));
  };

  return (
    <>
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text="View/Edit" icon="edit" onClick={() => trigger(rowData)} />
              {validasiPermission === true && <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => deleteRow(rowData)} />}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell> {rowData.creditId} </Table.Cell>
        <Table.Cell>{rowData.voucherNo}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.accountID)}</Table.Cell>
        <Table.Cell>{rowData.sourceCustomerIDStr}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.picName)}</Table.Cell>
        <Table.Cell>{rowData.voucherAmountH?.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.usedAmountH?.toLocaleString()}</Table.Cell>
        <Table.Cell>{rowData.remainingAmountH?.toLocaleString()}</Table.Cell>
        <Table.Cell>{ReactHtmlParser(rowData.notes)}</Table.Cell>
        <Table.Cell> {rowData.createdBy} </Table.Cell>
        <Table.Cell> {rowData.createdDate} </Table.Cell>
        <Table.Cell> {rowData.modifiedBy} </Table.Cell>
        <Table.Cell> {rowData.modifiedDate} </Table.Cell>
      </Table.Row>
    </>
  );
};

export default MainCBVTableRow;
