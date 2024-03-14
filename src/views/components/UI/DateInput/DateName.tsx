import './DateInputStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';
import dateFnsLocalizer from 'react-widgets-date-fns';
import moment from 'moment';

dateFnsLocalizer();

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateName: React.FC<IProps> = ({
  id: string = '',
  input,
  width,
  labelName,
  toolTipPosition,
  toolTipContents,
  placeholder,
  date = false,
  time = false,
  minDate,
  meta: { touched, error },
  mandatory = true,
  values,
  onChange,
  formated = 'dd/MM/yyyy',
  ...rest
}) => {
  return (
    <Form.Field className="DateNameLabel" error={touched && !!error} width={width}>
      <div>
        <label>
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

      <DateTimePicker
        placeholder={placeholder}
        value={(values === undefined ? input.value : values) || undefined}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        min={minDate ? minDate : null}
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

export default DateName;
