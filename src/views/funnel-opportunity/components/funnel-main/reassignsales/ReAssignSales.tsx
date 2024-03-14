import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, Button } from 'views/components/UI';
import * as CustomerTransferActions from 'stores/customer-transfer/CustomerTransferActions';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { selectEmployeeOptions } from 'selectors/select-options';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import classes from './ReAssignSales.module.scss';
import { combineValidators, isRequired } from 'revalidate';
import { InsertModel } from 'stores/customer-transfer/models/CustomerTransferModel';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as FunnelOpportunityA from 'stores/funnel-opportunity/FunnelActivityActions';
import ReassignModel from 'stores/funnel-opportunity/models/ReassignModel';

interface IProps {
  funnelOpportunityID: number;
  salesFromText: string;
}

const ReAssignSales: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage] = useState(1);

  const [toSales, setToSales] = useState(0);

  const ChangeComboToSales = (event: any) => {
    setToSales(event);
  };

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelOpportunity.refreshPage);

  const CloseModal = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = () => {
    const newValues = new ReassignModel({});
    newValues.funnelOpportunityID = Number(props.funnelOpportunityID);
    newValues.salesID = toSales;
    newValues.userLoginID = Number(currentUser.employeeID);

    dispatch(FunnelOpportunityA.requestReassignSales(newValues));
  };

  if (bRefreshPage) {
    dispatch(FunnelOpportunityA.requestFunnelSales(1, 10, currentUser.employeeID));
    CloseModal();
    dispatch(ToastsAction.add('Success', ToastStatusEnum.Success));
  }

  useEffect(() => {
    dispatch(EmployeeActions.requestEmployee());
  }, [dispatch]);

  const validate = combineValidators({
    toSales: isRequired('Transfer To'),
  });

  const employeeStore = useSelector((state: IStore) => selectEmployeeOptions(state));

  return (
    <Fragment>
      <FinalForm
        validate={validate}
        onSubmit={onSubmitHandler}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <h4 className={classes.TitleLabel}>ReAssign Sales OpportunityID#{props.funnelOpportunityID}</h4>
            <br />
            <br />
            <label className={classes.Label}>Sales Name </label>
            <label className={classes.mandatory}> * </label>
            <br></br>
            <h2 className="mt-0">{props.salesFromText} </h2>
            <Field
              name="toSales"
              component={SelectInput}
              options={employeeStore}
              onChanged={ChangeComboToSales}
              placeholder="Transfer To"
              labelName="Transfer To"
            />
            <Button floated="right" color="blue" disabled={pristine || invalid}>
              Submit
            </Button>
            <Button floated="right" onClick={CloseModal}>
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ReAssignSales;
