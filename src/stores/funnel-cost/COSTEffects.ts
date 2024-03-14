import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';

import * as EffectUtility from 'utilities/EffectUtility';
import CostTypeModel from './models/CostTypeModel';
import CostNameModel from './models/CostNameModel';
import TableRowModel from './models/TableRowModel';
import CostRequestModel from './models/COSTRequestModel';
import COFModel from './models/COFModel';
import PersenModel from './models/PersenModel';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';

//Hendz PMT
export const requestPMT = async (cost: number, duration: number, TOP: string, bunga: number): Promise<COFModel | HttpErrorResponseModel> => {
  const controllerName = `PMT/GetPMT?cost=${cost}&duration=${duration}&TOP=${TOP}&bunga=${bunga}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<COFModel>(COFModel, endpoint);
};
export const requestPMTLocal = async (): Promise<any | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('totalFinancing');
  return jsonString;
};

export const requestDropdownCOF = async (funnelGenID: number): Promise<CostTypeModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelTOP/DropdownCOF?FunnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<CostTypeModel>(CostTypeModel, endpoint);
};

export const requestPersenCOF = async (entryKey: string): Promise<PersenModel | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/${entryKey}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PersenModel>(PersenModel, endpoint);
};
//---------------------------------------------------------

export const requestCostType = async (): Promise<CostTypeModel | HttpErrorResponseModel> => {
  const controllerName = `CostType`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<CostTypeModel>(CostTypeModel, endpoint);
};

export const requestCostNameById = async (
  costTypeId: number,
  userLoginID: number,
  funnelStatusID: number
): Promise<CostNameModel | HttpErrorResponseModel> => {
  const controllerName = `CostName/CostTypeID=${costTypeId}&userLogin=${userLoginID}&funnelStatusID=${funnelStatusID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CostNameModel>(CostNameModel, endpoint);
};

export const postCostName = async (data: CostNameModel): Promise<CostNameModel | HttpErrorResponseModel> => {
  const controllerName = `CostName`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<CostNameModel>(CostNameModel, endpoint, data);
};

export const getFunnelById = async (funnelId: number): Promise<TableRowModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelCost/GetByFunnelGenID?FunnelGenID=${funnelId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<TableRowModel>(TableRowModel, endpoint);
};

export const postFunnelCost = async (data: CostRequestModel): Promise<CostRequestModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelCost`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.postToModel<CostRequestModel>(CostRequestModel, endpoint, data);
};

export const deleteFunnelCost = async (funnelCostID: number): Promise<CostRequestModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelCost?funnelCostID=${funnelCostID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.delToModel<CostRequestModel>(CostRequestModel, endpoint);
};

export const putFunnelCost = async (data: CostRequestModel): Promise<CostRequestModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelCost`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.putToModel<CostRequestModel>(CostRequestModel, endpoint, data);
};

export const getFunnelByIdLocal = async (): Promise<any> => {
  const listCostService: TableRowModel[] = [];
  const jsonString = localStorage.getItem('funnelCost')!;
  if (jsonString !== null) {
    const objects = JSON.parse(jsonString);

    for (const object of objects) {
      const result = new TableRowModel({
        cost: object.cost,
        costID: object.costID,
        costName: object.costName,
        createDate: object.createDate,
        costRemark: object.costRemark,
        createUserID: object.createUserID,
        funnelCostID: object.funnelCostID,
        funnelCostType: object.funnelCostType,
        funnelCostTypeName: object.funnelCostTypeName,
        funnelGenID: object.funnelGenID,
        modifyDate: object.modifyDate,
        modifyUserID: object.modifyUserID,
        isAdd: object.isAdd,
        isUpdate: object.isUpdate,
        isDelete: object.isDelete,
      });
      listCostService.push(result);
    }
  } else {
  }

  return listCostService;
};

export const postFunnelCostLocal = async (data: TableRowModel): Promise<TableRowModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('funnelCost');
  let listCostService: TableRowModel[] = [];
  let idFunnel;

  if (jsonString !== null && jsonString !== '[]') {
    listCostService = JSON.parse(jsonString);
    listCostService.map((item) => {
      return (idFunnel = item.funnelCostID);
    });
    data.funnelCostID = Number(idFunnel) + 1;
  } else {
    data.funnelCostID = 1;
  }

  const funnelService = new TableRowModel(data);
  listCostService.push(funnelService);
  localStorage.setItem('funnelCost', JSON.stringify(listCostService));
  return funnelService;
};

export const deleteFunnelCostLocal = async (
  data: TableRowModel,
  id: any,
  isSalesAnalis?: boolean
): Promise<TableRowModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('funnelCost');

  let listCostService: TableRowModel[] = [];
  let idFunnel;

  if (jsonString !== null && jsonString !== '[]') {
    listCostService = JSON.parse(jsonString);
    listCostService.map((item) => {
      return (idFunnel = item.funnelCostID);
    });

    if (isSalesAnalis) {
      data.isDelete = 1;
      data.isAdd = 0;
      data.isUpdate = 0;
    } else {
      data.funnelCostID = Number(idFunnel) + 1;
    }
  } else {
    if (isSalesAnalis) {
      data.isDelete = 1;
      data.isAdd = 0;
      data.isUpdate = 0;
    } else {
      data.funnelCostID = 1;
    }
  }

  const costService = new TableRowModel(data);

  const newValue = listCostService.filter((item: any) => {
    return item.funnelCostID !== id;
  });

  listCostService.push(costService);

  if (isSalesAnalis) {
    localStorage.setItem('funnelCost', JSON.stringify([...newValue, costService]));
  } else {
    localStorage.setItem('funnelCost', JSON.stringify(newValue));
  }

  return costService;
};

export const putFunnelCostLocal = async (data: TableRowModel, id: any): Promise<any> => {
  const jsonString = localStorage.getItem('funnelCost');
  let listCostService: TableRowModel[] = [];

  if (jsonString !== null && jsonString !== '[]') {
    listCostService = JSON.parse(jsonString);
  }

  const costService = new TableRowModel(data);
  costService.funnelCostID = Number(id);

  const newValue = listCostService.filter((item: any) => {
    return item.funnelCostID !== Number(id);
  });

  newValue.push(costService);

  localStorage.setItem('funnelCost', JSON.stringify(newValue));
  console.log(newValue);
};

// export const requestProductServiceLocal = async(id:number):Promise<TableRowModel | HttpErrorResponseModel> => {
//   let jsonString =  localStorage.getItem("productService")
//   var listProductService:TableRowModel[] =[];
//   var result = new TableRowModel({})
//   let total:number = 0;
//   if(jsonString !== null)
//   {
//     listProductService = JSON.parse(jsonString);
//     total = listProductService.length
//   }
//   var productService = listProductService.find(productService => productService.funnelItemsID === id)!;
//   if(productService !== undefined)
//   {
//     result = productService!;
//   }
//   return result
// }

export const requestFunnelCostHistoryById = async (funnelGenID: number): Promise<FunnelHistoryEnvelope[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelCost/History?funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelHistoryEnvelope[]>(FunnelHistoryEnvelope, endpoint);
};
