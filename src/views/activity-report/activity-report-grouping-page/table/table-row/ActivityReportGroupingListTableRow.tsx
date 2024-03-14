import React from "react";
import { Dropdown, Image, Table } from "semantic-ui-react";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import ActivityReportGroupingListTableRowDelete from "./table-row-delete/ActivityReportGroupingListTableRowDelete";
import ServiceFormARGrouping from "../../form/ServiceFormARGrouping";
import IActivityReportGroupingTableRow from "selectors/activity-report-grouping/models/ActivityReportGrouping/IActivityReportGroupingTableRow";
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

interface IProps {
  readonly rowData: IActivityReportGroupingTableRow;
  // trigger: any;
}

const ActivityReportGroupingListTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { rowData } = props;
  const dispatch: Dispatch = useDispatch();
  const deleteRow = (item, uid) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ActivityReportGroupingListTableRowDelete item={item} uid={uid}/>,
        ModalSizeEnum.Tiny
      )
    );
  };
  const EditARGrouping = (uid, activityReportGroupGenId, signStatus) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ServiceFormARGrouping uid={uid} activityReportGroupGenId={activityReportGroupGenId} signStatus={signStatus} type={"EDIT"} />,
        ModalSizeEnum.Small
      )
    );
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
                onClick={() => EditARGrouping(rowData.uid, rowData.activityReportGroupGenId, rowData.customerSignStatus)}
              />
              <Dropdown.Item
                text="Delete"
                icon="trash alternate"
                onClick={() => deleteRow(rowData.activityReportGroupGenId, rowData.uid)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.uid}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.so}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.activityReportGenIdRelated}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerName}</Table.Cell>
        <Table.Cell textAlign="center">{ReactHtmlParser(rowData.address)}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.contactName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.createUserName}</Table.Cell>
        <Table.Cell textAlign="center">{moment(rowData.createDate).format('yyyy-MM-DD')}</Table.Cell>
        <Table.Cell textAlign="center">
          {" "}
          {
            rowData.customerSignStatus ? (
              <Image src="/assets/CheckCircleSuccess.svg" /> 
            ) : (
              <Image src="/assets/WarningCircle.svg" />
            )
          }
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ActivityReportGroupingListTableRow;
