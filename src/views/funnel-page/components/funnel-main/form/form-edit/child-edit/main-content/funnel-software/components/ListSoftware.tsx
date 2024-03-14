import './SearchInputList.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon, List, Button, Grid } from 'semantic-ui-react';
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
  resultsDB,
  resultsOS,
  resultsInfra,
  resultsProg,
  resultsBuss,
  disabled,
  hidden,
  listSoftware,
  disableDelete,
  listDB,
  listOS,
  listProg,
  listInfra,
  listBuss,
  handleSearchDatabaseSoftware,
  handleSearchInfrastructureSoftware,
  handleSearchBusinessSoftware,
  handleSearchOperatingSystem,
  handleSearchProgrammingSoftware,
  resultDB,
  resultOS,
  resultInfra,
  resultProg,
  resultBuss,
}) => {
  const [listItem, setListItem] = useState([
    {
      value: '',
      text: '',
    },
  ]);

  const [listItemDB, setListItemDB] = useState([
    {
      value: '',
      text: '',
    },
  ]);
  const [listItemProg, setListItemProg] = useState([
    {
      value: '',
      text: '',
    },
  ]);
  const [listItemInfra, setListItemInfra] = useState([
    {
      value: '',
      text: '',
    },
  ]);
  const [listItemOS, setListItemOS] = useState([
    {
      value: '',
      text: '',
    },
  ]);

  const [listItemBuss, setListItemBuss] = useState([
    {
      value: '',
      text: '',
    },
  ]);
  const [empty, setEmpty] = useState(' ' as any);

  const [emptyBuss, setEmptyBuss] = useState(' ' as any);
  const [emptyDB, setEmptyDB] = useState(' ' as any);
  const [emptyProg, setEmptyProg] = useState(' ' as any);
  const [emptyInfra, setEmptyInfra] = useState(' ' as any);
  const [emptyOS, setEmptyOS] = useState(' ' as any);

  useEffect(() => {
    if (listSoftware !== undefined) {
      setListItem(listSoftware);
    }

    if (listOS !== undefined) {
      setListItemOS(listOS);
    }

    if (listDB !== undefined) {
      setListItemDB(listDB);
    }

    if (listProg !== undefined) {
      setListItemProg(listProg);
    }

    if (listInfra !== undefined) {
      setListItemInfra(listInfra);
    }

    if (listBuss !== undefined) {
      setListItemBuss(listBuss);
    }
  }, [listSoftware, listBuss, listInfra, listOS, listDB, listProg]);

  const onDeleteBuss = (value: any) => {
    const data = listItemBuss.filter((item: any) => {
      return item.value !== value;
    });
    setListItemBuss(data);
    input.onChange(data);
    localStorage.setItem('businessSoftware', JSON.stringify(data));
  };

  const onDeleteDB = (value: any) => {
    const data = listItemDB.filter((item: any) => {
      return item.value !== value;
    });
    setListItemDB(data);
    input.onChange(data);
    localStorage.setItem('database', JSON.stringify(data));
  };

  const onDeleteInfra = (value: any) => {
    const data = listItemInfra.filter((item: any) => {
      return item.value !== value;
    });
    setListItemInfra(data);
    input.onChange(data);
    localStorage.setItem('infrastructureSoftware', JSON.stringify(data));
  };

  const onDeleteProg = (value: any) => {
    const data = listItemProg.filter((item: any) => {
      return item.value !== value;
    });
    setListItemProg(data);
    input.onChange(data);
    localStorage.setItem('programmingSoftware', JSON.stringify(data));
  };

  const onDeleteOS = (value: any) => {
    const data = listItemOS.filter((item: any) => {
      return item.value !== value;
    });
    setListItemOS(data);
    input.onChange(data);
    localStorage.setItem('operatingSystem', JSON.stringify(data));
  };

  return (
    <>
      {disabled ? null : (
        <>
          <Grid.Row>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    Business Software
                    <label hidden={mandatory} style={{ color: 'red' }}>
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
                    };

                    const copyList = [...listItemBuss];
                    const exists = copyList.filter((c) => c.value === item.value).length;
                    if (exists === 0) {
                      copyList.push(item);
                      setListItemBuss(copyList);
                      if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyBuss('');
                        localStorage.setItem('businessSoftware', JSON.stringify(copyList));
                      }
                    }
                  }}
                  onSearchChange={(val, data) => {
                    setEmptyBuss(data.value);
                    handleSearchBusinessSoftware(val, data);
                  }}
                  results={resultBuss}
                  disabled={disabled}
                  value={emptyBuss}
                  hidden={hidden}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    Infrastructure Software
                    <label hidden={mandatory} style={{ color: 'red' }}>
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
                    };

                    const copyList = [...listItemInfra];
                    const exists = copyList.filter((c) => c.value === item.value).length;
                    if (exists === 0) {
                      copyList.push(item);
                      setListItemInfra(copyList);
                      if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyInfra('');
                        localStorage.setItem('infrastructureSoftware', JSON.stringify(copyList));
                      }
                    }
                  }}
                  onSearchChange={(val, data) => {
                    setEmptyInfra(data.value);
                    handleSearchInfrastructureSoftware(val, data);
                  }}
                  results={resultInfra}
                  disabled={disabled}
                  hidden={hidden}
                  value={empty}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    Programming Software
                    <label hidden={mandatory} style={{ color: 'red' }}>
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
                    };

                    const copyList = [...listItemProg];
                    const exists = copyList.filter((c) => c.value === item.value).length;
                    if (exists === 0) {
                      copyList.push(item);
                      setListItemProg(copyList);
                      if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyProg('');
                        localStorage.setItem('programmingSoftware', JSON.stringify(copyList));
                      }
                    }
                  }}
                  onSearchChange={(val, data) => {
                    setEmptyProg(data.value);
                    handleSearchProgrammingSoftware(val, data);
                  }}
                  results={resultsProg}
                  disabled={disabled}
                  hidden={hidden}
                  value={empty}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    Operating System
                    <label hidden={mandatory} style={{ color: 'red' }}>
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
                    };

                    const copyList = [...listItemOS];
                    const exists = copyList.filter((c) => c.value === item.value).length;
                    if (exists === 0) {
                      copyList.push(item);
                      setListItemOS(copyList);
                      if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyOS('');
                        localStorage.setItem('operatingSystem', JSON.stringify(copyList));
                      }
                    }
                  }}
                  onSearchChange={(val, data) => {
                    setEmptyOS(data.value);
                    handleSearchOperatingSystem(val, data);
                  }}
                  results={resultsOS}
                  disabled={disabled}
                  hidden={hidden}
                  value={empty}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    Database
                    <label hidden={mandatory} style={{ color: 'red' }}>
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
                    };

                    const copyList = [...listItemDB];
                    const exists = copyList.filter((c) => c.value === item.value).length;
                    if (exists === 0) {
                      copyList.push(item);
                      setListItemDB(copyList);
                      if (item.text !== '') {
                        input.onChange(copyList);
                        setEmptyDB('');
                        localStorage.setItem('database', JSON.stringify(copyList));
                      }
                    }
                  }}
                  onSearchChange={(val, data) => {
                    setEmptyDB(data.value);
                    handleSearchChange(val, data);
                  }}
                  results={results}
                  disabled={disabled}
                  hidden={hidden}
                  value={empty}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>{' '}
        </>
      )}
      {disabled ? (
        <>
          {' '}
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="1">
                  Business Software
                  {listItemBuss != null &&
                    listItemBuss.map((item) => (
                      <List.Item key={item.value}>
                        <Button icon="minus" labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="2">
                  Infrastucture Software
                  {listItemInfra != null &&
                    listItemInfra.map((item) => (
                      <List.Item key={item.value}>
                        <Button icon="minus" labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="3">
                  Programming Software
                  {listItemProg != null &&
                    listItemProg.map((item) => (
                      <List.Item key={item.value}>
                        <Button icon="minus" labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="4">
                  Operating System
                  {listItemOS != null &&
                    listItemOS.map((item) => (
                      <List.Item key={item.value}>
                        <Button icon="minus" labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="5">
                  Database
                  {listItemDB != null &&
                    listItemDB.map((item) => (
                      <List.Item key={item.value}>
                        <Button icon="minus" labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <div className="mt-0"></div>{' '}
        </>
      ) : (
        <>
          <Grid.Row>
            <Grid.Column width={16}>
              <List as="ol" celled>
                <List.Item as="li" value="1">
                  Business Software
                  <List.Item as="ol">
                    {listItemBuss != null &&
                      listItemBuss.map((item) => (
                        <List.Item key={item.value}>
                          <Button
                            icon="close"
                            labelPosition="right"
                            size="mini"
                            color="teal"
                            compact
                            floated="right"
                            type="button"
                            content={item.text}
                            disabled={disableDelete}
                            onClick={() => onDeleteBuss(item.value)}
                          />
                        </List.Item>
                      ))}
                  </List.Item>
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="2">
                  Infrastucture Software
                  <List.Item as="ol">
                    {listItemInfra != null &&
                      listItemInfra.map((item) => (
                        <List.Item key={item.value}>
                          <Button
                            icon="close"
                            labelPosition="right"
                            size="mini"
                            color="red"
                            compact
                            floated="right"
                            type="button"
                            content={item.text}
                            disabled={disableDelete}
                            onClick={() => onDeleteInfra(item.value)}
                          />
                        </List.Item>
                      ))}
                  </List.Item>
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="3">
                  Programming Software
                  <List.Item as="ol">
                    {listItemProg != null &&
                      listItemProg.map((item) => (
                        <List.Item key={item.value}>
                          <Button
                            icon="close"
                            labelPosition="right"
                            size="mini"
                            color="red"
                            compact
                            floated="right"
                            type="button"
                            content={item.text}
                            disabled={disableDelete}
                            onClick={() => onDeleteProg(item.value)}
                          />
                        </List.Item>
                      ))}
                  </List.Item>
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="4">
                  Operating System
                  <List.Item as="ol">
                    {listOS != null &&
                      listOS.map((item) => (
                        <List.Item key={item.value}>
                          <Button
                            icon="close"
                            labelPosition="right"
                            size="mini"
                            color="red"
                            compact
                            floated="right"
                            type="button"
                            content={item.text}
                            disabled={disableDelete}
                            onClick={() => onDeleteOS(item.value)}
                          />
                        </List.Item>
                      ))}
                  </List.Item>
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-0"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="5">
                  Database
                  <List.Item as="ol">
                    {listItemDB != null &&
                      listItemDB.map((item) => (
                        <List.Item key={item.value}>
                          <Button
                            icon="close"
                            labelPosition="right"
                            size="mini"
                            color="red"
                            compact
                            floated="right"
                            type="button"
                            content={item.text}
                            disabled={disableDelete}
                            onClick={() => onDeleteDB(item.value)}
                          />
                        </List.Item>
                      ))}
                  </List.Item>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <div className="mt-0"></div>{' '}
        </>
      )}
    </>
  );
};

export default SearchInputList;
