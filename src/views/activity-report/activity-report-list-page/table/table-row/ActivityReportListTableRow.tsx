import React from "react";
import { Dropdown, Image, Table } from "semantic-ui-react";
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ActivityReportListTableRowDelete from "./table-row-delete/ActivityReportListTableRowDelete";
import ModalSizeEnum from "constants/ModalSizeEnum";

interface IProps {
  // readonly rowData: ICreditBillingTableRow;
  // trigger: any;
}

const ActivityReportListTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const deleteRow = (rowData) => {
    dispatch(ModalFirstLevelActions.OPEN(<ActivityReportListTableRowDelete  />, ModalSizeEnum.Tiny));
  };

  return (
    <>
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit"
                //   onClick={() => trigger(rowData)}
              />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                onClick={() => deleteRow(1)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>T20278949.0001</Table.Cell>
        <Table.Cell>456433</Table.Cell>
        <Table.Cell>PT.BANDAI NAMCO</Table.Cell>
        <Table.Cell>Jl.Abimanyu No.11 Jakarta</Table.Cell>
        <Table.Cell>Albus Roman</Table.Cell>
        <Table.Cell>cipta.endri@berca.co.id</Table.Cell>
        <Table.Cell>Work On Progress</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>
          <Image src="/assets/CheckCircle.svg" />
        </Table.Cell>
        <Table.Cell>
          <Image src="/assets/CheckCircle.svg" />
        </Table.Cell>
        <Table.Cell>SSS SERVER & STORAGE</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit"
                //   onClick={() => trigger(rowData)}
              />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                // onClick={() => deleteRow(rowData)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>T20278949.0001</Table.Cell>
        <Table.Cell>456433</Table.Cell>
        <Table.Cell>PT.BANDAI NAMCO</Table.Cell>
        <Table.Cell>Jl.Abimanyu No.11 Jakarta</Table.Cell>
        <Table.Cell>Albus Roman</Table.Cell>
        <Table.Cell>cipta.endri@berca.co.id</Table.Cell>
        <Table.Cell>Work On Progress</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>SSS SERVER & STORAGE</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit"
                //   onClick={() => trigger(rowData)}
              />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                // onClick={() => deleteRow(rowData)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>T20278949.0001</Table.Cell>
        <Table.Cell>456433</Table.Cell>
        <Table.Cell>PT.BANDAI NAMCO</Table.Cell>
        <Table.Cell>Jl.Abimanyu No.11 Jakarta</Table.Cell>
        <Table.Cell>Albus Roman</Table.Cell>
        <Table.Cell>cipta.endri@berca.co.id</Table.Cell>
        <Table.Cell>Work On Progress</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>
          <Image src="/assets/CheckCircle.svg" />
        </Table.Cell>
        <Table.Cell>
          <Image src="/assets/CheckCircle.svg" />
        </Table.Cell>
        <Table.Cell>SSS SERVER & STORAGE</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit"
                //   onClick={() => trigger(rowData)}
              />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                // onClick={() => deleteRow(rowData)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>25434</Table.Cell>
        <Table.Cell>T20278949.0001</Table.Cell>
        <Table.Cell>456433</Table.Cell>
        <Table.Cell>PT.BANDAI NAMCO</Table.Cell>
        <Table.Cell>Jl.Abimanyu No.11 Jakarta</Table.Cell>
        <Table.Cell>Albus Roman</Table.Cell>
        <Table.Cell>cipta.endri@berca.co.id</Table.Cell>
        <Table.Cell>Work On Progress</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>17 May 2023 09:13</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>SSS SERVER & STORAGE</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      
    </>
  );
};

export default ActivityReportListTableRow;
