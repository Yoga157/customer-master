import './SearchInputList.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Search, Popup, Icon, List, Button, Grid } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
  disabled,
  hidden,
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
  const [empty, setEmpty] = useState('' as any);

  const [emptyBuss, setEmptyBuss] = useState('' as any);
  const [emptyDB, setEmptyDB] = useState('' as any);
  const [emptyProg, setEmptyProg] = useState('' as any);
  const [emptyInfra, setEmptyInfra] = useState('' as any);
  const [emptyOS, setEmptyOS] = useState('' as any);
  const location = useLocation();
  useEffect(() => {
    if (window.location.pathname == '/data-quality/funnel-form') {
      localStorage.removeItem('operatingSystem');
      localStorage.removeItem('businessSoftware');
      localStorage.removeItem('database');
      localStorage.removeItem('programmingSoftware');
      localStorage.removeItem('infrastructureSoftware');
    } else {
      if (listOS !== undefined) {
        setListItemOS(listOS);
        localStorage.setItem('operatingSystem', JSON.stringify(listOS));
      }

      if (listDB !== undefined) {
        setListItemDB(listDB);
        localStorage.setItem('database', JSON.stringify(listDB));
      }

      if (listProg !== undefined) {
        setListItemProg(listProg);
        localStorage.setItem('programmingSoftware', JSON.stringify(listProg));
      }

      if (listInfra !== undefined) {
        setListItemInfra(listInfra);
        localStorage.setItem('infrastructureSoftware', JSON.stringify(listInfra));
      }

      if (listBuss !== undefined) {
        setListItemBuss(listBuss);
        localStorage.setItem('businessSoftware', JSON.stringify(listBuss));
      }
    }
  }, [listBuss, listInfra, listOS, listDB, listProg]);

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
            <Grid.Column width={8} className="ViewLabel SoftwareLabel FullGrid767">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    <Icon name="briefcase" />
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
            <Grid.Column width={8} className="ViewLabel SoftwareLabel FullGrid767 mt-1r-767">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    <Icon name="plug" />
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
                  value={emptyInfra}
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
            <Grid.Column width={8} className="ViewLabel SoftwareLabel FullGrid767">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    <Icon name="keyboard" />
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
                  results={resultProg}
                  disabled={disabled}
                  hidden={hidden}
                  value={emptyProg}
                />
                {touched && error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8} className="ViewLabel SoftwareLabel FullGrid767 mt-1r-767">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    <Icon name="computer" />
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
                  results={resultOS}
                  disabled={disabled}
                  hidden={hidden}
                  value={emptyOS}
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
            <Grid.Column width={8} className="ViewLabel SoftwareLabel FullGrid767">
              <Form.Field error={touched && !!error} width={width}>
                <div>
                  <label htmlFor={input.name} style={{ marginRight: '10px' }}>
                    <Icon name="server" />
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
                    handleSearchDatabaseSoftware(val, data);
                  }}
                  results={resultDB}
                  disabled={disabled}
                  hidden={hidden}
                  value={emptyDB}
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
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="briefcase" className="mr-1" />
                    Business Software
                  </h4>
                  {listBuss != null &&
                    listBuss.map((item) => (
                      <List.Item key={item.text}>
                        <Button labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="plug" className="mr-1" />
                    Infrastructure Software
                  </h4>
                  {listInfra != null &&
                    listInfra.map((item) => (
                      <List.Item key={item.text}>
                        <Button labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="keyboard" className="mr-1" />
                    Programming Software
                  </h4>
                  {listProg != null &&
                    listProg.map((item) => (
                      <List.Item key={item.text}>
                        <Button labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="computer" className="mr-1" />
                    Operating System
                  </h4>
                  {listOS != null &&
                    listOS.map((item) => (
                      <List.Item key={item.text}>
                        <Button labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
                      </List.Item>
                    ))}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="server" className="mr-1" />
                    Database
                  </h4>
                  {listDB != null &&
                    listDB.map((item) => (
                      <List.Item key={item.text}>
                        <Button labelPosition="left" size="mini" color="blue" compact type="button" content={item.text} />
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
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="briefcase" className="mr-1" />
                    Business Software
                  </h4>
                  {listItemBuss.length > 0 &&
                    listItemBuss.map((item) => {
                      if (item.value != '') {
                        return (
                          <List.Item>
                            <Button
                              icon="close"
                              labelPosition="right"
                              size="mini"
                              color="red"
                              compact
                              type="button"
                              content={item.text}
                              onClick={() => onDeleteBuss(item.value)}
                            />
                          </List.Item>
                        );
                      }
                    })}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled className="mb-1">
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="plug" className="mr-1" />
                    Infrastructure Software
                  </h4>
                  {listItemInfra.length > 0 &&
                    listItemInfra.map((item) => {
                      if (item.value != '') {
                        return (
                          <List.Item>
                            <Button
                              icon="close"
                              labelPosition="right"
                              size="mini"
                              color="red"
                              compact
                              type="button"
                              content={item.text}
                              onClick={() => onDeleteInfra(item.value)}
                            />
                          </List.Item>
                        );
                      }
                    })}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="keyboard" className="mr-1" />
                    Programming Software
                  </h4>
                  {listItemProg.length > 0 &&
                    listItemProg.map((item) => {
                      if (item.value != '') {
                        return (
                          <List.Item>
                            <Button
                              icon="close"
                              labelPosition="right"
                              size="mini"
                              color="red"
                              compact
                              type="button"
                              content={item.text}
                              onClick={() => onDeleteProg(item.value)}
                            />
                          </List.Item>
                        );
                      }
                    })}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="computer" className="mr-1" />
                    Operating System
                  </h4>
                  {listItemOS.length > 0 &&
                    listItemOS.map((item) => {
                      if (item.value != '') {
                        return (
                          <List.Item>
                            <Button
                              icon="close"
                              labelPosition="right"
                              size="mini"
                              color="red"
                              compact
                              type="button"
                              content={item.text}
                              onClick={() => onDeleteOS(item.value)}
                            />
                          </List.Item>
                        );
                      }
                    })}
                </List.Item>
              </List>
              <div className="ui divider FullHdivider mt-2r"></div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className="ViewLabel SoftwareLabel">
              <List as="ol" celled>
                <List.Item as="li" value="">
                  <h4>
                    <Icon name="server" className="mr-1" />
                    Database
                  </h4>
                  {listItemDB.length > 0 &&
                    listItemDB.map((item) => {
                      if (item.value != '') {
                        return (
                          <List.Item>
                            <Button
                              icon="close"
                              labelPosition="right"
                              size="mini"
                              color="red"
                              compact
                              type="button"
                              content={item.text}
                              onClick={() => onDeleteDB(item.value)}
                            />
                          </List.Item>
                        );
                      }
                    })}
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
