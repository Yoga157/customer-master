import React, { Fragment, useState, useCallback } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Table, Icon } from "semantic-ui-react";
import ModalUserStories from "../../modal/modal-user-stories/ModalUserStories";
import "./TableProjectHistory.scss";

interface IProps {
  customerID: number;
  data: any[];
  setOpenCollectionHistory: (data: any) => void;
}

const TableProjectHistory: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { customerID, data, setOpenCollectionHistory } = props;

  /** success stories */
  const onViewEditCustomerStory = useCallback(
    (id, successStory, modifiedStoryBy): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalUserStories
            funnelID={Number(id)}
            customerID={customerID}
            successStory={successStory}
            modifiedStoryBy={modifiedStoryBy}
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const scrollToTarget = (id) => {
    setTimeout(() => {
      setOpenCollectionHistory(true);
      const navbarElement = document.querySelector(".DisInlineBlock");
      const targetElement = document.getElementById(`${id}`);

      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const navbarRect = navbarElement.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop;
        let targetPosition = targetRect.top + scrollTop - navbarRect.height;
        console.log(targetPosition);

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <div className="wrapper-table" style={{ height: "fit-content" }}>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Funnel ID</Table.HeaderCell>
            <Table.HeaderCell>SO ID</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "30rem" }}>
              Project Name
            </Table.HeaderCell>
            <Table.HeaderCell style={{ width: "15rem" }}>
              Customer Name
            </Table.HeaderCell>
            <Table.HeaderCell style={{ width: "15rem" }}>
              Sales Name
            </Table.HeaderCell>
            <Table.HeaderCell>Sales Dept.</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "15rem" }}>
              SO Close Date
            </Table.HeaderCell>
            <Table.HeaderCell>SO Amount (IDR)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length == 0 ? (
            <Table.Row>
              <Table.Cell colSpan={16} textAlign="center">
                No data
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((data, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      onClick={() => scrollToTarget(data.so)}
                      className="collection-button"
                    >
                      <Icon className="icon-button" name="eye" />
                    </div>
                    <div
                      className="collection-button"
                      onClick={() =>
                        onViewEditCustomerStory(
                          data.funnelID,
                          data.successStory,
                          data.modifiedStoryBy
                        )
                      }
                    >
                      <Icon className="icon-button" name="user" />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell textAlign="center">{data.funnelID}</Table.Cell>
                <Table.Cell textAlign="center">{data.so}</Table.Cell>
                <Table.Cell textAlign="center">{data.projectName}</Table.Cell>
                <Table.Cell textAlign="center">{data.customerName}</Table.Cell>
                <Table.Cell textAlign="center">{data.salesName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {data.salesDepartment}
                </Table.Cell>
                <Table.Cell textAlign="center">{data.soCloseDate}</Table.Cell>
                <Table.Cell textAlign="right">{data.soAmount}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableProjectHistory;
