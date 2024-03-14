import React from 'react';
import { Table } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './VerificationCheckTable.module.scss';
import { Dispatch } from 'redux';
import VerificationCheckTableRow from './TableRow/VerificationCheckTableRow';
import VerificationDataStatusModel from 'stores/dedicated-resources/models/VerificationDataStatusModel';

interface IProps {
  readonly tableData?: any;
}

const VerificationCheckTable: React.FC<IProps> = ({ tableData }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))


  return (
    <Table sortable striped className="StickyHeader" id="export" data-cols-width="10,30,20,40,40,60">
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            <Table.HeaderCell textAlign="left">No</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Verification Check</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Status</Table.HeaderCell>
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData && tableData.length === 0 || tableData === undefined ? (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        ) : null}



        {tableData?.map((model: VerificationDataStatusModel) => (
          <VerificationCheckTableRow
            rowData={model}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default VerificationCheckTable;
