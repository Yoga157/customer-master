import "./SelectInputStyle.scss";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  FormFieldProps,
  Form,
  Label,
  Select,
  DropdownProps,
  Popup,
  Icon,
} from "semantic-ui-react";
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const SelectInputCustomerSetting: React.FC<IProps | any> = ({
  input,
  width,
  options,
  placeholder,
  toolTipContents,
  toolTipPosition,
  disabled,
  labelName,
  meta: { touched, error },
  onChanged,
  values,
  mandatory = true,
  allowAdditions = false,
  defaultValue,
  onAddItems,
  onClick,
  className,
}) => {
  const onAddItem = (e: any, data: DropdownProps) => {
    options.push({ value: 0, text: data.value });
  };

  return (
    <Form.Field
      className={`LabelNameLabel ${className ? className : ""}`}
      error={touched && !!error}
      width={width}
    >
      <div>
        <label htmlFor={input.name} style={{ marginRight: "10px" }}>
          {labelName}
          <label
            hidden={mandatory}
            style={{ color: "red" }}
            className="mandatory"
          >
            {" "}
            *
          </label>
        </label>
        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            position={toolTipPosition}
            content={
              <div className="ContainerMax200">
                <div>{toolTipContents}</div>
              </div>
            }
            wide="very"
          />
        )}
      </div>
      {!allowAdditions && (
        <Select
          value={input.value || values}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          style={{ minWidth: "10em" }}
          search
          selection
          onChange={(e, data) => {
            input.onChange(data.value);
            if (onChanged) {
              onChanged(data.value);
            }
          }}
          defaultValue={defaultValue}
        />
      )}{" "}
      {allowAdditions && (
        <Select
          className="WarningBg"
          value={values || input.value}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          style={{ minWidth: "10em" }}
          search
          selection
          allowAdditions
          onAddItem={(e, data) => {
            //onAddItem(e,data)
            if (onAddItems) {
              onAddItems(e, data);
            }
          }}
          onChange={(e, data) => {
            input.onChange(data.value);
            if (onChanged) {
              onChanged(data.value);
            }
          }}
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

export default SelectInputCustomerSetting;
