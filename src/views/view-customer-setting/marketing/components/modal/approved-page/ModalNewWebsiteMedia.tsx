import environment from "environment";
import "../Modal.scss";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  DropdownClearInput,
  Button,
  FileUpload,
  RichTextEditor,
  SearchInput,
  TextAreaInput,
  TextInput,
} from "views/components/UI";

const ModalNewWebsiteMedia: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();

  const onSubmitNewAddress = async (values) => {
    console.log(values);
  };

  const [type, setType] = useState("");
  const typeData = [
    {
      text: "Facebook",
      value: "Facebook",
    },
    {
      text: "Website",
      value: "Website",
    },
    {
      text: "Instagram",
      value: "Instagram",
    },
  ];

  const onChangeType = (data: any): any => {
    setType(data);
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">ADD WEBSITE OR SOCIAL MEDIA</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitNewAddress(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ marginRight: "1rem" }}>
                <Field
                  name="type"
                  component={DropdownClearInput}
                  placeholder="Select type"
                  labelName="Type"
                  options={typeData}
                  values={type}
                  onChanged={onChangeType}
                  mandatory={true}
                />
              </div>
              <div style={{ width: "100%" }}>
                <Field
                  name="name"
                  component={TextInput}
                  labelName="Name"
                  placeholder="Type name of the website or the social media here.."
                  mandatory={true}
                />
              </div>
            </div>

            <Divider></Divider>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
                //   onClick={}
              >
                Submit
              </Button>
              <Button type="button" onClick={cancelClick}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ModalNewWebsiteMedia;
