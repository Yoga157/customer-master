import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const FileUpload: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  disabled,
  labelName,
  meta: { touched, error },
  onChanged,
  values,
  mandatory = true,
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <label htmlFor={input.name} style={{ marginRight: '10px' }}>
        {labelName}
        <label hidden={mandatory} style={{ color: 'red' }} className="mandatory">
          {' '}
          *
        </label>
      </label>
      <input
        id={input.name}
        type="file"
        onChange={(e) => {
          input.onChange(e);
          if (onChanged) {
            onChanged(e);
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

export default FileUpload;
