import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps { }

const LabelRenewalStatus: React.FC<IProps> = ({
  input,
  width,
  type,
  toolTipContents,
  labelName,
  placeholder,
  labelColor = 'black',
  meta: { touched, error },
  values,
  backgroundColor
}) => {
  return (
    <Form.Field className="LabelNameLabel RenStatus" error={touched && !!error} type={type} width={width}>
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
      <div className='WrapperText' style={{ backgroundColor: `${backgroundColor}` }}>
        <h3>{values}</h3>
      </div>
    </Form.Field>
  );
};

export default LabelRenewalStatus;
