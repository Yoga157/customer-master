import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import fileDownload from 'js-file-download';
import { LocationState } from 'history';
import environment from 'environment';
import { Dispatch } from 'redux';
import axios from 'axios';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { ConfigItemUpload } from '../../../../form';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button } from 'views/components/UI';
import IStore from 'models/IStore';

function HeaderConfigProductDetail(props) {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [isLoading, setLoading] = useState(false);

  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);

  // const handleDownload = (url: string, filename: string) => {
  //   setLoading(true);
  //   axios
  //     // .post(
  //     //   url,
  //     //   {
  //     //     projectId: +state?.projectId,
  //     //     funnelGenId: +state?.funnelGenID,
  //     //     productNumber: selectProduct.productNumber,
  //     //     // doNumber: selectProduct.doNumber,
  //     //   },
  //     //   {
  //     //     responseType: 'blob',
  //     //   }
  //     // )
  //     .get(`${url}?projectId=${+state?.projectId}&funnelGenId=${+state?.funnelGenID}&productNumber=${selectProduct.productNumber}`)
  //     .then((res) => {
  //       fileDownload(res.data, filename);
  //       setLoading(false);
  //     })
  //     .catch((res) => console.log(res));
  // };

  const handleDownload = () => {
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const endpoint: string = `${environment.api.generic.replace(
      ':controller',
      `ConfigItem/GenerateExcel`
    )}?projectId=${+state?.projectId}&funnelGenId=${+state?.funnelGenID}&productNumber=${selectProduct.productNumber}`;

    axios
      .get(endpoint, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${userLogin === null ? '' : userLogin.token}`,
        },
      })
      .then((res) => {
        fileDownload(res.data, 'ConfigItemProduct.xlsx');
      });
  };

  return (
    <Grid>
      <Grid.Row textAlign="right">
        <Grid.Column verticalAlign="middle" textAlign="right">
          <Button
            compact
            color="yellow"
            onClick={() => dispatch(ModalFirstLevelActions.OPEN(<ConfigItemUpload funnelGenID={props.funnelGenID} />, ModalSizeEnum.Mini))}
          >
            <Icon name="upload" />
            Import File
          </Button>
          <Button
            color="green"
            loading={isLoading}
            disabled={isLoading}
            compact
            onClick={() => handleDownload()}
            // onClick={() => handleDownload(`${environment.api.generic.replace(':controller', `ConfigItem/GenerateExcel`)}`, 'ConfigItemProduct.xlsx')}
          >
            <Icon name="file excel" />
            Download Template
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default HeaderConfigProductDetail;
