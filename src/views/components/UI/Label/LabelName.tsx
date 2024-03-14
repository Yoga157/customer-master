import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelName: React.FC<IProps> = ({
  input,
  width,
  type,
  toolTipContents,
  labelName,
  placeholder,
  labelColor = 'black',
  meta: { touched, error },
  values,
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} type={type} width={width}>
      <div>
        <label>{labelName}</label>
        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            content={<div className="ContainerMax200 ">{toolTipContents}</div>}
            position="bottom center"
            wide="very"
          />
        )}
      </div>
      <h3>{input.value.length === 0 ? values : input.value}</h3>
    </Form.Field>
  );
};

export default LabelName;
