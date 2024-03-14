import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import HtmlParser from 'react-html-parser';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { CIListBySNRowsModel } from 'stores/config-items/models/ConfigItemListBySerialNumber';
import * as ModalSecondActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import styles from './ConfigItemTable.module.scss';
import { ViewDetail } from './childs';
import moment from 'moment';

function ConfigItemTable({ tableData }) {
  const dispatch: Dispatch = useDispatch();

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>PO No</Table.HeaderCell>
          <Table.HeaderCell>PO Date</Table.HeaderCell>
          <Table.HeaderCell>Vendor Name</Table.HeaderCell>
          <Table.HeaderCell>Brand</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Product No</Table.HeaderCell>
          <Table.HeaderCell>Serial Number</Table.HeaderCell>
          <Table.HeaderCell>Product Warranty</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={9} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.map((item: CIListBySNRowsModel, i) => (
          <Table.Row key={i}>
            <Table.Cell textAlign="center">
              <div
                className={`${styles.icCircle} bg-blue hover-pointer`}
                onClick={() => {
                  dispatch(ModalSecondActions.OPEN(<ViewDetail rowData={item} />, ModalSizeEnum.Small));
                  // setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                }}
              >
                <Icon name="eye" size="small" className="text-white" />
              </div>
            </Table.Cell>
            <Table.Cell textAlign="center">{item.poNumber}</Table.Cell>
            <Table.Cell textAlign="center">{item.poDate && moment(item.poDate).format('DD/MM/yyyy')}</Table.Cell>
            <Table.Cell textAlign="center">{item.vendorName}</Table.Cell>
            <Table.Cell textAlign="center">{item.brand}</Table.Cell>
            <Table.Cell textAlign="center">{item.productDescription && HtmlParser(item.productDescription)}</Table.Cell>
            <Table.Cell textAlign="center">{item.productNumber}</Table.Cell>
            <Table.Cell textAlign="center">{item.serialNumber}</Table.Cell>
            <Table.Cell textAlign="center">{item.warranty && moment(item.warranty).format('DD/MM/yyyy')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default ConfigItemTable;
