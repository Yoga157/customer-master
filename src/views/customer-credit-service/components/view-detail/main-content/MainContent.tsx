import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Form, Segment, Search } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, Button, Tooltips } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectSoftware } from 'selectors/software/SoftwareSelector';
import * as SoftwareActions from 'stores/software/SoftwareActions';
import { selectSoftwareTypeOptions, selectSubSoftwareTypeOptions, selectSoftwareToolTypeOptions } from 'selectors/select-options';
import ISoftwareHeaderTableRow from 'selectors/software/models/ISoftwareHeaderTableRow';
import SoftwareUpdateHeaderModel from 'stores/software/models/SoftwareUpdateHeaderModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import RouteEnum from 'constants/RouteEnum';
import { History } from 'history';
import InputSearch from '../../search/SearchTicket';

interface IProps {
  id: number;
  history: History;
}

const SoftwareToolEditForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [disableComponent, setDisableComponent] = useState(true);
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [updateHeader, setUpdateHeader] = useState(0);

  const { id } = props;

  // useEffect(() => {
  //   dispatch(SoftwareActions.requestSoftwareHeader(id));
  //   dispatch(SoftwareActions.requestSoftwareType());
  // }, [dispatch, id]);

  const onSoftwareType = (values: any) => {
    dispatch(SoftwareActions.requestSubSoftwareType(values));
  };

  const softwareTypeStore = useSelector((state: IStore) => selectSoftwareTypeOptions(state));
  const subSoftwareTypeStore = useSelector((state: IStore) => selectSubSoftwareTypeOptions(state));
  const softwareHeader: ISoftwareHeaderTableRow = useSelector((state: IStore) => selectSoftware(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.software.refreshPage);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  /* useEffect(() => {
    const SearchSelector = document.querySelector(
      '#root > div.ui.container > div > div:nth-child(2) > form > div.ui.grid > div > div.right.aligned.column > div > div.ui.icon.input > input'
    )! as HTMLInputElement;

    SearchSelector.style.width = '300px';
  }, []);  */

  const onSubmitHandler = (values: any) => {
    const newValues = new SoftwareUpdateHeaderModel(values);
    newValues.updateSoftwareID = values.subSoftwareID;
    newValues.userID = currentUser.employeeID;
    newValues.existingSoftwareID = softwareHeader.subSoftwareID;

    dispatch(SoftwareActions.putSoftwareHeader(newValues));
    setUpdateHeader(1);

    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  if (bRefreshPage) {
    if (updateHeader == 1) props.history.replace(RouteEnum.Software);

    dispatch(SoftwareActions.requestSoftwares(activePage, pageSize));
  }

  const onCancel = () => {
    if (!disableComponent) {
      dispatch(SoftwareActions.requestSoftwareHeader(id));
      dispatch(SoftwareActions.requestSubSoftwareType(softwareHeader.softwareID));
      setDisableComponent(true);
    }
  };

  const idrCurrency = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumSignificantDigits: 3,
    }).format(number);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [SoftwareActions.REQUEST_SOFTWARE_TYPE]));
  // useEffect(() => {
  //   if (softwareHeader.softwareID > 0) dispatch(SoftwareActions.requestSubSoftwareType(softwareHeader.softwareID));
  // }, [dispatch, softwareHeader.softwareID]);
  const datadetails = useSelector((state: IStore) => state.customerCredit.listDetails);

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={softwareHeader}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <p style={{ fontSize: 15, fontWeight: 'bold' }}>Sales Owner : {datadetails.salesName}</p>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {/* <Search style={{ width: '300px', float: 'right' }} className={'roundedSearchInput'} placeholder="Search registered ticket here" /> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment className="LightGreyNotif PadPmoNotif" style={{ width: '100%' }}>
            <Grid>
              <Grid.Column>
                <Grid.Row>
                  <Grid>
                    <Grid.Row columns={3}>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="softwareID"
                          component={SelectInput}
                          placeholder={idrCurrency(datadetails.creditAmount)}
                          labelName="Credit Amount"
                          disabled={disableComponent}
                          options={softwareTypeStore}
                          onChanged={onSoftwareType}
                        />
                      </Grid.Column>
                      {datadetails.services.map((item, index) => {
                        if (index === 0 || index === 1)
                          return (
                            <Grid.Column className="ViewLabel">
                              <Field
                                name="softwareID"
                                component={SelectInput}
                                placeholder={idrCurrency(parseFloat(item.valueData))}
                                labelName={item.textData === 'NI' ? item.textData + ' Cabling Total Amount' : item.textData + ' Total Amount'}
                                disabled={disableComponent}
                                options={softwareTypeStore}
                                onChanged={onSoftwareType}
                              />
                            </Grid.Column>
                          );
                      })}
                    </Grid.Row>
                    <Grid.Row columns={3}>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="softwareID"
                          component={SelectInput}
                          placeholder={idrCurrency(datadetails.creditUsed)}
                          labelName="Credit Used"
                          disabled={disableComponent}
                          options={softwareTypeStore}
                          onChanged={onSoftwareType}
                        />
                      </Grid.Column>

                      {datadetails.services.map((item, index) => {
                        if (index === 2 || index === 3)
                          return (
                            <Grid.Column className="ViewLabel">
                              <Field
                                name="softwareID"
                                component={SelectInput}
                                placeholder={idrCurrency(parseInt(item.valueData))}
                                labelName={item.textData + ' Total Amount'}
                                disabled={disableComponent}
                                options={softwareTypeStore}
                                onChanged={onSoftwareType}
                              />
                            </Grid.Column>
                          );
                      })}
                      {/* <Grid.Column className="ViewLabel">
                        <Field
                          name="softwareID"
                          component={SelectInput}
                          placeholder="XXXX"
                          labelName="CSS Total Amount"
                          disabled={disableComponent}
                          options={softwareTypeStore}
                          onChanged={onSoftwareType}
                        />
                      </Grid.Column>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="softwareID"
                          component={SelectInput}
                          placeholder="XXXX"
                          labelName="NI Cabling Total Amount"
                          disabled={disableComponent}
                          options={softwareTypeStore}
                          onChanged={onSoftwareType}
                        />
                      </Grid.Column> */}
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="ViewLabel">
                        <Field
                          name="subSoftwareID"
                          component={SelectInput}
                          placeholder={idrCurrency(datadetails.creditRemaining)}
                          labelName="Credit Remaining"
                          disabled={disableComponent}
                          options={subSoftwareTypeStore}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>

          <Grid>
            <Grid.Column textAlign="right" floated="left" width={5}></Grid.Column>
            <Grid.Column floated="right" mobile={16} tablet={16} computer={6}>
              <InputSearch />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default SoftwareToolEditForm;
