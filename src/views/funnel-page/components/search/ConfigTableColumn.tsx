import React, { useEffect, useState } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import styles from './ConfigTableColumn.module.scss';
import { Button, CheckBox, DropdownClearInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { totalSellingRangeOptions } from 'constants/totalSellingRangeOptions';
import * as SidebarContainerActions from 'stores/sidebar-containers/SidebarContainerActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import FunnelConfigColumnModel from 'stores/funnel/models/FunnelConfigColumnModel';

interface IProps {}

const ConfigTableColumn: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [valuesChk, setValuesChk] = useState({} as FunnelConfigColumnModel);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const columns = useSelector((state: IStore) => state.funnel.columns);

  useEffect(() => {
    setValuesChk(columns);
  }, [dispatch, columns]);

  const onSubmitHandler = (values: any) => {};

  const onCancel = () => {
    dispatch(SidebarContainerActions.CLOSE());
  };

  const handleChecked = (e: any, checked: any, field: any) => {
    console.log('e checked field', checked.input, field);

    const items = new FunnelConfigColumnModel({});
    //items.funnelGenID = false;

    dispatch(FunnelActions.setColumns(items));
  };

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={viewFunnelSelling}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid padded columns="equal">
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <Header as="h3" inverted dividing>
                  <Header.Content className={styles.FilterTitle}>Config Column</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid padded columns="equal" className={styles.divider}>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <h4 className={styles.FilterSubtitle}>Total Selling Value Range</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className={styles.itemFields} columns="equal" verticalAlign="middle">
            <Grid.Column textAlign="left" className="pt-1r pb-0">
              <Header as="span">
                <Header.Content>Funnel Id</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
              <span>HIDE</span>
              <span>
                <Field
                  name={'funnelGenID'}
                  toggle
                  component={CheckBox}
                  // disabled={disableComponent}
                  //checked={valuesChk.funnelGenID}
                  onChange={(e, checked) => handleChecked(e, checked, 'funnelGenID')}
                />
              </span>
              <span>SHOW</span>
            </Grid.Column>
          </Grid>
          <Grid className={styles.itemFields} columns="equal" verticalAlign="middle">
            <Grid.Column textAlign="left" className="pt-1r pb-0">
              <Header as="span">
                <Header.Content>Sales Name</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right" className="pt-1r pb-0 item-toggle" verticalAlign="middle">
              <span>HIDE</span>
              <span>
                <Field
                  name={'salesName'}
                  toggle
                  component={CheckBox}
                  // disabled={disableComponent}
                  //checked={valuesChk.salesName}
                  onChange={(e, checked) => handleChecked(e, checked, 'salesName')}
                />
              </span>
              <span>SHOW</span>
            </Grid.Column>
          </Grid>

          <Grid padded columns="equal" className="mt-5">
            <Grid.Row columns={1}>
              <Grid.Column width={16} className={styles.PadBtnFilter}>
                <Button type="button" fluid onClick={onCancel}>
                  Close
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ConfigTableColumn;
