import React from 'react';
import { Table,  Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IMasterInsuranceTableRow from 'selectors/bank-garansi/models/IMasterInsuranceTableRow';
import { Link } from 'react-router-dom';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ConfirmDelete from 'views/bank-garansi-page/admin/components/form/insurance-form-edit/ConfirmDelete';
import MasterInsuranceFormEdit from 'views/bank-garansi-page/admin/components/form/insurance-form-edit/MasterInsuranceFormEdit';

interface IProps {
  readonly rowData: IMasterInsuranceTableRow;
}

const MasterInsuranceTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch:Dispatch = useDispatch();
  const { rowData } = props;
  
  const onViewEdit = () => {
    dispatch(ModalFirstLevelActions.OPEN(
      <MasterInsuranceFormEdit id={rowData.id}/>,ModalSizeEnum.Small)); 
  } 
  const onDelete = () => {
    dispatch(ModalFirstLevelActions.OPEN(
      <ConfirmDelete id={rowData.id}/>,ModalSizeEnum.Mini)); 
  } 
  

  return (
    <Table.Row key={rowData.id}>
      <Table.Cell width="1">

          <Dropdown pointing='left' icon='ellipsis vertical' >
            <Dropdown.Menu>
                <Dropdown.Item 
                    as={Link} 
                    text='View/Edit' 
                    icon='edit outline'
                    onClick={onViewEdit}
                />
                <Dropdown.Item 
                      text='Delete' 
                      icon='cancel'
                      onClick={onDelete}
                />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      <Table.Cell>{rowData.entryKey}</Table.Cell>
      <Table.Cell>{rowData.insuranceName}</Table.Cell>
      <Table.Cell>{rowData.insuranceEmail}</Table.Cell>
      <Table.Cell>{rowData.waktuProses} Hari</Table.Cell>
      <Table.Cell>{rowData.addr1}</Table.Cell>
      <Table.Cell>{rowData.addr2}</Table.Cell>
      <Table.Cell>{rowData.city}</Table.Cell>
      <Table.Cell>{rowData.postalCode}</Table.Cell>
    </Table.Row>
  );
};

export default MasterInsuranceTableRow;
