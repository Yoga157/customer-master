import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
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
  relatedCustomer?;
}

const TableCustomerDetail: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { header, data, sequenceNum, Modal, relatedCustomer } = props;
  const dispatch: Dispatch = useDispatch();

  const openEdit = useCallback(
    (dataEdit): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <Modal data={dataEdit} />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const deleteData = (id) => {
    console.log(`Hapus data ${id}`);
  };

  const refreshData = (customerID) => {
    console.log(`Refresh data customer ${customerID}`);
  };

  const openDelete = useCallback(
    (idToDel: number, content: string): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={deleteData}
            refreshFunc={refreshData}
            id={idToDel}
            customerID={1}
            content={content}
          />,
          ModalSizeEnum.Tiny
        )
      );
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
          data.map((data, index) => (
            <Table.Row key={index}>
              {sequenceNum && (
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              )}
              <Table.Cell
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <Icon name="ellipsis vertical"></Icon> */}
                <Dropdown pointing="left" icon="ellipsis vertical">
                  <Dropdown.Menu>
                    {!relatedCustomer && (
                      <Dropdown.Item
                        text="View/Edit"
                        icon="edit"
                        onClick={() => openEdit(data)}
                      />
                    )}
                    <Dropdown.Item
                      text="Delete"
                      icon="trash alternate"
                      onClick={() => openDelete(index, "nama tabel")}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
              {header.map((header) =>
                header.textCenter ? (
                  <Table.Cell key={header.key} textAlign="center">
                    {data[header.key]}
                  </Table.Cell>
                ) : (
                  <Table.Cell key={header.key}>{data[header.key]}</Table.Cell>
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
