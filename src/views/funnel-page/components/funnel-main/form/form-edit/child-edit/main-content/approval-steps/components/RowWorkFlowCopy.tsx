import React from 'react';
import { useSelector } from 'react-redux';
import { Button as ButtonDefault, Grid, Header, Card, Popup, Rating, Progress } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import IStore from 'models/IStore';
import { Button, Tooltips } from 'views/components/UI';
import './../ApprovalSteps.scss';

function RowWorkFlow(props) {
  const commercialWorkflow = useSelector((state: IStore) => state.funnelSalesAnalyst.listWorkFlow?.resultObj);
  console.log('commercialWorkflow', commercialWorkflow);

  interface IdammyDatat {
    status: string;
    title: string;
    date: string;
    desc: string;
  }
  let dummyData: Array<IdammyDatat>;

  if (props.item === 'commercial') {
    dummyData = [
      {
        status: 'reject',
        title: 'Direct Manager',
        date: '07 March 2021',
        desc:
          'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown',
      },
      // { status: 'progress', title: 'General Manager', date: '', desc: '' },
      // { status: 'pending', title: 'Sales Director', date: '', desc: '' },
      { status: 'pending', title: 'President Director', date: '', desc: '' },
      { status: 'pending', title: 'Sales Admin', date: '', desc: '' },
    ];
  } else {
    dummyData = [
      {
        status: 'progress',
        title: 'Presales',
        date: 'waiting approval',
        desc:
          'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown',
      },
      { status: 'pending', title: 'Service Owner', date: '', desc: '' },
    ];
  }

  return (
    <>
      <Header as="h4">
        <Header.Content>{props.item === 'commercial' ? `Commercial Approval Steps` : `Service Approval Steps`} </Header.Content>
      </Header>
      <Grid style={{ padding: '10px 0' }}>
        <Grid.Row className={`row-workspace ${props.item === 'commercial' && `no-flex-wrap`}`}>
          {dummyData.map((i, k) => {
            return (
              <Grid.Column key={k} className={`${dummyData.length - 1 === k ? `card-workflow-end` : `card-workflow`}`}>
                <div className={`line line-${dummyData.length} ${i.status === 'approved' || i.status === 'reject' ? `finish` : ``}`}></div>
                <div className="content">
                  <Popup
                    className="popup-dot"
                    on="hover"
                    position="bottom center"
                    trigger={
                      <Button
                        className={
                          i.status === 'approved' || i.status === 'reject' ? 'dot-finish' : i.status === 'progress' ? 'dot-progress' : 'dot-pending'
                        }
                        basic
                        type="button"
                        compact
                        icon={i.status === 'finish' ? 'circle' : i.status === 'progress' ? 'dot circle' : 'dot circle'}
                        onClick={(e: Event) => console.log('ok')}
                      />
                    }
                  >
                    <Popup.Content>
                      <Card>
                        <Card.Content extra style={{ textAlign: 'center' }}>
                          <Header as="h4">
                            Direct Manager
                            <Header.Subheader>Michael Saleem</Header.Subheader>
                          </Header>
                        </Card.Content>
                        <Card.Content extra className="popup-card-info">
                          <Grid centered>
                            <Grid.Column width={4}>
                              {i.status === 'approved' && <Icon name="check" className="approved-rounded" />}
                              {i.status === 'progress' && <Icon name="warning" className="progress-rounded" />}
                              {i.status === 'reject' && <Icon name="close" className="reject-rounded" />}
                            </Grid.Column>
                            <Grid.Column width={9}>
                              <Header as="h4">
                                Rejected
                                <Header.Subheader>{i.date}</Header.Subheader>
                              </Header>
                            </Grid.Column>
                          </Grid>
                        </Card.Content>
                        <Card.Content extra>
                          <Header as="h4">
                            Note:
                            <Header.Subheader>{i.desc}</Header.Subheader>
                          </Header>
                        </Card.Content>
                      </Card>
                    </Popup.Content>
                  </Popup>
                  <h4>{i.title}</h4>
                  <label className="label-date">
                    {i.status === 'approved' && <Icon name="check" className="approved-rounded" />}
                    {i.status === 'progress' && <Icon name="warning" className="progress-rounded" />}
                    {i.status === 'reject' && <Icon name="close" className="reject-rounded" />}
                    {i.date}
                  </label>
                  <br />
                  <label>{i.desc}</label>
                </div>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default RowWorkFlow;
