import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Icon, Accordion } from 'semantic-ui-react';
import { CheckBox, Button, Pagination, Tooltips } from 'views/components/UI';
import FunnelSplitPerformanceTable from './table/FunnelSplitPerformanceTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import { RowFormFunnelSplit } from './form';
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
import * as FunnelSplitActions from 'stores/funnel-split-performance/FunnelPerformanceActions';
import { useHistory, useParams } from 'react-router-dom';
import FunnelSplitEnvelope from 'stores/funnel-split-performance/models/FunnelSplitEnvelope';

interface IProps {
  // funnelGenID: string;
}
const FunnelSplitPerformance: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedHeader, setCheckedHeader] = useState(false);
  const currDate: string = format(new Date(), 'cccc LLLL d, yyyy');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const [activeIndex, setActiveIndex] = useState(true);

  const handleClick = () => {
    setActiveIndex(!activeIndex);
  };
  useEffect(() => {
    const path = window.location.pathname.split('/');
    dispatch(FunnelSplitActions.requestFunnelSplit(Number(path[3]), 1, 5));
  }, []);

  const handleExportExcel = () => {
    console.log('test');
  };

  const handlePaginationChange = (e, data) => {
    setActivePage(data.activePage);
    const path = window.location.pathname.split('/');
    dispatch(FunnelSplitActions.requestFunnelSplit(Number(path[3]), data.activePage, 5));
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      FunnelSplitActions.REQUEST_INSERT_FUNNEL_SPLIT,
      FunnelSplitActions.REQUEST_DELETE_FUNNEL_SPLIT,
      FunnelSplitActions.REQUEST_FUNNEL_SPLIT,
      FunnelSplitActions.REQUEST_UPDATE_FUNNEL_SPLIT,
    ])
  );

  const paginate = (arr, size) => {
    return arr.reduce((acc, val, i) => {
      const idx = Math.floor(i / size);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  };

  let dataSpliterformanceLocal = {
    totalRow: 0,
    rows: [],
  };

  if (JSON.parse(localStorage.getItem('splitPerFormance'))) {
    const newValue = JSON.parse(localStorage.getItem('splitPerFormance')).rows.filter((item: any) => {
      return item.isDelete === 0 || item.isDelete === undefined;
    });
    const pages = paginate(newValue, pageSize);
    dataSpliterformanceLocal = {
      totalRow: newValue.length,
      rows: pages[activePage - 1] || [],
    };
  }

  const funnelSplitPerformace: any = useSelector((state: IStore) => state.funnelSplit.data);

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex} onClick={handleClick}>
          <Icon name="dropdown" />
          Split Performance
          {JSON.parse(localStorage.getItem('splitPerFormance')) && (
            <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} />
          )}
        </Accordion.Title>
        <Accordion.Content active={activeIndex}>
          <FunnelSplitPerformanceTable tableData={localStorage.getItem('splitPerFormance') ? dataSpliterformanceLocal : funnelSplitPerformace} />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={localStorage.getItem('splitPerFormance') ? dataSpliterformanceLocal.totalRow : funnelSplitPerformace.totalRows}
            pageSize={pageSize}
          />
        </Accordion.Content>
      </Accordion>
    </LoadingIndicator>
  );
};

export default FunnelSplitPerformance;
