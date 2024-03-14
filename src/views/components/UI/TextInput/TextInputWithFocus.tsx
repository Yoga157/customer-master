import './TextInputStyle.scss';
import React, { Fragment } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon, Button } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  disabled = false,
  readOnly = false,
  editMode = true,
  labelName,
  labelPosition,
  labeled,
  labelColor = 'black',
  values,
  toolTipPosition,
  toolTipContents,
  mandatory = true,
  meta: { touched, error },
  icon,
  iconPosition,
  inlineLabel = false,
  pointing = 'above',
  onFocus,
  onBlur,
  loading = false,
  onResultSelect,
  handleSearchChange,
  results,
  resultRenderer,
}) => {
  const inputElement = (
    <Fragment>
      <div>
        <label>
          {labelName}{' '}
          <label hidden={mandatory} style={{ color: 'red' }}>
            {' '}
            *
          </label>
        </label>
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Search
          style={{ width: '80%' }}
          loading={loading}
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
          results={results}
          disabled={disabled}
          readOnly={readOnly}
          //value={input.value.length > 0 ? input.value : values}
          value={values ? values : input.value}
          resultRenderer={resultRenderer}
        />
        {/* <Input  
        className='BlueLabel'
        {...input} 
        placeholder={placeholder} 
        disabled={disabled} 
        label={labeled} 
        labelPosition={labelPosition} 
        style={{width: '80%'}}
        onChange={(e,data) => {
            input.onChange(data.value)
            if(onChange)
            {
                onChange(data.value)
            }             
        }}
        readOnly ={readOnly}
        icon={icon}
        iconPosition={iconPosition}
        value={values || input.value }
        // onFocus={() => onFocus()}
        /> */}
        {editMode === true && (
          <Button type="button" hidden animated="fade" color="violet" onClick={() => onFocus()}>
            <Button.Content hidden>Search</Button.Content>
            <Button.Content visible>
              <Icon name="search" />
            </Button.Content>
          </Button>
        )}
      </div>
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

export default TextInput;
