import React from 'react';
import { Grid } from 'semantic-ui-react';
import StatusCard from './StatusCard';

import './StatusCardListPMO.scss';

interface IProps {
  data: any;
}

const StatusCardListPMO: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { data } = props;

  return (
    <Grid className="gridStatusPMO">
      <Grid.Row centered equal="true">
        {data.map((i, k) => {
          return <StatusCard item={i} index={k} key={k} />;
        })}
      </Grid.Row>
    </Grid>
  );
};

export default StatusCardListPMO;
