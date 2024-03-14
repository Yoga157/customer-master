import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Image } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelImage: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  labelColor = 'black',
  img = '/assets/no-avatar.png',
  meta: { touched, error },
  values,
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <label style={{ color: labelColor }}>{placeholder}</label>
      <Label as="a">
        <Image avatar spaced="right" src={img} /> {input.value.length === 0 ? values : input.value}
      </Label>
    </Form.Field>
  );
};

export default LabelImage;
