import React from 'react';
import { Grid, Header, Card, Popup } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import './RowWorkFlowReturnDocument.scss';
import IStore from 'models/IStore';
import { useSelector } from 'react-redux';
import { Button } from 'views/components/UI';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';

function RowWorkFlowReturnDocument(props) {
  const { dataWorflow } = props;

  const noDataMessage = (
    <Grid.Column width="sixteen" textAlign="center">
      No Data
    </Grid.Column>
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      // FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW
    ])
  );

  return (
    <>
      <Header as="h4">
      {/* {props.item === 'commercial' ? `Commercial Approval Steps` : `Service Approval Steps`}
        <Header.Content>Approval Steps </Header.Content> */}
      </Header>

      <Grid style={{ padding: '10px 0' }}>
        {/* <Grid.Row className={`row-workspace ${props.item === 'commercial' && `no-flex-wrap`}`}> */}
        <Grid.Row className={`row-workspace no-flex-wrap`}>
          {dataWorflow &&
            dataWorflow.length > 0 &&
            dataWorflow.map((i, k) => {
              return (
                <Grid.Column key={k} className={`${dataWorflow.length - 1 === k ? `card-workflow-end` : `card-workflow`}`}>
                  <div
                    className={`line line-${dataWorflow.length} ${i.status.trim() === 'APPROVED' || i.status.trim() === 'REJECTED' ? `finish` : ``}`}
                  ></div>
                  <div className="content">
                    <Popup
                      className="popup-dot"
                      on="hover"
                      position="bottom center"
                      trigger={
                        <Button
                          className={
                            i.status.trim() === 'APPROVED' || i.status.trim() === 'REJECTED'
                              ? 'dot-finish'
                              : i.status.trim() === 'Waiting For Approval'
                              ? 'dot-progress'
                              : 'dot-pending'
                          }
                          basic
                          type="button"
                          compact
                          icon={
                            i.status.trim() === 'APPROVED' || i.status.trim() === 'REJECTED'
                              ? 'circle'
                              : i.status.trim() === 'Waiting For Approval'
                              ? 'dot circle'
                              : 'dot circle'
                          }
                          // onClick={(e: Event) => console.log('ok')}
                        />
                      }
                    >
                      <Popup.Content>
                        <Card>
                          <Card.Content extra style={{ textAlign: 'center' }}>
                            <Header as="h4">
                              {i.stepName}
                              <Header.Subheader>{i.employeeName}</Header.Subheader>
                            </Header>
                          </Card.Content>
                          <Card.Content extra className="popup-card-info">
                            <Grid centered>
                              <Grid.Column width={4}>
                                {i.status.trim() === 'APPROVED' && <Icon name="check" className="approved-rounded" />}
                                {i.status.trim() === 'Waiting For Approval' && <Icon name="warning" className="progress-rounded" />}
                                {i.status.trim() === 'REJECTED' && <Icon name="close" className="reject-rounded" />}
                              </Grid.Column>
                              <Grid.Column width={9}>
                                <Header as="h4">
                                  {i.status.trim()}
                                  <Header.Subheader>{i.tanggal}</Header.Subheader>
                                </Header>
                              </Grid.Column>
                            </Grid>
                          </Card.Content>
                          <Card.Content extra>
                            <Header as="h4">
                              Note:
                              <Header.Subheader>{i.notes ? (i.notes === 'undefined' ? ' - ' : ReactHtmlParser(i.notes)) : ' - '}</Header.Subheader>
                            </Header>
                          </Card.Content>
                        </Card>
                      </Popup.Content>
                    </Popup>
                    <h4>{i.employeeName}</h4>
                    <label className="label-date">
                      {i.status.trim() === 'APPROVED' && <Icon name="check" className="approved-rounded" />}
                      {i.status.trim() === 'Waiting For Approval' && <Icon name="warning" className="progress-rounded" />}
                      {i.status.trim() === 'REJECTED' && <Icon name="close" className="reject-rounded" />}
                      {i.status.trim() === 'APPROVED' || i.status.trim() === 'REJECTED' ? i.tanggal : i.status.trim()}
                      {/* {i.status.trim()} */}
                    </label>
                    <br />
                    <label>
                      <i>{ReactHtmlParser(i.notes)}</i>
                    </label>
                  </div>
                </Grid.Column>
              );
            })}

          {isRequesting && <LoadingIndicator className="loading-workflow" isActive={isRequesting} />}
          {!isRequesting && props.item === 'commercial' && (!dataWorflow || dataWorflow?.length === 0) && noDataMessage}
          {!isRequesting && props.item === 'Service' && (!dataWorflow || dataWorflow?.length === 0) && noDataMessage}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default RowWorkFlowReturnDocument;
