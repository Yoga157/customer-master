import './LabelStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const LabelNameMultiValue: React.FC<IProps> = ({
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

      {/* string split by comma */}
      {values ? (
        <>
          {values?.split(',').map((val, k) => (
            <Label key={k} className={`mb-1`}>
              {val}
            </Label>
          ))}
        </>
      ) : (
        <>
          {input?.value?.split(',').map((val, k) => (
            <Label key={k} className={`mb-1`}>
              {val}
            </Label>
          ))}
        </>
      )}
    </Form.Field>
  );
};

export default LabelNameMultiValue;
