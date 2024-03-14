import './CheckboxStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Checkbox, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const CheckBoxInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  toolTipPosition,
  toolTipContents,
  disabled = false,
  label,
  onChange,
  values = false,
  useValues = false,
  meta: { touched, error },
  FilterCBV,
  valueFilterCBV
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <div>
        <Checkbox
          label={label}
          defaultChecked={false}
          onChange={(e, data) => {
            input.onChange(data.checked);
            if (onChange) {
              onChange(data.checked);
            }
          }}
          disabled={disabled}
          checked={useValues ? values : Boolean(FilterCBV === "FilterCBV" ? valueFilterCBV : input.value)}
        />

        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            wide="very"
            position={toolTipPosition}
            content={
              <div className="ContainerMax200">
                <div>{toolTipContents}</div>
              </div>
            }
          />
        )}
      </div>

      {touched && error && (
        <Label pointing="above" basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default CheckBoxInput;
