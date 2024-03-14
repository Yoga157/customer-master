import IStore from 'models/IStore';
import React, { Fragment, useState, useEffect } from 'react';
import { Accordion, Card, Divider, Icon, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import FunnelHistoryGpmModel from 'stores/funnel/models/FunnelHistoryGpmModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectHistoryGpm } from 'selectors/funnel/FunnelSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';

function AccordionHistory(props) {
  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelActions.REQUEST_HITORY_GPM]));
  //let gpmHistory = useSelector((state: IStore) => selectHistoryGpm(state, [FunnelActions.REQUEST_HITORY_GPM]));

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    //dispatch(FunnelActions.getHistoryGPM(+props.funnelGenID));
  }, [dispatch]);

  /*if (gpmHistory?.length === 0) {
    gpmHistory = [
      {
        historyDate: new Date(),
        historyList: [],
      },
    ];
  }*/

  return (
    <Fragment>
      <Card.Header className="bold-8">GPM - Revision History</Card.Header>
      <Divider />
      <Accordion fluid styled style={{ height: 400, overflow: 'auto' }}>
        <LoadingIndicator isActive={isRequesting}></LoadingIndicator>
      </Accordion>
    </Fragment>
  );
}

export default AccordionHistory;
