import React, { useState, useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Form } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectHeaderTicket } from 'selectors/ticket/TicketSelector';
import HeaderTicketPlaceholder from './HeaderTicketPlaceholder';
import * as TicketActions from 'stores/ticket/TicketActions';
import styles from './HeaderTicket.module.scss';
import { LabelName } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {}

const HeaderTicket: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const {} = props;
  const dispatch: Dispatch = useDispatch();

  const location = useLocation<LocationState>();
  const state: any = location?.state!;

  const [disableComponent, setDisableComponent] = useState(true);
  const headerTicket: any = useSelector((state: IStore) => selectHeaderTicket(state));

  useEffect(() => {
    dispatch(TicketActions.getTicketHeader(+state?.projectId, +state?.funnelGenID));
  }, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [TicketActions.GET_TICKET_HEADER]));

  const onSubmitHandler = (values: any) => {};

  let form = <HeaderTicketPlaceholder />;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={headerTicket}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid stackable padded>
              <Grid.Row columns="equal" className={`mt-1r mb-1r ${styles.cardYellow}`}>
                <Grid.Column className={' FullGrid767 HalfGrid1200 '}>
                  <Field name="projectId" component={LabelName} labelName="Project ID" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className={' FullGrid767 HalfGrid1200 '}>
                  <Field name="projectName" component={LabelName} labelName="Project Name" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200">
                  <Field name="pmoName" component={LabelName} labelName="PMO/S" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className="FullGrid767 HalfGrid1200">
                  <Field name="customerName" component={LabelName} labelName="Customer Name" placeholder="e.g.Jhon Doe.." />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        )}
      />
    );
  }
  return <Fragment>{form}</Fragment>;
};

export default HeaderTicket;
