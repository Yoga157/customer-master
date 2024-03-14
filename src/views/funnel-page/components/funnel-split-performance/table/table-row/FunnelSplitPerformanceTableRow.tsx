import React, { useState, Fragment, useCallback, createRef, useEffect } from 'react';
import { Table, Dropdown, Confirm, Checkbox } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import FunnelSplitListLocalModel from 'stores/funnel-split-performance/models/FunnelSplitListLocalModel';
import * as SplitPerformanceActions from 'stores/funnel-split-performance/FunnelPerformanceActions';
import * as FunnelSplitActions from 'stores/funnel-split-performance/FunnelPerformanceActions';
import { selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';
import RowFormFunnelSplit from '../../form/form-create/RowFormFunnelSplit';
// import * as EmployeeActions from 'stores/employee/EmployeeActions';

interface IProps {
  readonly rowData: any;
  readonly totalPrice: number;
  indexItem: number;
}

interface IFormType {
  funnelGenID: number;
  salesID: number;
  splitType: number;
  splitPercentage: number;
  createUserID: number;
}

const FunnelSplitPerformanceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, indexItem } = props;
  const [actionType, setActionType] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const funnelSplitPerformace: any = useSelector((state: IStore) => state.funnelSplit.data);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const salesName = useSelector((state: IStore) => selectEmployeeSemantic(state));
  const [form, setForm] = useState<IFormType>({
    funnelGenID: 0,
    salesID: 0,
    splitType: 0,
    splitPercentage: 0,
    createUserID: 0,
  });

  const deleteItem = (data: any): any => {
    const newItemsLocal = new FunnelSplitListLocalModel({ ...data });
    newItemsLocal.isDelete = 1;
    newItemsLocal.isUpdate = 0;
    newItemsLocal.isAdd = 0;

    newItemsLocal.createUserID = 0;
    newItemsLocal.modifyUserID = 0;
    newItemsLocal.salesID = 0;
    newItemsLocal.splitType = 0;
    return newItemsLocal;
  };

  const onSubmitHandler = (formObject) => {
    const path = window.location.pathname.split('/');
    if (!isSalesAnalis) {
      dispatch(SplitPerformanceActions.requestUpdateFunnelSplit(formObject)).then(() => {
        dispatch(SplitPerformanceActions.requestFunnelSplit(Number(path[3]), 1, 5));
      });
    }
    setActionType('ADD');
  };

  const handleDelete = (id) => {
    const splitPerFormanceLocal = localStorage.getItem('splitPerFormance');
    const path = window.location.pathname.split('/');
    // if (isSalesAnalis) {
    //   if (splitPerFormanceLocal) {
    //     const localData = JSON.parse(splitPerFormanceLocal);

    //     const newSplitList = localData.rows.filter((e) => +e.funnelISplitID !== +id);
    //     const deleteList = localData.rows.filter((e) => +e.funnelISplitID === +id);

    //     if (deleteList[0].isAdd) {
    //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...newSplitList] }));
    //     } else {
    //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...newSplitList, deleteItem(deleteList[0])] }));
    //     }
    //   } else {
    //     if (funnelSplitPerformace?.rows?.length > 0) {
    //       const newSplitList = funnelSplitPerformace.rows.filter((e) => +e.funnelISplitID !== +id);
    //       const deleteList = funnelSplitPerformace.rows.filter((e) => +e.funnelISplitID === +id);
    //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...newSplitList, deleteItem(deleteList[0])] }));
    //     }
    //   }
    //   dispatch(SplitPerformanceActions.requestSplitType());
    // } else {
    dispatch(FunnelSplitActions.requestDeleteFunnelSplit(Number(id))).then(() => {
      dispatch(FunnelSplitActions.requestFunnelSplit(Number(path[3]), 1, 5));
    });
    // }
  };

  return (
    <Fragment>
      {/* <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered /> */}
      {actionType !== 'EDIT' ? (
        <>
          <Table.Row>
            <Table.Cell textAlign="center">{rowData.salesName}</Table.Cell>
            <Table.Cell textAlign="center">{Number.isInteger(rowData.splitType) ? rowData.splitTypeStr : rowData.splitType}</Table.Cell>
            <Table.Cell textAlign="center">{rowData.splitPercentage + '%'}</Table.Cell>
            <Table.Cell textAlign="center">
              {(!isSalesAnalis || currentUser.userName === 'terang.lambang') && (
                <Dropdown pointing="left" icon="ellipsis vertical">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="Edit/View"
                      icon="edit outline"
                      onClick={() => {
                        setActionType('EDIT');
                      }}
                    />
                    <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(rowData.funnelISplitID)} />
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Table.Cell>
          </Table.Row>{' '}
        </>
      ) : (
        <RowFormFunnelSplit rowData={rowData} type="EDIT" enableRow={onSubmitHandler} indexItem={indexItem + 2} />
      )}
    </Fragment>
  );
};

export default FunnelSplitPerformanceTableRow;
