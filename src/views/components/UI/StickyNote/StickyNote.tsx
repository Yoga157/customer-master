import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import styles from './StickyNote.module.scss';
import './StickyNote.module.scss';
import StickyNoteList from '../List/StickyNoteList';

const StickyNote = (props: any) => {
  return (
    <Card className={styles.Sticky}>
      <Card.Content header style={{ padding: '0.4em 1em 1em 1em' }}>
        <span className={styles.HeaderText}>{props.header}</span>
        <a href="" className={styles.btnX}>
          <i className="close icon"></i>
        </a>
      </Card.Content>
      <Card.Content description className={styles.MaxHeight}>
        <StickyNoteList NoteText="This text just for test a Sticky Note List Component" NoteDateTime="09/10/2020 - 16:15" NoteToDoBtn="Create Now" />

        <StickyNoteList NoteText="Lorep ipsum dolor sit amet" NoteDateTime="20/09/2020 - 17:55" NoteToDoBtn="Create MOM Now" />
      </Card.Content>
    </Card>
  );
};

export default StickyNote;
