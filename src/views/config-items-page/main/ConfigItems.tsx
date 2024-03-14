import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { History, LocationState } from 'history';
import { useLocation } from 'react-router-dom';
import { Dispatch } from 'redux';

import { selectConfigItems, selectConfigProduct, selectConfigProductDetail, selectConfigProjPO } from 'selectors/config-items/ConfigItemSelector';
import { HeaderConfigProductDetail, HeaderConfigProductTable, HeaderTableProjectList } from './components/table/table-row/childs';
import { ProjectListTabel, ConfigProductTable, ConfigProductDetailTable } from './components/table';
import * as ModalFirstAction from 'stores/modal/first-level/ModalFirstLevelActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import HeaderCofigItems from './components/header-config-items/HeaderCofigItems';
import IConfigItemsTable from 'selectors/config-items/models/IConfigItemsTable';
import * as ConfigItemsActions from 'stores/config-items/ConfigItemsActions';
import ConfigItemFilter from 'stores/config-items/models/ConfigItemFilter';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { ConfigItemUploadFailed } from './components/form';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import BreadCumb from '../components/breadcumb/BreadCumb';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Pagination } from 'views/components/UI';
import { Button, Grid } from 'semantic-ui-react';
import IStore from 'models/IStore';
import './ConfigItems.scss';

interface IProps {
  history?: History;
}

