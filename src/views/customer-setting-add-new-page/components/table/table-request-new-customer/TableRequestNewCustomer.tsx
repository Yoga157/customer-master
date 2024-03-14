import { Table } from "semantic-ui-react";
import React, { Fragment, useState, useCallback } from "react";
import { reqNewCustomerData } from "../../../data";

interface IProps {
  header: any[];
  data: any[];
  sequenceNum: any;
}

const TableRequestNewCustomer: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { header, data, sequenceNum } = props;
  const highlightWords = (input: string): string => {
    const wordsArray = ["Biffco".toLowerCase(), "Savannah N".toLowerCase()];
    const wordsToHighlight = wordsArray.join(" ");
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (wordsToHighlight.includes(word)) {
        words[i] = ` <b>${words[i]}</b> `;
      }
    }

    return words.join(" ");
  };

  return (
    <div style={{ height: "fit-content" }}>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {sequenceNum && (
              <Table.HeaderCell textAlign="center">No</Table.HeaderCell>
            )}
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
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: highlightWords(data.customerName),
                    }}
                  ></p>
                </Table.Cell>
                <Table.Cell>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: highlightWords(data.picName),
                    }}
                  ></p>
                </Table.Cell>
                <Table.Cell>{data.customerID}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableRequestNewCustomer;
