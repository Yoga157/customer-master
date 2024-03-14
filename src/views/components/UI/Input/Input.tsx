import React from 'react';
import classes from './Input.module.scss';
import { Input, Select, TextArea } from 'semantic-ui-react';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

const input = (props: any) => {
  let inputElement: any = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <Input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;

    case 'textarea':
      inputElement = <TextArea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'select':
      inputElement = (
        <Select className={classes.InputElement} value={props.value} onChange={props.changed} options={props.elementConfig.options}></Select>
      );
      break;
    default:
      inputElement = <Input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
