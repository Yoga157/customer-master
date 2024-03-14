import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { CheckBox, Button, Pagination } from 'views/components/UI';
import FunnelServiceCatalogTable from './table/FunnelServiceCatalogTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import { FunnelServiceCatalogForm } from './form';
import IFunnelServiceCatalogTable from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTable';
import IStore from 'models/IStore';
import { selectFunnelServiceCatalog } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import ButtonMicro from 'views/components/UI/Button/ButtonMicro';
import { selectTotalInternalService } from 'selectors/funnel-product-service/ProductServiceSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import TableToExcel from '@linways/table-to-excel';
import { format } from 'date-fns';

interface IProps {
  funnelGenID: number;
}
const FunnelServiceCatalog: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedHeader, setCheckedHeader] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG]));
  const funnelServiceCatalog: IFunnelServiceCatalogTable = useSelector((state: IStore) =>
    selectFunnelServiceCatalog(state, [FunnelServiceCatalogActions.REQUEST_FUNNEL_SERVICE_CATALOG])
  );
  const totalInternalService = useSelector((state: IStore) => state.funnelProductService.internalService.existing);

  const onShowForm = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(props.funnelGenID, activePage, pageSize));
  }, [activePage, dispatch, pageSize, props.funnelGenID]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(props.funnelGenID, activePage, pageSize));
  };

  const onChekedAll = (e: any, data: any) => {
    setCheckedAll(data.checked);
    setCheckedHeader(data.checked);
  };

  const onUncheckHeader = () => {
    setCheckedHeader(false);
    setCheckedAll(false);
  };

  const handleExportExcel = () => {
    dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(props.funnelGenID, activePage, funnelServiceCatalog.totalRow)).then(() => {
      genExportExcel();
    });

    const genExportExcel = (): void => {
      if (isRequesting == false) {
        setTimeout(() => {
          const tableSelect = document.getElementById('servicecatalog') as HTMLTableElement;
          const tableHead = document.querySelector('#servicecatalog > thead > tr > th:nth-child(1)') as HTMLTableElement;

          tableHead.style.display = 'none';
          for (let i = 0; i < tableSelect.rows.length; i++) {
            const firstCol = tableSelect.rows[i].cells[0];
            firstCol.remove();
          }
          TableToExcel.convert(tableSelect, {
            name: 'FunnelList ' + currDate + '.xlsx',
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
  };

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal">
          {/* <Grid.Column>
            <CheckBox checked={checkedHeader} label="Select All" onChange={onChekedAll} />
                    <ButtonMicro 
                    type='button'
                    icon='trash' 
                    color='yellow' 
                    size='mini' 
                    content='Delete'
                />
          </Grid.Column> */}
          <Grid.Column>
            {(currentUser.role === 'Presales' || currentUser.role === 'SuperAdmin') && (
              <Button
                compact
                color="green"
                floated="right"
                disabled={totalInternalService === 0}
                onClick={() => onShowForm(<FunnelServiceCatalogForm funnelGenID={props.funnelGenID} />, ModalSizeEnum.Tiny)}
              >
                <Icon name="add" />
                Add Service
              </Button>
            )}
            <Button
              className="mt-1r-767"
              compact
              color="blue"
              floated="right"
              //disabled={totalInternalService === 0}
              onClick={handleExportExcel}
            >
              <Icon name="file excel" />
              Export Excel
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <FunnelServiceCatalogTable tableData={funnelServiceCatalog} />
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={funnelServiceCatalog.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default FunnelServiceCatalog;
