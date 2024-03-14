import React, { useCallback, useEffect, useState } from 'react';
import { Confirm, Grid, Icon } from 'semantic-ui-react';
import { Button, Pagination } from 'views/components/UI';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import FunnelBOQTable from './table/FunnelBOQTable';
import { FunnelBOQUpload, FunnelBOQForm } from './form';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import IStore from 'models/IStore';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as BoqActions from 'stores/boq/BOQActions';
import * as ToastAction from 'stores/toasts/ToastsAction';
import { selectBoqs } from 'selectors/boq/BoqSelector';
import IBoqTable from 'selectors/boq/models/IBoqTable';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';
import ToastStatusEnum from 'constants/ToastStatusEnum';

interface IProps {
  funnelGenID: number;
}
const FunnelBOQ: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { funnelGenID } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [openConfirm, setOpenConfirm] = useState(false);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const BOQResult = useSelector((state: IStore) => state.funnelBoq.resultActions);
  const handleCancel = () => setOpenConfirm(false);
  const showConfirm = () => setOpenConfirm(true);

  const handleConfirm = () => {
    dispatch(BoqActions.delAllBoq(funnelGenID)).then(() => {
      dispatch(BoqActions.requestBoqByFunnelGenID(funnelGenID, 1, 15));
    });
    setOpenConfirm(false);
  };

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(BoqActions.requestBoqByFunnelGenID(funnelGenID, data.activePage, pageSize));
  };

  const onShowForm = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(BoqActions.requestBoqByFunnelGenID(funnelGenID, 1, 15));

    dispatch(FunnelActions.requestViewFunnelCustomerById(funnelGenID));
  }, [dispatch, funnelGenID]);

  useEffect(() => {
    if (BOQResult.errorNumber === '666') {
      dispatch(ToastAction.add(BOQResult.message, ToastStatusEnum.Error));
      dispatch(BoqActions.removeResult());
    }

    if (BOQResult.errorNumber === '0') {
      dispatch(ToastAction.add(BOQResult.message, ToastStatusEnum.Success));
      if (!BOQResult.resultObj) {
        dispatch(BoqActions.removeResult());
      }
    }
  }, [BOQResult]);

  const handleExportExcel = () => {
    setActivePage(1);
    dispatch(BoqActions.requestBoqByFunnelGenID(funnelGenID, 1, boq.totalRow));

    if (isRequesting === false) {
      setTimeout(() => {
        const tableSelect = document.getElementById('export-boq') as HTMLTableElement;
        const tableHead = document.querySelector('#export-boq > thead > tr > th:nth-child(1)') as HTMLTableElement;
        tableHead.style.display = 'none';
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
        }
        TableToExcel.convert(tableSelect, {
          name: 'FunnelListBOQ ' + format(new Date(), 'cccc LLLL d, yyyy') + '.xlsx',
          sheet: {
            name: 'Sheet 1',
          },
        });
      }, 3000);
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname;
      }, 4000);
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BoqActions.REQUEST_BOQS]));
  const boq: IBoqTable = useSelector((state: IStore) => selectBoqs(state, [BoqActions.REQUEST_BOQS]));

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Confirm header="Delete All Data BOQ" open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Grid padded>
        <Grid.Row columns="equal">
          <Grid.Column className="FullGrid767">
            <a
              className="FloatRight767"
              href={require(viewFunnelCustomer.chkSMODeptID ? `./file/TEMPLATE_BOQ_SMO.xlsx` : `./file/TEMPLATE_BOQ.xlsx`)}
              target="_blank"
              rel="noopener noreferrer"
              download={viewFunnelCustomer.chkSMODeptID ? `TEMPLATE_BOQ_SMO` : `TEMPLATE_BOQ`}
            >
              <Button color="yellow" compact>
                <Icon name="download" />
                Download Template BOQ
              </Button>
            </a>
            <Button compact color="red" floated="left" onClick={showConfirm} disabled={boq.totalRow === 0}>
              <Icon name="trash alternate outline" />
              Delete All
            </Button>
          </Grid.Column>
          <Grid.Column className="FullGrid767 mt-1r-767">
            <Button
              compact
              color="yellow"
              floated="right"
              onClick={() => onShowForm(<FunnelBOQForm boqGenID={0} funnelGenID={funnelGenID} />, ModalSizeEnum.Large)}
            >
              <Icon name="add" />
              Add Item
            </Button>

            <Button compact primary floated="right" onClick={handleExportExcel}>
              <Icon name="file excel" />
              Export Excel
            </Button>

            <Button
              compact
              // primary
              color="green"
              floated="right"
              icon="external share"
              onClick={() => onShowForm(<FunnelBOQUpload funnelGenID={props.funnelGenID} />, ModalSizeEnum.Mini)}
            >
              <Icon name="download" />
              Import Data
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <FunnelBOQTable tableData={boq} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={boq.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default FunnelBOQ;
