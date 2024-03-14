import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Dropdown, DropdownProps } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SearchInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  labelName,
  meta: { touched, error },
  mandatory = true,
  loading = false,
  onResultSelect,
  handleSearchChange,
  results,
  values,
  disabled,
  options,
}) => {
  const onAddItems = (e: any, data: DropdownProps) => {
    options.push({ value: data.value, text: data.value });
  };

  return (
    <Form.Field error={touched && !!error} width={width}>
      <label htmlFor={input.name} style={{ marginRight: '10px' }}>
        {labelName}
        <label hidden={mandatory} style={{ color: 'red' }}>
          {' '}
          *
        </label>
      </label>
      <Search
        loading={loading}
        onResultSelect={(e, data) => {
          input.onChange(data.result.title);
          if (onResultSelect) {
            onResultSelect(data);
          }
        }}
        onSearchChange={handleSearchChange}
        results={results}
        disabled={disabled}
      />
      <Dropdown
        fluid
        multiple
        search
        selection
        value={input.value.length > 0 ? input.value : values}
        onChange={(e, data) => {
          input.onChange(data.value);
        }}
        allowAdditions
        onAddItem={onAddItems}
        options={options}
        disabled={disabled}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SearchInput;
