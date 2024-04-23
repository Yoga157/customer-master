import React from "react";
import { Icon } from "semantic-ui-react";

export const reqNewCustomerHeader = [
  {
    key: "customerName",
    header: "Customer Name",
    // textCenter: false,
  },
  {
    key: "picName",
    header: "PIC",
    // textCenter: false,
  },
  {
    key: "customerID",
    header: "Cust. ID",
    // textCenter: false,
  },
  {
    key: "blacklist",
    header: "Blacklist",
    textCenter: false,
  },
  {
    key: "holdshipment",
    header: "Holdshipment",
    textCenter: true,
  },
  {
    key: "Match",
    header: "Action",
    textCenter: true,
  },
];

export const reqNewCustomerData = [
  {
    customerName: "Bifcco Factory ltd.",
    pic: "Savannah N",
    custID: "92655",
  },
  {
    customerName: "Patnership Biffco",
    pic: "Savannah N",
    custID: "92655",
  },
];
