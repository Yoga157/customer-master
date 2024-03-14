import React, { useState, useEffect } from 'react';
import { Card, Divider, Grid, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectHistoryGpm } from 'selectors/funnel/FunnelSelector';
import GpmHistoryTable from './components/table/GpmHistoryTable';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { Pagination } from 'views/components/UI';
import IStore from 'models/IStore';
import './HistoryGPMStyle.scss';

interface IProps {
  funnelGenID: string;
  from: string;
}

const HistoryGPM: React.FC<IProps> = (props) => {
  const dispatch: Dispatch = useDispatch();

  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_HITORY_GPM]));
  const gpmHistory = useSelector((state: IStore) => selectHistoryGpm(state, [FunnelActions.REQUEST_HITORY_GPM]));

  useEffect(() => {
    dispatch(FunnelActions.getHistoryGPM(+props.funnelGenID, activePage, pageSize));
  }, [dispatch, activePage]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  return (
    <LoadingIndicator isActive={isRequesting}>
      {props.from === 'historyGpmViewEdit' ? (
        <Header className="pv-1r ph-1r">
          <Header.Content>Total Selling Detail - Revision History</Header.Content>
        </Header>
      ) : (
        <>
          <Card.Header className="bold-8">GPM - Revision History</Card.Header>
          <Divider />
        </>
      )}

      <Grid>
        <Grid.Row>
          <Grid.Column className="scroll-x-1430">
            <GpmHistoryTable tableData={gpmHistory.rows} from={props.from} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={gpmHistory.totalRows}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default HistoryGPM;
