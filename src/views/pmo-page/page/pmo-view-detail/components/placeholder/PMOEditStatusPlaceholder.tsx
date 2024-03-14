import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

import styles from './PMOEditStatusPlaceholder.module.scss';

function PMOPlaceholderDetailMilestone(props) {
  const color = ['blue', 'yellow', 'blue', 'yellow', 'yellow'];
  return (
    <>
      <div className={styles.header}>
        <Card.Group itemsPerRow={4} textAlign="center">
          <Card>
            <Placeholder fluid>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line length="full" />
              </Placeholder.Header>
            </Placeholder>
          </Card>
        </Card.Group>
      </div>
      <div className={styles.containerPlaceHolder}>
        <Card.Group itemsPerRow={5} textAlign="center">
          {color.map((item: any, index) => {
            return (
              <Card key={index}>
                <Placeholder fluid>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line length="full" />
                  </Placeholder.Header>
                </Placeholder>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    </>
  );
}

export default PMOPlaceholderDetailMilestone;
