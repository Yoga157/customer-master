import React, { Fragment, useState } from 'react';
import { Grid, Header, Form, Segment, Divider } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { DateInput, TextInput, Button, Tooltips } from 'views/components/UI';
import classes from './AdminForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import { selectBankGaransi } from 'selectors/bank-garansi/BankGaransiSelector';
import BankGaransiModel from 'stores/bank-garansi/models/BankGaransiModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {}

const AdminForm: React.FC<IProps> = () => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  const bankGaransi = useSelector((state: IStore) => selectBankGaransi(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

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
            <Segment className="LightGreyNotif p-0 m-0">
              <Grid padded className="pb-0">
                <Grid.Row>
                  <Grid.Column>
                    <Header>
                      <Header.Content>Admin</Header.Content>
                      <Header.Content className="FloatRight">
                        {disableComponent && currentUser.role === 'Admin' && (
                          <Tooltips
                            position="top right"
                            content="Edit Admin Details"
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
                <Grid.Row columns="1">
                  <Grid.Column className="ViewLabel">
                    <Field name="bankGuaranteeNo" component={TextInput} placeholder="BG No" labelName="BG No" disabled={disableComponent} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="3">
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="submitDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Submit Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="adminEffectiveDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Effective Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="adminExpireDate"
                      component={DateInput}
                      placeholder="e.g 10/27/2020"
                      labelName="Expire Date"
                      date={true}
                      disabled={disableComponent}
                    />
                  </Grid.Column>
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

export default AdminForm;
