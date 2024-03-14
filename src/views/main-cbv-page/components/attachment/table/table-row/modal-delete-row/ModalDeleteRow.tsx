import React, { useState } from 'react';
import { Grid, Divider,  Image,  } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';

interface IProps {
  item: any;
  userLoginId: number;
}

const Confirm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { item, userLoginId } = props;
  const dispatch: Dispatch = useDispatch();
  const onClose = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  const onSubmit = () => {
    dispatch(CreditBillingActions.deleteAttachmentBilling(item.attachmentId, userLoginId))
    onClose()
  }
  return (
    <>
    <Grid> 
      <Image src="/assets/info.png" size='small' centered rounded />
      <Grid.Row>
          <Grid.Column textAlign='center'>
              <p>Are You Sure want to DELETE this Attachment ?</p>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column textAlign='center'>
              <h4>{item.documentName}</h4>
          </Grid.Column>
      </Grid.Row>
      <Divider></Divider>
      <Grid.Row >
          <Grid.Column textAlign='center'>
              <Button type="button" content="Delete" onClick={() => onSubmit()} />
              <Button color="blue" content="Keep it" onClick={() => onClose()} />
          </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
  );
};

export default Confirm;
