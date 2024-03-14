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

interface IProps {
//   id: number;
    // type: string;
    item: any;
}

const validate = combineValidators({
});

const ModalDeleteRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { item } = props;
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };
  const onSubmit = () => {
    dispatch(CreditBillingActions.deleteCreditBilling(item.creditId)).then(() => {
      onClose()
      // dispatch(CreditBillingActions.requestCreditBillings(currentUser.employeeID, '','','', activePage, pageSize))
    })
  }

  return (
    <Fragment>
      <Card.Header>Delete Voucher</Card.Header>
      <Divider></Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h3>Are You Sure To Remove Voucher Main CBV?</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column textAlign='center'>
                <h4>{item.voucherNo}</h4>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <Button color="blue" floated="right" content="Submit" onClick={() => onSubmit()} />
                <Button type="button" floated="right" content="Cancel" onClick={() => onClose()}  />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default ModalDeleteRow;
