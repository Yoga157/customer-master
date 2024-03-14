import React, { useEffect } from "react";
import styles from "./../ProductServiceTable.module.scss";
import { Table, Dropdown } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ProductServiceActions from "stores/funnel-product-service/ProductServiceActions";
import ProductServiceModel from "stores/funnel-product-service/models/ProductServiceModel";
import IProductServiceTableRow from "selectors/funnel-product-service/models/IProductServiceTableRow";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { ProductForm, ServiceForm } from "../../form";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import * as FunnelActions from "stores/funnel/FunnelActions";
import { selectTotalFunnelSC } from "selectors/funnel-service-catalog/FunnelServiceCatalogSelector";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as FunnelTopActions from "stores/funnel-top/FunnelTopActions";
import ProductServiceDiscountForm from "../../form/form-discount/DiscountForm";
import IProductServiceTable from "selectors/funnel-product-service/models/IProductServiceTable";
import { selectProductServiceAll } from "selectors/funnel-product-service/ProductServiceSelector";
import {
  selectViewFunnelCustomer,
  selectViewFunnelStatus,
} from "selectors/funnel/FunnelSelector";

interface IProps {
  readonly rowData: IProductServiceTableRow;
  setActivePage: any;
  setDeleteItem: any;
  alldata: any;
  funnelItem: number;
  projectCategory?: string;
  setValidasiDeleteProduct?: any;
  currency?: string;
}

const ProductServiceTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    rowData,
    setActivePage,
    funnelItem,
    setValidasiDeleteProduct,
    currency,
  } = props;

  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const totalServiceCatalog = useSelector((state: IStore) =>
    selectTotalFunnelSC(state)
  );
  const isSalesAnalis: boolean = useSelector(
    (state: IStore) => state.funnel.isFunnelStatusActive
  );
  const isPresalesWorkflow: boolean = useSelector(
    (state: IStore) => state.funnelSalesAnalyst.isPresalesWorkflow
  );
  const isIcEdit: boolean = useSelector(
    (state: IStore) => state.funnelSalesAnalyst.isIcEdit
  );
  const viewFunnelStatus = useSelector((state: IStore) =>
    selectViewFunnelStatus(state)
  );
  const funnelProductServiceListAll: IProductServiceTable = useSelector(
    (state: IStore) =>
      selectProductServiceAll(state, [
        ProductServiceActions.REQUEST_FUNNEL_PRODUCT_SERVICE_ALL,
      ])
  );

  const viewFunnelCustomer = useSelector((state: IStore) =>
    selectViewFunnelCustomer(state)
  );

  const newItems = new ProductServiceModel(rowData);

  const opDelete = () => {
    if (rowData.itemSubName === "CBV") {
      localStorage.removeItem("CBV");
    } else if (
      rowData.itemSubName === "Outpost AWS" ||
      rowData.itemSubName === "CLOUD"
    ) {
      localStorage.removeItem("nonCBV");
    }
    setValidasiDeleteProduct(true);
    dispatch(
      ProductServiceActions.deleteFunnelProductServiceLocal(
        newItems,
        rowData.funnelItemsID,
        isSalesAnalis
      )
    );
    dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
    props.setActivePage(1);
  };

  const deleteClick = (rowData) => {
    const page = document.querySelector(
      "#root > div.ui.container > div > div:nth-child(1) > div"
    )?.textContent;
    if (rowData.itemSubName !== "CBV") {
      localStorage.removeItem("TempSubBrand");
    }
    if (newItems.funnelGenID === 0) {
      opDelete();
    } else {
      if (rowData.itemSubName === "CBV") {
        localStorage.removeItem("CBV");
      } else if (
        rowData.itemSubName === "Outpost AWS" ||
        rowData.itemSubName === "CLOUD"
      ) {
        localStorage.removeItem("nonCBV");
      }
      if (isSalesAnalis || page === "Add New Funnel - Copy Project") {
        if (!JSON.parse(localStorage.getItem("productService"))) {
          localStorage.setItem(
            "productService",
            JSON.stringify(funnelProductServiceListAll?.rows)
          );
        }
        if (rowData?.isAdd !== undefined || rowData?.isAdd === null) {
          opDelete();
        } else {
          dispatch(
            ProductServiceActions.deleteFunnelProductServiceLocal(
              newItems,
              rowData.funnelItemsID,
              isSalesAnalis
            )
          );
          dispatch(ProductServiceActions.requestFunnelProductServiceLocal());
          props.setActivePage(1);
        }
        props.setDeleteItem(true);
        dispatch(FunnelTopActions.requestTopType());
      } else if (rowData.itemType === 19) {
        dispatch(
          ProductServiceActions.delFunnelService(
            rowData.funnelItemsID,
            currentUser.employeeID
          )
        ).then(() => {
          backTolList();
        });
      } else {
        dispatch(
          ProductServiceActions.delFunnelProduct(
            rowData.funnelItemsID,
            currentUser.employeeID
          )
        ).then(() => {
          backTolList();
        });
      }
    }
  };

  const backTolList = () => {
    props.setActivePage(1);
    dispatch(
      ProductServiceActions.requestFunnelProductServiceAll(
        +rowData.funnelGenID,
        1,
        ""
      )
    );
    dispatch(
      ProductServiceActions.requestFunnelProductService(
        rowData.funnelGenID,
        1,
        5
      )
    );
    dispatch(FunnelActions.requestViewFunnelSellingById(rowData.funnelGenID));

    dispatch(FunnelTopActions.requestFunnelTop(rowData.funnelGenID, 1, 5)).then(
      () => {
        dispatch(FunnelTopActions.requestSetPage(1));
      }
    );
  };

  const updateClick = (rowData) => {
    if (rowData.itemType === 19) {
      dispatch(
        ModalAction.OPEN(
          <ServiceForm
            funnelGenID={rowData.funnelGenID.toString()}
            funnelItemsID={rowData.funnelItemsID.toString()}
            rowData={rowData}
            type="Edit"
            setActivePage={setActivePage}
          />,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalAction.OPEN(
          <ProductForm
            funnelGenID={rowData.funnelGenID.toString()}
            funnelItemsID={rowData.funnelItemsID.toString()}
            rowData={rowData}
            currency={currency}
            currentDate={viewFunnelStatus.createDate}
            type="Edit"
            projectCategory={props.projectCategory}
            customerGenID={rowData.endUserCustomerGenID}
            setActivePage={setActivePage}
          />,
          ModalSizeEnum.Small
        )
      );
    }
  };

  const onShowDiscountForm = (content: any, size: ModalSizeEnum): void => {
    dispatch(ModalFirstLevelActions.OPEN(content, size));
  };

  const firstProduk = props.alldata.rows.find((e) => e.itemType === 18);
  const rowSpanProduk = props.alldata.rows.filter((e) => e.itemType === 18);

  const firstService = props.alldata.rows.find((e) => e.itemType === 19);
  const rowSpanService = props.alldata.rows.filter((e) => e.itemType === 19);

  return (
    <Table.Row key={funnelItem}>
      {rowData.itemType === 18 &&
        rowData.funnelItemsID == firstProduk.funnelItemsID && (
          <Table.Cell textAlign="center" rowSpan={rowSpanProduk.length}>
            P
          </Table.Cell>
        )}

      {rowData.itemType === 19 &&
        rowData.funnelItemsID == firstService.funnelItemsID && (
          <Table.Cell textAlign="center" rowSpan={rowSpanService.length}>
            S
          </Table.Cell>
        )}

      <Table.Cell textAlign="center">
        {(currentUser.role === "Sales" ||
          currentUser.role === "Sales Admin" ||
          (window.location.pathname !== "/data-quality/funnel-form" &&
            rowData.itemType == 19 &&
            (currentUser.role === "Sales" ||
              currentUser.role === "Sales Admin") &&
            (rowData.serviceCatalogFlag === "" ||
              rowData.serviceCatalogFlag === "REJECTED")) ||
          (window.location.pathname !== "/data-quality/funnel-form" &&
            rowData.itemType == 19 &&
            currentUser.role === "Presales" &&
            rowData.serviceCatalogFlag === "NEW")) && (
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              {/* product */}
              {(currentUser.role === "Sales" ||
                currentUser.role === "Sales Admin") &&
                rowData.itemType == 18 &&
                !(isSalesAnalis && !isIcEdit) && (
                  <>
                    <Dropdown.Item
                      onClick={() => updateClick(rowData)}
                      text="Edit"
                      icon="edit"
                    />
                    <Dropdown.Item
                      onClick={() => deleteClick(rowData)}
                      text="Delete"
                      icon="trash alternate"
                    />
                  </>
                )}

              {/* service */}
              {(currentUser.role === "Sales" ||
                currentUser.role === "Sales Admin") &&
                rowData.itemType == 19 &&
                !(isSalesAnalis && !isIcEdit) && (
                  <>
                    {((isSalesAnalis && rowData.flagEdit === "1") ||
                      (isSalesAnalis && rowData.flagEdit === "")) && (
                      <>
                        <Dropdown.Item
                          onClick={() => updateClick(rowData)}
                          text="Edit"
                          icon="edit"
                        />

                        {viewFunnelCustomer.chkPMODeptID ||
                        viewFunnelCustomer.chkSMODeptID ||
                        JSON.parse(
                          localStorage.getItem("editViewFunnelCustomerEdit")
                        )?.[0]?.chkPMODeptID ||
                        JSON.parse(
                          localStorage.getItem("editViewFunnelCustomerEdit")
                        )?.[0]?.chkSMODeptID ? (
                          <>
                            {JSON.parse(
                              localStorage.getItem("productService")
                            ) ? (
                              <>
                                {JSON.parse(
                                  localStorage.getItem("productService")
                                )?.filter(
                                  (e) =>
                                    (e.itemName === "SSS Services" ||
                                      rowData.itemName === "CSS Services") &&
                                    e.isDelete === 0 &&
                                    e.itemType === 19
                                ).length > 1 && (
                                  <Dropdown.Item
                                    onClick={() => deleteClick(rowData)}
                                    text="Delete"
                                    icon="trash alternate"
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                {funnelProductServiceListAll.rows.filter(
                                  (e) =>
                                    (e.itemName === "SSS Services" ||
                                      rowData.itemName === "CSS Services") &&
                                    e.itemType === 19
                                ).length > 1 && (
                                  <Dropdown.Item
                                    onClick={() => deleteClick(rowData)}
                                    text="Delete"
                                    icon="trash alternate"
                                  />
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <Dropdown.Item
                            onClick={() => deleteClick(rowData)}
                            text="Delete"
                            icon="trash alternate"
                          />
                        )}
                      </>
                    )}
                    {!isSalesAnalis && (
                      <>
                        {window.location.pathname !==
                        "/data-quality/funnel-form" ? (
                          <>
                            <Dropdown.Item
                              onClick={() => updateClick(rowData)}
                              text="Edit"
                              icon="edit"
                            />

                            {(rowData.itemName === "SSS Services" ||
                              rowData.itemName === "CSS Services") &&
                            rowData.itemType === 19 ? (
                              <>
                                {viewFunnelCustomer.chkSMODeptID ||
                                viewFunnelCustomer.chkPMODeptID ? (
                                  <>
                                    {funnelProductServiceListAll.rows.filter(
                                      (e) =>
                                        (e.itemName === "SSS Services" ||
                                          rowData.itemName ===
                                            "CSS Services") &&
                                        e.itemType === 19
                                    ).length > 1 && (
                                      <Dropdown.Item
                                        onClick={() => deleteClick(rowData)}
                                        text="Delete"
                                        icon="trash alternate"
                                      />
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Dropdown.Item
                                      onClick={() => deleteClick(rowData)}
                                      text="Delete"
                                      icon="trash alternate"
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <Dropdown.Item
                                onClick={() => deleteClick(rowData)}
                                text="Delete"
                                icon="trash alternate"
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <Dropdown.Item
                              onClick={() => updateClick(rowData)}
                              text="Edit"
                              icon="edit"
                            />{" "}
                            <Dropdown.Item
                              onClick={() => deleteClick(rowData)}
                              text="Delete"
                              icon="trash alternate"
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              {window.location.pathname !== "/data-quality/funnel-form" &&
                rowData.itemType == 19 &&
                (currentUser.role === "Sales" ||
                  currentUser.role === "Sales Admin") &&
                !isSalesAnalis &&
                (rowData.serviceCatalogFlag === "" ||
                  rowData.serviceCatalogFlag === "REJECTED" ||
                  rowData.serviceCatalogFlag === "NEW") && (
                  <Dropdown.Item
                    text={"Ask for Discount"}
                    icon="talk"
                    onClick={() =>
                      onShowDiscountForm(
                        <ProductServiceDiscountForm rowData={rowData} />,
                        ModalSizeEnum.Tiny
                      )
                    }
                  />
                )}
              {window.location.pathname !== "/data-quality/funnel-form" &&
                rowData.itemType == 19 &&
                currentUser.role === "Presales" &&
                rowData.serviceCatalogFlag === "NEW" && (
                  <Dropdown.Item
                    text={"Approve Discount"}
                    icon="talk"
                    onClick={() =>
                      onShowDiscountForm(
                        <ProductServiceDiscountForm rowData={rowData} />,
                        ModalSizeEnum.Tiny
                      )
                    }
                  />
                )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Table.Cell>

      <Table.Cell textAlign="center">{rowData.itemName}</Table.Cell>
      <Table.Cell
        textAlign="center"
        style={{ display: "inline-block", wordBreak: "break-word" }}
      >
        {rowData?.itemDescription?.length > 123
          ? rowData.itemDescription.slice(0, 123) + "..."
          : rowData.itemDescription}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {rowData.supplierName != null && rowData.supplierName != "undefined"
          ? rowData.supplierName.slice(0, 50)
          : ""}
      </Table.Cell>
      <Table.Cell textAlign="right">
        {rowData.orderingPrice === undefined || rowData.orderingPrice === null
          ? 0
          : rowData.orderingPrice.toLocaleString()}
      </Table.Cell>
      {(currentUser.role === "Sales" ||
        currentUser.role === "Sales Admin" ||
        isPresalesWorkflow) && (
        <Table.Cell textAlign="right">
          {rowData.sellingPrice === undefined || rowData.orderingPrice === null
            ? 0
            : rowData.sellingPrice && rowData.sellingPrice.toLocaleString()}
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default ProductServiceTableRow;
