import React, { useEffect } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  resetSales: boolean;
  onReset: () => void;
}

const DropdownClearInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  disabled,
  labelName,
  meta: { touched, error },
  onChanged,
  values,
  resetSales,
  onReset,
  mandatory = true,
}) => {
  useEffect(() => {
    if (resetSales) {
      input.onChange("");
      if (onReset) {
        onReset();
      }
    }
  }, [resetSales, input, onReset]);

  return (
    <Form.Field
      className="LabelNameLabel"
      error={touched && !!error}
      width={width}
    >
      <div>
        <label htmlFor={input.name} style={{ marginRight: "10px" }}>
          {labelName}
          <label hidden={mandatory} style={{ color: "red" }}>
            {" "}
            *
          </label>
        </label>
      </div>
      <Select
        value={values || input.value || ""}
        placeholder={placeholder}
        clearable
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
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DropdownClearInput;
