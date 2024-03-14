import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import styles from './Tables.module.scss';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import Ordering from './childs/forms/Ordering';

interface IProps {
  tableData: any;
}

const ProductTable = (props: IProps) => {
  const dispatch: Dispatch = useDispatch();
  const { tableData } = props;

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Product Number</Table.HeaderCell>
          <Table.HeaderCell>Product Description</Table.HeaderCell>
          <Table.HeaderCell>Qty PO</Table.HeaderCell>
          <Table.HeaderCell>Total Qty Ordered</Table.HeaderCell>
          <Table.HeaderCell>Remaining Qty</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((model: any, key) => (
          <Table.Row key={key}>
            <Table.Cell width="1">
              <div
                className={`${styles.icCircle} bg-yellow hover-pointer`}
                onClick={() => {
                  // setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                  dispatch(ModalSecondLevelActions.OPEN(<Ordering />, ModalSizeEnum.Tiny));
                }}
              >
                {/* <Icon name="eye" size="small" className="text-white" /> */}
                <Icon name="calendar plus" size="small" className="text-black" />
              </div>
            </Table.Cell>

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

export default ProductTable;
