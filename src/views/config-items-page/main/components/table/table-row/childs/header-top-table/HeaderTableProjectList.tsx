import { LocationState } from 'history';
import { Button, Grid, Header, Input } from 'semantic-ui-react';
import TableToExcel from '@linways/table-to-excel';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import { selectConfigItems, selectConfigItemsAll, selectConfigProjPO } from 'selectors/config-items/ConfigItemSelector';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './HeaderTableProjectList.module.scss';
import IStore from 'models/IStore';

const HeaderTableProjectList = () => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.CONFIG_ITEMS_LIST]));
  const listConfigItems: IConfigItemsTable = useSelector((state: IStore) => selectConfigItems(state));
  const projectPO: IConfigItemsTable = useSelector((state: IStore) => selectConfigProjPO(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const listConfigItemsAll = useSelector((state: IStore) => selectConfigItemsAll(state));
  const search = '';
  const filter = '';

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      dispatch(
        ConfigItemsActions.reqConfigItemsProjectPO(
          1,
          10,
          projectPO.column,
          projectPO.sorting,
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID
        )
      );
      dispatch(ConfigItemsActions.setActivePageListConf(1));
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPOSearch(
            1,
            10,
            projectPO.column,
            projectPO.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            searchText
          )
        );
        dispatch(ConfigItemsActions.setActivePageListConf(1));
        setBtnCancel(!btnCancel);
      }
    }
  };

  const headers = [
    { label: 'PO Number', key: 'poNumber' },
    { label: 'PO Date', key: 'poDate' },
    { label: 'PO Close Date', key: 'poCloseDate' },
    { label: 'Vendor Name', key: 'vendorName' },
    { label: 'Vendor Type', key: 'vendorType' },
    { label: 'LPB No', key: 'lpbNumber' },
    { label: 'LPB Date', key: 'lpbDate' },
    { label: 'DO No', key: 'doNumber' },
    { label: 'DO Date', key: 'doDate' },
    { label: 'SO No', key: 'soNumber' },
    { label: 'Description Item', key: 'productDescription' },
    { label: 'Product No', key: 'productNumber' },
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'Customer Name', key: 'customerName' },
    { label: 'BU No', key: 'bunUmber' },
    { label: 'Dept.', key: 'dept' },
    { label: 'Note', key: 'note' },
    { label: 'Create Date', key: 'createDate' },
  ];

  const exportTableToExcel = (tableID: string, filename: string): void => {
    if (search) {
    } else if (filter) {
    } else {
      dispatch(ConfigItemsActions.reqConfigItemsList(1, listConfigItems.totalRows, 'poNumber', 'descending', currentUser.employeeID)).then(() => {
        genExportExcel();
      });
    }
  };

  const genExportExcel = (): void => {
    dispatch(ConfigItemsActions.setExportExcel(true));
    if (isRequesting == false) {
      setTimeout(() => {
        const tableSelect = document.getElementById('config-dashboard-table') as HTMLTableElement;
        TableToExcel.convert(tableSelect, {
          name: 'ConfigItems ' + format(new Date(), 'dd MMM yyyy') + '.xlsx',
          sheet: {
            name: 'Sheet 1',
          },
        });
      }, 50);
      setTimeout(() => {
        dispatch(ConfigItemsActions.setExportExcel(false));
        dispatch(ConfigItemsActions.setActivePageListConf(1));
        dispatch(ConfigItemsActions.reqConfigItemsList(1, 10, 'poNumber', 'descending', currentUser.employeeID));
      }, 100);
    }
  };

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column verticalAlign="middle">
          <Header as="h4">
            <Header.Content>{state ? 'Project PO List' : 'Config Items List'}</Header.Content>
          </Header>
        </Grid.Column>

        {state ? (
          <Grid.Column verticalAlign="middle" textAlign="right" className="SearchFormDQ">
            <Input
              className={styles.Rounded + ' roundedSearchInput '}
              placeholder="Type your PO number here..."
              onChange={onChangeSearch}
              onKeyPress={(event) => {
                if (event.charCode == 13) {
                  onSearch();
                }
              }}
              value={searchText}
            />
            <Button
              className="Rounded SearchBtn"
              size="small"
              color="blue"
              icon={btnCancel ? 'close' : 'search'}
              loading={isRequesting}
              onClick={onSearch}
            />
          </Grid.Column>
        ) : (
          <Grid.Column width={12}>
            <CSVLink data={listConfigItemsAll.rows} headers={headers} filename={`ConfigItems.csv`} target="_blank">
              <Button className="m-05r" type="button" icon="file excel" color="green" floated="right" size="small" content="Export Excel" />
            </CSVLink>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default HeaderTableProjectList;
