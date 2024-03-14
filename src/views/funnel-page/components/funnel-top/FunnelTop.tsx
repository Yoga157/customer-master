import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import FunnelTopTable from './table/FunnelTopTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { Button, Pagination, Tooltips } from 'views/components/UI';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';

import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import IStore from 'models/IStore';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectFunnelTop } from 'selectors/funnel-top/FunnelTopSelector';
import FunnelTopForm from './form/FunnelTopForm';
import AccordionTop from './accordion/AccordionTop';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';

interface IProps {
  funnelGenID: string;
}

const FunnelTop: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const setPage: number = useSelector((state: IStore) => state.funnelTop.setPage);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const funnelProductService = useSelector((state: IStore) => state.funnelProductService.listData);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTop(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));

  const onAddNew = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <FunnelTopForm funnelGenID={props.funnelGenID} funnelTopID={0} rowData={'Add'} type="Add" setActivePage={setActivePage} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, props.funnelGenID]);

  useEffect(() => {
    localStorage.removeItem('funnelTop');
  }, []);

  useEffect(() => {
    setActivePage(setPage ? setPage : 1);
  }, [dispatch, setPage]);

  useEffect(() => {
    if (+props.funnelGenID) {
      dispatch(FunnelTopActions.requestFunnelTop(+props.funnelGenID, activePage, pageSize));
    }

    dispatch(FunnelTopActions.requestTopItem());
    dispatch(FunnelTopActions.requestSupportingDocument());
    dispatch(FunnelTopActions.requestTopType());

    dispatch(FunnelTopActions.requestFunnelTopAll(+props.funnelGenID));
  }, [dispatch, props.funnelGenID, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
  };

  let disableButton = true;
  if (funnelProductService?.totalRows && funnelProductService.rows.find((e) => e.isDelete !== 1)) {
    disableButton = false;
  } else {
    disableButton = true;
  }

  const paginate = (arr, size) => {
    return arr.reduce((acc, val, i) => {
      const idx = Math.floor(i / size);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);
  };

  let getTopLocal = {
    totalRow: 0,
    rows: [],
  };

  if (JSON.parse(localStorage.getItem('funnelTop'))) {
    const newValue = JSON.parse(localStorage.getItem('funnelTop')).rows.filter((item: any) => {
      return item.isDelete === 0;
    });
    const pages = paginate(newValue, pageSize);
    getTopLocal = {
      totalRow: newValue.length,
      rows: pages[activePage - 1] || [],
    };
  }

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center">
          <Grid.Column className="FullGrid1200">
            <Header>
              <Header.Content>TOP</Header.Content>
              <Header.Content>
                {+props.funnelGenID > 0 && (
                  <Tooltips
                    position="top right"
                    content="History TOP"
                    trigger={
                      <Button
                        circular
                        basic
                        type="button"
                        compact
                        icon="history"
                        onClick={(e: Event) =>
                          dispatch(ModalFirstLevelActions.OPEN(<AccordionTop funnelGenID={+props.funnelGenID} />, ModalSizeEnum.Small))
                        }
                      />
                    }
                  />
                )}

                {+props.funnelGenID > 0 && JSON.parse(localStorage.getItem('funnelTop')) && (
                  <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} />
                )}
              </Header.Content>
            </Header>
          </Grid.Column>
          {currentUser.role === 'Sales' && (
            <Grid.Column className="FullGrid1200 d-inflex-767">
              <Button
                disabled={disableButton || (isSalesAnalis && !isIcEdit)}
                type="button"
                icon="plus"
                color="brown"
                floated="right"
                size="small"
                content="Add New"
                onClick={disableButton || (isSalesAnalis && !isIcEdit) ? null : () => onAddNew()}
              />
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row style={{ overflow: 'auto' }}>
          <FunnelTopTable tableData={JSON.parse(localStorage.getItem('funnelTop')) ? getTopLocal : funnelTop} setActivePage={setActivePage} />

          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={JSON.parse(localStorage.getItem('funnelTop')) ? getTopLocal.totalRow : funnelTop.totalRow}
            pageSize={pageSize}
          />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default FunnelTop;
