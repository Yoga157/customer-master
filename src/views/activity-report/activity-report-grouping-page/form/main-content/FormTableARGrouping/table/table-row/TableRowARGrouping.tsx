import React, { useState } from "react";
import { Dropdown, Image, Table } from "semantic-ui-react";
import { CheckBox } from "views/components/UI";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import DetailFormARGrouping from "views/activity-report/activity-report-grouping-page/form/DetailFormARGrouping";
import ReactHtmlParser from "react-html-parser";
import IActivityReportResultTableRow from "selectors/activity-report-grouping/models/SearchResults/IActivityReportResultTableRow";
import moment from "moment";
import IStore from "models/IStore";
import { selectSearchResults } from "selectors/activity-report-grouping/ActivityReportGroupingSelector";
import IActivityReportsGroupingModel from "selectors/activity-report-grouping/models/ActivityReportGroupingDetail/IActivityReportsGroupingModel";

interface IProps {
  type: string;
  readonly rowData?: IActivityReportResultTableRow;
  setTempSearch?: any;
  tempSearch?: any;
  TableRowDetail?: any;
  isCheck?: any;
  setIsCheck?: any;
}

const TableRowARGrouping: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    type,
    rowData,
    tempSearch,
    setTempSearch,
    TableRowDetail,
    isCheck,
    setIsCheck,
  } = props;

  const dispatch: Dispatch = useDispatch();
  const ShowARGrouping = (id) => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <DetailFormARGrouping id={id} type={"DETAIL"} />,
        ModalSizeEnum.Small
      )
    );
  };

  const SearchResult = useSelector((state: IStore) =>
    selectSearchResults(state)
  );

  // const handleChecked = (e, checked, rowData) => {
  //   const isSaveChange = SearchResult.rows?.map((item) => {
  //     if (checked.checked === true) {
  //       if (rowData.activityReportGenID === item.activityReportGenID) {
  //         if (!tempSearch.includes(rowData.activityReportGenID)) {
  //           setTempSearch((oldArray) => [...oldArray, item]);
  //         }
  //       }
  //     } else {
  //       var array = [...tempSearch]; // make a separate copy of the array
  //       var index = array.indexOf(rowData);
  //       if (index !== -1) {
  //         array.splice(index, 1);
  //         setTempSearch(array);
  //       }
  //     }
  //   });
  // };

  const convertEngineerList = (): string => {
    let result: string = "";
    let engineerArr: string[] = [];

    if (rowData?.engineerList) {
      engineerArr = rowData.engineerList.split(";");
      result += "<ul>";
      for (let item of engineerArr) {
        result += `<li>${item}</li>`;
      }
      result += "</ul>";
    } else if (TableRowDetail?.engineerList) {
      engineerArr = TableRowDetail.engineerList.split(";");
      result += "<ul>";
      for (let item of engineerArr) {
        result += `<li>${item}</li>`;
      }
      result += "</ul>";
    }
    return result;
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const isSaveChange = SearchResult.rows?.map((item) => {
      if (checked === true) {
        if (parseInt(id) === item.activityReportGenID) {
          if (!tempSearch.includes(parseInt(id))) {
            setTempSearch((oldArray) => [...oldArray, item]);
          }
        }
      } else {
        var array = [...tempSearch]; // make a separate copy of the array
        var index = array.indexOf(rowData);
        if (index !== -1) {
          array.splice(index, 1);
          setTempSearch(array);
        }
      }
    });
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
    }
  };

  const Checkbox = ({ id, type, handleClick, isChecked }) => {
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
    <Table.Row>
      {type === "ADD" && (
        <>
          <Table.Cell>
            <Checkbox
              id={rowData.activityReportGenID}
              type="checkbox"
              handleClick={handleClick}
              isChecked={isCheck.includes(rowData.activityReportGenID)}
            />

            {/* <CheckBox
              onChange={(e, checked) => {
                handleChecked(e, checked, rowData);
              }}
              defaultChecked={isCheck.includes(rowData.activityReportGenID)}
              checked={isCheck.includes(rowData.activityReportGenID)}
            /> */}
          </Table.Cell>
          <Table.Cell>{rowData?.activityReportGenID.toString()}</Table.Cell>
          <Table.Cell>{rowData?.so.toString()}</Table.Cell>
          <Table.Cell>
            {rowData?.createDate &&
              moment(rowData?.createDate).format("yyyy-MM-DD")}
          </Table.Cell>
          <Table.Cell>{ReactHtmlParser(convertEngineerList())}</Table.Cell>
          <Table.Cell>{rowData?.customerName}</Table.Cell>
          <Table.Cell>{rowData?.contactName}</Table.Cell>
          <Table.Cell>{ReactHtmlParser(rowData?.actionTaken)}</Table.Cell>
        </>
      )}
      {type === "EDIT" && (
        <>
          <Table.Cell>
            <Image
              onClick={() => ShowARGrouping(TableRowDetail.activityReportGenID)}
              src={"/assets/Icon-Group.svg"}
              wrapped
              ui={false}
            />
          </Table.Cell>
          <Table.Cell>
            {TableRowDetail.activityReportGenID.toString()}
          </Table.Cell>
          <Table.Cell>{TableRowDetail.so.toString()}</Table.Cell>
          <Table.Cell>
            {moment(TableRowDetail.createDate).format("yyyy-MM-DD")}
          </Table.Cell>
          <Table.Cell>{ReactHtmlParser(convertEngineerList())}</Table.Cell>
          <Table.Cell>{TableRowDetail.customerName}</Table.Cell>
          <Table.Cell>{TableRowDetail.contactName}</Table.Cell>
          <Table.Cell>{ReactHtmlParser(TableRowDetail.actionTaken)}</Table.Cell>
          <Table.Cell>
            {TableRowDetail.customerSignStatus ? (
              <Image src="/assets/CheckCircleSuccess.svg" />
            ) : (
              <Image src="/assets/WarningCircle.svg" />
            )}
          </Table.Cell>
        </>
      )}
    </Table.Row>
  );
};

export default TableRowARGrouping;
