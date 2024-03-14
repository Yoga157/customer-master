import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';

import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import ReOpenProjectModel from 'stores/funnel-sales-analyst/funnel-sa/models/ReOpenProjectModel';
import { Button, RichTextEditor, RadioButton, CheckBoxInput } from 'views/components/UI';
import AccordionRequestProjectOpen from '../accordian/AccordionRequestProjectOpen';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: number;
  page?: string;
}
const RequestProjectOpen: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, page } = props;
  const dispatch: Dispatch = useDispatch();

  const [valueRadio, setValueRadio] = useState('');

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);
  const approval = useSelector((state: IStore) => state.funnelSalesAnalyst.isApproval);

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };
  const handleChange = (e) => setValueRadio(e);

  const onSubmitHandler = (values: any) => {
    const newItems = new ReOpenProjectModel(values);
    newItems.userLoginID = currentUser.employeeID;
    newItems.funnelGenID = funnelGenID;
    newItems.process = approval?.isApproval === 1 ? valueRadio : '';
    newItems.flagGPM = values.isLockGpm ? 1 : 0;

    dispatch(FunnelSalesAnalystActions.requestPostFunnelReOpenProject(newItems)).then(() => {
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
        dispatch(FunnelActions.setActivePage(1));
      } else {
        dispatch(FunnelSalesAnalystActions.checkUserReopenApproval(funnelGenID, currentUser.employeeID));
        dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+funnelGenID));
      }

      dispatch(FunnelActions.requestFunnelById(+funnelGenID));
      onCloseHandler();
    });
  };

  useEffect(() => {
    dispatch(FunnelSalesAnalystActions.checkUserReopenApproval(funnelGenID, currentUser.employeeID));
    dispatch(FunnelSalesAnalystActions.getActivityReqReopenSA(funnelGenID));
  }, []);

  const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);
  useEffect(() => {
    if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
      dispatch(FunnelSalesAnalystActions.removeResult());
    }
  }, [resultMessage]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_REOPEN_PROJECT])
  );

  const validate = combineValidators({
    notes: isRequired('Reasson'),
  });

  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header className="bold-8">Request Project Open</Card.Header>
          <Divider />
          <Grid className="mb-1r">
            {page !== 'funnel-list-sa' && (
              <>
                <Grid.Row columns="equal" className="pv-05r mt-px-4">
                  {approval?.isApproval === 1 && (
                    <>
                      <Grid.Column textAlign="center" className="FullGrid767">
                        <Field
                          name="approved"
                          component={RadioButton}
                          label="Approve"
                          checked={valueRadio === 'approved'}
                          onChange={() => handleChange('approved')}
                        />
                      </Grid.Column>
                      <Grid.Column textAlign="center" className="FullGrid767">
                        <Field
                          name="rejected"
                          component={RadioButton}
                          label="Reject"
                          checked={valueRadio === 'rejected'}
                          onChange={() => handleChange('rejected')}
                        />
                      </Grid.Column>
                    </>
                  )}
                </Grid.Row>
              </>
            )}

            <Grid.Row className="pv-05r">
              <Grid.Column>
                <Field name="notes" component={RichTextEditor} placeholder="" labelName="Reasson" mandatorys={false} />
              </Grid.Column>
            </Grid.Row>

            {page !== 'funnel-list-sa' && (
              <>
                <Grid.Row className="pv-05r mt-px-4" textAlign="right">
                  {approval?.isApproval === 1 && (
                    <Grid.Column textAlign="right" className="FullGrid767">
                      <Field name="isLockGpm" component={CheckBoxInput} label="Lock GPM" />
                    </Grid.Column>
                  )}
                </Grid.Row>
              </>
            )}
          </Grid>
          <Button color="blue" floated="right" content="Submit" disabled={invalid || isRequesting} />
          <Button className="mr-1r" floated="right" type="button" content="Cancel" onClick={onCloseHandler} />

          <AccordionRequestProjectOpen />
        </Form>
      )}
    />
  );
};

export default RequestProjectOpen;
