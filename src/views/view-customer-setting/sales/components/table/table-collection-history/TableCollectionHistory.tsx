import React, { Fragment, useState, useCallback } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Table, Icon } from "semantic-ui-react";

interface IProps {
  data: any[];
}

const TableCollectionHistory: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { data } = props;

  return (
    <div className="wrapper-table" style={{ height: "fit-content" }}>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
            <Table.HeaderCell>Invoice Date</Table.HeaderCell>
            <Table.HeaderCell>SO ID</Table.HeaderCell>
            <Table.HeaderCell>Collection Amount</Table.HeaderCell>
            <Table.HeaderCell>Collection Date</Table.HeaderCell>
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
              <Table.Row key={index} id={data.soid}>
                <Table.Cell textAlign="center">{data.invoiceNumber}</Table.Cell>
                <Table.Cell textAlign="center">{data.invoiceDate}</Table.Cell>
                <Table.Cell textAlign="center">{data.soid}</Table.Cell>
                <Table.Cell textAlign="right">
                  {data.collectionAmount}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {data.collectionDate}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableCollectionHistory;
