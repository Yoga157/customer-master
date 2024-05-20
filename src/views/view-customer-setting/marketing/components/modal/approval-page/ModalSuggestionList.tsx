import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Divider, Form, Segment, Grid, Table, Icon } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, TextInput } from "views/components/UI";
import ModalRejectApproval from "./ModalRejectApproval";

interface ICustomer {
  titleCustomer: any;
  customerName: any;
  industryClass: any;
  customerAddress: any;
  phoneNumber: any;
  website: any;
  socialMedia: any;
  picName: any;
  picJobTitle: any;
  picMobilePhone: any;
  picEmailAddr: any;
  requestor: any;
  modifyUserID: any;
}

interface IProps {
  suggestionList: any[];
  customer: ICustomer;
}

const ModalSuggestionList: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { suggestionList, customer } = props;

  const onSearch = async (data) => {
    console.log(data);
    // dispatch(ModalAction.CLOSE());
  };

  const highlightWords = (input: string): string => {
    const wordsArray = ["biffco manufacturing", "savannah nguyen"];
    const wordsToHighlight = wordsArray.join(" ");
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (wordsToHighlight.includes(word)) {
        words[i] = `<b>${words[i]}</b>`;
      }
    }

    return words.join(" ");
  };

  const openMatch = useCallback(
    (matchCustomer): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalRejectApproval
            customer={customer}
            customerGenId={"1"}
            matchCustomer={matchCustomer}
            jenis="match"
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">SEARCH CUSTOMER - Nama Customer</p>
      <Divider className="divider-margin-bottom-0"></Divider>

      <FinalForm
        onSubmit={(values: any) => onSearch(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                backgroundColor: "#FFFB9A",
                display: "flex",
                flexDirection: "column",
                padding: "1rem 0",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ marginRight: "1rem", width: "20%" }}>
                  <Field
                    name="titleCustomer"
                    component={TextInput}
                    placeholder="e.g.PT .."
                    labelName="Title Customer"
                    mandatory={false}
                  />
                </div>
                <div style={{ marginRight: "1rem", width: "40%" }}>
                  <Field
                    name="customerName"
                    component={TextInput}
                    placeholder="e.g. Berca Hardaya .."
                    labelName="Customer Name"
                    mandatory={false}
                  />
                </div>
                <div style={{ width: "40%" }}>
                  <Field
                    name="picName"
                    component={TextInput}
                    placeholder="e.g.Jhon Doe .."
                    labelName="PIC Name"
                    mandatory={false}
                  />
                </div>
              </div>

              <div style={{ alignSelf: "flex-end", marginTop: "1rem" }}>
                <Button
                  type="submit"
                  color="blue"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Search"
                />
              </div>
            </div>
          </Form>
        )}
      />
      <p
        className="warning-text"
        style={{ backgroundColor: "#E2EFFF", margin: "14px 0" }}
      >
        There are <b>15</b> results from the customer search{" "}
        <b>PT BIFFCO MANUFACTURING</b> with PIC <b>SAVANAH NGUYEN</b>. Please
        recheck again before you approve new customer request.
      </p>

      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>PIC Name</Table.HeaderCell>
            <Table.HeaderCell>Cust. ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {suggestionList.length == 0 ? (
            <Table.Row>
              <Table.Cell colSpan={16} textAlign="center">
                No data
              </Table.Cell>
            </Table.Row>
          ) : (
            suggestionList.map((data, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
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
                <Table.Cell>{data.custID}</Table.Cell>
                <Table.Cell
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="match-button" onClick={() => openMatch(data)}>
                    <Icon name="check" />
                    <p>Match</p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      <div className="button-container">
        <div className="button-inner-container">
          <Button style={{ marginRight: "1rem" }} type="button">
            Close
          </Button>
          <Button color="blue" style={{ marginRight: "1rem" }} type="button">
            Cancel
          </Button>
          <Button color="yellow">Reject</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalSuggestionList;
