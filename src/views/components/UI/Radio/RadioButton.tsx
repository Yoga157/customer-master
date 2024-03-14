import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Radio } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const RadioButton: React.FC<IProps> = ({
  name,
  input,
  width,
  disabled = false,
  label,
  onChange,
  checked,
  value,
  className = '',
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width} className={className}>
      <Radio
        name={name}
        label={label}
        onChange={(e, data) => {
          input.onChange(data.value);
          if (onChange) {
            onChange(data);
          }
        }}
        disabled={disabled}
        checked={checked}
        value={value}
      />
      {touched && error && (
        <Label pointing="above" basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default RadioButton;
