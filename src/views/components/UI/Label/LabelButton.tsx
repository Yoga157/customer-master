import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon, Button } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelButton: React.FC<IProps> = ({
  input,
  width,
  type,
  toolTipContents,
  labelName,
  placeholder,
  labelColor = 'black',
  content,
  action,
  disabled,
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
      <div>
        <Button
          type="button"
          icon="plus"
          color="yellow"
          disabled={disabled}
          size="small"
          content={content}
          onClick={() => {
            action();
          }}
        />
      </div>
    </Form.Field>
  );
};

export default LabelButton;
