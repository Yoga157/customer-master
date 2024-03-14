import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import styles from "./TableARGrouping.module.scss";
import { CheckBox } from "views/components/UI";
import TableRowARGrouping from "./table-row/TableRowARGrouping";
import IActivityReportResultTableRow from "selectors/activity-report-grouping/models/SearchResults/IActivityReportResultTableRow";
import IActivityReportResultTable from "selectors/activity-report-grouping/models/SearchResults/IActivityReportResultTable";
import IActivityReportsGroupingModel from "selectors/activity-report-grouping/models/ActivityReportGroupingDetail/IActivityReportsGroupingModel";
import { useSelector } from "react-redux";
import IStore from "models/IStore";
import { selectSearchResults } from "selectors/activity-report-grouping/ActivityReportGroupingSelector";

interface IProps {
  type: string;
  tableData: IActivityReportResultTable;
  setTempSearch: any;
  tempSearch: any;
  ARGroupingDetail?: IActivityReportsGroupingModel[];
}

const TableARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    type,
    tableData,
    setTempSearch,
    tempSearch,
    ARGroupingDetail,
  } = props;
  const SearchResult = useSelector((state: IStore) =>
    selectSearchResults(state)
  );
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    const isSaveChange = SearchResult.rows?.map((item) => {
      setTempSearch((oldArray) => [...oldArray, item]);
      setIsCheck((oldArray) => [...oldArray, item.activityReportGenID]);
      // setIsCheck(tempSearch.map(li => li.id));
      if (isCheckAll) {
        setTempSearch([]);
        setIsCheck([])
      }
    })
   
  };

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {type === "ADD" ? (
              <CheckBox
                onChange={handleSelectAll}
                defaultChecked={isCheckAll}
              />
            ) : (
              "Action"
            )}
          </Table.HeaderCell>
          <Table.HeaderCell>AR ID</Table.HeaderCell>
          <Table.HeaderCell>SO ID</Table.HeaderCell>
          <Table.HeaderCell>Create Date</Table.HeaderCell>
          <Table.HeaderCell>
            Engineer
            <br />
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>Customer Name</Table.HeaderCell>
          <Table.HeaderCell>
            Contact
            <br />
            Name
          </Table.HeaderCell>
          <Table.HeaderCell>
            Action
            <br />
            Taken
          </Table.HeaderCell>
          {type === "EDIT" && (
            <Table.HeaderCell>
              Sign
              <br />
              Status
            </Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {type === "ADD" && (
          <>
            {tableData?.rows === undefined && (
              <Table.Row>
                <Table.Cell
                  colSpan={6}
                  textAlign="center"
                  className={styles.nodata}
                >
                  No data
                </Table.Cell>
              </Table.Row>
            )}

            {tableData?.rows?.length === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={6}
                  textAlign="center"
                  className={styles.nodata}
                >
                  No data
                </Table.Cell>
              </Table.Row>
            )}
          </>
        )}

        {type === "EDIT" && (
          <>
            {tempSearch?.length === 0 && (
              <Table.Row>
                <Table.Cell
                  colSpan={6}
                  textAlign="center"
                  className={styles.nodata}
                >
                  No data
                </Table.Cell>
              </Table.Row>
            )}
          </>
        )}

        {/* {type === "ADD" &&
          tableData?.rows?.map((model: IActivityReportResultTableRow, k) => (
            <TableRowARGrouping
              setTempSearch={setTempSearch}
              tempSearch={tempSearch}
              type={type}
              key={k}
              rowData={model}
            />
          ))} */}

        {/* {type === "EDIT" &&
          tempSearch?.map((model: IActivityReportsGroupingModel) => (
            <TableRowARGrouping
              type={type}
              tempSearch={tempSearch}
              TableRowDetail={model}
            />
          ))} */}

        {/* if there is data */}
        {type === "EDIT" && JSON.parse(localStorage.getItem("TempSearch"))
          ? JSON.parse(
              localStorage.getItem("TempSearch")
            )?.map((model: IActivityReportsGroupingModel) => (
              <TableRowARGrouping
                type={type}
                tempSearch={tempSearch}
                TableRowDetail={model}
              />
            ))
          : type === "ADD"
          ? tableData?.rows?.map((model: IActivityReportResultTableRow, k) => (
              <TableRowARGrouping
                setTempSearch={setTempSearch}
                tempSearch={tempSearch}
                type={type}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                rowData={model}
              />
            ))
          : tempSearch?.map((model: IActivityReportsGroupingModel, k) => (
              <TableRowARGrouping
                type={type}
                tempSearch={tempSearch}
                TableRowDetail={model}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
              />
            ))}
      </Table.Body>
    </Table>
  );
};

export default TableARGrouping;
