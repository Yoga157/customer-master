/* eslint-disable prefer-spread */
import React, { useCallback, useEffect, useState, useRef, createRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Ref, Button, Table, Dropdown, Input, Search } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { TextInput, SelectInput, RichTextEditor, LabelInput, NumberInput, RadioButton } from 'views/components/UI';
import IStore from 'models/IStore';
import axios from 'axios';
import environment from 'environment';
import { selectCustomerName, selectSalesName, selectDirektorat } from 'selectors/funnel-opportunity/FunnelOpportunitySelector';
import { selectEmployeeSemantic } from 'selectors/select-options/EmployeeSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as SplitPerformanceActions from 'stores/funnel-split-performance/FunnelPerformanceActions';
import { selectSplitType } from 'selectors/funnel-split-performance/FunnelSplitPerformanceSelector';
import SplitModel from 'stores/funnel-split-performance/models/FunnelSplitModel';
import RowData from 'stores/funnel-cost/models/TableRowModel';
import SplitModelUpdate from 'stores/funnel-split-performance/models/FunnelSplitUpdateModel';
import { format } from 'date-fns';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import FunnelSplitListLocalModel from 'stores/funnel-split-performance/models/FunnelSplitListLocalModel';
import IProductServiceTable from 'selectors/funnel-product-service/models/IProductServiceTable';
import { selectProductService } from 'selectors/funnel-product-service/ProductServiceSelector';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IFormType {
  funnelGenID: number;
  salesID: number;
  splitType: number;
  splitPercentage: number;
  createUserID: number;
  salesName: string;
}

