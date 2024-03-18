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

const ModalNewPIC: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();

  const onSubmitNewAddress = async (values) => {
    console.log(values);
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">ADD PEOPLE IN CHARGE (PIC)</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitNewAddress(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem", width: "100%" }}>
                <Field
                  name="name"
                  component={TextInput}
                  labelName="Name"
                  placeholder="Type pic name here.."
                  mandatory={true}
                />
              </div>

              <Field
                name="jabatan"
                component={TextInput}
                labelName="Jabatan"
                placeholder="Type jabatan here.."
                mandatory={true}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "1rem" }}>
                <Field
                  name="email"
                  component={TextInput}
                  labelName="Email"
                  placeholder="Type email here.."
                  mandatory={true}
                />
              </div>
              <Field
                name="phoneNumber"
                component={TextInput}
                labelName="Phone Number"
                placeholder="Type phone number here.."
                mandatory={true}
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
              <Field
                name="officeAddress"
                component={TextAreaInput}
                placeholder="Type office address here.."
                labelName="Office Address"
                mandatory={true}
              />
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

export default ModalNewPIC;
