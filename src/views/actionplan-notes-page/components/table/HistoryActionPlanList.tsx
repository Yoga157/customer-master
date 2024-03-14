import React, { useState } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import HistoryActionPlanItems from './table-row/HistoryActionPlanItems';
import IActionPlanNotesItem from 'selectors/actionplan-notes/models/IActionPlanNotesItem';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import * as ActionPlanNotesActions from 'stores/actionplan-notes/ActionPlanNotesActions';
import { selectActionPlanHistory } from 'selectors/actionplan-notes/ActivityPlanNotesSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const HistoryActionPlanList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const tableData = useSelector((state: IStore) => selectActionPlanHistory(state, [ActionPlanNotesActions.REQUEST_HISTORY]));

  return (
    <Grid>
      <Grid.Row className="ContainerMax500 mt-0 p-0">
        <Grid.Column>
          <Item.Group>
            {tableData.map((model: IActionPlanNotesItem) => (
              <HistoryActionPlanItems key={model.logDate?.toString()} rowData={model} />
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HistoryActionPlanList;
