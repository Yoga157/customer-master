import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import { IHistoryTable } from 'selectors/customer-transfer/models/ICustomerTransferTable';
import { IHistoryTableRow } from 'selectors/customer-transfer/models/ICustomerTransferTableRow';
import classes from '../../CustomerTransferPage.module.scss';
import './HistoryCardStyle.scss';

interface IProps {
  readonly tableData: IHistoryTable;
}

const HistoryCard: React.FC<IProps> = ({ tableData }) => {
  return (
    <div>
      {tableData.rows.map((model: IHistoryTableRow) => (
        <Card key={model.id} raised className={classes.CardHistory + '' + ' LightGreyNotif  p-hRem '}>
          <Card.Content className="HistoryCard">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={1}>
                  <Icon name="random" />
                </Grid.Column>
                <Grid.Column width={15}>
                  <Grid>
                    <Grid.Row columns={3} equal className="HeaderHistory">
                      <Grid.Column className="FullGrid767">{model.customerName}</Grid.Column>
                      <Grid.Column className="FullGrid767">Funnel ID : {model.funnelID}</Grid.Column>
                      <Grid.Column className="FullGrid767">
                        {new Intl.DateTimeFormat('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit',
                        }).format(new Date(model.createDate))}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="pt-0">
                      <Grid.Column className="NoteHistory">
                        <label>
                          From <b>{model.fromSales}</b> to <b>{model.toSales}</b>
                        </label>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default HistoryCard;
