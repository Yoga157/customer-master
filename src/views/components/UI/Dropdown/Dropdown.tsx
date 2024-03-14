import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { DropdownListProps } from 'react-widgets/lib/DropdownList';
import { FormFieldProps, Form, Label, Dropdown, DropdownProps, Popup, Icon } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const DropdownInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  toolTipPosition,
  toolTipContents,
  labelName,
  meta: { touched, error },
  onChanged,
  disabled,
  values = [],
  allowAdditions = false,
  ref,
}) => {
  const onAddItems = (e: any, data: DropdownProps) => {
    console.log('dari dropdown' + data.value);
    options.push({ value: data.value, text: data.value });
  };
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      <div>
        <label>{labelName}</label>
        {toolTipContents && (
          <Popup
            position={toolTipPosition}
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            content={
              <div className="ContainerMax200">
                <div>{toolTipContents}</div>
              </div>
            }
          />
        )}
      </div>

      {!allowAdditions && (
        <Dropdown
          ref={ref}
          placeholder={placeholder}
          fluid
          multiple
          search
          selection
          onChange={(e, data) => {
            input.onChange(data.value);
            if (onChanged) {
              onChanged(data.value);
            }
          }}
          options={options}
          disabled={disabled}
          value={(input.value.length > 0 ? input.value : undefined) || values}
          clearable
        />
      )}
      {allowAdditions && (
        <Dropdown
          placeholder={placeholder}
          fluid
          multiple
          search
          selection
          value={input.value.length > 0 ? input.value : values}
          onChange={(e, data) => {
            input.onChange(data.value);
            if (onChanged) {
              onChanged(data.value);
            }
          }}
          allowAdditions
          onAddItem={onAddItems}
          options={options}
          disabled={disabled}
        />
      )}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DropdownInput;
