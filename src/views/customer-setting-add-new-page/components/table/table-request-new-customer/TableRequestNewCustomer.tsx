import { Table, Icon } from "semantic-ui-react";
import React, { Fragment, useState, useCallback } from "react";
import { reqNewCustomerData } from "../../../data";

interface IProps {
  header: any[];
  data: any[];
  sequenceNum: any;
  customerName: string;
  picName: string;
  activePage?: number;
  totalData?: number;
}

const TableRequestNewCustomer: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    header,
    data,
    sequenceNum,
    customerName,
    picName,
    activePage,
    totalData,
  } = props;
  const highlightWords = (input: string): string => {
    const wordsArray = [
      customerName ? customerName.toLowerCase() : "",
      picName ? picName.toLowerCase() : "",
    ];

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
                no-data
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((data, index) => (
              <Table.Row key={index}>
                {/* <Table.Cell textAlign="center">{index + 1}</Table.Cell> */}
                <Table.Cell textAlign="center">
                  {(activePage - 1) * totalData + index + 1}
                </Table.Cell>
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

                <Table.Cell textAlign="center" verticalAlign="middle">
                  {data.blacklist === true ? (
                    <div className="blacklist-yes">
                      <Icon name="address book" size="small" />
                      <span>Yes</span>
                    </div>
                  ) : (
                    <div className="blacklist-no">
                      <Icon name="address book" size="small" />
                      <span>No</span>
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {data.holdshipment === true ? (
                    <div className="holdshipment-yes">
                      <Icon name="truck" size="small" />
                      <span>Yes</span>
                    </div>
                  ) : (
                    <div className="holdshipment-no">
                      <Icon name="truck" size="small" />
                      <span>No</span>
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">{data.similarity}%</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableRequestNewCustomer;
