import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { DateInput, Button, Tooltips } from 'views/components/UI';
import IStore from 'models/IStore';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import POCRequestModel from 'stores/funnel-poc-request/models/POCRequestModel';
import * as POCActions from 'stores/funnel-poc-request/POCActions';
import { selectPOCRequest } from 'selectors/funnel-poc-request/POCSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectTotalPOCCompleted } from 'selectors/funnel-poc-requirement/POCRequirementSelector';

interface IProps {
  pocGenHID: number;
}

const POCFormEditImplementor: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [customerSuccessFactor, setCustomerSuccessFactor] = useState('' as any);
  const [disableComponent, setDisableComponent] = useState(true);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.poc.refreshPage);

  const { pocGenHID } = props;

  useEffect(() => {
    dispatch(POCActions.requestPOCByPOCGenHID(pocGenHID));
  }, [dispatch]);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onSubmitHandler = (values: any) => {
    const newItem = new POCRequestModel(values);
    newItem.pocGenHID = pocGenHID;
    newItem.modifyUserID = currentUser.employeeID;
    newItem.createUserID = currentUser.employeeID;
    dispatch(POCActions.putPOCActualDate(newItem));

    if (!isRequesting) {
      if (!disableComponent) {
        setDisableComponent(true);
      }
    }
  };
  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
      //dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID))
    }
  };

  if (bRefreshPage) {
    dispatch(POCActions.requestPOCByPOCGenHID(pocGenHID));
  }

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [POCActions.REQUEST_POC, POCActions.PUT_POC_ACTUAL_DATE]));
  const pocRequest = useSelector((state: IStore) => selectPOCRequest(state));
  const totalCompleted = useSelector((state: IStore) => selectTotalPOCCompleted(state));

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      initialValues={pocRequest}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header>
                  <Header.Content>Implementor</Header.Content>
                  <Header.Content>
                    {currentUser.role === 'Presales' && disableComponent && (
                      <Tooltips
                        content="Edit POC Implementor"
                        trigger={<Button basic type="button" compact icon="edit" onClick={(e: Event) => onHeaderSubmitHandler(e)} />}
                      />
                    )}
                    {currentUser.role === 'Presales' && !disableComponent && (
                      <Fragment>
                        <Tooltips content="Cancel" trigger={<Button type="button" basic compact icon="cancel" onClick={onCancel} />} />
                        <Tooltips content="Save POC" trigger={<Button basic compact icon="save" disabled={totalCompleted === 0} />} />
                      </Fragment>
                    )}
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="pocActualDate"
                  component={DateInput}
                  labelName="Actual POC Date"
                  placeholder="e.g.09/09/2020"
                  date={true}
                  disabled={disableComponent}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default POCFormEditImplementor;
