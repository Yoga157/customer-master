import './CheckboxStyle.scss';
import React from 'react';
import { Checkbox } from 'semantic-ui-react';
const checkBox = (props: any) => {
  return <Checkbox {...props}>{props.children}</Checkbox>;
};

export default checkBox;
