import './SearchInputList.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon, List, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SearchInputList: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  toolTipContents,
  labelName,
  meta: { touched, error },
  mandatory = true,
  loading = false,
  handleSearchChange,
  results,
  disabled,
  hidden,
  listSoftware,
  disableDelete,
  setListSoftware,
  FilterMainCBV,
  listOnDelete,
  setTriggerReset,
  onKeyPress,
}) => {
  const [listItem, setListItem] = useState([
    {
      value: '',
      text: '',
    },
  ]);
  const [empty, setEmpty] = useState(' ' as any);

  useEffect(() => {
    if (listSoftware !== undefined) {
      setListItem(listSoftware);
    }
    if(FilterMainCBV === 'Reset')
    {
      setListItem([])
      setTriggerReset('')
    }
  }, [listSoftware, FilterMainCBV]);

  const onDelete = (value: any) => {
    const data = listItem.filter((item: any) => {
      return item.value !== value;
    });
    setListItem(data);
    if (setListSoftware) setListSoftware(data);
    input.onChange(data);

    if (listOnDelete) listOnDelete(data);
  };

  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      <div>
        <label htmlFor={input.name} style={{ marginRight: '10px' }}>
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
        onResultSelect={(e, data) => {
          const item = {
            value: data.result.price,
            text: data.result.title,
            email: data?.result?.userName !== undefined ? data?.result?.userName : null  
          };
          
          const copyList = [...listItem];
          const exists = copyList.filter((c) => c.value === item.value).length;
          if (exists === 0) {
            copyList.push(item);
            setListItem(copyList);
            if (setListSoftware) setListSoftware(copyList);

            if (listOnDelete) listOnDelete(copyList);

            if (item.text !== '') {
              input.onChange(copyList);
              setEmpty('');
            }
          }
        }}
        onSearchChange={(val, data) => {
          setEmpty(data.value);
          handleSearchChange(val, data);
        }}
        results={results}
        disabled={disabled}
        hidden={hidden}
        value={empty}
	      onKeyPress={onKeyPress}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
      {listItem?.filter((e) => e.value !== '').length > 0 && (
        <div className="ContainerMax100">
          <List horizontal size="small" className="LabelUserSrc">
            {listItem.map(
              (item: any, key) =>
                item.value !== '' && (
                  <List.Item key={key}>
                    <List.Content>
                      <Button
                        icon="close"
                        labelPosition="right"
                        size="mini"
                        color="grey"
                        compact
                        floated="right"
                        type="button"
                        content={item.text}
                        disabled={disableDelete}
                        onClick={() => onDelete(item.value)}
                      />
                    </List.Content>
                  </List.Item>
                )
            )}
          </List>
        </div>
      )}
    </Form.Field>
  );
};

export default SearchInputList;
