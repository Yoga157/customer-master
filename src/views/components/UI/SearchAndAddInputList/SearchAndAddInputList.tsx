import './SearchAndAddInputList.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon, List, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SearchAndAddInputList: React.FC<IProps> = ({
  input,
  searchField,
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
  }, [listSoftware]);
  const onDelete = (value: any) => {
    const data = listItem.filter((item: any) => {
      return item.value !== value;
    });
    setListItem(data);
    setListSoftware(data);
    input.onChange(data);
  };

  return (
    <>
      <Form.Field className="LabelNameLabel SearchAndAddInputListItem" error={touched && !!error} width={width}>
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
          input={{ icon: 'search', iconPosition: 'left' }}
          loading={loading}
          onResultSelect={(e, data) => {
            const item = {
              value: data.result.price,
              text: data.result.title,
            };

            const copyList = [...listItem];
            const exists = copyList.filter((c) => c.value === item.value).length;
            if (exists === 0) {
              copyList.push(item);
              setListItem(copyList);
              setListSoftware(copyList);
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

        {results.length === 0 && searchField.searchEmp === input.name && (
          <Icon
            name="plus circle"
            className="SearchAndAddInputListBtnAddNew"
            inverted
            circular
            link
            disabled={
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test($.trim(empty)) || listItem.filter((c) => c.value === $.trim(empty)).length !== 0
            }
            onClick={() => {
              if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test($.trim(empty))) {
                const newItem = {
                  value: $.trim(empty),
                  text: $.trim(empty),
                };

                setListItem([...listItem, newItem]);
                setListSoftware([...listSoftware, newItem]);

                setEmpty('');
              }
            }}
          />
        )}
      </Form.Field>

      {touched && error && (
        <Label basic color="red" style={{ zIndex: 1, position: 'relative' }}>
          {error}
        </Label>
      )}

      {$.trim(empty) &&
        results.length === 0 &&
        searchField.searchEmp === input.name &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test($.trim(empty)) && (
          <Label basic color="red" style={{ zIndex: 1, position: 'relative' }}>
            'Invalid email address'
          </Label>
        )}

      {listItem.length > 0 && (
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
    </>
  );
};

export default SearchAndAddInputList;
