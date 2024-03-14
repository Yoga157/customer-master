import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { combineValidators, composeValidators, createValidator, isRequired } from 'revalidate';

import SalesAnalystSubmitApprovalModel from 'stores/funnel-sales-analyst/funnel-sa/models/SalesAnalystSubmitApprovalModel';
import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import { Button, RichTextEditor, RadioButton, SelectInput } from 'views/components/UI';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: string;
  page?: string;
  // supportRoleID: number;
}
const FormDirectManagerApproval: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, page } = props;

  const dispatch: Dispatch = useDispatch();
  const [valueRadio, setValueRadio] = useState('');
  const [disableRole, setDisableRole] = useState(true);
  const [supportRoleID, setSupportRoleID] = useState(27 as any);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL,
      SupportRoleActions.REQUEST_SUPPORT_ROLE,
      EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE,
    ])
  );
  const supportRoleOptions = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));

  const handleChange = (e) => setValueRadio(e);
  const onCloseHandler = () => {
    dispatch(FunnelActions.setActivePage(1));
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new SalesAnalystSubmitApprovalModel(values);
    newItems.userLogin = currentUser.employeeID;
    newItems.funnelGenID = +funnelGenID;
    newItems.process = valueRadio;

    newItems.role = values.supportRoleID ? values.supportRoleID : supportRoleID;
    newItems.assignedTo = values.employeeID ? values.employeeID : currentUser.employeeID;

    dispatch(FunnelSalesAnalystActions.requestPostFunnelAnalystSubmitApproval(newItems)).then(() => {
      if (page === 'funnel-list-sa') {
        if (search !== null) {
          dispatch(FunnelActions.requestSearchSA(currentUser.employeeID, search.text, 1, 15, 'funnelGenID', 'descending'));
        } else if (filter !== null) {
          const filterNew = new FunnelFilter(filter);
          filterNew.pageSize = 15;
          filterNew.page = 1;
          filterNew.column = 'funnelGenID';
          filterNew.sorting = 'descending';
          filterNew.type = 'funnel';
          dispatch(FunnelActions.postSAFilter(filterNew));
        } else {
          dispatch(FunnelActions.requestSA(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 1, 15));
        }
        onCloseHandler();
      } else {
        dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+funnelGenID));
        onCloseHandler();
      }
    });
  };

  const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);
  useEffect(() => {
    if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
      dispatch(FunnelSalesAnalystActions.removeResult());
    }
  }, [resultMessage]);

  useEffect(() => {
    if (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') {
      dispatch(SupportRoleActions.requestSupportRole());
    }
  }, []);

  useEffect(() => {
    if (currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') {
      let supportRoleID = supportRoleOptions.find((item) => item.text === currentUser.role);
      if (typeof supportRoleID === 'object' && supportRoleID !== null) {
        dispatch(EmployeeActions.requestEmployeeByRole(supportRoleID.value));
        setSupportRoleID(supportRoleID.value);
      }
    }
  }, [supportRoleOptions]);

  const onChangeSupportRole = (value: any) => {
    dispatch(EmployeeActions.requestEmployeeByRole(value));
  };

  const isValidNote = createValidator(
    (message) => (value) => {
      const val = value?.replace(/\&nbsp;/g, '');
      if (
        value &&
        valueRadio === 'REJECTED' &&
        !val
          ?.replace(/<[^>]+>/g, '')
          ?.trim()
          ?.replace(/\s/g, '')
      ) {
        return message;
      } else if (!value && valueRadio === 'REJECTED') {
        return message;
      } else {
        return false;
      }
    },
    'Reasson is required!'
  );

  const validate = combineValidators({
    notes: composeValidators(isValidNote)(),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine, values }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header className="bold-8">{`Form Approval`}</Card.Header>
          <Divider />
          <Grid className="mb-0">
            <Grid.Row columns="equal">
              <Grid.Column textAlign="center" className="FullGrid767">
                <Field
                  name="approve"
                  component={RadioButton}
                  label="Approve"
                  checked={valueRadio === 'APPROVED'}
                  onChange={() => handleChange('APPROVED')}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" className="FullGrid767">
                <Field
                  name="reject"
                  component={RadioButton}
                  label="Reject"
                  checked={valueRadio === 'REJECTED'}
                  onChange={() => handleChange('REJECTED')}
                />
              </Grid.Column>
            </Grid.Row>
            {(currentUser.role === 'PMO' || currentUser.role === 'PMOS' || currentUser.role === 'SMO') && (
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column className="FullGrid767" width={16}>
                    <Field
                      name="supportRoleID"
                      component={SelectInput}
                      placeholder="Role Type"
                      labelName="Role Type"
                      options={supportRoleOptions}
                      onChanged={onChangeSupportRole}
                      disabled={disableRole}
                      values={supportRoleID}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767" width={16}>
                    <Field name="employeeID" component={SelectInput} placeholder="Team Name" labelName="Team Name" options={employeeOptions} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}

            <Grid.Row>
              <Grid.Column>
                <Field
                  name="notes"
                  editorId="approval"
                  mandatorys={valueRadio === 'APPROVED' || !valueRadio ? true : false}
                  component={RichTextEditor}
                  placeholder=""
                  labelName="Reasson"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button className="mr-3r " color="blue" floated="right" content="Submit" disabled={invalid || !valueRadio || isRequesting} />
          <Button className="ml-3r " floated="left" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default FormDirectManagerApproval;
