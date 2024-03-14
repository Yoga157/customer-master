import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelNameIC: React.FC<IProps> = ({
  input,
  width,
  type,
  toolTipContents,
  labelName,
  placeholder,
  labelColor = 'black',
  meta: { touched, error },
  values,
  icon = <Icon name="check" size="mini" circular />,
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
      <div className="value-ic">
        {input.value.length === 0 ? '' : icon}
        <h3>{input.value.length === 0 ? values : input.value}</h3>
      </div>
    </Form.Field>
  );
};

export default LabelNameIC;
