import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import React, { useEffect, useState } from 'react';
import { Table, Form } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import { selectConfigProduct, selectConfigProductDetail } from 'selectors/config-items/ConfigItemSelector';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import ConfigProductDetailRow from './table-row/ConfigProductDetailRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';

interface IProps {
  tableData: any;
}

const ConfigProductDetailTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [direction, setDirection] = useState('descending' as any);
  const [columns, setColumns] = useState('');

  const productDetail: IConfigItemsTable = useSelector((state: IStore) => selectConfigProductDetail(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);

  useEffect(() => {
    setColumns(productDetail.column);
  }, [productDetail]);

  const reloads = (columns: any) => {
    // setColumns(columns);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    state &&
      state &&
      dispatch(
        ConfigItemsActions.reqConfigItemsProductDetail(
          1,
          5,
          columns,
          direction === 'ascending' ? 'descending' : 'ascending',
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID,
          selectProduct.productNumber,
          selectProduct.doNumber,
          serialNumber
        )
      );
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
                <Table.HeaderCell
                  width="10"
                  sorted={columns === 'productDescription' ? direction : null}
                  onClick={() => reloads('productDescription')}
                >
                  Description Item
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'serialNumber' ? direction : null} onClick={() => reloads('serialNumber')}>
                  Serial Number
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={3} textAlign="center" className="">
                    No data
                  </Table.Cell>
                </Table.Row>
              )}

              {tableData.map((model, key) => (
                <ConfigProductDetailRow key={key} rowData={model} index={key} />
              ))}
            </Table.Body>
          </Table>
        </Form>
      )}
    />
  );
};

export default ConfigProductDetailTable;
