import React, { useEffect } from 'react';
import { Card, Divider, Grid, Header, Icon, List } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { format } from 'date-fns';
import { Dispatch } from 'redux';

import PMOPlaceholderDetailMilestone from '../../placeholder/PMOPlaceholderDetailMilestone';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectPMODetailMilestone } from 'selectors/pmo/PMOSelector';
import * as PMOActions from 'stores/pmo/PMOActions';
import style from './LatestMilestone.module.scss';
import IStore from 'models/IStore';

function LatestMIlestoneCard({ projectId }) {
  const dispatch: Dispatch = useDispatch();

  const detailMilestone = useSelector((state: IStore) => selectPMODetailMilestone(state));

  useEffect(() => {
    dispatch(PMOActions.reqProgressDetailMilestone(+projectId));
  }, []);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [PMOActions.PROGRESS_DETAIL_MILESTONE]));

  return (
    <Card fluid className={style.CardMilestone}>
      <Card.Content>
        <Card.Header>PROJECT #{projectId} - MILESTONE</Card.Header>
      </Card.Content>

      {isRequesting ? (
        <PMOPlaceholderDetailMilestone />
      ) : (
        <Card.Content className={style.ContainerList}>
          <List verticalAlign="middle">
            {detailMilestone?.length === 0 && (
              <Grid textAlign="center" className="pv-1r">
                <Header as="h5" className="text-gray ">
                  No Data
                </Header>
              </Grid>
            )}
            {detailMilestone?.map((item, index) => {
              return (
                <List.Item key={index}>
                  <div
                    className={`${style.CircularInfo} ${
                      index === 0 ? `bg-green` : item?.taskStatus === 'Completed' ? `bg-yellow` : `bg-gray-superlight`
                    } `}
                  >
                    {index === 0 ? (
                      <List.Header as="h5" className=" text-white">
                        START
                      </List.Header>
                    ) : (
                      <Icon name="check" size="large" className=" text-gray" />
                    )}
                  </div>
                  <List.Content>
                    <List.Header as="h3" className={`${item?.taskStatus === 'Completed' ? 'text-gray' : 'text-gray-50'}`}>
                      {`${item.precentageTask ? item.precentageTask + '% ' : ''} `}
                      {item.title}
                    </List.Header>
                    <List.Header as="p" className={`${item?.taskStatus === 'Completed' ? 'text-gray' : 'text-gray-50'} `}>
                      <b>{item?.actualStartDate && format(new Date(item?.actualStartDate), 'dd MMM yyyy')}</b>
                      {item.description ? ` - ${ReactHtmlParser(item.description)}` : ''}
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Card.Content>
      )}
    </Card>
  );
}

export default LatestMIlestoneCard;
