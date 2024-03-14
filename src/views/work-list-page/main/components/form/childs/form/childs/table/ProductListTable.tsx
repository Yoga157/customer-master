import React, { useState } from 'react';
import { Icon, Table, Form, Button } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'react-final-form';
import { Dispatch } from 'redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as WorkListActions from 'stores/work-list/WorkListActions';
import ProductListTableRow from './table-row/ProductListTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './ProductListTable.module.scss';
import { TextInput } from 'views/components/UI';
import IStore from 'models/IStore';

function ProductListTable({ tableData, type }) {
  const dispatch: Dispatch = useDispatch();
  const [initValues, setInitValues] = useState({} as any);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = () => {
    dispatch(
      WorkListActions.createActivityProduct({
        activityReportProductGenID: 0,
        activityReportGenID: 0,
        productName: initValues.productName ? initValues.productName : '',
        productNumber: initValues.productNumber ? initValues.productNumber : '',
        serialNumber: initValues.serialNumber ? initValues.serialNumber : '',
        salesUnit: initValues.salesUnit ? initValues.salesUnit : '',
        createDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        createUserID: currentUser.employeeID,
        modifyDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        modifyUserID: currentUser.employeeID,
      })
    );
    setTimeout(() => {
      setInitValues({} as any);
    }, 150);
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler}
      initialValues={initValues}
      render={({ handleSubmit, pristine, invalid }) => (
        <Form onSubmit={handleSubmit}>
          <LoadingIndicator isActive={isRequesting}>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  {type !== 'ViewDetail' && <Table.HeaderCell>Action</Table.HeaderCell>}
                  <Table.HeaderCell>
                    Product Name
                    {/* <label className="mandatory"> *</label> */}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Product Number
                    {/* <label className="mandatory"> *</label> */}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Serial Number
                    {/* <label className="mandatory"> *</label> */}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Sales Unit
                    {/* <label className="mandatory"> *</label> */}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {type !== 'ViewDetail' && (
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <Button
                        circular
                        icon="plus"
                        size="mini"
                        color="yellow"
                        onClick={() => onSubmitHandler()}
                        disabled={
                          !initValues.productName && !initValues.productNumber && !initValues.serialNumber && !initValues.salesUnit ? true : false
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`productName`}
                        component={TextInput}
                        placeholder="Product Name"
                        isRow={true}
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            productName: e,
                          })
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`productNumber`}
                        component={TextInput}
                        placeholder="Product Number"
                        isRow={true}
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            productNumber: e,
                          })
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`serialNumber`}
                        component={TextInput}
                        placeholder="Serial Number"
                        isRow={true}
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            serialNumber: e,
                          })
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Field
                        name={`salesUnit`}
                        component={TextInput}
                        placeholder="Sales Unit"
                        isRow={true}
                        onChange={(e) =>
                          setInitValues({
                            ...initValues,
                            salesUnit: e,
                          })
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                )}

                {tableData.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={5} textAlign="center" className="">
                      No data
                    </Table.Cell>
                  </Table.Row>
                )}

                {tableData.map((rowData, i) => (
                  <ProductListTableRow key={i} index={i} rowData={rowData} type={type} />
                ))}
              </Table.Body>
            </Table>
          </LoadingIndicator>
        </Form>
      )}
    />
  );
}

export default ProductListTable;
