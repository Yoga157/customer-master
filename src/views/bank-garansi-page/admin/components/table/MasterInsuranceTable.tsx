import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import styles from './BankGaransiAdminTable.module.scss';
import IMasterInsuranceTable from 'selectors/bank-garansi/models/IMasterInsuranceTable';
import IMasterInsuranceTableRow from 'selectors/bank-garansi/models/IMasterInsuranceTableRow';
import MasterInsuranceTableRow from './table-row/MasterInsuranceTableRow';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import BankGaransiFormEdit from 'views/bank-garansi-page/components/form/form-edit/BankGaransiFormEdit';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

interface IProps {
  readonly tableData:IMasterInsuranceTable;
}

const MasterInsuranceTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
    const {tableData}  = props;
    const [pageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const dispatch:Dispatch = useDispatch();
    const [columns, setColumns] = useState('');
    const [direction, setDirection] = useState('ascending' as any);

  return (
  <Table sortable striped className="StickyHeader" id="export" data-cols-width="10,30,20,40,40,60,10,10,15,20">
    <Table.Header className={styles.BankGaransiTable}>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Bond Issuer Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Waktu Proses</Table.HeaderCell>
        <Table.HeaderCell>Address 1</Table.HeaderCell>
        <Table.HeaderCell>Address 2</Table.HeaderCell>
        <Table.HeaderCell>City</Table.HeaderCell>
        <Table.HeaderCell>Postal Code</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>
    
    <Table.Body>
      {(tableData.rows.length === 0) && 
        <Table.Row>
          <Table.Cell colSpan={9} textAlign='center' className={styles.nodata}>No data</Table.Cell>
        </Table.Row>
      }
      {tableData.rows.map((model: IMasterInsuranceTableRow) => (
          <MasterInsuranceTableRow key={model.id} rowData={model} />
      ))} 
    </Table.Body>
  </Table>
)}

export default MasterInsuranceTable