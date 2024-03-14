import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Segment, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { SelectInput, DateInput, TextInput, Button, DropdownClearInput, Tooltips } from 'views/components/UI';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import classes from './RequesterForm.module.scss';
import { selectBankGaransi } from 'selectors/bank-garansi/BankGaransiSelector';
import * as BondTypeAction from 'stores/bond-type/BondTypeAction';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectBondTypeOptions, selectLetterTypeOptions } from 'selectors/select-options';
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const RequesterForm: React.FC<IProps> = () => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const bankGaransi = useSelector((state: IStore) => selectBankGaransi(state));
  const letterTypeStore = useSelector((state: IStore) => selectLetterTypeOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    dispatch(BondTypeAction.requestBondType());
  }, [dispatch]);

  const bondTypeStore = useSelector((state: IStore) => selectBondTypeOptions(state));

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: BankGaransiModel) => {
    if (!disableComponent) {
      setDisableComponent(true);
      const newValues = new BankGaransiModel(values);
      dispatch(BankGaransiActions.putBankGaransi(newValues));
    }
  };

  let form: any;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={bankGaransi}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Segment className="LightGreyNotif p-0">
              <Grid padded className="pb-0">
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      <Header.Content>Requester</Header.Content>
                      <Header.Content className="FloatRight">
                        {disableComponent && currentUser.role != 'Admin' && (
                          <Tooltips
                            position="top right"
                            content="Edit Requester Details"
                            trigger={
                              <Button
                                circular
                                basic
                                type="button"
                                compact
                                icon="edit"
                                onClick={(e: Event) => onHeaderSubmitHandler(e)}
                                floated="right"
                              />
                            }
                          />
                        )}
                        {!disableComponent && (
                          <Fragment>
                            <Tooltips
                              position="top right"
                              content="Cancel Update"
                              trigger={<Button type="button" basic compact icon="cancel" circular />}
                            />
                            <Tooltips position="top right" content="Save Update" trigger={<Button basic compact icon="save" circular />} />
                          </Fragment>
                        )}
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider className="m-0" />
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="bondType"
                      component={SelectInput}
                      placeholder="Bond Type"
                      labelName="Bond Type"
                      disabled={disableComponent}
                      options={bondTypeStore}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="letterType"
                      component={DropdownClearInput}
                      placeholder="Letter Type"
                      labelName="Letter Type"
                      disabled={disableComponent}
                      options={letterTypeStore}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field name="bondIssuers" component={TextInput} placeholder="Bond Issuer" labelName="Bond Issuer" disabled={disableComponent} />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="bondIssuer"
                      component={TextInput}
                      placeholder="Bank / Insurance Name"
                      labelName="Bank / Insurance Name"
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field name="linkTo" component={TextInput} placeholder="Link To" labelName="Link To" disabled={disableComponent} />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field name="linkToNo" component={TextInput} placeholder="Link To" labelName="Link To" disabled={disableComponent} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="requireOn"
                      component={DateInput}
                      placeholder="Require On"
                      labelName="Require On"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field name="language" component={TextInput} placeholder="Language" labelName="Language" disabled={disableComponent} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="2">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="reqEffectiveDate"
                      component={DateInput}
                      placeholder="Effective Date"
                      labelName="Effective Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field name="reqExpireDate" component={DateInput} placeholder="Expire Date" labelName="Expire Date" date={true} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field name="tenderNo" component={TextInput} placeholder="Tender No" labelName="Tender No" disabled={disableComponent} />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="tenderAnnouncementDate"
                      component={DateInput}
                      placeholder="Tender Announcement Date"
                      labelName="Tender Announcement Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field name="nilai" component={TextInput} placeholder="Amount" labelName="Amount" disabled={disableComponent} />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel"></Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        )}
      />
    );
  }

  return form;
};

export default RequesterForm;
