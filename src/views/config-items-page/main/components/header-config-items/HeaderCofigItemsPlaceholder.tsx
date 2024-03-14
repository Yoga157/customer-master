import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

import styles from './HeaderCofigItemsPlaceholder.module.scss';

const HeaderCofigItemsPlaceholder = () => {
  const color = ['blue', 'yellow', 'yellow', 'yellow'];
  return (
    <>
      <div className={` mt-1 ${styles.header}`}>
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
        <Card.Group itemsPerRow={4} textAlign="center">
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
};

export default HeaderCofigItemsPlaceholder;
