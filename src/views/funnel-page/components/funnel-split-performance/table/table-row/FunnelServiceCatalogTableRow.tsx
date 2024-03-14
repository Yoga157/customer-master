import React, { useState, Fragment, useCallback } from 'react';
import { Table, Dropdown, Confirm, Checkbox } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as FunnelServiceCatalogActions from 'stores/funnel-service-catalog/FunnelServiceCatalogActions';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import * as ProductServiceActions from 'stores/funnel-product-service/ProductServiceActions';
import ServiceCatalogDiscountForm from '../../form/form-edit/ServiceCatalogDiscountForm';
import IFunnelServiceCatalogTableRow from 'selectors/funnel-service-catalog/models/IFunnelServiceCatalogTableRow';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import FunnelServiceCatalogFormEdit from '../../form/form-edit/FunnelServiceCatalogFormEdit';

interface IProps {
  readonly rowData: IFunnelServiceCatalogTableRow;
  readonly totalPrice: number;
}

const FunnelServiceCatalogTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const showConfirm = () => setOpenConfirm(true);
  const handleConfirm = () => {
    dispatch(FunnelServiceCatalogActions.delFunnelServiceCatalog(rowData.funnelSvcCatGenID, currentUser.employeeID));

    const timeout = setTimeout(() => {
      dispatch(FunnelServiceCatalogActions.requestFunnelServiceCatalog(rowData.funnelGenID, 1, 5));
      dispatch(FunnelActions.requestViewFunnelSellingById(rowData.funnelGenID));
      dispatch(ProductServiceActions.requestFunnelProductService(rowData.funnelGenID, 1, 10));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const onCheckedService = (e: any, data: any) => {
    if (data.checked) {
      dispatch(FunnelServiceCatalogActions.postFunnelServiceCatalogIDLocal(data.value));
    } else {
      dispatch(FunnelServiceCatalogActions.deleteFunnelServiceCatalogIDLocal(data.value));
    }
  };

  const onShowDiscountForm = useCallback(
    (content: any, size: ModalSizeEnum): void => {
      dispatch(ModalSecondLevelActions.OPEN(content, size));
    },
    [dispatch]
  );

  const handleCancel = () => setOpenConfirm(false);
  const onShowForm = () => {
    dispatch(ModalSecondLevelActions.OPEN(<FunnelServiceCatalogFormEdit model={rowData} />, ModalSizeEnum.Tiny));
  };

  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.funnelSvcCatGenID}>
        <Table.Cell width="1">
          <Checkbox type="checkbox" value={rowData.funnelSvcCatGenID} onChange={onCheckedService} />
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              {currentUser.role === 'Presales' && (
                <Fragment>
                  <Dropdown.Item text="Edit/View" icon="edit outline" onClick={onShowForm} />

                  <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />
                </Fragment>
              )}
              {/* {currentUser.role === 'Sales' && (rowData.discountStatus === '' || rowData.discountStatus === 'REJECTED') && (
                <Dropdown.Item
                  text={'Ask for Discount'}
                  icon="talk"
                  onClick={() =>
                    onShowDiscountForm(
                      <ServiceCatalogDiscountForm
                        type={rowData.discountStatus === 'NEW' ? 'Approval' : 'AskDiscount'}
                        model={rowData}
                        grandTotalPrice={props.totalPrice}
                      />,
                      ModalSizeEnum.Tiny
                    )
                  }
                />
              )}{''}
              {currentUser.role === 'Presales' && rowData.discountStatus === 'NEW' && (
                <Dropdown.Item
                  text={'Approved Discount'}
                  icon="talk"
                  onClick={() =>
                    onShowDiscountForm(
                      <ServiceCatalogDiscountForm
                        type={rowData.discountStatus === 'NEW' ? 'Approval' : 'AskDiscount'}
                        model={rowData}
                        grandTotalPrice={props.totalPrice}
                      />,
                      ModalSizeEnum.Tiny
                    )
                  }
                />
              )} */}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.svcCatReffID}</Table.Cell>
        <Table.Cell>{rowData.category}</Table.Cell>
        <Table.Cell>{rowData.brandModelName}</Table.Cell>
        <Table.Cell>{rowData.owner}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelServiceCatalogTableRow;
