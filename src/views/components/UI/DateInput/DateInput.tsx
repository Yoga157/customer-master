import './DateInputStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';
import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps | any> = ({
  id: string = '',
  input,
  readOnlyProps = false,
  width,
  toolTipPosition,
  toolTipContents,
  labelName,
  placeholder = 'e.g.09/09/2020',
  date = false,
  dropUp = false,
  time = false,
  meta: { touched, error },
  mandatory = true,
  values,
  onChange,
  minDate,
  maxDate,
  defaultValue,
  isRow = false,
  formated = 'MM/dd/yyyy',
  ...rest
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      {!isRow && (
        <div>
          <label>
            {labelName}
            <label hidden={mandatory} style={{ color: 'red' }} className="mandatory">
              {' '}
              *
            </label>
          </label>
          {toolTipContents && (
            <Popup
              trigger={<Icon name="info" color="grey" size="small" circular />}
              hoverable
              position={toolTipPosition}
              wide="very"
              content={
                <div className="ContainerMax200">
                  <div>{toolTipContents}</div>
                </div>
              }
            />
          )}
        </div>
      )}

      <DateTimePicker
        dropUp={dropUp}
        min={minDate}
        max={maxDate}
        placeholder={placeholder}
        readOnly={readOnlyProps}
        value={(values === undefined ? input.value : values) || undefined}
        //onChange={input.onChange}
        onChange={(e) => {
          input.onChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        defaultValue={defaultValue}
        format={formated}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
