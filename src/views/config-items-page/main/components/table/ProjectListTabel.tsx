import React, { useEffect, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import { selectConfigItems, selectConfigProjPO } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import PMOTableRow from './table-row/ProjectListRow';
import IStore from 'models/IStore';
import ConfigItemFilter from 'stores/config-items/models/ConfigItemFilter';

interface IProps {
  tableData: any;
}

const ProjectListTabel: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [direction, setDirection] = useState('descending' as any);
  const [columns, setColumns] = useState('');

  const projectPO: IConfigItemsTable = useSelector((state: IStore) => selectConfigProjPO(state));
  const isExport = useSelector((state: IStore) => state.configItems.isExportExcelConfigList);
  const search = useSelector((state: IStore) => state.configItems.listDataProjectPO.search);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const listConfigItems = useSelector((state: IStore) => selectConfigItems(state));

  useEffect(() => {
    setColumns(projectPO.column);
    if (projectPO.rows.length > 0) {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProduct(
            1,
            10,
            'productNumber',
            'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            projectPO.rows[0]?.poNumber
          )
        );
      state && dispatch(ConfigItemsActions.selectProjectPo(projectPO.rows[0]?.poNumber));
    } else {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProduct(
            1,
            10,
            'productNumber',
            'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            '-1'
          )
        );
    }
  }, [projectPO]);

  const reloads = (columns: any) => {
    // setColumns(columns);
    dispatch(ConfigItemsActions.setActivePageListConf(1));
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');

    if (state) {
      if (search) {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPOSearch(
            1,
            10,
            columns,
            direction === 'ascending' ? 'descending' : 'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            search?.search as any
          )
        );
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPO(
            1,
            10,
            columns,
            direction === 'ascending' ? 'descending' : 'ascending',
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID
          )
        );
      }
    } else {
      if (listConfigItems.search) {
        dispatch(
          ConfigItemsActions.reqConfigItemsListSearch(
            1,
            10,
            columns,
            direction === 'ascending' ? 'descending' : 'ascending',
            listConfigItems.search.search as any,
            currentUser.employeeID,
            'PERPAGE'
          )
        );
      } else if (listConfigItems.filter) {
        const newItems = new ConfigItemFilter({
          ...(listConfigItems.filter as any),
          column: columns,
          pageSize: 10,
          sorting: direction === 'ascending' ? 'descending' : 'ascending',
        });
        dispatch(ConfigItemsActions.reqConfigItemsListFilter(newItems, 'PERPAGE'));
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsList(1, 10, columns, direction === 'ascending' ? 'descending' : 'ascending', currentUser.employeeID)
        );
      }
    }

    dispatch(ConfigItemsActions.setActivePageListConf(1));
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
            id="config-dashboard-table"
            // data-cols-width=
            className="font-size-1 mt-1 mb-1 colum-stiky"
          >
            <Table.Header>
              <Table.Row>
                {!isExport && <Table.HeaderCell>{state && 'Action'}</Table.HeaderCell>}

                <Table.HeaderCell sorted={columns === 'poNumber' ? direction : null} onClick={() => reloads('poNumber')}>
                  PO Number
                </Table.HeaderCell>
                <Table.HeaderCell sorted={columns === 'poDate' ? direction : null} onClick={() => reloads('poDate')}>
                  PO Date
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" sorted={columns === 'poCloseDate' ? direction : null} onClick={() => reloads('poCloseDate')}>
                  PO Close Date
                </Table.HeaderCell>

                {state && (
                  <Table.HeaderCell sorted={columns === 'poAdmin' ? direction : null} onClick={() => reloads('poAdmin')}>
                    Purchase Admin
                  </Table.HeaderCell>
                )}

                <Table.HeaderCell textAlign="center" sorted={columns === 'vendorName' ? direction : null} onClick={() => reloads('vendorName')}>
                  Vendor Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" sorted={columns === 'vendorType' ? direction : null} onClick={() => reloads('vendorType')}>
                  Vendor Type
                </Table.HeaderCell>

                {!state && (
                  <>
                    <Table.HeaderCell textAlign="center" sorted={columns === 'lpbNumber' ? direction : null} onClick={() => reloads('lpbNumber')}>
                      LPB No
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'lpbDate' ? direction : null} onClick={() => reloads('lpbDate')}>
                      LPB Date
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" sorted={columns === 'doNumber' ? direction : null} onClick={() => reloads('doNumber')}>
                      DO No
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'doDate' ? direction : null} onClick={() => reloads('doDate')}>
                      DO Date
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" sorted={columns === 'soNumber' ? direction : null} onClick={() => reloads('soNumber')}>
                      SO No
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'productDescription' ? direction : null} onClick={() => reloads('productDescription')}>
                      Description Item
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      textAlign="center"
                      sorted={columns === 'productNumber' ? direction : null}
                      onClick={() => reloads('productNumber')}
                    >
                      Product No
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'serialNumber' ? direction : null} onClick={() => reloads('serialNumber')}>
                      Serial Number
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'customerName' ? direction : null} onClick={() => reloads('customerName')}>
                      Custommer Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" sorted={columns === 'bunUmber' ? direction : null} onClick={() => reloads('bunUmber')}>
                      BU No
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'dept' ? direction : null} onClick={() => reloads('dept')}>
                      Dept.
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'note' ? direction : null} onClick={() => reloads('note')}>
                      Note
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'createDate' ? direction : null} onClick={() => reloads('createDate')}>
                      Create Date
                    </Table.HeaderCell>

                    <Table.HeaderCell sorted={columns === 'startWarranty' ? direction : null} onClick={() => reloads('startWarranty')}>
                      Cust. Waranty Start Date
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'endWarranty' ? direction : null} onClick={() => reloads('endWarranty')}>
                      Cust. Waranty End Date
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
                  </>
                )}

                {state && (
                  <>
                    <Table.HeaderCell sorted={columns === 'poStatus' ? direction : null} onClick={() => reloads('poStatus')}>
                      PO Approval Status
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'eta' ? direction : null} onClick={() => reloads('eta')}>
                      ETA BY PURCHASING
                    </Table.HeaderCell>
                    {/* <Table.HeaderCell sorted={columns === 'expectedArrivalDate' ? direction : null} onClick={() => reloads('expectedArrivalDate')}>
                      ETA BY PMO
                    </Table.HeaderCell> */}
                    <Table.HeaderCell sorted={columns === 'pmoRemark' ? direction : null} onClick={() => reloads('pmoRemark')}>
                      PMO Remark
                    </Table.HeaderCell>
                    <Table.HeaderCell sorted={columns === 'poRemark' ? direction : null} onClick={() => reloads('poRemark')}>
                      Remark
                    </Table.HeaderCell>
                  </>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={state ? 12 : 19} textAlign="center" className="">
                    No data
                  </Table.Cell>
                </Table.Row>
              )}

              {tableData.map((model: any, key) => (
                <PMOTableRow key={key} rowData={model} index={key} />
              ))}
            </Table.Body>
          </Table>
        </Form>
      )}
    />
  );
};

export default ProjectListTabel;
