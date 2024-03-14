import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'views/components/UI';
import { Grid, Segment, Label } from 'semantic-ui-react';
import './WhatsNewPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as WhatsNewActions from 'stores/whats-new/WhatsNewAction';
import IStore from 'models/IStore';
import moment from 'moment';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import environment from 'environment';

const WhatsNewNotes = (props: any) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState('Latest');
  const [listYear, setListYear] = useState([]);
  const [activeButtonIndex, setButtonIndex] = useState(0);

  useEffect(() => {
    dispatch(WhatsNewActions.requestWhatsNew(year));
  }, [year]);

  const resultObject = useSelector((state: IStore) => state.whatsNew.resultActions);
  console.log('news', resultObject.resultObj.flagCheckUpdate);
  const d = new Date();

  const [bottom, setBottom] = useState(false);

  const handleScroll = (e) => {
    const scrollTarget = e.target.scrollHeight - e.target.scrollTop - 1;
    const clientHeight = e.target.clientHeight;
    const bottom = scrollTarget === clientHeight;
    setBottom(bottom);
  };

  return (
    <Grid className="WhatsNewNotif">
      <Grid.Column>
        <Segment inverted className="lightYellow">
          <Label color="red" size="huge" circular center>
            NEW UPDATE !
          </Label>
          <div className="WnnBody" onScroll={handleScroll}>
            {resultObject.resultObj &&
              resultObject.resultObj.rows
                .filter((el) => el.priority === 'Low')
                .map((item, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Row>
                        <Grid.Column>
                          <p className="WnnTitle">{item.effectModul}</p>
                          <span>{item.date}</span>
                          <br />
                          <span>{'Deploy by : ' + item.deployBy}</span>
                          <div>{ReactHtmlParser(item.describeChanges)}</div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  );
                })}

            {resultObject.resultObj &&
              resultObject.resultObj.rows
                .filter((el) => el.priority === 'Medium')
                .map((item, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Row>
                        <Grid.Column>
                          <p className="WnnTitle">{item.effectModul}</p>
                          <span>{item.date}</span>
                          <br />
                          <span>{'Deploy by : ' + item.deployBy}</span>
                          <div>{ReactHtmlParser(item.describeChanges)}</div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  );
                })}

            {resultObject.resultObj &&
              resultObject.resultObj.rows
                .filter((el) => el.priority === 'High')
                .map((item, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Row>
                        <Grid.Column>
                          <p className="WnnTitle">{item.effectModul}</p>
                          <span>{item.date}</span>
                          <br />
                          <span>{'Deploy by : ' + item.deployBy}</span>
                          <div>{ReactHtmlParser(item.describeChanges)}</div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  );
                })}
          </div>
          <div>
            <Button color="red" circular center onClick={props.onClose}>
              CLOSE
            </Button>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default WhatsNewNotes;
