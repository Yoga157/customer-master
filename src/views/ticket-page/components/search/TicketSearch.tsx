import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import TicketPageHooks from 'views/ticket-page/page-ticket/hooks/TicketPageHooks';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import AdvancedSearch from '../advance-search/AdvanceSearch';
import * as TicketActions from 'stores/ticket/TicketActions';
import styles from './Styles.module.scss';
import IStore from 'models/IStore';

const TicketSearch: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [btnCancel, setBtnCancel] = useState(false);

  const filter: any = useSelector((state: IStore) => state.ticket?.ticketList?.filter);
  const { getTicket, searcTicket } = TicketPageHooks();

  const onShowAdvancedSearch = useCallback((): void => {
    dispatch(SidebarContainerActions.OPEN(<AdvancedSearch setBtnCancel={setBtnCancel} />));
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      onChangeSearch(null, { value: '' });
    }
  }, [filter]);

  const onChangeSearch = (event: any, data: any) => {
    setBtnCancel(false);
    setSearchText(data.value);
  };

  const onSearch = () => {
    if (btnCancel || searchText.length === 0) {
      getTicket();
      setBtnCancel(false);
      setSearchText('');
    } else {
      if (searchText.length > 1) {
        searcTicket(1, 15, 'ticketId', 'descending', searchText);
        setBtnCancel(!btnCancel);
      }
    }
    dispatch(TicketActions.setActivePage(1));
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [TicketActions.GET_TICKET_LIST_SEARCH]));

  return (
    <Grid.Column className="SearchFormDQ">
      <Button
        className="AdvSearchBtn"
        icon="sliders horizontal"
        size="small"
        color="yellow"
        button="true"
        floating="true"
        onClick={onShowAdvancedSearch}
      />
      <Input
        className={styles.Rounded + ' roundedSearchInput '}
        // iconPosition="left"
        placeholder="Type: Ticket ID, Ticket Title, Description, Resource, Status Etc."
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
  );
};

export default TicketSearch;
