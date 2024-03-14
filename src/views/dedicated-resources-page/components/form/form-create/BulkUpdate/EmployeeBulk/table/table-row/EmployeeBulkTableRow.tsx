import React, { useState } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, } from 'react-redux';
import moment from 'moment';

interface IProps {
  readonly rowData?: any;
  trigger?: any;
  DeleteByID: any;
  isCheck: any;
  setIsCheck: any;
  tableData: any;
  setTempCheck: any;
  tempCheck: any;
}

const EmployeeBulkTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData,tableData, DeleteByID, isCheck, setIsCheck, setTempCheck, tempCheck } = props;
  const [id, setId] = useState(0)

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const isSaveChange = tableData?.map((item) => {
      if (checked === true) {
        if (parseInt(id) === item.employeeID) {
          // if (!tempSearch.includes(parseInt(id))) {
          //   setTempSearch((oldArray) => [...oldArray, item]);
          // }
          setTempCheck((oldArray) => [...oldArray, item])
          setIsCheck((oldArray) => [...oldArray, item.employeeID]);
        }
      } else {
        var array = [...isCheck]; // make a separate copy of the array
        var index = array.indexOf(rowData);
        if (index !== -1) {
          array.splice(index, 1);
          setIsCheck(array);
       
        }
      }
    });
    setIsCheck([...isCheck, parseInt(id)]);
    localStorage.setItem("EmployeeContractID", JSON.stringify(id))
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
      setTempCheck(tempCheck.filter((item) => item.employeeID !== parseInt(id)))
    }
  };

  const Checkbox = ({  id, type, handleClick, isChecked }) => {
    //
    return (
      <input
        className="ui checkbox"
        id={id}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
    );
  };
 
  return (
    <>
      <Table.Row>
      {/* <Table.Cell textAlign="left"> <Checkbox
              id={rowData.employeeID}
              type="checkbox"
              handleClick={handleClick}
              isChecked={isCheck.includes(rowData.employeeID)}
            /></Table.Cell> */}
        <Table.Cell textAlign="left" width="1">
          <Icon color="red" name="trash alternate" onClick={() => {
            DeleteByID(rowData)
          }} />
          <Checkbox
              id={rowData.employeeID}
              type="checkbox"
              handleClick={handleClick}
              isChecked={isCheck.includes(rowData.employeeID)}
            />
          {/* {JSON.parse(localStorage.getItem("EmployeeContractID")) === id ?
            <Icon color="blue" name="times" onClick={() => {
              // EndGetByID()
              setId(0)
            }} />
            :
            <Icon color="blue" name="edit outline" onClick={
              () => {
                // GetByID(rowData)
                setId(rowData.contractID)
              }
            } />

          } */}

        </Table.Cell>
        <Table.Cell textAlign="left">{rowData.employeeID}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.employeeName}</Table.Cell>
        {/* .toLocaleString() */}
        <Table.Cell textAlign="left">{rowData.employeeDept}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.supervisorName}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.employeeClassName}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.lastProjectName}</Table.Cell>
        <Table.Cell textAlign="left">{moment(rowData.lastContractBeginDate).format('DD MMMM yyyy')}</Table.Cell>
        <Table.Cell textAlign="left">{moment(rowData.lastContractEndDate).format('DD MMMM yyyy')}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.days}</Table.Cell>
        <Table.Cell textAlign="left">{rowData.contractNo}</Table.Cell>
        {/* .toLocaleString() */}

      </Table.Row>
    </>
  );
};

export default EmployeeBulkTableRow;
