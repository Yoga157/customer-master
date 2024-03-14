import React, { Fragment, useEffect, useState } from 'react';
import { Icon, Radio, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Field } from 'react-final-form';
import { LocationState } from 'history';
import { format } from 'date-fns';
import { Dispatch } from 'redux';
import moment from 'moment';

import IConfigItemsTable, { IConfigItemsProductTableRow } from 'selectors/config-items/models/IConfigItemsTable';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { selectConfigProductDetail } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './ConfigProductTableRow.module.scss';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { CIProductForm } from './childs';
import IStore from 'models/IStore';

interface IProps {
  rowData: IConfigItemsProductTableRow;
  index: number;
}

const ConfigProductTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, index } = props;

  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [actionType, setActionType] = useState('');
  const [initValuesProduct, setValuesProduct] = useState({
    projectId: 0,
    funnelGenId: 0,
    poNumber: '',
    productNumber: '',
    expectedArrivalDate: null,
  });

  const productDetail: IConfigItemsTable = useSelector((state: IStore) => selectConfigProductDetail(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);

  const getProductDetail = (productNumber: string, doNumber: string) => {
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
          productNumber,
          doNumber,
          serialNumber
        )
      );
    state && dispatch(ConfigItemsActions.selectProduct(productNumber, doNumber));
    dispatch(ConfigItemsActions.setActivePageProductDetail(1));
  };

  useEffect(() => {
    setActionType('');
    setValuesProduct({
      projectId: state?.projectId,
      funnelGenId: state?.funnelGenID,
      poNumber: rowData.poNumber,
      productNumber: rowData.productNumber,
      expectedArrivalDate: rowData.expectedArrivalDate ? new Date(rowData.expectedArrivalDate) : '',
    });
  }, [rowData, productDetail]);

  const handleUpdate = () => {
    dispatch(
      ConfigItemsActions.reqPutArrivalDatePN({
        projectId: +initValuesProduct.projectId,
        funnelGenId: +initValuesProduct.funnelGenId,
        poNumber: selectProjPO,
        productNumber: initValuesProduct.productNumber,
        expectedArrivalDate: initValuesProduct.expectedArrivalDate
          ? moment(initValuesProduct.expectedArrivalDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
          : null,
        modifyDate: moment(),
        modifyUserID: currentUser.employeeID,
      })
    ).then(() => {
      console.log('okee');
    });
  };

  return (
    <Fragment>
      <Table.Row>
        <Table.Cell verticalAlign="middle" className={`${styles.cellAction}`}>
          <Radio
            checked={selectProduct?.productNumber === rowData.productNumber && selectProduct?.doNumber === rowData.doNumber}
            onClick={() => getProductDetail(rowData.productNumber, rowData.doNumber)}
          />
          <div
            className={`${styles.icCircle}  ${'bg-blue'} hover-pointer`}
            onClick={() => {
              setActionType(actionType === 'EDIT' ? '' : 'EDIT');
              dispatch(ModalFirstLevelActions.OPEN(<CIProductForm rowData={rowData} />, ModalSizeEnum.Tiny, true, true));
              // actionType === 'EDIT' && handleUpdate();
            }}
          >
            <Icon name={'save'} size="small" className="text-white" />
          </div>
        </Table.Cell>
        <Table.Cell>{rowData.productNumber}</Table.Cell>
        <Table.Cell>{rowData.soNumber}</Table.Cell>
        <Table.Cell>{rowData.doNumber}</Table.Cell>
        <Table.Cell>{rowData.lpbNumber}</Table.Cell>
        <Table.Cell>{rowData?.lpbDate && format(new Date(rowData?.lpbDate), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData?.eta && format(new Date(rowData?.eta), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData?.expectedArrivalDate && format(new Date(rowData?.expectedArrivalDate), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData?.doDate && format(new Date(rowData?.doDate), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData.productDescription}</Table.Cell>
        <Table.Cell>{rowData.brand}</Table.Cell>
        <Table.Cell>{rowData.quantityPO}</Table.Cell>
        <Table.Cell>{rowData.serialNumberStatus}</Table.Cell>
        <Table.Cell>{rowData?.startWarranty && format(new Date(rowData?.startWarranty), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData?.endWarranty && format(new Date(rowData?.endWarranty), 'dd/MM/yyyy')}</Table.Cell>
        <Table.Cell>{rowData.warrantyDuration}</Table.Cell>
        <Table.Cell>{rowData.preventiveSchedule}</Table.Cell>
        <Table.Cell>{rowData?.preventiveDate && format(new Date(rowData?.preventiveDate), 'dd/MM/yyyy')}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default ConfigProductTableRow;
