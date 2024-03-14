import React, { useState } from 'react';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectConfigProductDetail } from 'selectors/config-items/ConfigItemSelector';
import * as ModalFirstActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { Button } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {
  funnelGenID: number;
}
const ConfigItemSNBottom: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [fileConfigItemsSN, setFileConfigItemsSN] = useState('');

  const productDetail: IConfigItemsTable = useSelector((state: IStore) => selectConfigProductDetail(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);

  const onSubmitHandler = (values: any) => {
    const data = new FormData();

    data.append('ModifyDate', moment().format('YYYY-MM-DDTHH:mm:ss.SSS'));
    data.append('ModifyUserID', `${currentUser.employeeID}`);
    data.append('File', fileConfigItemsSN);

    data.append('ProjectId', state?.projectId);
    data.append('FunnelGenId', state?.funnelGenID);
    data.append('ProductNumber', selectProduct.productNumber);

    dispatch(ConfigItemsActions.reqPutBulkSerialNumber(data)).then(() => {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductDetail(
            1,
            5,
            productDetail.column,
            productDetail.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            selectProduct.productNumber,
            selectProduct.doNumber,
            serialNumber
          )
        );
      dispatch(ConfigItemsActions.setActivePageProductDetail(1));
      dispatch(ModalFirstActions.CLOSE());
    });
  };

  const onChangeFile = (e: any) => {
    setFileConfigItemsSN(e.target.files[0]);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.PUT_BULK_SERIAL_NUMBER]));

  return (
    <FinalForm
      onSubmit={(values: any) => onSubmitHandler(values)}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={isRequesting}>
          <Card.Header>Upload Config Items</Card.Header>
          <Divider />
          <input type="file" name="imageFile" onChange={onChangeFile} />
          <Grid>
            <Grid.Column>
              <Button className="mt-1r" color="blue" floated="right" content="Upload" disabled={isRequesting || !fileConfigItemsSN} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    />
  );
};

export default ConfigItemSNBottom;
