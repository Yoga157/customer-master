import React from 'react';
import { Table } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import styles from './TemplateProjectTable.module.scss';
import { Dispatch } from 'redux';
import TemplateProjectTableRow from './table-row/TemplateProjectTableRow';
import { CheckBox } from 'views/components/UI';
import OtherBenefitTemplateProject from 'stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitTemplateProject';

interface IProps {
  readonly tableData?: any;
  flag?: string;
  Temp?: any;
  setTemp?: any;
}

const TemplateProjectTable: React.FC<IProps> = ({ tableData, flag, Temp, setTemp }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
 
  return (
    <Table >
      <Table.Header className={styles.CreditBillingServiceTable}>
        <Table.Row>
          <>
            <Table.HeaderCell textAlign="left">Type</Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Description</Table.HeaderCell>
            <Table.HeaderCell textAlign="left"><CheckBox disabled={true} value={true} /></Table.HeaderCell>
          </>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}
        {tableData.map((model: OtherBenefitTemplateProject) => (
          <TemplateProjectTableRow
            flag={flag}
            rowData={model}
            Temp={Temp}
            setTemp={setTemp}
          />
        ))}

      </Table.Body>
    </Table>
  );
};

export default TemplateProjectTable;
