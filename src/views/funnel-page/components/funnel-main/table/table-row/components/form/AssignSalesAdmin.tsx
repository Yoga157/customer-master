import React, { useEffect, useState } from 'react';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { combineValidators } from 'revalidate';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';

import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import { selectSupportRoleOptions } from 'selectors/select-options/SupportRoleSelector';
import { InsertModel } from 'stores/customer-transfer/models/CustomerTransferModel';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as SupportRoleActions from 'stores/support-role/SupportRoleActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IFunnelTableRow from 'selectors/funnel/models/IFunnelTableRow';
import { Button, SelectInput, TextInput } from 'views/components/UI';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import { selectEmployeeOptions } from 'selectors/select-options';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectFunnel } from 'selectors/funnel/FunnelSelector';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  rowData: IFunnelTableRow;
  page: string;
}

const AssignSalesAdmin: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const [assignTo, setAssignTo] = useState(0);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelSalesAnalystActions.REQUEST_POST_ASSIGN_SALES_ADMIN,
      EmployeeActions.REQUEST_EMPLOYEE_BY_ROLE,
      SupportRoleActions.REQUEST_SUPPORT_ROLE,
      FunnelActions.REQUEST_FUNNEL,
    ])
  );
  const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);
  const supportRoleOptions = useSelector((state: IStore) => selectSupportRoleOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);
  const employeeOptions = useSelector((state: IStore) => selectEmployeeOptions(state));
  const funnel = useSelector((state: IStore) => selectFunnel(state));

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newValues = new InsertModel({
      salesIDFrom: 0,
      salesIDTo: Number(assignTo),
      createUserID: currentUser.employeeID,
      listFunnelID: [rowData.funnelGenID],
    });

    dispatch(FunnelSalesAnalystActions.postAssignSalesAdmin(newValues));
  };

  useEffect(() => {
    if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
      dispatch(FunnelSalesAnalystActions.removeResult());
    } else if (resultMessage?.errorNumber === '0') {
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

      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Success));
      dispatch(FunnelSalesAnalystActions.removeResult());
      dispatch(FunnelActions.setActivePage(1));
      onCloseHandler();
    }
  }, [resultMessage]);

  useEffect(() => {
    if (currentUser.role === 'Sales Admin') {
      dispatch(SupportRoleActions.requestSupportRole());
      dispatch(FunnelActions.requestFunnelById(rowData.funnelGenID));
    }
  }, []);

  useEffect(() => {
    if (currentUser.role === 'Sales Admin') {
      let supportRoleID = supportRoleOptions.find((item) => item.text === currentUser.role);
      if (typeof supportRoleID === 'object' && supportRoleID !== null) {
        dispatch(EmployeeActions.requestEmployeeByRole(supportRoleID.value));
      }
    }
  }, [supportRoleOptions]);

  const onChangeAssignTo = (onChangeAssignTo) => {
    setAssignTo(onChangeAssignTo);
  };

  const defaultValue = {
    salesName: funnel?.salesAdmin,
  };

  const validate = combineValidators({
    // reasson: isRequired('Reasson'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={defaultValue}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header className="bold-8">{`Assign Sales Admin : ${rowData.saNumber}`}</Card.Header>
          <Divider />
          <Grid className="mb-0 mt-1r">
            <Grid.Row columns={1}>
              <Grid.Column className="ViewLabel">
                <Field
                  name="salesName"
                  component={TextInput}
                  placeholder="e.g. Sales Admin"
                  labelName="Sales Admin"
                  mandatory={false}
                  disabled={true}
                />
              </Grid.Column>
              <Grid.Column className="ViewLabel">
                <Field
                  name="AssignTo"
                  component={SelectInput}
                  placeholder="e.g. Assign To"
                  labelName="Assign To"
                  options={employeeOptions}
                  values={assignTo}
                  onChanged={onChangeAssignTo}
                  mandatory={false}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button color="blue" floated="right" content="Submit" disabled={isRequesting || assignTo === 0} />
          <Button className="ml-3r " floated="right" type="button" content="Cancel" onClick={onCloseHandler} />
        </Form>
      )}
    />
  );
};

export default AssignSalesAdmin;
