import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import React, { Fragment, useState, useCallback } from "react";
import { Icon, Table, Dropdown } from "semantic-ui-react";
import ModalNewCustomerAddress from "../modal/approved-page/ModalNewCustomerAddress";
import { DeletePopUp } from "../modal/delete";

interface IEditComponent {
  data: any;
}

interface IProps {
  header: any[];
  data: any[];
  sequenceNum: any;
  Modal: React.FC<any>;
  deleteData?: (data: any) => void;
  refreshData?: (data: any) => void;
  customerId?: number;
  jenis?: string;
  isView?: boolean;
  status: string;
}

const TableCustomerDetail: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    header,
    data,
    sequenceNum,
    Modal,
    jenis,
    deleteData,
    refreshData,
    customerId,
    isView,
    status,
  } = props;
  const dispatch: Dispatch = useDispatch();

  const openEdit = useCallback(
    (dataEdit): void => {
      if (isView) {
        dispatch(
          ModalSecondLevelActions.OPEN(
            <Modal data={dataEdit} isView={isView} />,
            ModalSizeEnum.Small
          )
        );
      } else {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <Modal data={dataEdit} />,
            ModalSizeEnum.Small
          )
        );
      }
    },
    [dispatch]
  );

  // const deleteData = (id) => {
  //   console.log(`Hapus data ${id}`);
  // };

  // const refreshData = (customerID) => {
  //   console.log(`Refresh data customer ${customerID}`);
  // };

  const openDelete = useCallback(
    (idToDel: number, content: string): void => {
      if (isView) {
        dispatch(
          ModalSecondLevelActions.OPEN(
            <DeletePopUp
              deleteFunc={deleteData}
              refreshFunc={refreshData}
              id={idToDel}
              customerID={customerId}
              content={content}
              jenis={jenis}
              isView={isView}
            />,
            ModalSizeEnum.Tiny
          )
        );
      } else {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp
              deleteFunc={deleteData}
              refreshFunc={refreshData}
              id={idToDel}
              customerID={customerId}
              content={content}
              jenis={jenis}
            />,
            ModalSizeEnum.Tiny
          )
        );
      }
    },
    [dispatch]
  );

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          {sequenceNum && (
            <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
              No
            </Table.HeaderCell>
          )}
          <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
            Action
          </Table.HeaderCell>
          {header.map((header) => (
            <Table.HeaderCell>{header.header}</Table.HeaderCell>
          ))}
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
          data.map((item, index) => (
            <Table.Row key={index}>
              {sequenceNum && (
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              )}
              <Table.Cell>
                {/* <Icon name="ellipsis vertical"></Icon> */}
                <Dropdown
                  pointing="left"
                  icon="ellipsis vertical"
                  disabled={status == "REJECT"}
                >
                  <Dropdown.Menu>
                    {jenis?.toUpperCase() != "RELATEDCUSTOMER" && (
                      <Dropdown.Item
                        text="View/Edit"
                        icon="edit"
                        onClick={() => openEdit(item)}
                      />
                    )}
                    <Dropdown.Item
                      text="Delete"
                      icon="trash alternate"
                      onClick={() => openDelete(item.id, "item")}
                      disabled={
                        item?.type == "MAIN" && data.length == 1 ? true : false
                      }
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
              {header.map((header) =>
                header.key == "pin" || header.key == "cap" ? (
                  <Table.Cell
                    key={header.key}
                    textAlign={header.textCenter ? "center" : "left"}
                  >
                    {item["pin"] || (item["cap"] && <Icon name="check" />)}
                  </Table.Cell>
                ) : (
                  <Table.Cell
                    key={header.key}
                    textAlign={header.textCenter ? "center" : "left"}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item[header.key],
                      }}
                    ></p>
                  </Table.Cell>
                )
              )}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
};

export default TableCustomerDetail;
