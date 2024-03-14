import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Table } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import PMOFilter from 'stores/pmo/models/PMOFilter';
import * as PMOActions from 'stores/pmo/PMOActions';
import PMOTableRow from './table-row/PMOTableRow';
import IStore from 'models/IStore';

interface IProps {
  tableData: any;
}

const PMOTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { tableData } = props;
  const dispatch: Dispatch = useDispatch();
  const [columns, setColumns] = useState('');
  const [direction, setDirection] = useState('ascending' as any);

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const isExportExcel: any = useSelector((state: IStore) => state.pmo.isExportExcel);
  const filter: any = useSelector((state: IStore) => state.pmo.data.filter);
  const search: any = useSelector((state: IStore) => state.pmo.data.search);

  const reloads = (columns: any, sort: any) => {
    setColumns(columns);
    setDirection(sort === 'ascending' ? 'descending' : 'ascending');

    if (search) {
      dispatch(PMOActions.reqPMOListBySearch(1, 15, columns, sort, search?.search, currentUser.employeeID));
    } else if (filter) {
      const filterPMO = new PMOFilter(filter);
      filterPMO.sorting = sort;

      dispatch(PMOActions.postPMOFilter(filterPMO));
    } else {
      dispatch(PMOActions.reqPMOList(1, 15, columns, sort, currentUser.employeeID));
    }
    dispatch(PMOActions.setActivePage(1));
  };

  return (
    <Table sortable striped id="table-pmo" data-cols-width="10,10,15,15,25,25,25,20,40,40,30,15,15,15,15,10,15,15,15,15" className="font-size-1">
      <Table.Header>
        <Table.Row>
          {!isExportExcel && <Table.HeaderCell></Table.HeaderCell>}
          <Table.HeaderCell sorted={columns === 'projectId' ? direction : null} onClick={() => reloads('projectId', direction)}>
            Project <br /> ID
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'funnelGenId' ? direction : null} onClick={() => reloads('funnelGenId', direction)}>
            Funnel <br /> ID
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'oiNumber' ? direction : null} onClick={() => reloads('oiNumber', direction)}>
            OI <br /> Number
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'soNumber' ? direction : null} onClick={() => reloads('soNumber', direction)}>
            SO <br /> Number
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'salesName' ? direction : null} onClick={() => reloads('salesName', direction)}>
            Sales <br /> Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'salesDepartment' ? direction : null} onClick={() => reloads('salesDepartment', direction)}>
            Sales <br /> Dept.
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'pmoName' ? direction : null} onClick={() => reloads('pmoName', direction)}>
            PMO/S <br /> Assign
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'pmoDepartment' ? direction : null} onClick={() => reloads('pmoDepartment', direction)}>
            PMO <br /> Dept.
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'customerName' ? direction : null} onClick={() => reloads('customerName', direction)}>
            Customer <br /> Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'projectName' ? direction : null} onClick={() => reloads('projectName', direction)}>
            Project <br /> Name
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'projectAlias' ? direction : null} onClick={() => reloads('projectAlias', direction)}>
            Project <br /> Alias
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estStartBypmo' ? direction : null} onClick={() => reloads('estStartBypmo', direction)}>
            Est. <br /> Project <br /> Start
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'estEndBypmo' ? direction : null} onClick={() => reloads('estEndBypmo', direction)}>
            Est. <br /> Project <br /> End
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualStartBypmo' ? direction : null} onClick={() => reloads('actualStartBypmo', direction)}>
            Actual <br /> Project <br /> Start
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'actualEndBypmo' ? direction : null} onClick={() => reloads('actualEndBypmo', direction)}>
            Actual <br /> Project <br /> End
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'milestone' ? direction : null} onClick={() => reloads('milestone', direction)}>
            Milestone
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'createDate' ? direction : null} onClick={() => reloads('createDate', direction)}>
            Created <br /> Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'projectStatus' ? direction : null} onClick={() => reloads('projectStatus', direction)}>
            Project <br /> Status
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'modifyDate' ? direction : null} onClick={() => reloads('modifyDate', direction)}>
            Modified <br /> Date
          </Table.HeaderCell>
          <Table.HeaderCell sorted={columns === 'warrantyStatus' ? direction : null} onClick={() => reloads('warrantyStatus', direction)}>
            Warranty <br /> Status
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tableData.rows.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={21} textAlign="center" className="">
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {tableData.rows.map((model, key) => (
          <PMOTableRow key={key} rowData={model} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default PMOTable;
