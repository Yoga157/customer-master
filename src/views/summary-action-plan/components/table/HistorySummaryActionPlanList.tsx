import React, { useState } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import HistorySummaryActionPlanItems from './table-row/HistorySummaryActionPlanItems';
import ISummaryActionPlanItem from 'selectors/summary-actionplan/models/ISummaryActionPlanItem';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import * as SummaryActionPlanActions from 'stores/summary-actionplan/SummaryActionPlanActions';
import { selectSummaryActionPlanHistory } from 'selectors/summary-actionplan/SummaryActionPlanSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const HistorySummaryActionPlanList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const tableData = useSelector((state: IStore) => selectSummaryActionPlanHistory(state, [SummaryActionPlanActions.REQUEST_HISTORY]));

  return (
    <Grid>
      <Grid.Row className="ContainerMax500 mt-0 p-0">
        <Grid.Column>
          <Item.Group>
            {tableData.map((model: ISummaryActionPlanItem) => (
              <HistorySummaryActionPlanItems key={model.logDate?.toString()} rowData={model} />
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HistorySummaryActionPlanList;
