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
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  funnelGenID: number;
  funnelID: string;
  salesFrom: number;
  salesFromText: string;
  tabItem: string;
}

const ReAssignSales: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage] = useState(1);

  const [toSales, setToSales] = useState(0);

  const ChangeComboToSales = (event: any) => {
    setToSales(event);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerTransferActions.POST_CUSTOMERTRANSFER]));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.customerTransfer.refreshPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);

  const CloseModal = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = () => {
    const newValues = new InsertModel({
      salesIDFrom: Number(props.salesFrom),
      salesIDTo: Number(toSales),
      createUserID: currentUser.employeeID,
      listFunnelID: [props.funnelGenID],
    });

    dispatch(CustomerTransferActions.postCustomerTransfer(newValues));
  };

  if (bRefreshPage) {
    if (props.tabItem === 'salesAnalysis') {
      dispatch(FunnelActions.requestSA(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', activePage, pageSize));
      dispatch(FunnelActions.setActivePage(1));
    } else {
      if (search !== null) {
        dispatch(FunnelActions.requestSearchFunnel(currentUser.employeeID, search.text, 1, 15, 'funnel', 'funnelGenID', 'descending'));
      } else if (filter !== null) {
        const filterNew = new FunnelFilter(filter);
        filterNew.pageSize = 15;
        filterNew.page = 1;
        filterNew.column = 'funnelGenID';
        filterNew.sorting = 'descending';
        filterNew.type = 'funnel';
        dispatch(FunnelActions.postFunnelFilter(filterNew));
      } else {
        dispatch(FunnelActions.requestFunnel(currentUser.employeeID, currentUser.role, 'funnelGenID', 'descending', 'funnel', activePage, pageSize));
      }
      dispatch(FunnelActions.setActivePage(1));
    }
    dispatch(CustomerTransferActions.requestCustomerTransfer(+props.salesFrom, activePage, pageSize, currentUser.role));
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
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <h4 className={classes.TitleLabel}>ReAssign Sales FunnelID#{props.funnelID}</h4>
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
            <Button floated="right" color="blue">
              Submit
            </Button>
            <Button floated="right" onClick={CloseModal} disaled={isRequesting}>
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ReAssignSales;
