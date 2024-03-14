import React from 'react';
import { Grid, Header, Placeholder } from 'semantic-ui-react';

import styles from './HeaderTicketPlaceholder.module.scss';

const HeaderTicketPlaceholder = () => {
  return (
    <Grid className="mt-2r">
      <Grid.Row columns="equal" className={styles.containerPlaceHolder}>
        <Grid.Column width={3}>
          <div className={styles.itemPlaceholder}>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </div>
        </Grid.Column>
        <Grid.Column width={3}>
          <div className={styles.itemPlaceholder}>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className={styles.itemPlaceholder}>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className={styles.itemPlaceholder}>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HeaderTicketPlaceholder;
