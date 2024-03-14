import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, TextArea } from 'semantic-ui-react';

import './TextAreaInputStyle.scss';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error },
  mandatory = true,
  labelName,
  values,
  onChange,
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      <label>
        {labelName}{' '}
        <label hidden={mandatory} className="mandatory">
          {' '}
          *
        </label>
      </label>
      <TextArea
        rows={rows}
        {...input}
        placeholder={placeholder}
        value={values || input.value}
        onChange={(e, data) => {
          input.onChange(data.value);
          if (onChange) {
            onChange(data.value);
          }
        }}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
