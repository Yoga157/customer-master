import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import { Table, Form } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import { selectConfigProduct } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import ConfigProductTableRow from './table-row/ConfigProductTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

interface IProps {
  tableData: any;
}

const ConfigProductTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [direction, setDirection] = useState('descending' as any);
  const [columns, setColumns] = useState('');

  const activePageProdDetail = useSelector((state: IStore) => state.configItems.activePageProductDetail);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const search = useSelector((state: IStore) => state.configItems.listDataProduct.search);
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);
  const product: any = useSelector((state: IStore) => selectConfigProduct(state));

  useEffect(() => {
    setColumns(product.column);

    if (product.rows.length > 0) {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductDetail(
            activePageProdDetail,
            5,
            'productNumber',
            'descending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            product.rows[0]?.productNumber,
            product.rows[0]?.doNumber,
            serialNumber
          )
        );
      state && dispatch(ConfigItemsActions.selectProduct(product.rows[0]?.productNumber, product.rows[0]?.doNumber));
    } else {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductDetail(
            activePageProdDetail,
            5,
            'productNumber',
            'descending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            '-1',
            '-1',
            serialNumber
          )
        );
    }
  }, [product, serialNumber]);

  const reloads = (columns: any) => {
    // setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    if (search) {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductSearch(
            1,
            10,
            columns,
            direction === 'ascending' ? 'descending' : 'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            selectProjPO,
            search?.search as any
          )
        );
    } else {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProduct(
            1,
            10,
            columns,
            direction === 'ascending' ? 'descending' : 'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            selectProjPO
          )
        );
    }
  };

  const onSubmitHandler = (values) => {};
  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler}
      render={({ handleSubmit, pristine, invalid }) => (
        <Form onSubmit={handleSubmit}>
          <Table
            sortable
            striped
            id="table-pmo"
            // data-cols-width=
            className="font-size-1 mt-1 mb-1"
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'productNumber' ? direction : null} onClick={() => reloads('productNumber')}>
                  Product Number
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'soNumber' ? direction : null} onClick={() => reloads('soNumber')}>
                  SO Number
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'doNumber' ? direction : null} onClick={() => reloads('doNumber')}>
                  DO Number
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'lpbNumber' ? direction : null} onClick={() => reloads('lpbNumber')}>
                  LPB Number
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'lpbDate' ? direction : null} onClick={() => reloads('lpbDate')}>
                  LPB Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'eta' ? direction : null} onClick={() => reloads('eta')}>
                  ETA BY PURCHASING
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'expectedDeliveryDate' ? direction : null} onClick={() => reloads('expectedDeliveryDate')}>
                  ETA BY PMO
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'doDate' ? direction : null} onClick={() => reloads('doDate')}>
                  DO Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'productDescription' ? direction : null} onClick={() => reloads('productDescription')}>
                  Description Item
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'brand' ? direction : null} onClick={() => reloads('brand')}>
                  Brand
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'quantityPO' ? direction : null} onClick={() => reloads('quantityPO')}>
                  Quantity
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'serialNumberStatus' ? direction : null} onClick={() => reloads('serialNumberStatus')}>
                  Serial Number Status
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'startWarranty' ? direction : null} onClick={() => reloads('startWarranty')}>
                  Cust. Warranty Start Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'endWarranty' ? direction : null} onClick={() => reloads('endWarranty')}>
                  Cust. Warranty End Date
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'warrantyDuration' ? direction : null} onClick={() => reloads('warrantyDuration')}>
                  Warranty Duration
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'preventiveSchedule' ? direction : null} onClick={() => reloads('preventiveSchedule')}>
                  Preventive Schedule
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'preventiveDate' ? direction : null} onClick={() => reloads('preventiveDate')}>
                  Preventive Date
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={14} textAlign="center" className="">
                    No data
                  </Table.Cell>
                </Table.Row>
              )}

              {tableData.map((model, key) => (
                <ConfigProductTableRow key={key} rowData={model} index={key} />
              ))}
            </Table.Body>
          </Table>
        </Form>
      )}
    />
  );
};

export default ConfigProductTable;
