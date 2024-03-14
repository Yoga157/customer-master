import React, { useCallback, useEffect } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import IProductServiceTableRow from 'selectors/funnel-product-service/models/IProductServiceTableRow';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import { CreateForm } from '../../form';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectTotalFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import * as FunnelCost from 'stores/funnel-cost/COSTAction';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { EditForm } from '../../form/index';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import TableRowModel from 'stores/funnel-cost/models/TableRowModel';
import { selectRows } from 'selectors/funnel-cost/FunnelCostSelector';
import moment from 'moment';

interface IProps {
  readonly rowData: any;
  readonly key: number | undefined;
  readonly funnelStatusID: number;
}

const ProductServiceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, funnelStatusID } = props;
  const dispatch: Dispatch = useDispatch();
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const rowDataList: any = useSelector((state: IStore) => selectRows(state));

  const objDelete = () => {
    const userId: any = localStorage.getItem('userLogin');
    const data = new TableRowModel({});
    data.cost = rowData.cost;
    data.funnelCostType = rowData.funnelCostType;
    data.funnelGenID = parseInt(rowData.funnelGenID);
    data.modifyUserID = JSON.parse(userId).employeeID;
    data.createUserID = JSON.parse(userId).employeeID;
    data.funnelCostID = rowData.funnelCostID;
    data.costID = rowData.costID;
    data.costName = rowData.costName ?? rowData.costTypeName;
    data.funnelCostTypeName = rowData.funnelCostTypeName;
    data.modifyDate = rowData.modifyDate;
    data.createDate = moment(rowData.createDate, ['DDMMMMY', 'MMMMDDY']).format();

    return data;
  };

  const handleDelete = (funnelCostID: any) => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    if (page === 'Add New Funnel' || page === 'Add New Funnel - Copy Project') {
      const data = objDelete();
      dispatch(FunnelCost.deleteFunnelCostLocal(data, funnelCostID)).then(() => {
        dispatch(FunnelCost.getFunnelByIdLocal());
      });
    } else {
      if (isSalesAnalis) {
        if (!JSON.parse(localStorage.getItem('funnelCost'))) {
          localStorage.setItem('funnelCost', JSON.stringify(rowDataList));
        }

        if (rowData?.isAdd) {
          const data = objDelete();
          dispatch(FunnelCost.deleteFunnelCostLocal(data, funnelCostID)).then(() => {
            dispatch(FunnelCost.getFunnelByIdLocal());
          });
        } else {
          const data = objDelete();
          dispatch(FunnelCost.deleteFunnelCostLocal(data, funnelCostID, isSalesAnalis)).then(() => {
            dispatch(FunnelCost.getFunnelByIdLocal());
          });
        }
      } else {
        dispatch(FunnelCost.deleteFunnelCost(funnelCostID)).then(() => {
          dispatch(FunnelCost.getFunnelById(rowData.funnelGenID));
          dispatch(FunnelAction.requestViewFunnelSellingById(rowData.funnelGenID));
        });
      }
    }
  };

  const onEdit = useCallback(
    (dataRow, funnelStatusID): void => {
      dispatch(ModalFirstLevelActions.OPEN(<EditForm rowData={dataRow} funnelStatusID={funnelStatusID} />, ModalSizeEnum.Small));
    },
    [dispatch]
  );

  //   const updateClick = useCallback(
  //     (): void => {
  //         dispatch(ModalAction.OPEN(
  //           <ProductForm
  //             funnelGenID={rowData.funnelGenID.toString()}
  //             funnelItemsID={rowData.funnelItemsID.toString()}
  //             type="Edit"
  //             />,ModalSizeEnum.Small));
  //     },
  //     [dispatch, rowData.funnelGenID, rowData.funnelItemsID, rowData.itemType]
  // );
  // console.log(rowData.funnelCostTypeName)
  return (
    <Table.Row key={props.key}>
      <Table.Cell textAlign="center">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            {!(isSalesAnalis && !isIcEdit) && <Dropdown.Item text="Edit" icon="edit" onClick={() => onEdit(rowData, funnelStatusID)} />}
            {!(isSalesAnalis && !isIcEdit) && (
              <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(rowData.funnelCostID)} />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>

      <Table.Cell textAlign="center">
        {rowData.funnelCostTypeName == 'Expense Service' || rowData.funnelCostTypeName == 'Expense Product'
          ? rowData.funnelCostTypeName
          : rowData.costName}
      </Table.Cell>
      <Table.Cell textAlign="center">{rowData.funnelCostTypeName}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.costRemark}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.cost.toLocaleString()}</Table.Cell>
    </Table.Row>
  );
};

export default ProductServiceTableRow;
