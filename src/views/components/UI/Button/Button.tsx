import React from 'react';
import { Button } from 'semantic-ui-react';
const button = (props: any) => {
  return <Button {...props}>{props.children}</Button>;
};

export default button;
