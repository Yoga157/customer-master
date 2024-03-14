import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelSubLabel: React.FC<IProps> = ({
  input,
  width,
  type,
  labelName,
  labelColor = 'black',
  meta: { touched, error },
  values,
  valueDetails,
  sublabel,
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} type={type} width={width}>
      <label style={{ color: labelColor }}>{labelName}</label>
      <h4>
        {values}
        <small>{valueDetails}</small>
      </h4>
      <p>{sublabel}</p>
    </Form.Field>
  );
};

export default LabelSubLabel;
