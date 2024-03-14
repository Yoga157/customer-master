import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

import styles from './PMOPlaceholder.module.scss';

function PMOPlaceholder(props) {
  const color = ['grey', 'violet', 'yellow', 'green', 'brown', 'blue', 'red', 'purple'];
  return (
    <div className={styles.containerPlaceHolder}>
      <Card.Group itemsPerRow={8}>
        {color.map((item: any, index) => {
          return (
            <Card color={item} key={index}>
              <Placeholder>
                <Placeholder.Header image>
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

export default PMOPlaceholder;
