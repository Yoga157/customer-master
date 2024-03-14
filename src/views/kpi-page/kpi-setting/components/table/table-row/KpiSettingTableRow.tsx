import React, { useState } from 'react';
import { Table, Dropdown, Button, Confirm } from 'semantic-ui-react';
import IKpiSettingTableRow from '../../../../../../selectors/kpi/models/IKpiSettingTableRow';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
    readonly rowData: IKpiSettingTableRow;
};

const KpiSettingTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { rowData } = props;
    const currentUser:IUserResult = useSelector((state: IStore) => selectUserResult(state));

    // const convertToList = (sentences: string) => {
    //     let array = sentences.split(',');
    //     let sentenceCopy = "<ul>";

    //     for(var i = 0; i < array.length; i++) {
    //         sentenceCopy += `<li>${array[i]}</li>`
    //     }
    //     sentenceCopy += "</ul>"
    //     return sentenceCopy;
    // };

    
  const [openConfirm, setOpenConfirm] = useState(false);

  const closeConfirm = () => {
      setOpenConfirm(false);
  }

  const okConfirm = () => {
    //   var newBrand = new BrandTypeModel({});
    //   newBrand.brandModelGenID = rowData.brandModelGenID;
    //   newBrand.createDate = rowData.createDate;
    //   newBrand.createUserID = rowData.createUserID;
    //   newBrand.subBrandID = rowData.subBrandID;
    //   newBrand.brandID = rowData.brandID;
    //   newBrand.modifyDate = new Date();
    //   newBrand.modifyUserID = currentUser.employeeID;
    //   newBrand.status = (rowData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");

    //   dispatch(BrandTypeAction.putUpdateStatusBrandModel(newBrand));
      
    //   const timer = setTimeout(() => {
    //     dispatch(BrandTypeAction.requestBrandModels(1,15)); 
    //     setOpenConfirm(false);
    //   }, 1000);

    //return () => clearTimeout(timer);
    
  }

  const onInactive = () => {
    setOpenConfirm(true);
  }

    return (
        <Table.Row key={rowData.kpiID}>
            <Confirm
                open={openConfirm}
                content={`Are you sure want to ${rowData.statusName === 'Active' ? 'inactive' : 'active'} this brand model ?`}
                onCancel={closeConfirm}
                onConfirm={okConfirm}
                cancelButton='No'
                confirmButton="Yes"
                size='mini'
            />
            <Table.Cell width='1'>
                <Dropdown pointing='left' icon='ellipsis vertical' >
                    <Dropdown.Menu>
                        <Dropdown.Item 
                            to={`/kpi-setting/${rowData.kpiID}`} 
                            as={Link} 
                            text='View/Edit' 
                            icon='edit outline'
                            target={'_blank'}
                        />
                         <Dropdown.Item 
                            text={`Make ${rowData.statusName === 'Active' ? 'Inactive' : 'Active'} ` }
                            icon={`Make ${rowData.statusName === 'Active' ? 'eye slash' : 'eye'} ` }
                            onClick={onInactive}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Table.Cell>
            {/* <Table.Cell>{rowData.kpiID}</Table.Cell> */}
            <Table.Cell>{rowData.keyActivity}</Table.Cell>
            <Table.Cell>{ReactHtmlParser(rowData.divisionNameList)}</Table.Cell>
            <Table.Cell>{ReactHtmlParser(rowData.departmentNameList)}</Table.Cell>
            <Table.Cell>{ReactHtmlParser(rowData.functionNameList)}</Table.Cell>
            <Table.Cell>{rowData.kpiDireksiName}</Table.Cell>
            <Table.Cell>{rowData.measurementName}</Table.Cell>
            <Table.Cell>{rowData.weight}</Table.Cell>
            <Table.Cell>{rowData.point}</Table.Cell>
            <Table.Cell><Button type="button" disabled={(currentUser.role === "Sales" || currentUser.role === "Presales") ? true : false } color={rowData.statusName === "Active" ? "green" : "red"} onClick={onInactive}>{rowData.statusName}</Button></Table.Cell>
            
        </Table.Row>
    );
};

export default KpiSettingTableRow;