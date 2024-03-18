import environment from "environment";
import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, FileUpload } from "views/components/UI";
import * as RelatedFile from "stores/related-file/RelatedFileActivityActions";
import input from "views/components/UI/Input/Input";
import axios from "axios";

interface IProps {
  customerID: number;
}

const ModalNewRelatedFile: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [uploadFile, setUploadFile] = useState("");

  const documentTypeData = [
    {
      text: "Diagram",
      value: "Diagram",
    },
    {
      text: "Diagram Lainnya",
      value: "Diagram Lainnya",
    },
  ];

  const onSubmitDocument = async (data) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    let formData = new FormData();
    formData.append("customerID", `${props.customerID}`);
    formData.append("documentName", documentName);
    formData.append("documentType", data.documentType);
    formData.append("file", uploadFile);
    formData.append("CreateUserID", userLogin?.employeeID);

    try {
      const endpoint: string = environment.api.customer.replace(
        ":controller",
        "RelatedFile"
      );

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadFile("");
      dispatch(RelatedFile.requestRelatedFile(props.customerID));
      dispatch(ModalAction.CLOSE());
    } catch (error) {
      console.error(error);
    }
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">UPLOAD NEW FILE</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitDocument(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex-column" style={{ width: "100%" }}>
              <label htmlFor="documentName">
                Document Name <span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <Input
                  name="documentName"
                  style={{ width: "100%" }}
                  onChange={(e) => setDocumentName(e.target.value)}
                />
              </div>
            </div>

            <div
              className="space-between-container"
              style={{ alignItems: "flex-end" }}
            >
              <div style={{ width: "49%" }}>
                <Field
                  name="documentType"
                  component={DropdownClearInput}
                  placeholder="Select document type..."
                  labelName="Document Type"
                  options={documentTypeData}
                  values={documentType}
                  mandatory={true}
                />
              </div>

              <div style={{ width: "49%" }}>
                <Field
                  name="uploadFile"
                  component={FileUpload}
                  labelName="Upload File"
                  onChanged={(e) => setUploadFile(e.target.files[0])}
                  mandatory={true}
                />
              </div>
            </div>

            <Divider></Divider>

            <div className="button-container">
              <Button
                textAlign="center"
                className="MarBot10"
                type="submit"
                color="blue"
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

export default ModalNewRelatedFile;
