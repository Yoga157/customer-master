import './SelectInputStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SelectFunnelStatus: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  disabled,
  labelName,
  toolTipContents,
  toolTipPosition,
  meta: { touched, error },
  onChanged,
  values,
  mandatory = true,
  bg,
}) => {
  return (
    <Form.Field className={`FunnelStatusLabel ${bg}`} error={touched && !!error} width={width}>
      <div>
        <label htmlFor={input.name}>
          {labelName}
          <label hidden={mandatory} style={{ color: 'red' }}>
            {' '}
            *
          </label>
        </label>

        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            content={<div className="ContainerMax200 ">{toolTipContents}</div>}
            position={toolTipPosition}
            wide="very"
          />
        )}
      </div>

      <Select
        value={values || input.value}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        style={{ minWidth: '10em' }}
        search
        selection
        onChange={(e, data) => {
          input.onChange(data.value);
          if (onChanged) {
            onChanged(data.value);
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

export default SelectFunnelStatus;
