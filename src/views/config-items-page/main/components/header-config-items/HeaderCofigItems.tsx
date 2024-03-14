import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Form, Icon } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { Dispatch } from 'redux';

import { SelectFunnelStatus, DateName, Button, LabelName, Tooltips } from 'views/components/UI';
import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import HeaderCofigItemsPlaceholder from './HeaderCofigItemsPlaceholder';
import PMOEditStatusPlaceholder from './HeaderCofigItemsPlaceholder';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import styles from './HeaderCofigItems.module.scss';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: string;
  projectId: string;
  history: History;
}

const HeaderCofigItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID, projectId } = props;
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.CONFIG_ITEMS_HEADER]));
  // const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const configHeader = useSelector((state: IStore) => state.configItems.configHeader);

  const onHeaderSubmitHandler = (e: Event) => {
    if (disableComponent) {
      setDisableComponent(false);
    }
  };

  const onChangeStatus = (values: any) => {};

  const onCancel = () => {
    if (!disableComponent) {
      setDisableComponent(true);
    }
  };

  const onSubmitHandler = (values: any) => {};

  useEffect(() => {}, [dispatch, funnelGenID]);

  const initialValues = {
    projectName: configHeader?.projectName,
    pmoS: configHeader?.employeeName,
    projectAlias: configHeader?.projectAlias.split(','),
    customerName: configHeader?.customerName,
  };

  let form = <HeaderCofigItemsPlaceholder />;
  if (!isRequesting) {
    form = (
      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={initialValues}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid stackable padded>
              <Grid.Row className=" mt-1r">
                <Grid.Column>
                  <Header as="h4">
                    <Header.Content>CONFIG ITEMS</Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column className={' FullGrid767 HalfGrid1200 '}>
                  <Field name="projectName" component={LabelName} labelName="Project Name" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className="HalfGrid1200">
                  <Field name="pmoS" component={LabelName} labelName="PMO/S" placeholder="e.g.01234" />
                </Grid.Column>
                <Grid.Column className={`HalfGrid1200 ${styles.projectAlias}`}>
                  <Field name="pmoSe" component={LabelName} labelName="Project Alias" placeholder="e.g.01234" />
                  {initialValues?.projectAlias?.map((item: any, index: number) => (
                    <Button type="button" size="mini" className="text-gray" key={index}>
                      {item}
                    </Button>
                  ))}
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

export default HeaderCofigItems;
