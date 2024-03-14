import React, { useEffect, useState } from 'react';
import { Accordion, Form, Grid, Header, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import QuotaMasterModel, { HardwareSoftwareModel, ServiceModel } from 'stores/quota/models/QuotaMasterModel';
import PostQuotaMasterModel from 'stores/quota/models/PostQuotaMasterModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectQuotaMasterTeam } from 'selectors/quota/QuotaSelectors';
import { quotaTeams } from 'stores/quota/models/PostQuotaTeamModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import { CheckBox, NumberInput } from 'views/components/UI';
import IUserResult from 'selectors/user/models/IUserResult';
import * as QuotaActions from 'stores/quota/QuotaActions';
import './AccordionRowParentStyles.scss';
import IStore from 'models/IStore';

interface IProps {
  handlerMustValidate: any;
  setDisableComponent: any;
  item: QuotaMasterModel;
  setDisableBtnSave: any;
  disableComponent: any;
  canceled: boolean;
  isSearch: string;
}

const AccordionRowParent: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { item, canceled, isSearch, setDisableBtnSave, disableComponent, setDisableComponent, handlerMustValidate } = props;

  const quotaMasterMyTeam: QuotaMasterModel[] = useSelector((state: IStore) => selectQuotaMasterTeam(state));

  const dispatch: Dispatch = useDispatch();
  // const [disableComponent, setDisableComponent] = useState(false);
  const [quotaSelling, setQuotaSelling] = useState(item?.quotaSelling);
  const [minimumHardware, setMinimumHardware] = useState(false);
  const [minimumSoftware, setMinimumSoftware] = useState(false);
  const [toggleHardware, setToggleHardware] = useState([]);
  const [toggleSoftware, setToggleSoftware] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);
  const [quotaGPM, setQuotaGPM] = useState(item?.quotaGPM);
  const [up, setUp] = useState(true);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [QuotaActions.REQUEST_POST_QUOTA_MASTER]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const hardware: HardwareSoftwareModel = item?.hardware;
  const software: HardwareSoftwareModel = item?.software;
  const service: ServiceModel = item?.service;

  const onSubmitHandler = (values) => {
    let BrandHardwareID = [];
    let BrandSoftwareID = [];

    toggleHardware
      .filter((val) => val.value === true)
      .map((val) => {
        BrandHardwareID = [...BrandHardwareID, val.quotaBrandID];
      });

    toggleSoftware
      .filter((val) => val.value === true)
      .map((val) => {
        BrandSoftwareID = [...BrandSoftwareID, val.quotaBrandID];
      });

    const newItem = new PostQuotaMasterModel(values);
    newItem.salesID = item.salesID;
    newItem.salesDomain = item.salesDomain;
    newItem.effectiveDate = new Date();
    newItem.brandHardware = BrandHardwareID.join(',');
    newItem.brandSoftware = BrandSoftwareID.join(',');
    newItem.createUserID = currentUser.employeeID;

    dispatch(QuotaActions.postQuotaMaster(newItem)).then(() => {
      dispatch(QuotaActions.getQuotaMasterMyOwnQuota(currentUser.employeeID, `${new Date().getFullYear()}`));
    });
    setDisableComponent(true);
  };

  const handleListHardwareSoftware = (type) => {
    let tempListData = [];

    const listData = type === 'hardware' ? hardware : software;

    if (listData) {
      listData.rows.map((e) => {
        tempListData = [
          ...tempListData,
          {
            name: e.brandName,
            value: e.brandChoice ? true : false,
            minQuota: e.minQuota,
            quotaBrandID: e.quotaBrandID,

            // quotaPrincipal: e.quotaPrincipal,
            // brandChoice: e.brandChoice,
            // quotaGPM: 0,
            // brandAchieve: 0,
          },
        ];
      });

      type === 'hardware' ? setToggleHardware(tempListData) : setToggleSoftware(tempListData);
    }
  };

  useEffect(() => {
    setQuotaGPM(item?.quotaGPM);
    setQuotaSelling(item?.quotaSelling);
  }, [quotaMasterMyTeam]);

  useEffect(() => {
    if (hardware?.rows?.length > 0) {
      handleListHardwareSoftware('hardware');
    }
  }, [hardware]);

  useEffect(() => {
    if (software?.rows?.length > 0) {
      handleListHardwareSoftware('software');
    }
  }, [software]);

  const handleChecked = (e: any, checked: any, type: string) => {
    const itemField =
      type === 'hardware'
        ? toggleHardware.filter((element) => element.name === checked.input.name)
        : toggleSoftware.filter((element) => element.name === checked.input.name);

    const indexList =
      type === 'hardware'
        ? toggleHardware.findIndex((element) => element.name === checked.input.name)
        : toggleSoftware.findIndex((element) => element.name === checked.input.name);

    const listData = type === 'hardware' ? toggleHardware : toggleSoftware;

    if (itemField[0]) {
      listData.splice(indexList, 1, {
        name: checked.input.name,
        value: checked.checked,
        minQuota: itemField[0]?.minQuota,
        quotaBrandID: itemField[0]?.quotaBrandID,
      });
    }

    if (type === 'hardware') {
      setToggleHardware(listData);
      toggleHardware.filter((e) => e.value === true).length < +hardware?.minChoice ? setMinimumHardware(true) : setMinimumHardware(false);
    } else {
      setToggleSoftware(listData);
      toggleSoftware.filter((e) => e.value === true).length < +software?.minChoice ? setMinimumSoftware(true) : setMinimumSoftware(false);
    }

    setUp(!up);
  };

  const cancelProc = async (data: any, type: string) => {
    await new Promise((resolve) =>
      data.rows.map((e) => {
        handleChecked(
          '',
          {
            input: {
              name: e.brandName,
            },
            checked: e.brandChoice ? true : false,
          },
          type
        );
      })
    );
  };

  const handleCancel = () => {
    if (hardware?.rows?.length > 0) {
      cancelProc(hardware, 'hardware');
    }
    if (software?.rows?.length > 0) {
      cancelProc(software, 'software');
    }

    setQuotaGPM(item?.quotaGPM);
    setQuotaSelling(item?.quotaSelling);
    setDisableComponent(true);
  };

  const handleEdit = () => {
    setDisableComponent(!disableComponent);
    toggleHardware.filter((e) => e.value === true).length < +hardware?.minChoice ? setMinimumHardware(true) : setMinimumHardware(false);
    toggleSoftware.filter((e) => e.value === true).length < +software?.minChoice ? setMinimumSoftware(true) : setMinimumSoftware(false);
  };

  const handleWrap = () => {
    setActiveIndex(!activeIndex);
  };

  useEffect(() => {
    if (canceled) {
      handleCancel();
    }
  }, [canceled]);

  const handleChange = (e: number, type: string) => {
    type === 'gpm' ? setQuotaGPM(e) : setQuotaSelling(e);

    const newItem = new quotaTeams({});

    if (type === 'gpm') {
      newItem.quotaGPM = e;
      newItem.quotaSelling = quotaSelling;
    } else {
      newItem.quotaGPM = quotaGPM;
      newItem.quotaSelling = e;
    }
    newItem.salesID = item.salesID;
    newItem.salesDomain = item.salesDomain;

    handlerMustValidate(newItem);
  };

  const initialValue = {
    quotaGPM: quotaGPM,
    quotaSelling: quotaSelling,
  };

  const validate = combineValidators({
    quotaGPM: isRequired('Quota GPM'),
    quotaSelling: isRequired('Quota Selling'),
  });

  return (
    <Grid className={`TeamQuotaParent`}>
      <Grid.Row className="pb-0">
        <Grid.Column className="p-0">
          <FinalForm
            onSubmit={(values: any) => onSubmitHandler(values)}
            initialValues={initialValue}
            validate={validate}
            render={({ handleSubmit, pristine, invalid }) => (
              <Form onSubmit={handleSubmit} loading={isRequesting}>
                <Grid>
                  <Grid.Row className="pt-0 px-2r" columns="equal">
                    <Grid.Column className="ViewForm" verticalAlign="middle">
                      <Grid.Row>
                        <Grid.Column width={4} verticalAlign="middle">
                          {item.salesName} <br />
                          <span>{item.salesInfo}</span>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="ViewForm p-0" width={4}>
                      <Field
                        name="quotaGPM"
                        component={NumberInput}
                        placeholder="e.g.01234"
                        disabled={disableComponent || isSearch}
                        thousandSeparator={true}
                        labelName="Quota GPM"
                        values={quotaGPM}
                        onChange={(e) => handleChange(e, 'gpm')}
                        // defaultValue={`${quotaGPM}`}
                        // readonly
                      />
                      <span>{item?.quotaEffective}</span>
                    </Grid.Column>
                    <Grid.Column className="ViewForm p-0" width={4}>
                      <Field
                        name="quotaSelling"
                        component={NumberInput}
                        placeholder="e.g.01234"
                        disabled={disableComponent || isSearch || item.directorat === 'SI'}
                        thousandSeparator={true}
                        labelName="Quota Selling"
                        values={quotaSelling}
                        onChange={(e) => handleChange(e, 'selling')}
                        readonly={item.directorat === 'SI'}
                        // defaultValue={`${quotaGPM}`}
                      />
                      <span>{item?.quotaEffective}</span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                {(hardware?.rows?.length > 0 || software?.rows?.length > 0) &&
                  (item?.hardware?.minAchieve !== 0 || item?.software?.minAchieve !== 0) && (
                    <Accordion fluid styled>
                      <Accordion.Title active={activeIndex} onClick={handleWrap}>
                        <Grid columns="equal">
                          <Grid.Row>
                            <Grid.Column width={4}>
                              <Icon name="dropdown" />
                              Other Quota Setting
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex}>
                        <Grid columns={2}>
                          <Grid.Column computer={11} mobile={16}>
                            <div className="card-quota-brand">
                              <Header as="h3">Quota Brand</Header>
                              <Grid columns={2}>
                                <Grid.Column computer={8} mobile={16}>
                                  {toggleHardware.length > 0 && (
                                    <div className="col-hardware">
                                      <Grid className="header-hardware" columns="equal">
                                        <Grid.Column textAlign="left" className="pt-1r pb-0">
                                          <Header as="h3">
                                            <Header.Content>Hardware</Header.Content>
                                          </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="right" className="pt-1r pb-0">
                                          <Header as="h3">
                                            {hardware?.minAchieve}
                                            <span>/{hardware?.minChoice}</span> <span>Available</span>
                                          </Header>
                                        </Grid.Column>
                                      </Grid>
                                      <span className="text-danger">Choose {hardware?.minChoice} products to meets requirement</span>
                                      {toggleHardware.map((i, k) => {
                                        return (
                                          <Grid key={k} className="item-hardware" columns="equal" verticalAlign="middle">
                                            <Grid.Column textAlign="left" className="pt-1r pb-0">
                                              <Header as="span">
                                                <Header.Content>
                                                  {i.name}
                                                  <Header.Subheader as="h3">{i.minQuota ? i.minQuota?.toLocaleString() : 0}</Header.Subheader>
                                                </Header.Content>
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
                                              <span>OFF</span>
                                              <span>
                                                <Field
                                                  name={i.name}
                                                  toggle
                                                  component={CheckBox}
                                                  // disabled={disableComponent}
                                                  disabled
                                                  checked={i.value}
                                                  onChange={(e, checked) => handleChecked(e, checked, 'hardware')}
                                                />
                                              </span>
                                              <span>ON</span>
                                            </Grid.Column>
                                          </Grid>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Grid.Column>
                                {/*  */}
                                <Grid.Column computer={8} mobile={16}>
                                  {toggleSoftware.length > 0 && (
                                    <div className="col-software">
                                      <Grid className="header-software" columns="equal">
                                        <Grid.Column textAlign="left" className="pt-1r pb-0">
                                          <Header as="h3">
                                            <Header.Content>Software</Header.Content>
                                          </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="right" className="pt-1r pb-0">
                                          <Header as="h3">
                                            {software?.minAchieve}
                                            <span>/{software?.minChoice}</span> <span>Available</span>
                                          </Header>
                                        </Grid.Column>
                                      </Grid>
                                      <span className="text-danger">Choose {software?.minChoice} software to meets requirement</span>
                                      {toggleSoftware.map((i, k) => {
                                        return (
                                          <Grid key={k} className="item-hardware" columns="equal" verticalAlign="middle">
                                            <Grid.Column textAlign="left" className="pt-1r pb-0">
                                              <Header as="span">
                                                <Header.Content>
                                                  {i.name}
                                                  <Header.Subheader as="h3">{i.minQuota ? i.minQuota?.toLocaleString() : 0}</Header.Subheader>
                                                </Header.Content>
                                              </Header>
                                            </Grid.Column>
                                            <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
                                              <span>OFF</span>
                                              <span>
                                                <Field
                                                  name={i.name}
                                                  toggle
                                                  component={CheckBox}
                                                  disabled
                                                  checked={i.value}
                                                  onChange={(e, checked) => handleChecked(e, checked, 'software')}
                                                />
                                              </span>
                                              <span>ON</span>
                                            </Grid.Column>
                                          </Grid>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Grid.Column>
                              </Grid>
                            </div>
                          </Grid.Column>

                          <Grid.Column computer={5} mobile={16}>
                            {service?.rows?.length > 0 && (
                              <div className="card-quota-service">
                                <Grid className="header-quota-service">
                                  <Grid.Column textAlign="left" className="pt-1r pb-0">
                                    <Header as="h3">
                                      <Header.Content>Quota Service</Header.Content>
                                    </Header>
                                  </Grid.Column>
                                </Grid>
                                {service?.rows?.map((i, k) => {
                                  return (
                                    <Grid className="item-quota-service" key={k}>
                                      <Grid.Column textAlign="left" className="pt-1 pb-0">
                                        <Header as="span">
                                          <Header.Content>
                                            {i.brandName}
                                            <Header.Subheader as="h3">{i.minQuota ? i.minQuota?.toLocaleString() : 0}</Header.Subheader>
                                          </Header.Content>
                                        </Header>
                                      </Grid.Column>
                                    </Grid>
                                  );
                                })}
                              </div>
                            )}
                          </Grid.Column>
                        </Grid>
                      </Accordion.Content>
                    </Accordion>
                  )}
              </Form>
            )}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AccordionRowParent;
