import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectViewFunnelAdditional,
  selectViewFunnelCustomer,
  selectViewFunnelSelling,
  selectViewFunnelStatus,
} from 'selectors/funnel/FunnelSelector';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectProductService } from 'selectors/funnel-product-service/ProductServiceSelector';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import FunnelCopyProjectModel from 'stores/funnel/models/FunnelCopyProjectModel';
import * as FunnelCustomerPIC from 'stores/customer-pic/CustomerPICActions';
import IFunnelTopTable from 'selectors/funnel-top/models/IFunnelTopTable';
import { selectFunnelTop } from 'selectors/funnel-top/FunnelTopSelector';
import * as FunnelTopActions from 'stores/funnel-top/FunnelTopActions';
import { selectRows } from 'selectors/funnel-cost/FunnelCostSelector';
import * as FunnelCostService from 'stores/funnel-cost/COSTAction';
import * as CustomerActions from 'stores/customer/CustomerActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import IUserResult from 'selectors/user/models/IUserResult';

function RequestCopyProject(props) {
  const {
    setEndUserCustomerGenID,
    setEstDurationProject,
    setCustomerEndName,
    setPICMobilePhone,
    setCustomerPICID,
    setCustomerName,
    setDurationType,
    setPICEmailAddr,
    setTotalSelling,
    setProjectName,
    funnelGenID,
    setCustomer,
    onChangeSMO,
    onChangePMO,
    setGpmPctg,
    typePage,
  } = props;
  const dispatch = useDispatch();

  const funnelProductService: IProductServiceTable = useSelector((state: IStore) =>
    selectProductService(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE])
  );
  const funnelTop: IFunnelTopTable = useSelector((state: IStore) => selectFunnelTop(state, [FunnelTopActions.REQUEST_FUNNEL_TOP]));
  const viewFunnelAditional = useSelector((state: IStore) => selectViewFunnelAdditional(state));
  const customerStoreSearch = useSelector((state: IStore) => state.customer.customerWithFlag);
  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));
  const customerPICStore = useSelector((state: IStore) => state.customerPIC.customerPic);
  const viewFunnelStatus = useSelector((state: IStore) => selectViewFunnelStatus(state));
  const rowData: any = useSelector((state: IStore) => selectRows(state));

  const [defaultValueCopyProject, setDefaultValueCopyProject] = useState({});

  useEffect(() => {
    if (typePage === 'copy-project') {
      dispatch(FunnelActions.requestViewFunnelAdditionalById(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelSellingById(+funnelGenID));
      dispatch(FunnelActions.requestViewFunnelStatusById(+funnelGenID));

      dispatch(ProductServiceActions.requestFunnelProductService(+funnelGenID, 1, '')).then(() => {
        localStorage.removeItem('productService');
      });
      dispatch(FunnelTopActions.requestFunnelTop(+funnelGenID, 1, '')).then(() => {
        localStorage.removeItem('funnelTop');
      });
      dispatch(FunnelCostService.getFunnelById(+funnelGenID)).then(() => {
        localStorage.removeItem('funnelCost');
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (typePage === 'copy-project') {
      if (viewFunnelCustomer.customerName && viewFunnelCustomer.customerName !== null) {
        dispatch(CustomerActions.requestCustomerByNameBlackList(viewFunnelCustomer.customerName));
      }
    }
  }, [dispatch, viewFunnelCustomer]);

  useEffect(() => {
    if (typePage === 'copy-project') {
      if (customerStoreSearch.length > 0 && viewFunnelStatus) {
        dispatch(FunnelCustomerPIC.requestCustomerPIC(customerStoreSearch[0].valueData, viewFunnelStatus.salesID));
      }
    }
  }, [dispatch, customerStoreSearch, viewFunnelStatus]);

  useEffect(() => {
    if (typePage === 'copy-project') {
      const copyProject = new FunnelCopyProjectModel({});

      copyProject.funnelStatusID = 1;

      copyProject.funnelID = viewFunnelCustomer.funnelID;
      copyProject.projectName = viewFunnelCustomer.projectName;
      copyProject.compellingEvent = viewFunnelAditional.compellingEvent;
      copyProject.customerBudget = viewFunnelAditional.customerBudget;
      copyProject.supportiveCoach = viewFunnelAditional.supportiveCoach;
      copyProject.customerNeeds = viewFunnelAditional.customerNeeds;
      copyProject.competitor = viewFunnelAditional.competitor;
      setProjectName(viewFunnelCustomer.projectName);
      setCustomer(viewFunnelCustomer.customerGenID);
      setCustomerName(viewFunnelCustomer.customerName);
      setEndUserCustomerGenID(viewFunnelCustomer.endUserCustomerGenID);
      setCustomerEndName(viewFunnelCustomer.endUserCustomerName);
      setCustomerPICID(customerPICStore[0]?.customerPICID);
      setPICEmailAddr(viewFunnelCustomer.picEmailAddr);
      setTotalSelling(viewFunnelSelling.totalSellingPrice);
      setPICMobilePhone(viewFunnelCustomer.picMobilePhone);
      setGpmPctg(viewFunnelSelling.gpmPctg);
      setDurationType(viewFunnelCustomer.estDurationType ? viewFunnelCustomer.estDurationType : 'years');
      setEstDurationProject(viewFunnelCustomer.estDurationProject ? viewFunnelCustomer.estDurationProject : 0);

      copyProject.dealCloseDate = new Date(viewFunnelStatus.dealCloseDate!);
      copyProject.customerName = viewFunnelCustomer.customerName;
      copyProject.endUserCustomerName = viewFunnelCustomer.endUserCustomerName;

      copyProject.customerPICID = customerPICStore[0]?.customerPICID;
      copyProject.PICJobTitle = customerPICStore[0]?.picJobTitle;
      copyProject.PICEmailAddr = viewFunnelCustomer.picEmailAddr;
      copyProject.PICMobilePhone = viewFunnelCustomer.picMobilePhone;

      copyProject.currency = viewFunnelSelling.currency ? viewFunnelSelling.currency : 'IDR';
      copyProject.totalSellingPrice = viewFunnelSelling.totalSellingPrice;
      copyProject.gpmPctg = viewFunnelSelling.gpmPctg;
      copyProject.gpmAmount = viewFunnelSelling.gpmAmount;

      copyProject.projectName = viewFunnelCustomer.projectName;
      copyProject.estDurationProject = viewFunnelCustomer.estDurationProject;
      copyProject.reqDedicatedResource = viewFunnelCustomer.reqDedicatedResource;
      copyProject.preSalesDeptArr = viewFunnelCustomer.preSalesDeptArr;
      copyProject.pmoDeptID = viewFunnelCustomer.chkPMODeptID;
      // copyProject.smoDeptID = viewFunnelCustomer.chkSMODeptID;
      onChangeSMO(viewFunnelCustomer.chkSMODeptID);
      onChangePMO(viewFunnelCustomer.chkPMODeptID);

      setDefaultValueCopyProject(copyProject);
    }
  }, [dispatch, viewFunnelStatus, viewFunnelCustomer, viewFunnelSelling, customerPICStore]);

  useEffect(() => {
    if (typePage === 'copy-project') {
      if (!JSON.parse(localStorage.getItem('productService'))) {
        if (funnelProductService?.rows?.length > 0) {
          localStorage.setItem('productService', JSON.stringify([...funnelProductService?.rows]));
        }
      }

      if (!JSON.parse(localStorage.getItem('funnelCost'))) {
        if (rowData?.length > 0) {
          localStorage.setItem('funnelCost', JSON.stringify([...rowData]));
        }
      }

      if (!JSON.parse(localStorage.getItem('funnelTop'))) {
        if (funnelTop?.rows?.length > 0) {
          localStorage.setItem('funnelTop', JSON.stringify({ rows: [...funnelTop.rows] }));
        }
      }
    }
  }, [dispatch, funnelProductService, rowData, funnelTop]);

  return [defaultValueCopyProject];
}

export default RequestCopyProject;
