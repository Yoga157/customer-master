import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";
import InvoicingConditionModel from "stores/invoicing-condition/models/InvoicingConditionModel";
import * as InvoicingCondition from "stores/invoicing-condition/InvoicingConditionActivityActions";

interface IProps {
  customerSettingID: number;
}

const ModalNewInvoicingCondition: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [projectType, setProjectType] = useState("");
  const [documentInvoicing, setDocumentInvoicing] = useState("");

  const projectTypeData = [
    {
      text: "Manage Operation",
      value: "Manage Operation",
    },
    {
      text: "Manage Service",
      value: "Manage Service",
    },
    {
      text: "Project Type",
      value: "Project Type",
    },
  ];

  const documentInvoicingData = [
    {
      text: "BAST",
      value: "BAST",
    },
    {
      text: "Document 1",
      value: "Document 1",
    },
    {
      text: "Document 2",
      value: "Document 2",
    },
  ];

  const onSubmitHandler = async (data: any) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const NewInvoicingCondition = new InvoicingConditionModel({});
    NewInvoicingCondition.iConditionID = 0;
    NewInvoicingCondition.customerID = props.customerSettingID;
    NewInvoicingCondition.projectType = data.projectType;
    NewInvoicingCondition.documentName = data.documentInvoicing;
    NewInvoicingCondition.createUserID = userLogin?.employeeID;
    NewInvoicingCondition.modifyUserID = 0;

    await dispatch(
      InvoicingCondition.postInvoicingCondition(NewInvoicingCondition)
    );
    await dispatch(
      InvoicingCondition.requestInvoicingCondition(props.customerSettingID)
    );
    dispatch(ModalAction.CLOSE());
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  return (
    <Fragment>
      <p className="title-paragraph">ADD NEW INVOICING CONDITION</p>
      <Divider></Divider>

      <FinalForm
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <div className="space-between-container">
              <div style={{ width: "49%" }}>
                <Field
                  name="projectType"
                  component={DropdownClearInput}
                  placeholder="Select project type"
                  labelName="Project Type"
                  options={projectTypeData}
                  values={projectType}
                  mandatory={true}
                />
              </div>

              <div style={{ width: "49%" }}>
                <Field
                  name="documentInvoicing"
                  component={DropdownClearInput}
                  placeholder="Select document invoicing"
                  labelName="Document Invoicing"
                  options={documentInvoicingData}
                  values={documentInvoicing}
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

export default ModalNewInvoicingCondition;
