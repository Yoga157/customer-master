/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'views/components/UI';
import { Form, Grid, Card, Divider, Icon } from 'semantic-ui-react';
import './WhatsNewPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as WhatsNewActions from 'stores/whats-new/WhatsNewAction';
import IStore from 'models/IStore';
import moment from 'moment';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import environment from 'environment';

const WhatsNew = (props: any) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState('Latest');
  const [listYear, setListYear] = useState([]);
  const [activeButtonIndex, setButtonIndex] = useState(0);

  useEffect(() => {
    dispatch(WhatsNewActions.requestWhatsNew(year));
    getButtonList();
  }, [year]);

  // const dateParse = (dateString) => {
  //   return moment(dateString)
  //     .format('DD-MM-YYYY HH:mm')
  //     .fromNow();
  // };

  const getButtonList = () => {
    let endpoint = 'GoogleAPI/GetListYear';

    axios.get(environment.api.funnel.replace(':controller', endpoint)).then((res) => {
      setListYear(res.data);
    });
  };

  const resultObject = useSelector((state: IStore) => state.whatsNew.resultActions);
  console.log(resultObject);
  const d = new Date();
  return (
    <Fragment>
      <Card.Header>
        <Icon name="info circle" />
        What's New
      </Card.Header>
      <Divider></Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column className="HorizScroll">
            {listYear &&
              listYear.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setYear(item);
                    setButtonIndex(index);
                  }}
                  color={index === activeButtonIndex ? 'blue' : 'standard'}
                  size="small"
                  content={item}
                />
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid className="mt-0 WhatsNew">
        <Grid.Row className="pt-0">
          <Grid.Column className="mb-1" width={16}>
            <h4 className="mt-0">{year === 'LATEST' ? 'This Month' : year}</h4>
          </Grid.Column>
          <Grid.Column className="LightGreyNotes" width={16}>
            {resultObject.resultObj &&
              resultObject.resultObj.rows
                .filter((el) => el.priority === 'Low')
                .map((item, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Row columns={2}>
                        <Grid.Column className="FullGrid767" width={2}>
                          <Icon className="LowRiskUpdate" name="laptop" />
                        </Grid.Column>
                        <Grid.Column className="FullGrid767" width={14}>
                          <div style={{ marginBottom: 20 }}>
                            <h5 className="mb-0">{item.effectModul}</h5>
                            <span>{item.date}</span>
                            <br />
                            <span>{'Deploy by : ' + item.deployBy}</span>
                            <div>{ReactHtmlParser(item.describeChanges)}</div>
                          </div>
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
                      <Grid.Row columns={2}>
                        <Grid.Column className="FullGrid767" width={2}>
                          <Icon className="MidRiskUpdate" name="file code" />
                        </Grid.Column>
                        <Grid.Column className="FullGrid767" width={14}>
                          <div style={{ marginBottom: 20 }}>
                            <h5 className="mb-0">{item.effectModul}</h5>
                            <span>{item.date}</span>
                            <br />
                            <span>{'Deploy by : ' + item.deployBy}</span>
                            <div>{ReactHtmlParser(item.describeChanges)}</div>
                          </div>
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
                      <Grid.Row columns={2}>
                        <Grid.Column className="FullGrid767" width={2}>
                          <Icon className="HighRiskUpdate" name="server" />
                        </Grid.Column>
                        <Grid.Column className="FullGrid767" width={14}>
                          <div style={{ marginBottom: 20 }}>
                            <h5 className="mb-0">{item.effectModul}</h5>
                            <span>{item.date}</span>
                            <br />
                            <span>{'Deploy by : ' + item.deployBy}</span>
                            <div>{ReactHtmlParser(item.describeChanges)}</div>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  );
                })}
          </Grid.Column>

          {/* <Grid.Column className="mb-1r mt-1r" width={16}>
            <h4 className="mt-0">Last Month</h4>
          </Grid.Column>
          <Grid.Column className="LightGreyNotes" width={16}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767" width={2}>
                  <Icon className="LowRiskUpdate" name="laptop" />
                </Grid.Column>
                <Grid.Column className="FullGrid767" width={14}>
                  <h5 className="mb-0">Add Funnel Bug Fixing</h5>
                  <span>Today, 16/06/2021 - 10:41:20</span>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt
                    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767" width={2}>
                  <Icon className="MidRiskUpdate" name="file code" />
                </Grid.Column>
                <Grid.Column className="FullGrid767" width={14}>
                  <h5 className="mb-0">Add Funnel Bug Fixing</h5>
                  <span>Today, 16/06/2021 - 10:41:20</span>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt
                    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767" width={2}>
                  <Icon className="HighRiskUpdate" name="server" />
                </Grid.Column>
                <Grid.Column className="FullGrid767" width={14}>
                  <h5 className="mb-0">Add Funnel Bug Fixing</h5>
                  <span>Today, 16/06/2021 - 10:41:20</span>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt
                    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default WhatsNew;
