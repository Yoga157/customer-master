import React, { Fragment, useEffect, useState } from 'react';
import { Dropdown, Icon, Radio, Table, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Field } from 'react-final-form';
import { LocationState } from 'history';
import { format } from 'date-fns';
import { Dispatch } from 'redux';
import moment from 'moment';

import { selectConfigProduct, selectConfigProjPO } from 'selectors/config-items/ConfigItemSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import FormTicket from 'views/ticket-page/page-ticket/components/form/FormTicket';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import { selectConfigItems } from 'selectors/config-items/ConfigItemSelector';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import ProjectListRowHook from './hooks/ProjectListRowHook';
import IUserResult from 'selectors/user/models/IUserResult';
import { DateInput, TextInput } from 'views/components/UI';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import styles from './ProjectListRow.module.scss';
import IStore from 'models/IStore';

interface IProps {
  rowData: any;
  index: number;
}

const ProjectListRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, index } = props;
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state;

  const [initValuesConfigItem, setValuesConfigItem] = useState({
    configItemGenID: 0,
    projectId: 0,
    funnelGenId: 0,
    serialNumber: '',
    note: '',
    startWarranty: null,
    endWarranty: null,
  });

  const [initValuesProjPO, setValuesProjPO] = useState({
    projectId: 0,
    funnelGenId: 0,
    poNumber: '',
    pmoRemark: '',
    // expectedArrivalDate: null,
  });
  const [actionType, setActionType] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ConfigItemsActions.PUT_PROJECT_PO, ConfigItemsActions.PUT_PROJECT_PO_REMARK, ConfigItemsActions.PUT_PRODUCT_DETAIL])
  );
  const isExport = useSelector((state: IStore) => state.configItems.isExportExcelConfigList);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);
  const listConfigItems = useSelector((state: IStore) => selectConfigItems(state));
  const product: any = useSelector((state: IStore) => selectConfigProduct(state));

  const getProductBy = (poNumber: string) => {
    state &&
      dispatch(
        ConfigItemsActions.reqConfigItemsProduct(
          1,
          10,
          product.column,
          product.sorting,
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID,
          poNumber
        )
      );
    state && dispatch(ConfigItemsActions.selectProjectPo(poNumber));
    dispatch(ConfigItemsActions.setActivePageProduct(1));
  };

  const [reGetData] = ProjectListRowHook();

  const handleSave = () => {
    setActionType(actionType === 'EDIT' ? '' : 'EDIT');

    if (state) {
      // dispatch(
      //   ConfigItemsActions.reqPutProjectPO('arrivalDate', {
      //     projectId: +initValuesProjPO.projectId,
      //     funnelGenId: +initValuesProjPO.funnelGenId,
      //     poNumber: initValuesProjPO.poNumber,
      //     expectedArrivalDate: initValuesProjPO.expectedArrivalDate
      //       ? moment(initValuesProjPO.expectedArrivalDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
      //       : null,
      //     modifyDate: moment(),
      //     modifyUserID: currentUser.employeeID,
      //   })
      // ).then(() => reGetData());

      dispatch(
        ConfigItemsActions.reqPutProjectPO('remark', {
          projectId: +initValuesProjPO.projectId,
          funnelGenId: +initValuesProjPO.funnelGenId,
          poNumber: initValuesProjPO.poNumber,
          pmoRemark: initValuesProjPO.pmoRemark,
          modifyDate: moment(),
          modifyUserID: currentUser.employeeID,
        })
      ).then(() => reGetData());
    } else {
      const base = {
        configItemGenID: initValuesConfigItem.configItemGenID,
        modifyDate: new Date(),
        modifyUserID: currentUser.employeeID,
      };

      dispatch(
        ConfigItemsActions.reqPutDetailProduct({
          ...base,
          serialNumber: initValuesConfigItem.serialNumber,
        })
      ).then(() =>
        dispatch(
          ConfigItemsActions.reqPutNoteBy({
            ...base,
            note: initValuesConfigItem.note,
          })
        ).then(() =>
          dispatch(
            ConfigItemsActions.putStartWarrantyByID({
              ...base,
              startWarranty: moment(initValuesConfigItem.startWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            })
          ).then(() =>
            dispatch(
              ConfigItemsActions.putEndWarrantyByID({
                ...base,
                endWarranty: moment(initValuesConfigItem.endWarranty).format('YYYY-MM-DDTHH:mm:ss.SSS'),
              })
            ).then(() => reGetData())
          )
        )
      );
    }
  };

  useEffect(() => {
    setActionType('');
    if (state) {
      setValuesProjPO({
        projectId: state?.projectId,
        funnelGenId: state?.funnelGenID,
        poNumber: rowData.poNumber,
        pmoRemark: rowData.pmoRemark,
        // expectedArrivalDate: rowData.expectedArrivalDate ? new Date(rowData.expectedArrivalDate) : '',
      });
    } else {
      setValuesConfigItem({
        configItemGenID: rowData.configItemGenID,
        projectId: 0,
        funnelGenId: 0,
        serialNumber: rowData.serialNumber,
        note: rowData.note,
        startWarranty: rowData.startWarranty,
        endWarranty: rowData.endWarranty,
      });
    }
  }, [product, listConfigItems]);

  const onSubmitHandler = (values: any) => {};

  return (
    <Fragment>
      {state ? (
        <>
          {actionType !== 'EDIT' ? (
            <Table.Row className={styles.projectPORow}>
              <Table.Cell verticalAlign="middle">
                <div className={`${styles.cellAction}`}>
                  <Radio checked={selectProjPO === rowData.poNumber} onClick={() => getProductBy(rowData.poNumber)} />
                  <div
                    className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-red' : 'bg-blue'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
                    onClick={() => {
                      setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                    }}
                  >
                    <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{rowData.poNumber}</Table.Cell>
              <Table.Cell>{rowData?.poDate && format(new Date(rowData?.poDate), 'dd/MM/yyyy')}</Table.Cell>
              <Table.Cell>{rowData?.poCloseDate && format(new Date(rowData?.poCloseDate), 'dd/MM/yyyy')}</Table.Cell>
              <Table.Cell>{rowData.poAdmin}</Table.Cell>
              <Table.Cell>{rowData.vendorName}</Table.Cell>
              <Table.Cell>{rowData.vendorType}</Table.Cell>
              <Table.Cell>{rowData.poStatus}</Table.Cell>
              <Table.Cell>{rowData?.eta && format(new Date(rowData?.eta), 'dd/MM/yyyy')}</Table.Cell>
              {/* <Table.Cell>{rowData?.expectedArrivalDate}</Table.Cell> */}
              <Table.Cell>{rowData.pmoRemark}</Table.Cell>
              <Table.Cell>{rowData.poRemark}</Table.Cell>
            </Table.Row>
          ) : (
            <Table.Row className={styles.projectPORow}>
              <Table.Cell verticalAlign="middle">
                <div className={`${styles.cellAction}`}>
                  <Radio checked={selectProjPO === rowData.poNumber} onClick={() => getProductBy(rowData.poNumber)} />
                  <div
                    className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-red' : 'bg-blue'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{rowData.poNumber}</Table.Cell>
              <Table.Cell>{rowData?.poDate && format(new Date(rowData?.poDate), 'dd/MM/yyyy')}</Table.Cell>
              <Table.Cell>{rowData?.poCloseDate && format(new Date(rowData?.poCloseDate), 'dd/MM/yyyy')}</Table.Cell>
              <Table.Cell>{rowData.poAdmin}</Table.Cell>
              <Table.Cell>{rowData.vendorName}</Table.Cell>
              <Table.Cell>{rowData.vendorType}</Table.Cell>
              <Table.Cell>{rowData.poStatus}</Table.Cell>
              <Table.Cell>{rowData?.eta && format(new Date(rowData?.eta), 'dd/MM/yyyy')}</Table.Cell>
              {/* <Table.Cell>{rowData?.expectedArrivalDate}</Table.Cell> */}
              {/* <Table.Cell className={styles.datePicker}>
                <Field
                  name={`${index}-expectedArrivalDate`}
                  component={DateInput}
                  isRow={true}
                  mandatory={false}
                  date={true}
                  dropUp={true}
                  values={initValuesProjPO.expectedArrivalDate}
                  onChange={(e) =>
                    setValuesProjPO({
                      ...initValuesProjPO,
                      expectedArrivalDate: e,
                    })
                  }
                  // disabled={!estStartBypmo}
                  // minDate={new Date(moment(estStartBypmo).valueOf() + 24 * 60 * 60 * 1000)}
                  // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
                />
              </Table.Cell> */}
              <Table.Cell>
                <Field
                  name={`${index}-pmoRemark`}
                  component={TextInput}
                  isRow={true}
                  values={initValuesProjPO.pmoRemark}
                  onChange={(e) =>
                    setValuesProjPO({
                      ...initValuesProjPO,
                      pmoRemark: e,
                    })
                  }
                  // labelName="Project Alias"
                />
              </Table.Cell>
              <Table.Cell>{rowData.poRemark}</Table.Cell>
            </Table.Row>
          )}
        </>
      ) : (
        <Table.Row className={styles.projectPORow}>
          {!isExport && (
            <Table.Cell verticalAlign="middle">
              <div className={`${styles.cellAction}`}>
                <div
                  className={`${styles.icCircle}  ${actionType === 'EDIT' ? 'bg-red' : 'bg-blue'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
                  onClick={() => {
                    if (actionType === 'EDIT') {
                      handleSave();
                    } else {
                      setActionType(actionType === 'EDIT' ? '' : 'EDIT');
                    }
                  }}
                >
                  <Icon name={actionType === 'EDIT' ? 'save' : 'edit'} size="small" className="text-white" />
                </div>
                <div
                  className={`${styles.icCircle}  ${'bg-yellow'} ${isRequesting ? `hover-wait` : `hover-pointer`}`}
                  onClick={() => {
                    dispatch(
                      ModalFirstLevelActions.OPEN(<FormTicket type={'ADD'} page="ticket" rowData={rowData} />, ModalSizeEnum.FullScreen, false, false)
                    );
                  }}
                >
                  <Icon name={'ticket'} size="small" className="text-black" />
                </div>
              </div>
            </Table.Cell>
          )}

          <Table.Cell>{rowData.poNumber}</Table.Cell>
          <Table.Cell>{rowData?.poDate && format(new Date(rowData?.poDate), 'dd/MM/yyyy')}</Table.Cell>
          <Table.Cell>{rowData?.poCloseDate && format(new Date(rowData?.poCloseDate), 'dd/MM/yyyy')}</Table.Cell>
          <Table.Cell>{rowData.vendorName}</Table.Cell>
          <Table.Cell>{rowData.vendorType}</Table.Cell>
          <Table.Cell>{rowData.lpbNumber}</Table.Cell>
          <Table.Cell>{rowData?.lpbDate && format(new Date(rowData?.lpbDate), 'dd/MM/yyyy')}</Table.Cell>
          <Table.Cell>{rowData.doNumber}</Table.Cell>
          <Table.Cell>{rowData?.doDate && format(new Date(rowData?.doDate), 'dd/MM/yyyy')}</Table.Cell>
          <Table.Cell>{rowData.soNumber}</Table.Cell>
          <Table.Cell>{rowData.productDescription}</Table.Cell>
          <Table.Cell>{rowData.productNumber}</Table.Cell>

          {actionType === 'EDIT' ? (
            <Table.Cell>
              <Field
                name={`${index}-serialNumber`}
                component={TextInput}
                isRow={true}
                values={initValuesConfigItem.serialNumber}
                onChange={(e) =>
                  setValuesConfigItem({
                    ...initValuesConfigItem,
                    serialNumber: e,
                  })
                }
              />
            </Table.Cell>
          ) : (
            <Table.Cell>{rowData.serialNumber}</Table.Cell>
          )}

          <Table.Cell>{rowData.customerName}</Table.Cell>
          <Table.Cell>{rowData.buNumber}</Table.Cell>
          <Table.Cell>{rowData.dept}</Table.Cell>

          {actionType === 'EDIT' ? (
            <Table.Cell>
              <Field
                name={`${index}-note`}
                component={TextInput}
                isRow={true}
                values={initValuesConfigItem.note}
                onChange={(e) =>
                  setValuesConfigItem({
                    ...initValuesConfigItem,
                    note: e,
                  })
                }
              />
            </Table.Cell>
          ) : (
            <Table.Cell>{rowData.note}</Table.Cell>
          )}

          <Table.Cell>{rowData?.createDate && format(new Date(rowData?.createDate), 'dd/MM/yyyy')}</Table.Cell>

          <Table.Cell>
            {actionType === 'EDIT' ? (
              <Field
                name={`${index}-startWarranty`}
                component={DateInput}
                isRow={true}
                mandatory={false}
                date={true}
                // dropUp={true}
                values={initValuesConfigItem.startWarranty}
                onChange={(e) =>
                  setValuesConfigItem({
                    ...initValuesConfigItem,
                    startWarranty: e,
                  })
                }
                // disabled={!estStartBypmo}
                // minDate={new Date(moment(estStartBypmo).valueOf() + 24 * 60 * 60 * 1000)}
                // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
              />
            ) : (
              rowData?.startWarranty && format(new Date(rowData?.startWarranty), 'dd/MM/yyyy')
            )}
          </Table.Cell>

          <Table.Cell>
            {actionType === 'EDIT' ? (
              <Field
                name={`${index}-endWarranty`}
                component={DateInput}
                isRow={true}
                mandatory={false}
                date={true}
                // dropUp={true}
                values={initValuesConfigItem.endWarranty}
                onChange={(e) =>
                  setValuesConfigItem({
                    ...initValuesConfigItem,
                    endWarranty: e,
                  })
                }
                // disabled={!estStartBypmo}
                // minDate={new Date(moment(estStartBypmo).valueOf() + 24 * 60 * 60 * 1000)}
                // maxDate={new Date(Date.now() + funnelStatus.dealClosedDate * 24 * 60 * 60 * 1000)}
              />
            ) : (
              rowData?.endWarranty && format(new Date(rowData?.endWarranty), 'dd/MM/yyyy')
            )}
          </Table.Cell>

          <Table.Cell>{rowData.warrantyDuration}</Table.Cell>
          <Table.Cell>{rowData.preventiveSchedule}</Table.Cell>
          <Table.Cell>{rowData?.preventiveDate && format(new Date(rowData?.preventiveDate), 'dd/MM/yyyy')}</Table.Cell>
        </Table.Row>
      )}
    </Fragment>
  );
};

export default ProjectListRow;
