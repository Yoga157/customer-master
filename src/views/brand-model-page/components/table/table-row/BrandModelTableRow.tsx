import React, { useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import IBrandModelTableRow from 'selectors/brand-model/models/IBrandModelTableRow';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as BrandTypeAction from 'stores/brand-model/BrandTypeAction';
import BrandTypeModel from 'stores/brand-model/models/BrandTypeModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  readonly rowData: IBrandModelTableRow;
}

const BrandModelTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const bRefreshPage: boolean = useSelector((state: IStore) => state.brandModel.refreshPage);
  const { rowData } = props;

  const [openConfirm, setOpenConfirm] = useState(false);

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const okConfirm = () => {
    const newBrand = new BrandTypeModel({});
    newBrand.brandModelGenID = rowData.brandModelGenID;
    newBrand.createDate = rowData.createDate;
    newBrand.createUserID = rowData.createUserID;
    newBrand.subBrandID = rowData.subBrandID;
    newBrand.brandID = rowData.brandID;
    newBrand.modifyDate = new Date();
    newBrand.modifyUserID = currentUser.employeeID;
    newBrand.status = rowData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    dispatch(BrandTypeAction.putUpdateStatusBrandModel(newBrand));

    const timer = setTimeout(() => {
      dispatch(BrandTypeAction.requestBrandModels(1, 15));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const onInactive = () => {
    setOpenConfirm(true);
  };

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [BrandTypeAction.PUT_STATUS_BRAND_MODEL]));

  return (
    <Table.Row key={rowData.brandModelGenID}>
      <Confirm
        open={openConfirm}
        content={`Are you sure want to ${rowData.status === 'ACTIVE' ? 'inactive' : 'active'} this brand model ?`}
        onCancel={closeConfirm}
        onConfirm={okConfirm}
        cancelButton="No"
        confirmButton="Yes"
        size="mini"
      />

      <Table.Cell width="1">
        {/* {currentUser.role != 'Sales' && currentUser.role != 'Presales' && (
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item to={`/brand-model-form/${rowData.brandModelGenID}`} as={Link} text="View/Edit" icon="edit outline" />
              <Dropdown.Item
                text={`Make ${rowData.status === 'ACTIVE' ? 'Inactive' : 'Active'} `}
                icon={`Make ${rowData.status === 'ACTIVE' ? 'eye slash' : 'eye'} `}
                onClick={onInactive}
              />
            </Dropdown.Menu>
          </Dropdown>
        )} */}

        {currentUser.role == 'SuperAdmin' ||
          (currentUser.role == 'Product Manager' && (
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item to={`/brand-model-form/${rowData.brandModelGenID}`} as={Link} text="View/Edit" icon="edit outline" />
                <Dropdown.Item
                  text={`Make ${rowData.status === 'ACTIVE' ? 'Inactive' : 'Active'} `}
                  icon={`Make ${rowData.status === 'ACTIVE' ? 'eye slash' : 'eye'} `}
                  onClick={onInactive}
                />
              </Dropdown.Menu>
            </Dropdown>
          ))}
      </Table.Cell>

      {/* <Table.Cell>{rowData.brandModelGenID}</Table.Cell> */}
      <Table.Cell>{rowData.brandName}</Table.Cell>
      <Table.Cell>{rowData.subBrandName}</Table.Cell>
      <Table.Cell>{rowData.modelName}</Table.Cell>
      <Table.Cell>{rowData.productManager}</Table.Cell>
      <Table.Cell>{rowData.creatorName}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.createDate!), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.effectiveDate!), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{format(new Date(rowData.expireDate!), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>{rowData.modifyName}</Table.Cell>
      <Table.Cell>{rowData.modifyDate === null ? '' : format(new Date(rowData.modifyDate!), 'dd-MM-yyyy')}</Table.Cell>
      <Table.Cell>
        <Button
          type="button"
          disabled={currentUser.role === 'Sales' || currentUser.role === 'Presales' ? true : false}
          color={rowData.status === 'ACTIVE' ? 'green' : 'red'}
          onClick={onInactive}
        >
          {rowData.status}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default BrandModelTableRow;
