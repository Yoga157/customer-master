import React, { Fragment, useEffect, useState } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Field } from 'react-final-form';
import { LocationState } from 'history';
import { Dispatch } from 'redux';

import { selectConfigProductDetail } from 'selectors/config-items/ConfigItemSelector';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import styles from './ConfigProductDetailRow.module.scss';
import { TextInput } from 'views/components/UI';
import IStore from 'models/IStore';

interface IProps {
  rowData: any;
  index: number;
}

const ConfigProductDetailRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, index } = props;
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [actionType, setActionType] = useState('');
  const [initValues, setValues] = useState({
    configItemGenID: rowData.configItemGenID,
    productDescription: rowData.productDescription,
    serialNumber: rowData.serialNumber,
  });

  const productDetail: IConfigItemsTable = useSelector((state: IStore) => selectConfigProductDetail(state));
  const activePageProdDetail = useSelector((state: IStore) => state.configItems.activePageProductDetail);
  const isRequesting = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.PUT_PRODUCT_DETAIL]));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);

  const handleSave = () => {
    dispatch(
      ConfigItemsActions.reqPutDetailProduct({
        configItemGenID: initValues.configItemGenID,
        serialNumber: initValues.serialNumber,
        modifyDate: new Date(),
        modifyUserID: currentUser.employeeID,
      })
    ).then(() => {
      handleCancle();
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductDetail(
            activePageProdDetail,
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
      // dispatch(ConfigItemsActions.setActivePageProductDetail(1));
    });
  };

  const handleCancle = () => {
    setActionType(actionType === 'EDIT' ? '' : 'EDIT');
  };

  useEffect(() => {
    setActionType('');
    setValues({ configItemGenID: rowData.configItemGenID, productDescription: rowData.productDescription, serialNumber: rowData.serialNumber });
  }, [productDetail]);

  return (
    <Fragment>
      {actionType !== 'EDIT' ? (
        <Table.Row>
          <Table.Cell>
            <div className={`${styles.cellAction}`}>
              <div
                className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-red' : 'bg-blue'} hover-pointer`}
                onClick={() => {
                  setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                }}
              >
                <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{rowData.productNumber}</Table.Cell>
          <Table.Cell>{rowData.productDescription}</Table.Cell>
          <Table.Cell>{rowData.serialNumber}</Table.Cell>
        </Table.Row>
      ) : (
        <Table.Row className={styles.productDetailRow}>
          <Table.Cell>
            <div className={`${styles.cellAction}`}>
              <div
                className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-red' : 'bg-blue'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
                onClick={() => {
                  actionType === 'EDIT' && !isRequesting && handleSave();
                  // dispatch(ModalFirstActions.OPEN(<Confirm handleSave={handleSave} handleCancle={handleCancle} />, ModalSizeEnum.Mini));
                }}
              >
                <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{rowData.productNumber}</Table.Cell>
          <Table.Cell>{rowData.productDescription}</Table.Cell>
          <Table.Cell>
            <Field
              name={`${index}-serialNumber`}
              component={TextInput}
              values={initValues.serialNumber}
              isRow={true}
              onChange={(e) => {
                setValues({ ...initValues, serialNumber: e });
              }}
            />
          </Table.Cell>
        </Table.Row>
      )}
    </Fragment>
  );
};

export default ConfigProductDetailRow;
