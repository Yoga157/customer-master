import React, { useEffect, useState } from 'react';
import { Card, Divider, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectHistoryPSS } from 'selectors/pss/PssSelectors';
import { Button, Pagination } from 'views/components/UI';
import PSSHistoryTable from './table/PSSHistoryTable';
import * as PSSActions from 'stores/pss/PSSActions';
import IStore from 'models/IStore';

function PSSHitory({ projectId }) {
  const dispatch: Dispatch = useDispatch();

  const [activePage, setactivePage] = useState(1);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PSSActions.HISTORY_PSS]));
  const history = useSelector((state: IStore) => selectHistoryPSS(state));

  useEffect(() => {
    dispatch(PSSActions.reqHistoryPss(activePage, 5, projectId));
  }, [dispatch, activePage]);

  const paginationProduct = (e, data) => {
    setactivePage(data.activePage);
  };

  return (
    <>
      <Card.Header className="bold-8">PSS DOCUMENT UPDATE HISTORY</Card.Header>
      <Divider />
      <LoadingIndicator isActive={isRequesting}>
        <Grid>
          <Grid.Column>
            <PSSHistoryTable tableData={history.rows} />
            <Pagination activePage={activePage} onPageChange={(e, data) => paginationProduct(e, data)} totalPage={history.totalRows} pageSize={5} />
          </Grid.Column>
        </Grid>
        <Divider />
        <Grid columns={1} textAlign="center" verticalAlign="middle">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button color="blue" type="button" onClick={() => dispatch(ModalFirstActions.CLOSE())}>
              Close
            </Button>
          </Grid.Column>
        </Grid>
      </LoadingIndicator>
    </>
  );
}

export default PSSHitory;
