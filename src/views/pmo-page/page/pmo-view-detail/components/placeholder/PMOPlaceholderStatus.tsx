import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

import styles from './PMOPlaceholderStatus.module.scss';

function PMOPlaceholderStatus(props) {
  const color = ['blue', 'yellow'];
  return (
    <div className={styles.containerPlaceHolder}>
      <Card.Group itemsPerRow={6} textAlign="center">
        {color.map((item: any, index) => {
          return (
            <Card color={item} key={index}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}

export default PMOPlaceholderStatus;
