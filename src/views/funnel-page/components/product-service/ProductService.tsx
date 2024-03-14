import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import ProductServiceTable from './table/ProductServiceTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import { ProductForm, ServiceForm } from './form';
import { Button, Pagination, Tooltips } from 'views/components/UI';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import * as ModalFirstLevel from 'stores/modal/first-level/ModalFirstLevelActions';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import IStore from 'models/IStore';
import { selectProductService } from 'selectors/funnel-product-service/ProductServiceSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectTotalFunnelSC } from 'selectors/funnel-service-catalog/FunnelServiceCatalogSelector';
import * as ServiceItemAction from 'stores/service-item/ServiceItemAction';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import AccordionProductService from './accordion/AccordionProductService';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import { selectFunnelTop } from 'selectors/funnel-top/FunnelTopSelector';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import { create } from 'domain';

interface IProps {
  funnelGenID: string;
  projectCategory?: string;
  currency?: string;
  currentDate?: string;
  customerGenID: number;
  //funnelItemsID: string
}

const ProductService: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [deleteItem, setDeleteItem] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isIcEdit: boolean = useSelector((state: IStore) => state.funnelSalesAnalyst.isIcEdit);
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTop(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));

  const onAddProduct = useCallback(
    (projectCategory, currency, currentDate, customerGenID): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ProductForm
            setValidasiSubBrand={setValidasiSubBrand}
            currentDate={currentDate}
            currency={currency}
            projectCategory={projectCategory}
            funnelGenID={props.funnelGenID}
            funnelItemsID={'0'}
            rowData={'Add'}
            type="Add"
            customerGenID={customerGenID}
            setActivePage={setActivePage}
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch, props.funnelGenID]
  );

  const onAddService = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ServiceForm funnelGenID={props.funnelGenID} funnelItemsID={'0'} type="Add" rowData={'rowData'} setActivePage={setActivePage} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, props.funnelGenID]);

  useEffect(() => {
    localStorage.removeItem('productService');

    if (+props.funnelGenID > 0) {
      if (JSON.parse(localStorage.getItem('productService'))) {
        dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
      } else {
        dispatch(ProductServiceActions.requestFunnelProductService(+props.funnelGenID, activePage, pageSize));
      }
    } else {
      dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    }
  }, []);

  useEffect(() => {
    if (+props.funnelGenID > 0) {
      dispatch(FunnelActions.requestViewFunnelCustomerById(+props.funnelGenID));
      if (!JSON.parse(localStorage.getItem('productService'))) {
        // dispatch(ProductServiceActions.requestFunnelProductService(+props.funnelGenID, activePage, pageSize));
        dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(+props.funnelGenID, 1, 5));
        dispatch(ProductServiceActions.requestExistingInternalService(+props.funnelGenID));
      }
    }

    dispatch(ProductServiceActions.requestFunnelProductServiceAll(+props.funnelGenID, 1, ''));
    dispatch(FunnelTopActions.requestFunnelTopAll(+props.funnelGenID));
  }, [dispatch, props.funnelGenID, activePage, pageSize]);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    if (+props.funnelGenID > 0) {
      if (JSON.parse(localStorage.getItem('productService'))) {
        dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
      } else {
        dispatch(ProductServiceActions.requestFunnelProductService(+props.funnelGenID, data.activePage, pageSize));
      }
    } else {
      dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE]));
  const funnelProductService: IProductServiceTable = useSelector((state: IStore) =>
    selectProductService(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE])
  );

  let funnelProductServiceLocal: IProductServiceTable = {
    totalItemProduct: 0,
    totalItemService: 0,
    totalRow: 0,
    rows: [],
  };

  const paginate = (arr, size) => {
    return arr.reduce((acc, val, i) => {
      const idx = Math.floor(i / size);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  };

  if (funnelProductService) {
    const newValue = funnelProductService.rows.filter((item: any) => {
      return item.isDelete === 0 || item.isDelete === undefined || item.isDelete === null;
    });
    const pages = paginate(newValue, pageSize);

    const lengthProduct = funnelProductService.rows.filter((item: any) => item.itemType === 18 && item.isDelete !== 1);
    const lengthService = funnelProductService.rows.filter((item: any) => item.itemType === 19 && item.isDelete !== 1);

    funnelProductServiceLocal = {
      totalItemProduct: lengthProduct?.length,
      totalItemService: lengthService?.length,
      totalRow: newValue.length,
      rows: pages[activePage - 1] || [],
    };
  }

  const localFunnelTop = JSON.parse(localStorage.getItem('funnelTop'));
  function remove(id, type) {
    let i: any;
    if (type === 'prod') {
      i = localFunnelTop?.rows?.findIndex((e) => e.productDesc === id, type);
    } else if (type === 'service') {
      i = localFunnelTop?.rows?.findIndex((e) => e.serviceDesc === id, type);
    }
    if (i !== -1) {
      if (localFunnelTop) {
        localFunnelTop.rows.splice(i, 1);
        localStorage.setItem('funnelTop', JSON.stringify(localFunnelTop));
      }
    }
    dispatch(FunnelTopActions.requestTopType());
  }

  const removeFunnelTopLocal = () => {
    if (funnelProductServiceLocal.totalItemProduct === 0 && funnelProductServiceLocal.totalItemService) {
      if (localFunnelTop) {
        localFunnelTop.rows.map((e) => {
          if (e.productDesc && !e.serviceDesc) {
            remove(e.productDesc, 'prod');
          }
        });
      }
    } else if (funnelProductServiceLocal.totalItemService === 0 && funnelProductServiceLocal.totalItemProduct) {
      if (localFunnelTop) {
        localFunnelTop.rows.map((e) => {
          if (e.serviceDesc && !e.productDesc) {
            remove(e.serviceDesc, 'service');
          }
        });
      }
    } else if (funnelProductServiceLocal.totalItemProduct === 0 && funnelProductServiceLocal.totalItemService === 0) {
      if (localFunnelTop) {
        localFunnelTop.rows.map((e) => {
          if (e.productDesc || e.serviceDesc) {
            remove(e.productDesc, 'prod');
            remove(e.serviceDesc, 'service');
          }
        });
      }
    }
  };

  const removeFunnelTopLocalSA = () => {
    if (
      funnelProductService.totalItemProduct === 0 &&
      funnelProductServiceLocal.totalItemProduct === 0 &&
      funnelProductServiceLocal.totalItemService
    ) {
      if (localFunnelTop) {
        let listFunnelTopDeleteProduct = [];
        localFunnelTop.rows.map((i) => {
          const createDelete = new TopServiceModel(i);
          if (i.isDelete) {
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          } else if (i.productDesc !== 0 && i.serviceDesc !== 0) {
            createDelete.isAdd = 1;
            createDelete.productDesc = 0;
            createDelete.productDescStr = '';
            createDelete.productPercentage = null;
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          } else if (i.productDesc !== 0 && i.serviceDesc === 0 && i.isAdd) {
            remove(i.productDesc, 'prod');
          } else {
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          }
        });
        localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteProduct }));
      } else if (funnelTop?.rows?.length > 0) {
        let listFunnelTopDeleteProduct = [];
        funnelTop.rows.map((i) => {
          const createDelete = new TopServiceModel(i);
          if (i.productDesc !== 0 && i.serviceDesc === 0) {
            createDelete.isDelete = 1;
            createDelete.isAdd = 0;
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          } else {
            createDelete.isUpdate = 1;
            createDelete.productDesc = 0;
            createDelete.productDescStr = '';
            createDelete.productPercentage = null;
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          }
        });
        localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteProduct }));
      }
    } else if (
      funnelProductService.totalItemService === 0 &&
      funnelProductServiceLocal.totalItemService === 0 &&
      funnelProductServiceLocal.totalItemProduct
    ) {
      if (localFunnelTop) {
        let listFunnelTopDeleteProduct = [];
        localFunnelTop.rows.map((i) => {
          const createDelete = new TopServiceModel(i);
          if (i.isDelete) {
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          } else if (i.productDesc !== 0 && i.serviceDesc !== 0) {
            createDelete.isAdd = 1;
            createDelete.serviceDesc = 0;
            createDelete.serviceDescStr = '';
            createDelete.servicePercentage = null;
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          } else if (i.productDesc === 0 && i.serviceDesc !== 0 && i.isAdd) {
            remove(i.productDesc, 'prod');
          } else {
            listFunnelTopDeleteProduct = [...listFunnelTopDeleteProduct, createDelete];
          }
        });
        localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteProduct }));
      } else if (funnelTop?.rows?.length > 0) {
        let listFunnelTopDeleteService = [];
        funnelTop.rows.map((i) => {
          const createDelete = new TopServiceModel(i);
          if (i.serviceDesc !== 0 && i.productDesc === 0) {
            createDelete.isDelete = 1;
            createDelete.isAdd = 0;
            listFunnelTopDeleteService = [...listFunnelTopDeleteService, createDelete];
          } else {
            createDelete.isUpdate = 1;
            createDelete.serviceDesc = 0;
            createDelete.serviceDescStr = '';
            createDelete.servicePercentage = null;
            listFunnelTopDeleteService = [...listFunnelTopDeleteService, createDelete];
          }
        });
        localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteService }));
      }
    } else if (funnelProductServiceLocal.totalItemProduct === 0 && funnelProductServiceLocal.totalItemService === 0) {
      if (localFunnelTop) {
        let listFunnelTopDeleteBoth = [];
        localFunnelTop.rows.map((i) => {
          const createDelete = new TopServiceModel(i);
          if (i.isAdd) {
            if (i.productDesc || i.serviceDesc) {
              remove(i.serviceDesc, 'service');
              remove(i.productDesc, 'prod');
            }
          } else {
            createDelete.isDelete = 1;
            createDelete.isUpdate = 0;
            listFunnelTopDeleteBoth = [...listFunnelTopDeleteBoth, createDelete];
          }
        });
        localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteBoth }));
      } else {
        if (funnelTop?.rows?.length > 0) {
          let listFunnelTopDeleteBoth = [];
          funnelTop.rows.map((i) => {
            const createDelete = new TopServiceModel(i);
            if (i.serviceDesc !== 0 && i.productDesc !== 0) {
              createDelete.isDelete = 1;
              listFunnelTopDeleteBoth = [...listFunnelTopDeleteBoth, createDelete];
            }
          });
          localStorage.setItem('funnelTop', JSON.stringify({ rows: listFunnelTopDeleteBoth }));
        }
      }
    }
  };

  const removeListTop = () => {
    if (+props.funnelGenID === 0) {
      removeFunnelTopLocal();
    } else if (isSalesAnalis) {
      if (deleteItem) {
        removeFunnelTopLocalSA();
      }
    }
  };
  const [validasiSubBrand, setValidasiSubBrand] = useState(false);
  const [ArraySubBrand, setArraySubBrand] = useState([]);
  const [validasiAddProduct, setValidasiAddProduct] = useState(false);
  const [validasiDeletProduct,setValidasiDeleteProduct] = useState(false)
  const [CBV, setCBV] = useState('');
  const [nonCBV, setNonCBV] = useState('');

  useEffect(() => {
    removeListTop();
    if (validasiSubBrand) {
      const productService = JSON.parse(localStorage.getItem('productService'));
      setValidasiSubBrand(false);
      setArraySubBrand(productService);
      setValidasiAddProduct(true);
    }
  }, [dispatch, funnelProductService, validasiSubBrand, ArraySubBrand]);

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  // console.log('viewFunnelCustomer',viewFunnelCustomer)
  useEffect(() => {
    if (validasiAddProduct) {
      setValidasiAddProduct(false);
      if (+props.funnelGenID === 0) {
        const productService = JSON.parse(localStorage.getItem('productService'));
        productService.map((item) => {
          if (item.itemName === 'AWS' && item.itemSubName === 'CBV') {
            localStorage.setItem('CBV', JSON.stringify('CBV'));
          } else if (item.itemName === 'AWS' && item.itemSubName !== 'CBV') {
            if (item.itemSubName !== nonCBV) {
              localStorage.setItem('nonCBV', JSON.stringify(item.itemSubName));
            }
          }
        });
      }
    }
    
  }, [validasiAddProduct, viewFunnelCustomer.projectCategory, props.funnelGenID]);


  useEffect(() => {
    if(validasiDeletProduct){
      setValidasiDeleteProduct(false)
      if(+props.funnelGenID === 0) {
        const productService = JSON.parse(localStorage.getItem('productService'));
        productService.map((item) => {
          if(item.itemName === 'AWS' && item.itemSubName === 'CBV')
          {
            localStorage.setItem('CBV', JSON.stringify('CBV'));
          }
          if(item.itemName === 'AWS' && item.itemSubName !== 'CBV')
          {
            localStorage.setItem('nonCBV', JSON.stringify('nonCBV'));
          }
        })
      }
    }
  },[validasiDeletProduct, localStorage])

  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center">
          <Grid.Column className="FullGrid1200">
            <Header>
              <Header.Content>Product and Service</Header.Content>
              <Header.Content>
                {+props.funnelGenID > 0 && (
                  <>
                    <Tooltips
                      position="top right"
                      content="History Product and Service"
                      trigger={
                        <Button
                          circular
                          basic
                          type="button"
                          compact
                          icon="history"
                          onClick={(e: Event) =>
                            dispatch(ModalFirstLevel.OPEN(<AccordionProductService funnelGenID={+props.funnelGenID} />, ModalSizeEnum.Small))
                          }
                        />
                      }
                    />
                    {JSON.parse(localStorage.getItem('productService')) && (
                      <Tooltips content="New Update" trigger={<Icon name="warning" className="ic-rounded-18 bg-warning ml-px-4" />} />
                    )}
                  </>
                )}
              </Header.Content>
            </Header>
          </Grid.Column>
          {(currentUser.role === 'Sales' || currentUser.role === 'Sales Admin') && (
            <Grid.Column className="FullGrid1200 d-inflex-767">
              <Button
                // disabled={isSalesAnalis}
                disabled={
                  (isSalesAnalis && !isIcEdit) || props.projectCategory === 'Billing AWS' || viewFunnelCustomer.projectCategory === 'Billing AWS'
                }
                type="button"
                icon="plus"
                color="green"
                floated="right"
                size="small"
                content="Add Service"
                // onClick={isSalesAnalis ? () => null : onAddService}
                onClick={isSalesAnalis && !isIcEdit ? () => null : onAddService}
              />
              <Button
                disabled={isSalesAnalis && !isIcEdit}
                type="button"
                icon="plus"
                color="blue"
                floated="right"
                size="small"
                content="Add Product"
                onClick={
                  isSalesAnalis && !isIcEdit
                    ? () => null
                    : () =>
                        onAddProduct(
                          +props.funnelGenID > 0 ? viewFunnelCustomer.projectCategory : props.projectCategory,
                          props.currency,
                          props.currentDate,
                          props.customerGenID
                        )
                }
              />
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          <ProductServiceTable
            tableData={JSON.parse(localStorage.getItem('productService')) ? funnelProductServiceLocal : funnelProductService}
            setDeleteItem={setDeleteItem}
            setValidasiDeleteProduct={setValidasiDeleteProduct}
            setActivePage={setActivePage}
            projectCategory={+props.funnelGenID > 0 ? viewFunnelCustomer.projectCategory : props.projectCategory}
            currency={props.currency}
          />
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            totalPage={JSON.parse(localStorage.getItem('productService')) ? funnelProductServiceLocal.totalRow : funnelProductService.totalRow}
            pageSize={pageSize}
          />
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default ProductService;
