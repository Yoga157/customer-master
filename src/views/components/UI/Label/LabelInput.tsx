import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  labelColor = 'black',
  color = 'grey',
  size = 'medium',
  meta: { touched, error },
  pointing = 'above',
  values,
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <label>{placeholder}</label>
      <Label pointing={pointing} color={color} content={values} size={size} />
    </Form.Field>
  );
};

export default LabelInput;
