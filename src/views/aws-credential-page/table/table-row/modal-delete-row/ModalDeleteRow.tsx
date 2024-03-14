import React, { Fragment } from 'react';
import { Grid, Divider, Image } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as AWSCredentialActions from 'stores/aws-credential/AWSCredentialActions';

interface IProps {
  item: any;
}

const Confirm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { item } = props;
  const dispatch: Dispatch = useDispatch();
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmit = () => {
    dispatch(AWSCredentialActions.deleteAWSCredential(item.accessKey)).then(() => {
      onClose();
    });
  };
  return (
    <Fragment>
      <Grid padded>
        <Image className="pv-1r" src={'/assets/info.png'} size="small" centered rounded />
        <Grid.Row>
          <Grid.Column textAlign="center">
            <p>Are You Sure want to DELETE this AWS Credential ?</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h4>
              {item.awsid} - {item.secretKey}
            </h4>
          </Grid.Column>
        </Grid.Row>
      </Grid> 
      <Divider></Divider>
      <Button floated="right" color="blue" content="Keep it" onClick={() => onClose()} />
      <Button floated="right" type="button" content="Delete" onClick={() => onSubmit()} />
    </Fragment>
  );
};

export default Confirm;
