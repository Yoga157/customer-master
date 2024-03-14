import React, { Fragment, useState } from 'react';
import { Table, Dropdown, Confirm } from 'semantic-ui-react';
import IServiceCatalogTableRow from 'selectors/service-catalog/models/IServiceCatalogTableRow';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import IUserResult from 'selectors/user/models/IUserResult';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IStore from 'models/IStore';
import * as ServiceCatalogAction from 'stores/service-catalog/ServiceCatalogActions';
import { Dispatch } from 'redux';
import moment from 'moment';

interface IProps {
  readonly rowData: IServiceCatalogTableRow;
  exporting: boolean;
}

const ServiceCatalogTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData, exporting } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isActive: boolean = useSelector((state: IStore) => state.serviceCatalog.isActive);

  const showConfirm = () => setOpenConfirm(true);
  const handleCancel = () => setOpenConfirm(false);

  const handleConfirm = () => {
    dispatch(ServiceCatalogAction.delServiceCatalog(rowData.svcCatGenID, currentUser.employeeID));
    const timeout = setTimeout(() => {
      dispatch(ServiceCatalogAction.requestServiceCatalog(currentUser.employeeID, isActive ? 1 : 0, activePage, pageSize));
      setOpenConfirm(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };
  return (
    <Fragment>
      <Confirm open={openConfirm} onCancel={handleCancel} onConfirm={handleConfirm} centered />
      <Table.Row key={rowData.svcCatGenID}>
        {!exporting && 
          <Table.Cell width="1">
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item to={`/service-catalog-form/${rowData.svcCatGenID}`} as={Link} text="View/Edit" icon="edit outline" />
                {rowData.flagFunnelGenID === 0 && <Dropdown.Item text="Delete" icon="trash alternate" onClick={showConfirm} />}
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        }
        <Table.Cell>{rowData.svcCatReffID}</Table.Cell>
        <Table.Cell> {ReactHtmlParser(rowData.brandModelName)} </Table.Cell>
        <Table.Cell>{rowData.svcName}</Table.Cell>
        <Table.Cell>{rowData.owner}</Table.Cell>
        <Table.Cell>{rowData.svcPrice !== null ? rowData.svcPrice.toLocaleString() : 0}</Table.Cell>
        <Table.Cell>{rowData?.effectiveDate !== null ? moment(rowData?.effectiveDate).format('yyyy-DD-MM') : ""}</Table.Cell>
        <Table.Cell>{rowData?.expireDate !== null ? moment(rowData?.expireDate).format('yyyy-DD-MM') : ""}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default ServiceCatalogTableRow;
