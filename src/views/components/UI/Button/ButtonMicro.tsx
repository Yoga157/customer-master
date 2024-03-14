import './ButtonMicroStyle.scss';
import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

const ButtonMicro = (props: any) => {
  return (
    <Button className="ButtonMc" {...props}>
      {props.children}
    </Button>
  );
};

export default ButtonMicro;
