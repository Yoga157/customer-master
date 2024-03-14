import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import './FunnelSATableRow.scss';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import FunnelSARowModel from 'stores/bank-garansi/models/FunnelSARowModel';

interface IProps {
  readonly rowData: FunnelSARowModel;
  readonly modals: string;
  readonly funnelGenID: number;
  //readonly history: any
}

const FunnelTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { rowData } = props;

  useEffect(() => {
    console.log('');
  }, []);

  const onSelectFunnelSA = () => {
    dispatch(BankGaransiActions.insertFunnelSAObject(rowData));

    if (props.funnelGenID > 0) {
      dispatch(ModalThirdLevelActions.CLOSE());
    } else {
      if (props.modals === 'add') dispatch(ModalFirstLevelActions.CLOSE());
      else dispatch(ModalSecondLevelActions.CLOSE());
    }
  };

  return (
    <Fragment>
      <Table.Row key={rowData.saNo}>
        <Table.Cell>
          <Button content="Select" primary onClick={onSelectFunnelSA} />
        </Table.Cell>
        <Table.Cell>{rowData.funnelGenID}</Table.Cell>
        <Table.Cell>{rowData.saNo}</Table.Cell>
        <Table.Cell>{rowData.so}</Table.Cell>
        <Table.Cell>{rowData.projectName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>
        <Table.Cell>{rowData.saDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;
