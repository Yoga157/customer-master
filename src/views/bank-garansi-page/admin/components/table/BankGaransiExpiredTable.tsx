import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BankGaransiAdminTable.module.scss';
import IBankGaransiAdminTable from 'selectors/bank-garansi/models/IBankGaransiAdminTable';
import IBankGaransiAdminTableRow from 'selectors/bank-garansi/models/IBankGaransiAdminTableRow';
import BankGaransiAdminExpiredTableRow from './table-row/BankGaransiAdminExpiredTableRow';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import BankGaransiFormEdit from 'views/bank-garansi-page/components/form/form-edit/BankGaransiFormEdit';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { History } from 'history';

interface IProps {
  readonly tableData: IBankGaransiAdminTable;
}

const BankGaransiExpiredTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { tableData } = props;
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const dispatch: Dispatch = useDispatch();
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    dispatch(BankGaransiActions.requestBankGaransiAdminExs(currentUser.userName, activePage, pageSize, 1, columns, direction));
  };

  const onViewEdit = () => {
    dispatch(ModalFirstLevelActions.OPEN(<BankGaransiFormEdit bankGuaranteeGenID={69} />, ModalSizeEnum.Small));
  };

  return (
    <Table sortable striped className="StickyHeader" id="exportExpired" data-cols-width="10,30,20,40,40,60,10,10,15,20">
      <Table.Header className={styles.BankGaransiTable}>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'BankGuaranteeNo' ? direction : null} onClick={() => reloads('BankGuaranteeNo')}>
            ID
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Status' ? direction : null} onClick={() => reloads('Status')}>
            Status
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Process' ? direction : null} onClick={() => reloads('Process')}>
            Process
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'StepOwner' ? direction : null} onClick={() => reloads('StepOwner')}>
            Step Owner
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'StepName' ? direction : null} onClick={() => reloads('StepName')}>
            Step Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'CreateUserID' ? direction : null} onClick={() => reloads('CreateUserID')}>
            Creator
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'BondIssuer' ? direction : null} onClick={() => reloads('BondIssuer')}>
            Bond Issuer
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'BondType' ? direction : null} onClick={() => reloads('BondType')}>
            Bond Type
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'LetterType' ? direction : null} onClick={() => reloads('LetterType')}>
            Letter Type
          </Table.HeaderCell>

          <Table.HeaderCell sorted={columns === 'BankGuaranteeID' ? direction : null} onClick={() => reloads('BankGuaranteeID')}>
            Document Number
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'Nilai' ? direction : null} onClick={() => reloads('Nilai')}>
            BG Amount
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'CustomerName' ? direction : null} onClick={() => reloads('CustomerName')}>
            Customer Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'BU' ? direction : null} onClick={() => reloads('BU')}>
            BU
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'CompanyApplicant' ? direction : null} onClick={() => reloads('CompanyApplicant')}>
            CO
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'SO' ? direction : null} onClick={() => reloads('SO')}>
            SO
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'SubmitDate' ? direction : null} onClick={() => reloads('SubmitDate')}>
            Submit Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'ExpireDate' ? direction : null} onClick={() => reloads('ExpireDate')}>
            Expire Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'StatusProject' ? direction : null} onClick={() => reloads('StatusProject')}>
            Status Project
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={14} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.rows.map((model: IBankGaransiAdminTableRow) => (
          <BankGaransiAdminExpiredTableRow key={model.bankGuaranteeGenID} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default BankGaransiExpiredTable;
