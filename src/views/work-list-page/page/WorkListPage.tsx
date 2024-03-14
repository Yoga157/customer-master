import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { selectUserResult } from 'selectors/user/UserSelector';
import NotFoundPage from 'views/not-found-page/NotFoundPage';
import IUserResult from 'selectors/user/models/IUserResult';
import WorkListMain from '../main/WorkListMain';
import IStore from 'models/IStore';

function WorkListPage(props) {
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  if (
    currentUser.role === 'PMO' ||
    currentUser.role === 'PMOS' ||
    currentUser.role === 'SMO' ||
    currentUser.role === 'Presales' ||
    currentUser.role === 'Engineer'
  ) {
    return (
      <>
        <Grid columns="equal">
          <Grid.Column>
            <WorkListMain />
          </Grid.Column>
        </Grid>
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}

export default WorkListPage;
