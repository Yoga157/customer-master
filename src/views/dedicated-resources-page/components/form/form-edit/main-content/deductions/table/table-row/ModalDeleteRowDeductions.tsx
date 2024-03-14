import React, { useState, Fragment } from 'react';
import { Grid, Divider, Card } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { combineValidators, isRequired } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import * as DedicatedResourcesActions from 'stores/dedicated-resources/DedicatedResourcesActions';

interface IProps {
  id: any;
  setDataDeductions?: any;
  flag: string;
  DataDeductions?: any;
  tempDeductions?: any;
  setTempDeductions?: any;
}

const validate = combineValidators({
});

const ModalDeleteRowDeductions: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { id, DataDeductions, flag, setDataDeductions, tempDeductions, setTempDeductions } = props;
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmit = () => {
    if (flag === 'BulkUpdate') {
      let filteredArray = DataDeductions.filter(item => item.deductDesc !== id)
      setDataDeductions(filteredArray)
      let filterTempArray = tempDeductions.filter(item => item.deductDesc !== id)
      setTempDeductions(filterTempArray)
      onClose()
    } else {
      dispatch(DedicatedResourcesActions.requestDelDeduction(id)).then(() => {
        onClose()
      })
    }
  }

  return (
    <Fragment>
      <Card.Header>Delete Deductions</Card.Header>
      <Divider></Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h3>Are You Sure To Remove Deduction Number?</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h4>{id}</h4>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button color="blue" floated="right" content="Submit" onClick={() => onSubmit()} />
            <Button type="button" floated="right" content="Cancel" onClick={() => onClose()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default ModalDeleteRowDeductions;
