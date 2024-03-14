import React, { useEffect, useState } from 'react';
import { Grid, Card, Divider, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as FunnelSalesAnalystActions from 'stores/funnel-sales-analyst/funnel-sa/FunnelSalesAnalystActions';
import CancelProjectModel from 'stores/funnel-sales-analyst/funnel-sa/models/CancelProjectModel';
import * as ButtonToggle from 'stores/funnel-sales-analyst/button-toggle/ButtonToggleActions';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { Button, RichTextEditor, RadioButton } from 'views/components/UI';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelSearch from 'stores/funnel/models/FunnelSearch';
import IUserResult from 'selectors/user/models/IUserResult';
import * as ToastAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import IStore from 'models/IStore';

// import AccordionRequestProjectOpen from '../accordian/AccordionRequestProjectOpen';

interface IProps {
  funnelGenID: number;
  page?: string;
}
const CancelProject: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { funnelGenID, page } = props;
  const [valueRadio, setValueRadio] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_CANCEL_PROJECT])
  );
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const filter: FunnelFilter = useSelector((state: IStore) => state.funnel.data.filter);
  const search: FunnelSearch = useSelector((state: IStore) => state.funnel.data.search);

  const handleChange = (e) => setValueRadio(e);

  const onCloseHandler = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitHandler = (values: any) => {
    const newItems = new CancelProjectModel(values);
    newItems.userLoginID = currentUser.employeeID;
    newItems.funnelGenID = funnelGenID;
    newItems.process = valueRadio;

    dispatch(FunnelSalesAnalystActions.requestPostFunnelCancelProject(newItems)).then(() => {
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
      } else {
        dispatch(FunnelActions.requestFunnelById(+funnelGenID));
        dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));
        dispatch(FunnelSalesAnalystActions.requestGetFunnelAnalystWorkflow(+funnelGenID));
        dispatch(ButtonToggle.CLOSE());
      }
      onCloseHandler();
    });
  };

  const resultMessage = useSelector((state: IStore) => state.funnelSalesAnalyst.resultActions);
  useEffect(() => {
    if (resultMessage?.errorNumber === '666') {
      dispatch(ToastAction.add(resultMessage.message, ToastStatusEnum.Warning));
      dispatch(FunnelSalesAnalystActions.removeResult());
    }
  }, [resultMessage]);

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
          <Card.Header className="bold-8">Cancel Project</Card.Header>
          <Divider />
          <Grid className="mb-0">
            <Grid.Row columns="equal" className="pv-05r mt-px-4">
              <Grid.Column textAlign="left" className="FullGrid767">
                <Field
                  name="close-win"
                  component={RadioButton}
                  label="Roll back project status to 'CLOSE WIN'"
                  checked={valueRadio === 'close-win'}
                  onChange={() => handleChange('close-win')}
                />
                <Field
                  name="terminat"
                  className="text-danger"
                  component={RadioButton}
                  label="Terminated this project"
                  checked={valueRadio === 'terminat'}
                  onChange={() => handleChange('terminat')}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pv-05r">
              <Grid.Column>
                <Field name="notes" component={RichTextEditor} placeholder="" labelName="Reasson" mandatorys={false} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button className="mr-3r " color="blue" floated="right" content="Submit" disabled={invalid || isRequesting} />
          <Button className="ml-3r " floated="left" type="button" content="Cancel" onClick={onCloseHandler} />
          {/* <AccordionRequestProjectOpen /> */}
        </Form>
      )}
    />
  );
};

export default CancelProject;
