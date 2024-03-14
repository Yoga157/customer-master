import React, { Fragment, useState, useCallback } from "react";
import { Table } from "semantic-ui-react";

interface IProps {
  header: any[];
  data: any[];
  sequenceNum: any;
}

const TableNewCustomerSetting: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { header, data, sequenceNum } = props;

  return (
    <div className="wrapper-table" style={{ height: "fit-content" }}>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {sequenceNum && <Table.HeaderCell>No</Table.HeaderCell>}
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
    </div>
  );
};

export default TableNewCustomerSetting;
