import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

import styles from './PMOPlaceholderDetailMilestone.module.scss';

function PMOPlaceholderDetailMilestone(props) {
  const color = ['blue', 'yellow', 'blue', 'yellow'];
  return (
    <div className={styles.containerPlaceHolder}>
      <Card.Group itemsPerRow={1} textAlign="center">
        {color.map((item: any, index) => {
          return (
            <Card color={item} key={index}>
              <Placeholder fluid>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="short" />
                </Placeholder.Header>
              </Placeholder>
            </Card>
          );
        })}
      </Card.Group>
    </div>
  );
}

export default PMOPlaceholderDetailMilestone;
