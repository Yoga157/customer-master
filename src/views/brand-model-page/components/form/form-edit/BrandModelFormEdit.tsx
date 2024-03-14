import './BrandModelFormEditStyle.scss';
import React, { useState, useCallback } from 'react';
import { Grid, Confirm, Icon } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { History } from 'history';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import ChangePM from './main-content/brand-change-pm/ChangePM';
import { BrandEditForm, BrandEditStatusForm } from './main-content';
import { selectBrandModel } from 'selectors/brand-model/BrandModelSelector';

interface IProps {
  brandModelGenID: number;
  history: History;
  okConfirm: any;
  closeConfirm: any;
  contentConfirm: string;
  openConfirm: any;
}

const BrandModelFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  // const [openConfirm, setOpenConfirm] = useState(false);
  // const [contentConfirm, setContentConfirm] = useState('');

  // const closeConfirm = () => {
  //   setOpenConfirm(false);
  // };

  // const okConfirm = () => {
  //   setOpenConfirm(false);
  // };

  // const onInactive = () => {
  //   setOpenConfirm(true);
  //   setContentConfirm('Are you sure want to deactive this brand ?');
  // };

  const brandType = useSelector((state: IStore) => selectBrandModel(state));

  const onChangePM = useCallback((): void => {
    dispatch(ModalAction.OPEN(<ChangePM />, ModalSizeEnum.Mini));
  }, [dispatch]);


  return (
    <Grid>
      <Confirm
        open={props.openConfirm}
        content={props.contentConfirm}
        onCancel={props.closeConfirm}
        onConfirm={props.okConfirm}
        cancelButton="No"
        confirmButton="Yes"
        size="mini"
      />
      <Grid.Row columns={2}>
        {/* <Grid.Column className="FullGrid767">
          <Button type="button" color="yellow" onClick={onInactive}>
            {' '}
            <Icon name="eye slash" />
            Make Inactive
          </Button>
          <Button className="mt-1r-767" type="button" color="blue" onClick={onChangePM}>
            <Icon name="random" />
            Change PM
          </Button>
        </Grid.Column> */}
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <BrandEditStatusForm brandType={brandType} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <BrandEditForm brandType={brandType} />
        </Grid.Column>
      </Grid.Row>
      {/*<Grid.Row columns="equal">
                <Grid.Column>
                    <BrandServiceCatalogTable />
                </Grid.Column>
            </Grid.Row>
        <Grid.Row>
                <FunnelActivities funnelGenID={"0"} />
            </Grid.Row> */}
    </Grid>
  );
};

export default BrandModelFormEdit;