const ConfigItems: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();
  const state: any = location?.state!;

  const [activePage] = useState({
    pageSizeProd: 10,
    pageSizeProdDetail: 5,
  });
  const [pageSize] = useState(10);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      ConfigItemsActions.CONFIG_ITEMS_LIST,
      ConfigItemsActions.CONFIG_ITEMS_LIST_SEARCH,
      ConfigItemsActions.CONFIG_ITEMS_LIST_FILTER,
      ConfigItemsActions.CONFIG_PROJECT_PO,
      ConfigItemsActions.CONFIG_PROJECT_PO_SEARCH,
    ])
  );
  const isRequestingProduct: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ConfigItemsActions.CONFIG_PRODUCT, ConfigItemsActions.CONFIG_PRODUCT_SEARCH])
  );
  const isReqProductDetail: boolean = useSelector((state: IStore) => selectRequesting(state, [ConfigItemsActions.CONFIG_PRODUCT_DETAIL]));
  const productDetail: IConfigItemsTable = useSelector((state: IStore) => selectConfigProductDetail(state));
  const activePageProdDetail = useSelector((state: IStore) => state.configItems.activePageProductDetail);
  const searchProjPO = useSelector((state: IStore) => state.configItems.listDataProjectPO.search);
  const projectPO: IConfigItemsTable = useSelector((state: IStore) => selectConfigProjPO(state));
  const searchProd = useSelector((state: IStore) => state.configItems.listDataProduct.search);
  const activePageProd = useSelector((state: IStore) => state.configItems.activePageProduct);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const selectProduct = useSelector((state: IStore) => state.configItems.selectProduct);
  const activePageConfig = useSelector((state: IStore) => state.configItems.activePage);
  const selectProjPO = useSelector((state: IStore) => state.configItems.selectProjPO);
  const serialNumber = useSelector((state: IStore) => state.configItems.serialNumber);
  const listConfigItems = useSelector((state: IStore) => selectConfigItems(state));
  const product: any = useSelector((state: IStore) => selectConfigProduct(state));
  const result = useSelector((state: IStore) => state.configItems.resultAction);

  useEffect(() => {
    if (result?.errorNumber === '0') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Success));
      if (!result?.resultObj) {
        dispatch(ConfigItemsActions.removeResult());
      }
    } else if (result?.errorNumber === '666') {
      dispatch(ToastsAction.add(result?.message, ToastStatusEnum.Error));
      dispatch(ConfigItemsActions.removeResult());
    }
  }, [dispatch, result]);

  useEffect(() => {
    if (productDetail && result?.resultObj?.length > 0) {
      dispatch(ModalFirstAction.OPEN(<ConfigItemUploadFailed />, ModalSizeEnum.FullScreen));
    }
  }, [dispatch, productDetail, result]);

  useEffect(() => {
    !state && dispatch(ConfigItemsActions.reqConfigItemsList(activePageConfig, pageSize, 'poNumber', 'descending', currentUser.employeeID));
    //
    state && dispatch(ConfigItemsActions.reqConfigItemsHeader(+state?.projectId, +state?.funnelGenID));
    state &&
      dispatch(
        ConfigItemsActions.reqConfigItemsProjectPO(
          activePageConfig,
          pageSize,
          'poNumber',
          'descending',
          currentUser.employeeID,
          state?.projectId,
          state?.funnelGenID
        )
      );
  }, [dispatch, state]);

  useEffect(() => {
    if (!state && listConfigItems.rows?.length !== 0) {
      if (listConfigItems.search) {
        dispatch(
          ConfigItemsActions.reqConfigItemsListSearch(
            1,
            listConfigItems.totalRows,
            listConfigItems.column,
            listConfigItems.sorting,
            listConfigItems.search.search as any,
            currentUser.employeeID,
            'ALL'
          )
        );
      } else if (listConfigItems.filter) {
        const newItems = new ConfigItemFilter({
          ...(listConfigItems.filter as any),
          page: 1,
          pageSize: listConfigItems.totalRows,
          sorting: listConfigItems.sorting,
        });
        dispatch(ConfigItemsActions.reqConfigItemsListFilter(newItems, 'ALL'));
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsListAll(
            1,
            listConfigItems.totalRows,
            listConfigItems.column,
            listConfigItems.sorting,
            currentUser.employeeID
          )
        );
      }
    }
  }, [dispatch, state, listConfigItems]);

  const paginationProjectPO = (e: any, data: any) => {
    dispatch(ConfigItemsActions.setActivePageListConf(data.activePage));
    if (state) {
      if (searchProjPO) {
        state &&
          dispatch(
            ConfigItemsActions.reqConfigItemsProjectPOSearch(
              data.activePage,
              pageSize,
              projectPO.column,
              projectPO.sorting,
              currentUser.employeeID,
              state?.projectId,
              state?.funnelGenID,
              searchProjPO?.search as any
            )
          );
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsProjectPO(
            data.activePage,
            pageSize,
            projectPO.column,
            projectPO.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID
          )
        );
      }
    } else {
      if (listConfigItems.search) {
        dispatch(
          ConfigItemsActions.reqConfigItemsListSearch(
            data.activePage,
            pageSize,
            listConfigItems.column,
            listConfigItems.sorting,
            listConfigItems.search.search as any,
            currentUser.employeeID,
            'PERPAGE'
          )
        );
      } else if (listConfigItems.filter) {
        const newItems = new ConfigItemFilter({
          ...(listConfigItems.filter as any),
          page: data.activePage,
          pageSize: pageSize,
          column: listConfigItems.column,
          sorting: listConfigItems.sorting,
        });
        dispatch(ConfigItemsActions.reqConfigItemsListFilter(newItems, 'PERPAGE'));
      } else {
        dispatch(
          ConfigItemsActions.reqConfigItemsList(data.activePage, pageSize, listConfigItems.column, listConfigItems.sorting, currentUser.employeeID)
        );
      }
    }
  };

  const paginationProduct = (e: any, data: any) => {
    dispatch(ConfigItemsActions.setActivePageProduct(data.activePage));
    if (searchProd) {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProductSearch(
            data.activePage,
            activePage.pageSizeProd,
            product.column,
            product.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            selectProjPO,
            searchProd?.search as any
          )
        );
    } else {
      state &&
        dispatch(
          ConfigItemsActions.reqConfigItemsProduct(
            data.activePage,
            activePage.pageSizeProd,
            product.column,
            product.sorting,
            currentUser.employeeID,
            state?.projectId,
            state?.funnelGenID,
            selectProjPO
          )
        );
    }
  };

  const paginationProductDetail = (e: any, data: any) => {
    dispatch(ConfigItemsActions.setActivePageProductDetail(data.activePage));
    state &&
      dispatch(
        ConfigItemsActions.reqConfigItemsProductDetail(
          data.activePage,
          activePage.pageSizeProdDetail,
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
  };

  return (
    <Grid className=" pb-2r">
      {state && (
        <>
          <Grid.Row>
            <Grid.Column>
              <BreadCumb link={`/pmo-view/${state?.funnelGenID}/${state?.projectId}`} title={'Back to View/Edit'} />
              <HeaderCofigItems history={props.history} funnelGenID={state?.funnelGenID} projectId={state?.projectId} />
            </Grid.Column>
          </Grid.Row>
        </>
      )}
      {/* <Button onClick={() => dispatch(ModalFirstAction.OPEN(<ConfigItemUploadFailed />, ModalSizeEnum.Large))}>test</Button> */}

      <Grid.Row>
        <Grid.Column>
          <LoadingIndicator isActive={isRequesting}>
            <HeaderTableProjectList />
            <div className="hozontal-scroll" style={{ minHeight: 460 }}>
              <ProjectListTabel tableData={state ? projectPO.rows : listConfigItems.rows} />
            </div>
            <Pagination
              activePage={activePageConfig}
              onPageChange={(e, data) => paginationProjectPO(e, data)}
              totalPage={state ? projectPO.totalRows : listConfigItems.totalRows}
              pageSize={pageSize}
            />
          </LoadingIndicator>
        </Grid.Column>
      </Grid.Row>

      {state && (
        <>
          <Grid.Row className="bg-yellow-light config-items-bg">
            <Grid.Column>
              <LoadingIndicator isActive={isRequestingProduct}>
                <HeaderConfigProductTable />
                <div className="hozontal-scroll">
                  <ConfigProductTable tableData={product.rows} />
                </div>
                <Pagination
                  activePage={activePageProd}
                  onPageChange={(e, data) => paginationProduct(e, data)}
                  totalPage={product.totalRows}
                  pageSize={activePage.pageSizeProd}
                />
              </LoadingIndicator>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="bg-yellow-light config-items-bg">
            <Grid.Column>
              <LoadingIndicator isActive={isReqProductDetail}>
                <HeaderConfigProductDetail />
                <ConfigProductDetailTable tableData={productDetail.rows} />
                <Pagination
                  activePage={activePageProdDetail}
                  onPageChange={(e, data) => paginationProductDetail(e, data)}
                  totalPage={productDetail.totalRows}
                  pageSize={activePage.pageSizeProdDetail}
                />
              </LoadingIndicator>
            </Grid.Column>
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};

export default ConfigItems;
