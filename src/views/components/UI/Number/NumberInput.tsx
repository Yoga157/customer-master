import React, { Fragment } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
import { default as NumberFormat } from 'react-number-format';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const NumberInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  disabled = false,
  thousandSeparator = false,
  prefix = '',
  toolTipContents,
  labelName,
  labelColor = 'black',
  meta: { touched, error },
  TextAlign = 'right',
  mandatory = true,
  readonly = false,
  values,
  onChange,
  pointing = 'above',
  inlineLabel = false,
  defaultValue,
  allowNegative = true,
  isAllowed,
  min,
  id = '',
  className = ''
}) => {
  const inputElement = (
    <Fragment>
      <div className={className}>
        <label>
          {labelName}{' '}
          <label hidden={mandatory} style={{ color: 'red' }} className="mandatory">
            {' '}
            *
          </label>
        </label>
        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" size="small" circular />}
            hoverable
            content={
              <div className="ContainerMax200">
                <div>{toolTipContents}</div>
              </div>
            }
          />
        )}
      </div>

      <NumberFormat
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        onValueChange={(val) => {
          const { formattedValue, floatValue } = val;
          input.onChange(floatValue);
          if (onChange) {
            onChange(floatValue);
          }
        }}
        disabled={disabled}
        style={{ textAlign: TextAlign, minWidth: '5em' }}
        value={values || input.value}
        defaultValue={defaultValue}
        readOnly={readonly}
        placeholder={placeholder}
        allowNegative={allowNegative}
        isAllowed={isAllowed}
        min={min}
        id={`${id}`}
      />
      {touched && error && (
        <Label pointing={pointing} basic color="red">
          {error}
        </Label>
      )}
    </Fragment>
  );

  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} type={type} width={width}>
      {inlineLabel && <Form.Group inline>{inputElement}</Form.Group>}
      {!inlineLabel && inputElement}
    </Form.Field>
  );
};

export default NumberInput;
