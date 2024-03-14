import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './StickyNoteList.module.scss';

const StickyNoteList = (props: any) => {
  return (
    <div className={' ui grid ' + '' + styles.divider}>
      <div className="ten wide column">
        <h5 style={{ marginBottom: '2px' }}>{props.NoteText}</h5>
        <p style={{ color: 'grey' }}>
          <small>{props.NoteDateTime}</small>
        </p>
      </div>
      <div className="six wide column">
        <Button className={styles.SoftRedBtn + '' + ' mini ui fluid circular button '}>{props.NoteToDoBtn}</Button>
        <Button className={styles.WhiteBtn + '' + ' mini ui fluid circular button '}>Next Time</Button>
      </div>
    </div>
  );
};

export default StickyNoteList;
