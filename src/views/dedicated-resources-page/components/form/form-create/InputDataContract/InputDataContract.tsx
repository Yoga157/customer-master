import React, { Fragment, useEffect, useState } from "react";
import { Grid, Form, Button, Divider, Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import "./InputDataContract.scss";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { Form as FinalForm, Field } from "react-final-form";
import { RichTextEditor } from "views/components/UI";
import SalaryAndBenefit from "../../form-edit/main-content/salary-and-benefit/SalaryAndBenefit";
import Deductions from "../../form-edit/main-content/deductions/Deductions";
import OtherAndBenefit from "../../form-edit/main-content/other-and-benefit/OtherAndBenefit";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";
import {
  selectSalaryBenefit,
  selectDeductions,
  selectOtherBenefit,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import PostInputDataFromLastContract from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/PostInputDataFromLastContract";
import IDeductionsTable from "selectors/dedicated-resources/models/Deductions/IDeductionsTable";
import IOtherBenefitTable from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTable";

interface IProps {
  contractID: number;
}

const InputDataContract: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const ListSalaryBenefit = useSelector((state: IStore) =>
    selectSalaryBenefit(state)
  );
  const ListDeductions: IDeductionsTable = useSelector((state: IStore) =>
    selectDeductions(state)
  );
  const ListOtherBenefit: IOtherBenefitTable = useSelector((state: IStore) =>
    selectOtherBenefit(state)
  );
  const { contractID } = props;

  const [check, setCheck] = useState(false);
  const [DataSalary, setDataSalary] = useState([]);
  const [DataDeduction, setDeduction] = useState([]);
  const [DataOtherBenefit, setDataOtherBenefit] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
    localStorage.removeItem("SalaryBenefit");
    localStorage.removeItem("Deductions");
    localStorage.removeItem("OtherBenefit");
  };

  const [FlagCheckedDeduction, setFlagCheckedDeduction] = useState("");
  const [FlagCheckedOther, setFlagCheckedOther] = useState("");

  useEffect(() => {
    dispatch(DedicatedResourcesActions.requestOtherBenefit(+contractID, 1, 15));
    dispatch(
      DedicatedResourcesActions.requestSalaryBenefit(+contractID, 1, 15)
    );
    dispatch(DedicatedResourcesActions.requestDeductions(+contractID, 1, 15));
  }, []);

  useEffect(() => {
    if (ListSalaryBenefit.rows?.length > 0) {
      // setDataSalary(ListSalaryBenefit.rows);
      localStorage.setItem(
        "SalaryBenefit",
        JSON.stringify(ListSalaryBenefit.rows)
      );
    }
    if (ListDeductions.rows?.length > 0) {
      // setDeduction(ListDeductions.rows);
      localStorage.setItem("Deductions", JSON.stringify(ListDeductions.rows));
    }
    if (ListOtherBenefit.rows?.length > 0) {
      // setDataOtherBenefit(ListOtherBenefit.rows);
      localStorage.setItem(
        "OtherBenefit",
        JSON.stringify(ListOtherBenefit.rows)
      );
    }
  }, []);

  const onSubmitHandler = (values: any) => {
    const newValues = new PostInputDataFromLastContract({});

    newValues.userLoginID = currentUser.employeeID;
    newValues.contractID = contractID;
    newValues.listSalaryBenefitDash = JSON.parse(
      localStorage.getItem("SalaryBenefit")
    );

    newValues.listDeductionDash = JSON.parse(
      localStorage.getItem("Deductions")
    );
    newValues.listOtherBenefitDash = JSON.parse(
      localStorage.getItem("OtherBenefit")
    );

    dispatch(DedicatedResourcesActions.requestpostInputLastContract(newValues));
    onClose();

    localStorage.removeItem("SalaryBenefit");
    localStorage.removeItem("Deductions");
    localStorage.removeItem("OtherBenefit");
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_GET_SALARY_BENEFIT,
      DedicatedResourcesActions.REQUEST_GET_OTHER_BENEFIT,
      DedicatedResourcesActions.REQUEST_GET_DEDUCTIONS,
    ])
  );

  return (
    <Fragment>
      <Card.Header>Input New Data Contract from Last Contract</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
	<Grid className="TopApproveReject">
          <Grid.Column textAlign="center">
            <p>Input New Data Contract from Last Contract</p>
          </Grid.Column>
        </Grid>

        <FinalForm
          onSubmit={(values: any) => onSubmitHandler(values)}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form className="p-1r pt-0" onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                    <SalaryAndBenefit
                      flag="InputData"
                      setDataSalaryBenefit={setDataSalary}
                      DataSalaryBenefit={DataSalary}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                    <Deductions
                      flag="InputData"
                      DataDeductions={DataDeduction}
                      setDataDeductions={setDeduction}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column style={{ top: "20px", padding: 0 }} width={16}>
                    <OtherAndBenefit
                      flag="Contract"
                      DataOtherBenefit={DataOtherBenefit}
                      setDataOtherBenefit={setDataOtherBenefit}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ top: "20px" }}>
                  <Grid.Column width={16}>
                    {/* <Button color="blue" floated="right" content="Submit" disabled={pristine || invalid } /> */}
                    {/* disabled={pristine || invalid}  */}
                    <Button
                      icon="save outline"
                      color="blue"
                      floated="right"
                      content="Submit"
                    />
                    <Button
                      icon="undo"
                      type="button"
                      floated="right"
                      content="Cancel"
                      onClick={onClose}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default InputDataContract;
