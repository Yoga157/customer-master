import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import IAWSBillingTableRow from 'selectors/aws-billing/models/IAWSBillingTableRow';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import styles from '../CreditBillingServiceTable.module.scss';
import IGetHistoryContractTableRow from 'selectors/dedicated-resources/models/IGetHistoryContractTableRow';
import moment from 'moment';

interface IProps {
  //   readonly rowData: IAWSBillingTableRow;
  readonly rowData?: IGetHistoryContractTableRow;
}

const ContractTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { rowData } = props;

  return (
    <>
      <Table.Row
      >
        <Table.Cell>{rowData.contractNo}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell>{moment(rowData.newContractBeginDate).format('D MMMM YYYY, h:mm')}</Table.Cell>
        <Table.Cell>{moment(rowData.newContractEndDate).format('D MMMM YYYY, h:mm')}</Table.Cell>
      </Table.Row>
    </>
  );
};

export default ContractTableRow;
