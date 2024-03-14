import React, { useState } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LocationState } from 'history';
import environment from 'environment';
import { Dispatch } from 'redux';
import axios from 'axios';

import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { InfoInputEnter, SearchInput } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './HeaderConfigProductTable.module.scss';
import IStore from 'models/IStore';

function HeaderConfigProductTable(props) {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [searchText, setSearchText] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.CONFIG_PRODUCT_SEARCH]));
  const sorting = useSelector((state: IStore) => state.configItems.listDataProduct.sorting);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const column = useSelector((state: IStore) => state.configItems.listDataProduct.column);
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);

  const handleSearch = (search) => {
    setSearchText($.trim(search));

    if (!$.trim(search)) {
      setSearchText('');
      dispatch(
        ConfigItemsActions.reqConfigItemsProduct(1, 10, column, sorting, currentUser.employeeID, state?.projectId, state?.funnelGenID, selectProjPO)
      );
      dispatch(ConfigItemsActions.onSearchProduct(''));
    }
  };

  const onSearch = () => {
    if (searchText.length > 1) {
      dispatch(
        ConfigItemsActions.reqConfigItemsProductSearch(
          1,
          10,
          column,
          sorting,
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID,
          selectProjPO,
          searchText
        )
      );
      getIsSerialNumber(searchText);
    }
  };

  const getIsSerialNumber = (text: string) => {
    axios
      .get(`${environment.api.generic.replace(':controller', `ConfigItem/CheckSerialNumberExist?serialNumber=${text}`)}`)
      .then((res) => {
        console.log('res', res.data);
        if (res.data) {
          dispatch(ConfigItemsActions.onSearchProduct(text));
        } else {
          dispatch(ConfigItemsActions.onSearchProduct(''));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid className={styles.hideEmptySearch}>
      <Grid.Row columns="equal">
        <Grid.Column verticalAlign="middle" width={8}>
          <Header as="h4">
            <Header.Content>Update Items Serial Number</Header.Content>
          </Header>
          <FinalForm
            onSubmit={(values: any) => null}
            // validate={validate}
            render={({ handleSubmit, pristine, invalid }) => (
              <Form>
                <Field
                  name="funnelNo"
                  component={SearchInput}
                  placeholder="e.g.1234 .."
                  loading={isRequesting}
                  labelName="Search By Product Number/Item Description/Serial Number"
                  handleSearchChange={handleSearch}
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      searchText && onSearch();
                    }
                  }}
                  mandatory={false}
                  values={searchText}
                  // onResultSelect={onResultSelectCustomer}
                  // results={customerStoreSearch}
                  // resultRenderer={resultRenderer}
                />
                {<InfoInputEnter />}
              </Form>
            )}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default HeaderConfigProductTable;
