import React, { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Grid } from 'semantic-ui-react';
import { History } from 'history';
import { Dispatch } from 'redux';

import { selectApplication, selectDelegationEdit } from 'selectors/delegation/DelegationSelectors';
import { Button, DateInput, SearchInput, RichTextEditor } from 'views/components/UI';
import { selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as DelegationActions from 'stores/delegation/DelegationActions';
import DelegationModel from 'stores/delegation/models/DelegationModel';
import DelegationTableForm from '../../table/DelegationTableForm';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import RouteEnum from 'constants/RouteEnum';
import IStore from 'models/IStore';

import value from 'environment';

interface IProps {
  delegationID: number;
  history: History;
}

const validate = combineValidators({
  expDate: isRequired('Effective Date'),
  effDate: isRequired('Expired Date'),
  remarks: isRequired('Remark'),
});

const DelegationFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const firstData: DelegationModel = useSelector((state: IStore) => selectDelegationEdit(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.delegation.refreshPage);
  const resultMsg = useSelector((state: IStore) => state.delegation.resultActions.message);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const userEmployee = useSelector((state: IStore) => selectEmployeeSemantic(state));
  const application = useSelector((state: IStore) => selectApplication(state)); // update local

  const onSubmitHandler = (values) => {
    const newItem = new DelegationModel(values);
    newItem.delegasiID = firstData.delegasiID;
    newItem.fromUser = currentUser.employeeID;
    newItem.fromUserStr = firstData.fromUserStr;
    newItem.userLoginID = currentUser.employeeID;
    newItem.detailDelegasi = newItem.detailDelegasi = JSON.parse(localStorage.getItem('detailDelegation')) || [];

    dispatch(DelegationActions.putDelegation(newItem));
    // console.log('newItem---------', newItem);
  };

  useEffect(() => {
    localStorage.removeItem('detailDelegation');
  }, []);

  useEffect(() => {
    if (firstData.detailDelegasi) {
      let newItem = [];
      firstData.detailDelegasi.map((item) => {
        newItem = [
          ...newItem,
          {
            ...item,
            isAdd: 0,
            isDelete: 0,
            isUpdate: 0,
          },
        ];
      });

      localStorage.setItem('detailDelegation', JSON.stringify(newItem));
      dispatch(DelegationActions.requestApplication());
    }
  }, [firstData]);

  if (bRefreshPage) {
    if (resultMsg === 'SubmitSuccess') {
      localStorage.removeItem('detailDelegation');
      props.history.replace(RouteEnum.Delegation);
      dispatch(ToastsAction.add(`Update delegation success`, ToastStatusEnum.Success));
    }
  }

  const submitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [DelegationActions.REQUEST_DELEGATION_BY_ID, DelegationActions.REQUEST_PUT_DELEGATION])
  );

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
      initialValues={firstData}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={submitting}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Field name="effDate" component={DateInput} placeholder="e.g.09/09/2020" labelName="Effective Date" date={true} mandatory={false} />
              </Grid.Column>
              <Grid.Column className="FullGrid767">
                <Field name="expDate" component={DateInput} placeholder="e.g.09/09/2020" labelName="Expired Date" date={true} mandatory={false} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column className="FullGrid767">
                <Field
                  name="fromUser"
                  placeholder="E.g. Emplyee Name"
                  component={SearchInput}
                  // results={userEmployee}
                  onSearchChange={handleSearchEmployee}
                  labelName="From User"
                  mandatory={false}
                  disabled={true}
                  values={currentUser.fullName}
                  // defaultValue={currentUser.fullName}
                  // value={'Sarah Apriliana'}
                  // loading={isLoadingCustomer}
                  // handleSearchChange={handleSearchChangeCust}
                  // onResultSelect={onResultSelectCustomer}
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
                    JSON.parse(localStorage.getItem('detailDelegation'))?.length === 0 ||
                    JSON.parse(localStorage.getItem('detailDelegation'))?.filter((item) => item.isDelete !== 1).length === 0
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

export default DelegationFormEdit;
