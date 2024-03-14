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

const CustInfoForm: React.FC<IProps> = () => {
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
                      <Header.Content>Customer Info</Header.Content>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Divider className="m-0" />
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="customerName"
                      component={TextInput}
                      placeholder="Customer Name"
                      labelName="Customer Name"
                      disabled={disableComponent}
                    />
                  </Grid.Column>
                  <Grid.Column className="ViewLabel">
                    <Field name="customerAddress" component={TextInput} placeholder="Address" labelName="Address" disabled={disableComponent} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column className="ViewLabel">
                    <Field
                      name="nilaiProject"
                      component={TextInput}
                      placeholder="Funnel Amount"
                      labelName="Funnel Amount"
                      disabled={disableComponent}
                    />
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

export default CustInfoForm;
