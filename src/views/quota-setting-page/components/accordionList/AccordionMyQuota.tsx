import React, { useEffect, useState } from 'react';
import { Accordion, Form, Grid, Header, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import QuotaMasterModel, { HardwareSoftwareModel, ServiceModel } from 'stores/quota/models/QuotaMasterModel';
import { Button, Tooltips, CheckBox, NumberInput } from 'views/components/UI';
import PostQuotaMasterModel from 'stores/quota/models/PostQuotaMasterModel';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as QuotaActions from 'stores/quota/QuotaActions';
import IStore from 'models/IStore';
import './AccordionStyle.scss';

const AccordionMyQuota = ({ quotaMaster }: { quotaMaster: QuotaMasterModel }) => {
  const dispatch: Dispatch = useDispatch();
  const [quotaSelling, setQuotaSelling] = useState(quotaMaster?.quotaSelling);
  const [quotaGPM, setQuotaGPM] = useState(quotaMaster?.quotaGPM);
  const [disableComponent, setDisableComponent] = useState(true);
  const [minimumHardware, setMinimumHardware] = useState(false);
  const [equelMinChoiceHardware, setEquelMinChoiceHardware] = useState(false);
  const [minimumSoftware, setMinimumSoftware] = useState(false);
  const [equelMinChoiceSoftware, setEquelMinChoiceSoftware] = useState(false);
  const [toggleHardware, setToggleHardware] = useState([]);
  const [toggleSoftware, setToggleSoftware] = useState([]);
  const [activeIndex, setActiveIndex] = useState(true);
  const [up, setUp] = useState(true);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [QuotaActions.REQUEST_POST_QUOTA_MASTER]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const quotaHeader = useSelector((state: IStore) => state.quota.quotaHeader[0]);

  const hardware: HardwareSoftwareModel = quotaMaster.hardware;
  const software: HardwareSoftwareModel = quotaMaster.software;
  const service: ServiceModel = quotaMaster?.service;
  const salesName = quotaMaster?.salesName || '';

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
    newItem.salesID = quotaMaster?.salesID;
    newItem.salesDomain = quotaMaster?.salesDomain;
    newItem.effectiveDate = new Date();
    newItem.brandHardware = quotaMaster?.hardware?.rows?.length > 0 ? BrandHardwareID.join(',') : '';
    newItem.brandSoftware = quotaMaster?.software?.rows?.length > 0 ? BrandSoftwareID.join(',') : '';
    newItem.createUserID = currentUser.employeeID;

    dispatch(QuotaActions.postQuotaMaster(newItem)).then(() => {
      // dispatch(QuotaActions.getQuotaMasterMyOwnQuota(currentUser.employeeID, `${new Date().getFullYear()}`));
      dispatch(QuotaActions.getQuotaMasterMyOwnQuota(quotaMaster.salesID, `${new Date().getFullYear()}`));
    });
    setDisableComponent(true);
  };

  const handleListHardwareSoftware = (type) => {
    let tempListData = [];
    const listData = type === 'hardware' ? hardware : software;

    if (listData?.rows) {
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
    setQuotaSelling(quotaMaster?.quotaSelling);
    setQuotaGPM(quotaMaster?.quotaGPM);

    handleListHardwareSoftware('hardware');
  }, [hardware]);

  useEffect(() => {
    handleListHardwareSoftware('software');
  }, [software]);

  const handleChecked = async (e: any, checked: any, type: string) => {
    const itemField =
      type === 'hardware'
        ? toggleHardware.filter((element) => element.name === checked.input.name)
        : toggleSoftware.filter((element) => element.name === checked.input.name);

    const indexList =
      type === 'hardware'
        ? toggleHardware.findIndex((element) => element.name === checked.input.name)
        : toggleSoftware.findIndex((element) => element.name === checked.input.name);

    const listData = type === 'hardware' ? toggleHardware : toggleSoftware;

    listData.splice(indexList, 1, {
      name: checked.input.name,
      value: checked.checked,
      minQuota: itemField[0].minQuota,
      quotaBrandID: itemField[0].quotaBrandID,
    });

    if (type === 'hardware') {
      setToggleHardware(listData);
      toggleHardware.filter((e) => e.value === true).length < +hardware?.minChoice ? setMinimumHardware(true) : setMinimumHardware(false);

      toggleHardware.filter((e) => e.value === true).length === +hardware?.minChoice
        ? setEquelMinChoiceHardware(true)
        : setEquelMinChoiceHardware(false);
    } else {
      setToggleSoftware(listData);
      toggleSoftware.filter((e) => e.value === true).length < +software?.minChoice ? setMinimumSoftware(true) : setMinimumSoftware(false);

      toggleSoftware.filter((e) => e.value === true).length === +software?.minChoice
        ? setEquelMinChoiceSoftware(true)
        : setEquelMinChoiceSoftware(false);
    }

    setUp(!up);
  };

  const cancelProc = async (data: any, type: string) => {
    await new Promise((resolve) =>
      data?.rows?.map((e) => {
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
    if (hardware) {
      cancelProc(hardware, 'hardware');
    }
    if (software) {
      cancelProc(software, 'software');
    }

    setQuotaSelling(quotaMaster?.quotaSelling);
    setQuotaGPM(quotaMaster?.quotaGPM);
    setDisableComponent(true);
  };

  const handleEdit = () => {
    setDisableComponent(!disableComponent);
    toggleHardware.filter((e) => e.value === true).length < +hardware?.minChoice ? setMinimumHardware(true) : setMinimumHardware(false);
    toggleSoftware.filter((e) => e.value === true).length < +software?.minChoice ? setMinimumSoftware(true) : setMinimumSoftware(false);

    toggleHardware.filter((e) => e.value === true).length === +hardware?.minChoice
      ? setEquelMinChoiceHardware(true)
      : setEquelMinChoiceHardware(false);
    toggleSoftware.filter((e) => e.value === true).length === +software?.minChoice
      ? setEquelMinChoiceSoftware(true)
      : setEquelMinChoiceSoftware(false);
  };

  // console.log('toggleHardware', toggleHardware);
  // console.log('minimumHardware', minimumHardware);
  // console.log('equelMinChoiceSoftware', equelMinChoiceSoftware);
  // console.log('equelMinChoiceHardware', equelMinChoiceHardware);

  const handleWrap = () => {
    setActiveIndex(!activeIndex);
  };

  const initialValue = {
    quotaGPM: quotaGPM,
    quotaSelling: quotaSelling,
  };

  return (
    <Grid className="MyOwnQuota">
      <Grid.Row>
        <Grid.Column>
          <Accordion fluid styled>
            <Accordion.Title active={activeIndex} onClick={handleWrap}>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Icon name="dropdown" />
                    My Own Quota <br />
                    <span className="ml-20">{quotaMaster?.salesInfo}</span>
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    {!activeIndex && <h2>{quotaGPM?.toLocaleString()}</h2>}
                    <span>{quotaMaster?.quotaEffective}</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Accordion.Title>
            <Accordion.Content active={activeIndex}>
              <FinalForm
                onSubmit={(values: any) => onSubmitHandler(values)}
                initialValues={initialValue}
                render={({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} loading={isRequesting}>
                    <Grid>
                      <Grid.Row className="pt-0 px-2r">
                        <Grid.Column width={16}>
                          <h4>
                            {salesName.toUpperCase()} QUOTA
                            {disableComponent && (
                              <Tooltips
                                content="Edit My Own Quota"
                                trigger={
                                  <Button
                                    basic
                                    type="button"
                                    compact
                                    icon="edit"
                                    disabled={
                                      +moment().format('X') >= +moment(quotaHeader?.dateTime2 ? quotaHeader?.dateTime2 : 0).format('X') &&
                                      currentUser.role !== 'Admin Quota'
                                    }
                                    onClick={(e) => {
                                      handleEdit();
                                    }}
                                  />
                                }
                              />
                            )}
                            {!disableComponent && (
                              <>
                                <Tooltips
                                  content="Cancel Update"
                                  trigger={
                                    <Button
                                      type="button"
                                      basic
                                      compact
                                      icon="cancel"
                                      onClick={() => {
                                        handleCancel();
                                      }}
                                    />
                                  }
                                />
                                <Tooltips
                                  content="Save Update"
                                  trigger={
                                    <Button basic compact icon="save" disabled={minimumSoftware || minimumHardware} />
                                    // <Button basic compact icon="save" disabled={(minimumHardware && !equelMinChoiceHardware) || minimumSoftware} />
                                  }
                                />
                              </>
                            )}
                          </h4>
                        </Grid.Column>
                        <Grid.Column width={8} className="ViewForm">
                          <Field
                            name="quotaGPM"
                            component={NumberInput}
                            placeholder="e.g.01234"
                            disabled={disableComponent}
                            thousandSeparator={true}
                            labelName="Quota GPM"
                            readonly={currentUser?.employeeID === 807 || currentUser.role === 'Admin Quota' ? false : true}
                            onChange={(e) => setQuotaGPM(e)}
                          />
                        </Grid.Column>
                        <Grid.Column width={8} className="ViewForm">
                          <Field
                            name="quotaSelling"
                            component={NumberInput}
                            placeholder="e.g.01234"
                            disabled={disableComponent || quotaMaster?.directorat === 'SI'}
                            thousandSeparator={true}
                            labelName="Quota Selling"
                            readonly={currentUser?.employeeID === 807 || currentUser.role === 'Admin Quota' ? false : true}
                            onChange={(e) => setQuotaSelling(e)}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    {(hardware?.rows?.length > 0 || software?.rows?.length > 0) &&
                      (quotaMaster?.hardware?.minAchieve !== 0 || quotaMaster?.software?.minAchieve !== 0) && (
                        <Grid columns={2}>
                          <Grid.Column computer={11} mobile={16}>
                            <div className="card-quota-brand">
                              <Header as="h3">Quota Brand</Header>
                              <Grid columns={2}>
                                <Grid.Column computer={8} mobile={16}>
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

                                    {toggleHardware?.map((i, k) => {
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
                                                disabled={disableComponent || (!minimumHardware && i.value === false)}
                                                // disabled={disableComponent || (equelMinChoiceHardware && !minimumHardware)}
                                                checked={i.value}
                                                // defaultChecked={i.value}
                                                onChange={(e, checked) => handleChecked(e, checked, 'hardware')}
                                              />
                                            </span>
                                            <span>ON</span>
                                          </Grid.Column>
                                        </Grid>
                                      );
                                    })}
                                  </div>
                                </Grid.Column>
                                <Grid.Column computer={8} mobile={16}>
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
                                    {toggleSoftware?.map((i, k) => {
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
                                                disabled={disableComponent || (!minimumSoftware && i.value === false)}
                                                checked={i.value}
                                                // defaultChecked={i.value}
                                                onChange={(e, checked) => handleChecked(e, checked, 'software')}
                                              />
                                            </span>
                                            <span>ON</span>
                                          </Grid.Column>
                                        </Grid>
                                      );
                                    })}
                                  </div>
                                </Grid.Column>
                              </Grid>
                            </div>
                          </Grid.Column>

                          <Grid.Column computer={5} mobile={16}>
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
                          </Grid.Column>
                        </Grid>
                      )}
                  </Form>
                )}
              />
            </Accordion.Content>
          </Accordion>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AccordionMyQuota;
