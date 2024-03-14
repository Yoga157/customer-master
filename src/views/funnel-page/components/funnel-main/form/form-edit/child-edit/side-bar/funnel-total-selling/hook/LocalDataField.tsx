import React from 'react';
import { useSelector } from 'react-redux';

import { selectViewFunnelSelling } from 'selectors/funnel/FunnelSelector';
import { FunnelViewEditSelling } from 'stores/funnel/models/view-edit';
import IStore from 'models/IStore';

function LocalDataField() {
  const viewFunnelSelling = useSelector((state: IStore) => selectViewFunnelSelling(state));

  const viewFunnelSellingLocal = new FunnelViewEditSelling({ ...viewFunnelSelling });

  const localProduct = () => {
    if (JSON.parse(localStorage.getItem('productService'))) {
      let totalSellingPrice = 0;
      let totalOrderingPriceProduct = 0;
      let totalSellingPriceProduct = 0;
      let totalOrderingPriceService = 0;
      let totalSellingPriceService = 0;

      JSON.parse(localStorage.getItem('productService')).map((e) => {
        if (e.itemType === 18) {
          totalOrderingPriceProduct += e.orderingPrice;
          totalSellingPriceProduct += e.sellingPrice;
        } else if (e.itemType === 19) {
          totalOrderingPriceService += e.orderingPrice;
          totalSellingPriceService += e.sellingPrice;
        }
      });

      totalSellingPrice = totalSellingPriceProduct + totalSellingPriceService;

      viewFunnelSellingLocal.totalOrderingPriceProduct = totalOrderingPriceProduct;
      viewFunnelSellingLocal.totalSellingPriceProduct = totalSellingPriceProduct;
      viewFunnelSellingLocal.totalOrderingPriceService = totalOrderingPriceService;
      viewFunnelSellingLocal.totalSellingPriceService = totalSellingPriceService;
      viewFunnelSellingLocal.totalSellingPrice = totalSellingPrice;

      viewFunnelSellingLocal.gpmsaProduct = totalSellingPriceProduct - totalOrderingPriceProduct;
      viewFunnelSellingLocal.gpmsaService = totalSellingPriceService - totalOrderingPriceService;

      // localStorage.setItem('editViewFunnelSellingEdit', JSON.stringify([viewFunnelSellingLocal]));
      return viewFunnelSellingLocal;
    }
  };

  const localCost = () => {
    if (JSON.parse(localStorage.getItem('funnelCost'))) {
      let totalCostProduct = 0;
      let expenseProduct = 0;
      let totalCostService = 0;
      let expenseService = 0;

      const arrNoDelete = JSON.parse(localStorage.getItem('funnelCost')).filter((e) => e.isDelete !== 1);
      arrNoDelete.map((e) => {
        if (e.funnelCostTypeName === 'Cost Product') {
          totalCostProduct += e.cost;
        } else if (e.funnelCostTypeName === 'Expense Product') {
          expenseProduct += e.cost;
        } else if (e.funnelCostTypeName === 'Cost Service') {
          totalCostService += e.cost;
        } else if (e.funnelCostTypeName === 'Expense Service') {
          expenseService += e.cost;
        }
      });

      viewFunnelSellingLocal.totalCostProduct = totalCostProduct;
      viewFunnelSellingLocal.totalExpendProduct = expenseProduct;
      viewFunnelSellingLocal.totalCostService = totalCostService;
      viewFunnelSellingLocal.totalExpendService = expenseService;

      // localStorage.setItem('editViewFunnelSellingEdit', JSON.stringify([viewFunnelSellingLocal]));
      return viewFunnelSellingLocal;
    }
  };

  const gpmAmounAndPct = (totalSelling: number, totalCost: number, totalOrdering: number) => {
    viewFunnelSellingLocal.gpmAmount = totalSelling - (totalOrdering + totalCost);

    let gpmPct = (viewFunnelSellingLocal.gpmAmount / totalSelling) * 100;
    // viewFunnelSellingLocal.gpmPctg = Number(gpmPct.toFixed(2));
    const pctToStr = gpmPct.toString();
    viewFunnelSellingLocal.gpmPctg = +pctToStr.slice(0, pctToStr.indexOf('.') + 2 + 1);

    localStorage.setItem('editViewFunnelSellingEdit', JSON.stringify([viewFunnelSellingLocal]));
  };

  if (JSON.parse(localStorage.getItem('productService'))) {
    let fromProductServiceLocal = localProduct();
    let totalSelling = fromProductServiceLocal.totalSellingPrice;
    let totalCost = fromProductServiceLocal.totalCostProduct + fromProductServiceLocal.totalCostService;
    let totalOrdering = fromProductServiceLocal.totalOrderingPriceProduct + fromProductServiceLocal.totalOrderingPriceService;

    gpmAmounAndPct(totalSelling, totalCost, totalOrdering);
  }
  if (JSON.parse(localStorage.getItem('funnelCost'))) {
    let fromCostLocal = localCost();
    let totalSelling = fromCostLocal.totalSellingPrice;
    let totalCost = fromCostLocal.totalCostProduct + fromCostLocal.totalCostService;
    let totalOrdering = fromCostLocal.totalOrderingPriceProduct + fromCostLocal.totalOrderingPriceService;

    gpmAmounAndPct(totalSelling, totalCost, totalOrdering);
  }

  return [viewFunnelSellingLocal];
}

export default LocalDataField;