interface IProps {
  // funnelGenID: number;
  type: string;
  rowData: any;
  enableRow: any;
  indexItem: number;
}
const FunnelServiceCatalogForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const funnelProductService: IProductServiceTable = useSelector((state: IStore) =>
    selectProductService(state, [ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE])
  );

  const [form, setForm] = useState<IFormType>({
    funnelGenID: 0,
    salesID: 0,
    splitType: 0,
    splitPercentage: 0,
    createUserID: 0,
    salesName: '',
  });
  const [selectedSales, setSelectedSales] = useState('');
  const [formUpdate, setFormUpdate] = useState({
    funnelGenID: 0,
    salesID: 0,
    splitType: 0,
    splitPercentage: 0,
    createUserID: 0,
    funnelISplitID: 0,
    createDate: '',
    modifyDate: '',
    modifyUserID: 0,
  });

  const isSalesAnalis: boolean = useSelector((state: IStore) => state.funnel.isFunnelStatusActive);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const salesRef: any = createRef();
  const splitTypeRef: any = createRef();
  const salesName = useSelector((state: IStore) => selectEmployeeSemantic(state));
  const splitType = useSelector((state: IStore) => selectSplitType(state));
  const funnelSplitPerformace: any = useSelector((state: IStore) => state.funnelSplit.data);

  useEffect(() => {
    if (props.type === 'EDIT') {
      setSelectedSales(props.rowData.salesName);
      getFunnelSplitByID(props.rowData.funnelISplitID);
      dispatch(EmployeeActions.requestEmployeeByName(props.rowData.salesName, '27'));
      // console.log(props.rowData);
    }

    dispatch(SplitPerformanceActions.requestSplitType());
  }, []);

  const onSubmitHandler = () => {
    const path = window.location.pathname.split('/');
    const splitPerFormanceLocal = localStorage.getItem('splitPerFormance');
    let splitTypeStr = document.querySelector(`#servicecatalog > tbody > tr:nth-child(${props.indexItem}) > td:nth-child(2) > div > div.text`)
      .textContent!;
    const salesName = (document.querySelector(`#search-${props.indexItem}`) as HTMLInputElement).value;

    if (splitTypeStr === 'E.g. Split Type') {
      splitTypeStr = '';
    } else {
      splitTypeStr = splitTypeStr;
    }

    const date = format(new Date(), 'yyyy-MM-dd');

    if (props.type === 'EDIT') {
      const editItem = new SplitModelUpdate({});
      editItem.splitType = form.splitType;
      editItem.splitPercentage = form.splitPercentage ? form.splitPercentage : props.rowData.splitPercentage;
      editItem.salesID = form.salesID;
      editItem.funnelISplitID = Number(props.rowData.funnelISplitID);
      editItem.modifyDate = date;
      editItem.modifyUserID = currentUser.employeeID;
      editItem.createDate = date;
      editItem.createUserID = currentUser.employeeID;
      editItem.funnelGenID = Number(path[3]);

      // if (isSalesAnalis) {
      //   const newItemsLocal = new FunnelSplitListLocalModel({ ...editItem });
      //   newItemsLocal.splitTypeStr = splitTypeStr;
      //   newItemsLocal.salesName = salesName;
      //   newItemsLocal.isDelete = 0;
      //   if (props.rowData.isAdd) {
      //     newItemsLocal.isUpdate = 0;
      //     newItemsLocal.isAdd = 1;
      //   } else {
      //     newItemsLocal.isUpdate = 1;
      //     newItemsLocal.isAdd = 0;
      //   }

      //   if (splitPerFormanceLocal) {
      //     const localData = JSON.parse(splitPerFormanceLocal);
      //     const newSplitList = localData.rows.filter((e) => +e.funnelISplitID !== +props.rowData.funnelISplitID);
      //     localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...newSplitList, newItemsLocal] }));
      //   } else {
      //     if (funnelSplitPerformace?.rows?.length > 0) {
      //       const newSplitList = funnelSplitPerformace.rows.filter((e) => e.funnelISplitID !== props.rowData.funnelISplitID);
      //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...newSplitList, newItemsLocal] }));
      //     }
      //   }

      //   dispatch(SplitPerformanceActions.requestSplitType());
      // }

      props.enableRow(editItem);
    } else {
      const newItems = new SplitModel({});
      newItems.salesID = form.salesID;
      newItems.splitType = form.splitType;
      newItems.createUserID = currentUser.employeeID;
      newItems.splitPercentage = form.splitPercentage;
      newItems.funnelGenID = Number(path[3]);

      // if (isSalesAnalis) {
      //   const newItemsLocal = new FunnelSplitListLocalModel({ ...newItems });
      //   newItemsLocal.salesName = form.salesName;
      //   newItemsLocal.splitTypeStr = splitTypeStr;
      //   newItemsLocal.isAdd = 1;
      //   newItemsLocal.createDate = date;
      //   newItemsLocal.modifyDate = date;
      //   newItemsLocal.isDelete = 0;
      //   newItemsLocal.isUpdate = 0;
      //   newItemsLocal.modifyUserID = 0;
      //   if (splitPerFormanceLocal) {
      //     const splitLocal = JSON.parse(splitPerFormanceLocal);
      //     newItemsLocal.funnelISplitID =
      //       Math.max.apply(
      //         Math,
      //         splitLocal?.rows?.map((item) => +item.funnelISplitID)
      //       ) + 1;
      //     localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...splitLocal.rows, newItemsLocal] }));
      //   } else {
      //     if (funnelSplitPerformace?.rows?.length > 0) {
      //       newItemsLocal.funnelISplitID =
      //         // eslint-disable-next-line prefer-spread
      //         Math.max.apply(
      //           Math,
      //           funnelSplitPerformace?.rows?.map((item) => +item.funnelISplitID)
      //         ) + 1;
      //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [...funnelSplitPerformace.rows, newItemsLocal] }));
      //     } else {
      //       newItemsLocal.funnelISplitID = 1;
      //       localStorage.setItem('splitPerFormance', JSON.stringify({ rows: [newItemsLocal] }));
      //     }
      //   }
      //   resetFiledNUpdateLocal();
      // } else {
      dispatch(SplitPerformanceActions.requestInsertFunnelSplit(newItems)).then(() => {
        reset();
      });
      // }
    }
  };

  const resetFiledNUpdateLocal = () => {
    dispatch(SplitPerformanceActions.requestSplitType());
    reset();
  };

  const getFunnelSplitByID = (splitID: number) => {
    if (props.rowData.isAdd) {
      setForm({
        ...form,
        salesID: props.rowData.salesID,
        splitType: props.rowData.splitType,
        splitPercentage: props.rowData.splitPercentage,
      });
    } else {
      const endpoint = environment.api.funnel.replace(':controller', `FunnelSplitPerformance/GetByID?SplitID=${splitID}`);
      axios.get(endpoint).then((res) => {
        setForm({
          ...form,
          salesID: res.data.salesID,
          splitType: res.data.splitType,
          splitPercentage: res.data.splitPercentage,
        });
      });
    }
  };

  const reset = () => {
    if (form.splitType) {
      const elementType = splitTypeRef.current.querySelector('[aria-selected="true"]');
      if (elementType) {
        splitTypeRef.current.querySelector('.clear').click();
      }
    }
    setForm({
      ...form,
      salesID: 0,
      splitPercentage: 0,
    });

    setSelectedSales('');
  };

  const handleSearchEmployee = (e, data) => {
    setSelectedSales(data.value);
    dispatch(EmployeeActions.requestEmployeeByName(data.value, ''));
  };

  const onResultSelectSales = (e, data) => {
    setSelectedSales(data.result.title);

    setForm({ ...form, salesName: data.result.title, salesID: data.result.price });
  };

  const result = useSelector((state: IStore) => state.funnelSplit.ResultActions);
  useEffect(() => {
    const path = window.location.pathname.split('/');
    if (result.message == 'Insert Success!') {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
      dispatch(SplitPerformanceActions.requestFunnelSplit(Number(path[3]), 1, 5));
    } else if (!result.bSuccess) {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Warning));
    }
  }, [result]);

  let splitTypeFilterProdService = splitType;

  if (funnelProductService?.totalItemProduct === 0 && funnelProductService?.totalItemService === 0) {
    splitTypeFilterProdService = [];
  } else if (funnelProductService?.totalItemProduct === 0) {
    splitTypeFilterProdService = splitType?.filter((e) => e.text !== 'Product');
  } else if (funnelProductService?.totalItemService === 0) {
    splitTypeFilterProdService = splitType?.filter((e) => e.text !== 'Service');
  }

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [EmployeeActions.REQUEST_EMPLOYEES_BY_NAME]));

  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Search
          placeholder="E.g. Sales Name"
          results={salesName}
          onSearchChange={handleSearchEmployee}
          onResultSelect={onResultSelectSales}
          value={selectedSales}
          id={`search-${props.indexItem}`}
          loading={isRequesting}
          // onChange={(e, data) => console.log(e,data)}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        {props.type === 'EDIT' ? (
          <Dropdown
            placeholder="E.g. Split Type"
            selection
            fluid
            options={splitTypeFilterProdService}
            onChange={(e, data) => setForm({ ...form, splitType: Number(data.value) })}
            // defaultValue={String(form.splitType)}
            value={String(form.splitType)}
          />
        ) : (
          <Ref innerRef={splitTypeRef}>
            <Dropdown
              placeholder="E.g. Split Type"
              selection
              fluid
              clearable
              options={splitTypeFilterProdService}
              onChange={(e, data) => setForm({ ...form, splitType: Number(data.value) })}
              defaultValue={Number.isInteger(props.rowData.splitType) ? props.rowData.splitTypeStr : props.rowData.splitType}
            />
          </Ref>
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Input
          value={form.splitPercentage}
          placeholder="E.g ..%"
          fluid
          onChange={(e, data) => setForm({ ...form, splitPercentage: Number(data.value) })}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          content="Save"
          color="blue"
          disabled={(splitTypeFilterProdService.length === 0 || isSalesAnalis) && currentUser.userName != 'terang.lambang'}
          onClick={splitTypeFilterProdService.length === 0 ? null : () => onSubmitHandler()}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default FunnelServiceCatalogForm;
