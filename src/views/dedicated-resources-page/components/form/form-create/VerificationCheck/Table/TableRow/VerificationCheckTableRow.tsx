import React, { useState } from 'react';
import { Table, Icon } from 'semantic-ui-react';
// import CreditBillingTableRow from './table-row/CreditBillingTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import FilterAWSBillingModel from 'stores/aws-billing/models/FilterAWSBillingModel';
import VerificationDataStatusModel from 'stores/dedicated-resources/models/VerificationDataStatusModel';

interface IProps {
  readonly rowData?: VerificationDataStatusModel;
}

const VerificationCheckTableRow: React.FC<IProps> = ({ rowData }) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state))


  return (
    <Table.Row>
      <Table.Cell >
        {rowData.no}
      </Table.Cell>
      <Table.Cell >
        {rowData.verificationItem}
      </Table.Cell>
      <Table.Cell >
        <Icon size='large' name='delete' color='red' />
        <Icon size='large' name='info circle' color='blue' />
      </Table.Cell>
    </Table.Row>
  );
};

export default VerificationCheckTableRow;
