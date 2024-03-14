import React, { useCallback } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import IFunnelTopTableRow from 'selectors/funnel-top/models/IFunnelTopTableRow';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import moment from 'moment';
import FunnelTopForm from '../../form/FunnelTopForm';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import { selectFunnelTopAll } from 'selectors/funnel-top/FunnelTopSelector';
import IStore from 'models/IStore';

interface IProps {
  readonly rowData: IFunnelTopTableRow;
  readonly keys: number;
  readonly setActivePage: any;
}

const FunnelTopTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData, setActivePage } = props;
  const dispatch: Dispatch = useDispatch();

  const funnelTopAll: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTopAll(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const funnelProductService = useSelector((state: IStore) => state.funnelProductService.listData);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);

  const deleteLocal = (dataRow) => {
    const rowItem = new TopServiceModel(dataRow);
    let getTopLocal = JSON.parse(localStorage.getItem('funnelTop'));
    if (getTopLocal) {
      const newUpdate = getTopLocal.rows.filter((i) => {
        return i.funnelTopID !== rowItem.funnelTopID;
      });
      localStorage.setItem('funnelTop', JSON.stringify({ rows: [...newUpdate] }));
      setActivePage(1);
      dispatch(FunnelTopActions.requestTopType());
    }
  };

  const handleDelete = (dataRow: any) => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    const rowItem = new TopServiceModel(dataRow);
    if (rowItem.funnelGenID === 0) {
      deleteLocal(dataRow);
    } else {
      if (isSalesAnalis || page === 'Add New Funnel - Copy Project') {
        if (!JSON.parse(localStorage.getItem('funnelTop'))) {
          localStorage.setItem('funnelTop', JSON.stringify({ rows: funnelTopAll.rows }));
        }

        if (rowItem?.isAdd || rowItem?.isAdd === 0) {
          deleteLocal(dataRow);
        } else {
          rowItem.isDelete = 1;
          rowItem.isUpdate = 0;
          const getLocal = JSON.parse(localStorage.getItem('funnelTop'));
          let filterList = getLocal?.rows.filter((e) => e.funnelTopID !== rowItem.funnelTopID);
          localStorage.setItem('funnelTop', JSON.stringify({ rows: [...filterList, rowItem] }));
          dispatch(FunnelTopActions.requestTopType());
          setActivePage(1);
        }
      } else {
        dispatch(FunnelTopActions.delFunnelTop(dataRow.funnelTopID)).then(() => {
          dispatch(FunnelTopActions.requestFunnelTop(dataRow.funnelGenID, 1, 5));
          setActivePage(1);
        });
      }
    }
  };

  const onEdit = useCallback(
    (dataRow: any): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <FunnelTopForm
            funnelGenID={dataRow.funnelGenID.toString()}
            funnelTopID={dataRow.funnelTopID}
            rowData={dataRow}
            type="Edit"
            setActivePage={setActivePage}
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  return (
    <Table.Row key={props.keys}>
      <Table.Cell textAlign="center">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            {!(isSalesAnalis && !isIcEdit) && <Dropdown.Item text="Edit" icon="edit" onClick={() => onEdit(rowData)} />}
            {!(isSalesAnalis && !isIcEdit) && <Dropdown.Item text="Delete" icon="trash alternate" onClick={() => handleDelete(rowData)} />}
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell textAlign="center">{rowData.productDescStr}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.productPercentage && rowData.productPercentage}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.serviceDescStr}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.servicePercentage && rowData.servicePercentage}</Table.Cell>
      <Table.Cell textAlign="center">{rowData.supportDocStr}</Table.Cell>
      <Table.Cell textAlign="center">{moment(rowData.docCollectionDate).format('DD-MM-YYYY')}</Table.Cell>
    </Table.Row>
  );
};
export default FunnelTopTableRow;
