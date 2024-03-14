import React from 'react';
import { Grid } from 'semantic-ui-react';
import StatusCard from './StatusCard';

import styles from './StatusCardList.module.scss';

interface IProps {
  data: any;
}

const StatusCardList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { data } = props;

  return (
    <Grid className={styles.gridStatus}>
      <Grid.Row centered equal="true" verticalAlign="middle" textAlign="center">
        {data.map((i, k) => {
          return <StatusCard item={i} index={k} key={k} />;
        })}
      </Grid.Row>
    </Grid>
  );
};

export default StatusCardList;
