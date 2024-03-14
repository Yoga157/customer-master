import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import AlertConfirm from 'views/components/confirm/AlertConfirm';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import styles from './Tables.module.scss';

interface IProps {
  tableData: any;
}

const OrderingTable = (props: IProps) => {
  const dispatch: Dispatch = useDispatch();
  const { tableData } = props;

  const handleCancle = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Product Number</Table.HeaderCell>
          <Table.HeaderCell>Product Description</Table.HeaderCell>
          <Table.HeaderCell>Qty PO</Table.HeaderCell>
          <Table.HeaderCell>Total Qty Order</Table.HeaderCell>
          <Table.HeaderCell>Expected Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Remark</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((model: any, key) => (
          <Table.Row key={key}>
            <Table.Cell width="1">
              <div
                className={`${styles.icCircle} bg-red hover-pointer`}
                onClick={() => {
                  // setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                  dispatch(
                    ModalSecondLevelActions.OPEN(
                      <AlertConfirm
                        handleCancle={handleCancle}
                        // img={AssetsImg.Info}
                        content={{
                          header: 'DELETING ORDER',
                          title: 'XYZ-00456',
                          body: 'Are you sure want to DELETE ',
                          footer: 'this ORDER ?',
                        }}
                      />,
                      ModalSizeEnum.Mini
                    )
                  );
                }}
              >
                <Icon name="trash alternate" size="small" className="text-white" />
              </div>
            </Table.Cell>

            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
            <Table.Cell>XXXXXXXXX</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default OrderingTable;
