import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import FunnelCostServiceTable from './table/FunnelCostServiceTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { CreateForm, EditForm } from './form';
import { Button, Pagination, Tooltips } from 'views/components/UI';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import IStore from 'models/IStore';
import { selectProductService } from 'selectors/funnel-product-service/ProductServiceSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectTotalFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import * as ServiceItemAction from 'stores/service-item/ServiceItemAction';
import * as FunnelCostService from 'stores/funnel-cost/COSTAction';
import { selectRows, selectTotalCost } from 'selectors/funnel-cost/FunnelCostSelector';
import AccordionCost from './accordion/AccordionCost';

interface IProps {
  funnelGenID: string;
  funnelStatusID: number;
}

const FunnelCost: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [local, setLocal] = useState(false);

  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const funnelProductService = useSelector((state: IStore) => state.funnelProductService.listData);

  const onAddCost = useCallback(
    (funnelGenID: string, funnelStatusID: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <CreateForm funnelGenID={funnelGenID} funnelStatusID={funnelStatusID} funnelItemsID={'0'} type="Add" />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch, props.funnelGenID]
  );

  useEffect(() => {
    localStorage.removeItem('funnelCost');
  }, []);

  useEffect(() => {
    const page = document.querySelector('#root > div.ui.container > div > div:nth-child(1) > div')?.textContent;

    if (page === 'Add New Funnel' || page === 'Add New Funnel - Copy Project') {
      dispatch(FunnelCostService.getFunnelByIdLocal());
      setLocal(true);
    } else {
      dispatch(FunnelCostService.getFunnelById(props.funnelGenID));
    }
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    console.log('handlePaginationChange');
  };

  // api data
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE, FunnelCostService.REQUEST_FUNNEL_TABLEROW])
  );
  const rowData: any = useSelector((state: IStore) => selectRows(state));

  const prods = funnelProductService.rows.find((e) => e.itemType === 18);
  const servs = funnelProductService.rows.find((e) => e.itemType === 19);

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center">
          <Grid.Column className="FullGrid1200">
            <Header>
              <Header.Content>Cost</Header.Content>
              <Header.Content>
                {+props.funnelGenID > 0 && (
                  <>
                    <Tooltips
                      position="top right"
                      content="History Cost"
                      trigger={
                        <Button
                          circular
                          basic
                          type="button"
                          compact
                          icon="history"
                          onClick={(e: Event) =>
                            dispatch(ModalFirstLevelActions.OPEN(<AccordionCost funnelGenID={+props.funnelGenID} />, ModalSizeEnum.Small))
                          }
                        />
                      }
                    />

                    {JSON.parse(localStorage.getItem('funnelCost')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} />
                    )}
                  </>
                )}
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button
              disabled={(isSalesAnalis && !isIcEdit) || (prods === undefined && servs === undefined)} //comment untuk dev
              type="button"
              icon="plus"
              color="blue"
              floated="right"
              size="small"
              content="Add Cost"
              onClick={isSalesAnalis && !isIcEdit ? () => null : () => onAddCost(props.funnelGenID, props.funnelStatusID)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <FunnelCostServiceTable tableData={rowData?.filter((i) => i.isDelete !== 1)} funnelStatusID={props.funnelStatusID} />
          {/* <Pagination
                activePage={activePage}
                onPageChange={(e,data) => handlePaginationChange(e,data)}
                totalPage={5}
                pageSize={pageSize}
                /> */}
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default FunnelCost;
