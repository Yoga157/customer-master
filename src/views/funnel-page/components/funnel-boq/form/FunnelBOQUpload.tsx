import React, { useEffect, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'views/components/UI';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import * as BOQActions from 'stores/boq/BOQActions';
import * as ToastAction from 'stores/toasts/ToastsAction';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';

import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import FunnelBOQUploadFailed from './FunnelBOQUploadFailed';
import { selectResultBoq } from 'selectors/boq/BoqSelector';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  funnelGenID: number;
}
const FunnelBOQUpload: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [fileBoq, setFileBoq] = useState('');
  const { funnelGenID } = props;

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BOQActions.POST_UPLOAD_BOQ]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.funnelBoq.refreshPage);

  // POST_UPLOAD_BOQ;

  const onSubmitHandler = (values: any) => {
    const data = new FormData();
    data.append('userID', currentUser.employeeID.toString());
    data.append('funnelGenID', funnelGenID.toString());
    data.append('file', fileBoq);

    dispatch(BOQActions.postFileBoq(data));
  };

  const onChangeFile = (e: any) => {
    setFileBoq(e.target.files[0]);
  };

  const resultBoq = useSelector((state: IStore) => selectResultBoq(state));
  const result = useSelector((state: IStore) => state.funnelBoq.resultActions);

  if (bRefreshPage) {
    if (resultBoq?.length > 0) {
      dispatch(ModalSecondLevelActions.OPEN(<FunnelBOQUploadFailed />, ModalSizeEnum.Large));
      dispatch(BOQActions.requestBoqByFunnelGenID(funnelGenID, 1, 5));
    } else {
      dispatch(BOQActions.requestBoqByFunnelGenID(funnelGenID, 1, 5));
      dispatch(ModalSecondLevelActions.CLOSE());
    }
  }

  useEffect(() => {
    if (result?.errorNumber === '666') {
      dispatch(ToastAction.add(result.message, ToastStatusEnum.Warning));
      dispatch(BOQActions.removeResult());
    }
  }, [result]);

  return (
    <FinalForm
      //validate={validate}
      onSubmit={(values: any) => onSubmitHandler(values)}
      //initialValues={serviceCatalog}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header>Upload BOQ</Card.Header>
          <Divider />
          <input type="file" name="imageFile" onChange={onChangeFile} />
          <Grid>
            <Grid.Column>
              <Button className="mt-1r" color="blue" floated="right" content="Upload" disabled={fileBoq.length === 0 || isRequesting} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default FunnelBOQUpload;
