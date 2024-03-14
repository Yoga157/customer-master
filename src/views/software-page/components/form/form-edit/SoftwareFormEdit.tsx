//import './BrandModelFormEditStyle.scss';
import React, { useState, useCallback } from 'react';
import { Grid, Confirm } from 'semantic-ui-react';
import { Button } from 'views/components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { History } from 'history';
//import ChangePM from './main-content/brand-change-pm/ChangePM';
import { SoftwareToolEditForm, SoftwareToolList } from './main-content';

interface IProps {
  id: number;
  history: History;
}

const SoftwareFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { id } = props;

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <SoftwareToolEditForm history={props.history} id={id} /> <br />
          <SoftwareToolList id={id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SoftwareFormEdit;
