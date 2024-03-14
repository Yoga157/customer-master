import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon } from 'semantic-ui-react';
import './SearchInputStyle.scss';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SearchInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  toolTipContents,
  labelName,
  meta: { touched, error },
  mandatory = true,
  loading = false,
  readOnly= false,
  onResultSelect,
  handleSearchChange,
  results,
  values,
  useValues,
  disabled,
  resultRenderer,
  resultsContent,
  fluid = false,
  className = '',
  minCharacters = 0,
  onKeyPress,
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      <div>
        {labelName?.length > 0 && 
          <label htmlFor={input.name} style={{ marginRight: '10px' }}>
            {labelName}
            <label hidden={mandatory} style={{ color: 'red' }} className="mandatory">
              {' '}
              *
            </label>
          </label>
        }
        {toolTipContents && (
          <Popup
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

      <Search
        loading={loading}
        placeholder={placeholder}
        onResultSelect={(e, data) => {
          input.onChange(data.result.title);
          if (onResultSelect) {
            onResultSelect(data);
          }
        }}
        onSearchChange={(e, data) => {
          input.onChange(data.value);
          if (handleSearchChange) {
            handleSearchChange(data.value);
          }
        }}
        onKeyPress={onKeyPress}
        results={results}
        disabled={disabled}
        readOnly={readOnly}
        resultRenderer={resultRenderer}
        //value={input.value.length > 0 ? input.value : values}
        // value={values ? values : input.value}
        value={useValues || values ? values : input.value}
        fluid={fluid}
        className={className}
        minCharacters={minCharacters}
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
