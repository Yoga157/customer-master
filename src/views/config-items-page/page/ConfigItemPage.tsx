import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';

import ConfigItemSearch from '../components/search/ConfigItemSearch';
import ConfigItems from '../main/ConfigItems';

interface IProps {}

const ConfigItemPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const state = location?.state;

  return (
    <>
      {!state && (
        <Grid className="">
          <Grid.Column textAlign="center">
            <ConfigItemSearch />
          </Grid.Column>
        </Grid>
      )}

      <Grid columns="equal">
        <Grid.Column>
          <ConfigItems />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ConfigItemPage;
