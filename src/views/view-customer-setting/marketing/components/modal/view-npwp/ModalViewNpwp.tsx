import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import * as CustomerMasterActions from "stores/customer-master/CustomerMasterActivityActions";
import { Divider, Form, Icon, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  DropdownClearInput,
  Button,
  FileUpload,
  RichTextEditor,
} from "views/components/UI";
import PostStatusNewCustomerModel from "stores/customer-master/models/PostStatusNewCustomerModel";
import { useHistory, useLocation } from "react-router-dom";
import RouteEnum from "constants/RouteEnum";

interface IProps {
  imageSrc: string;
  isView?: boolean;
}

const ModalViewNpwp: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const { imageSrc, isView } = props;

  const [remark, setRemark] = useState("");

  const cancelClick = () => {
    if (isView) {
      dispatch(ModalSecondLevelActions.CLOSE());
    } else {
      dispatch(ModalAction.CLOSE());
    }
  };

  return (
    <Fragment>
      <p className="title-paragraph">VIEW/EDIT NPWP CARD</p>
      <Divider></Divider>

      <img
        style={{ width: "100%", borderRadius: "0.5rem" }}
        src={imageSrc}
      ></img>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#FFD500",
          color: "#55637A",
          padding: "0.5rem 1.5rem",
          borderRadius: "2rem",
          fontSize: "small",
        }}
      >
        <Icon name="upload"></Icon> Reupload NPWP Card Image
      </div>

      <Divider></Divider>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="button" onClick={() => cancelClick()}>
          Cancel
        </Button>
        <Button
          textAlign="center"
          className="MarBot10"
          type="submit"
          color="blue"
          style={{ marginRight: "1rem" }}
        >
          Submit
        </Button>
      </div>
    </Fragment>
  );
};

export default ModalViewNpwp;
