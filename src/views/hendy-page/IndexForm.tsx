import React, { useEffect, Fragment, useState, useCallback } from 'react';

import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';

interface IProps {}

const IndexForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const initialText = 'The quick brown fox jumps over the lazy dog';
  const [text, setText] = useState(initialText);
  const textToHtml = (text) => {
    const elem = document.createElement('div');
    return text
      .split(/\n\n+/)
      .map((paragraph) => {
        return (
          '<b>' +
          paragraph
            .split(/\n+/)
            .map((line) => {
              elem.textContent = line;
              return elem.innerHTML;
            })
            .join('<br/>') +
          '</p>'
        );
      })
      .join('');
  };
  return (
    <Fragment>
      <Card.Header>PROJECT SCOPE STATEMENT</Card.Header>
      <Divider></Divider>
    </Fragment>
  );
};

export default IndexForm;
