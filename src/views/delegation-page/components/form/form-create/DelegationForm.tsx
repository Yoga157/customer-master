import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Grid } from 'semantic-ui-react';
import { History } from 'history';
import { Dispatch } from 'redux';

import { Button, DateInput, SearchInput, RichTextEditor } from 'views/components/UI';
import { selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';
import { selectApplication } from 'selectors/delegation/DelegationSelectors';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import DelegationModel from 'stores/delegation/models/DelegationModel';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import DelegationTableForm from '../../table/DelegationTableForm';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import RouteEnum from 'constants/RouteEnum';
import IStore from 'models/IStore';

import value from 'environment';

interface IProps {
  history: History;
}

const validate = combineValidators({
  expDate: isRequired('Effective Date'),
  effDate: isRequired('Expired Date'),
  remarks: isRequired('Remark'),
});

const DelegationForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const bRefreshPage: boolean = useSelector((state: IStore) => state.delegation.refreshPage);
  const result = useSelector((state: IStore) => state.delegation.resultActions);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const userEmployee = useSelector((state: IStore) => selectEmployeeSemantic(state));
  const application = useSelector((state: IStore) => selectApplication(state)); // update local

  useEffect(() => {
    localStorage.removeItem('detailDelegation');
  }, []);

  const onSubmitHandler = (values) => {
    const newItem = new DelegationModel(values);
    newItem.delegasiID = 0;
    newItem.fromUser = currentUser.employeeID;
    newItem.fromUserStr = values.fromUser;
    newItem.userLoginID = currentUser.employeeID;
    newItem.detailDelegasi = newItem.detailDelegasi = JSON.parse(localStorage.getItem('detailDelegation')) || [];

    dispatch(DelegationActions.postDelegation(newItem));
    // console.log('newItem---------', newItem);
  };

  if (bRefreshPage) {
    if (result?.message === 'SubmitSuccess') {
      localStorage.removeItem('detailDelegation');
      props.history.replace(RouteEnum.Delegation);
      dispatch(ToastsAction.add(`Submit delegation success`, ToastStatusEnum.Success));
    } else if (result?.errorNumber === '666') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Error));
      dispatch(DelegationActions.removeResult());
    }
  }

  const submitting: boolean = useSelector((state: IStore) => selectRequesting(state, [DelegationActions.REQUEST_POST_DELEGATION]));

  let detailDelegation: any = {
    rows: [],
  };
  if (JSON.parse(localStorage.getItem('detailDelegation'))) {
    detailDelegation = {
      rows: JSON.parse(localStorage.getItem('detailDelegation')),
    };
  }

  const handleSearchEmployee = (e, data) => {
    // setSelectedEmployee(data.value);
    // dispatch(EmployeeActions.requestEmployeeByName(data.value, ''));
  };

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Field
                  name="effDate"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Effective Date"
                  date={true}
                  mandatory={false}
                  minDate={new Date()}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field
                  name="expDate"
                  component={DateInput}
                  placeholder="e.g.09/09/2020"
                  labelName="Expired Date"
                  date={true}
                  minDate={new Date()}
                  mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Field
                  name="fromUser"
                  placeholder="E.g. Emplyee Name"
                  component={SearchInput}
                  results={userEmployee}
                  onSearchChange={handleSearchEmployee}
                  labelName="From User"
                  mandatory={false}
                  // value={'Sarah Apriliana'}
                  defaultValue={currentUser.fullName}
                  disabled={true}
                  // loading={isLoadingCustomer}
                  // handleSearchChange={handleSearchChangeCust}
                  // onResultSelect={onResultSelectCustomer}
                  // values={customerName}
                  // resultRenderer={resultRenderer}
                />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field name="remarks" component={RichTextEditor} placeholder="e.g.Information Remark.." labelName="Remark" mandatorys={false} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal" className="ph-1r">
              <DelegationTableForm tableData={detailDelegation} />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="blue"
                  floated="right"
                  content="Submit"
                  disabled={
                    // pristine ||
                    invalid ||
                    !JSON.parse(localStorage.getItem('detailDelegation')) ||
                    JSON.parse(localStorage.getItem('detailDelegation'))?.length === 0
                  }
                />

                <Button
                  type="button"
                  floated="right"
                  content="Cancel"
                  onClick={() => {
                    props.history.replace(RouteEnum.Delegation);
                    localStorage.removeItem('detailDelegation');
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default DelegationForm;
