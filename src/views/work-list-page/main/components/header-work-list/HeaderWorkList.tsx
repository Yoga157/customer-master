import React, { useState, useEffect, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Form } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import HeaderTicketPlaceholder from './HeaderWorkListPlaceholder';
import styles from './HeaderWorkList.module.scss';
import { LabelName } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {}

const HeaderWorkList: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const {} = props;
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);

  // const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onSubmitHandler = (values: any) => {};

  useEffect(() => {}, [dispatch]);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, []));

  const initialValues = {
    projectId: '123123',
    projectName: 'Project Gundam OO Riser',
    pmoS: 'Nicholas Raizen',
    customerName: 'Nicholas Raizen',
  };

  let form = <HeaderTicketPlaceholder />;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={initialValues}
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
                  <Field name="pmoS" component={LabelName} labelName="PMO/S" placeholder="e.g.01234" />
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

export default HeaderWorkList;
