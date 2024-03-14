import React, { useEffect, useState } from "react";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { Grid, Header } from "semantic-ui-react";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { format } from "date-fns";
import "./SalaryAndBenefitStyle.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import SalaryAndBenefitTable from "./table/SalaryAndBenefitTable";
import SalaryBenefitForm from "./form/SalaryBenefitForm";
import { Form as FinalForm, Field } from "react-final-form";
import {
  selectSalaryBenefit,
  selectEmployeeInfo,
  selectWorkFlowHeader,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import ISalaryBenefitTable from "selectors/dedicated-resources/models/SalaryBenefit/ISalaryBenefitTable";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";

interface IProps {
  contractID?: number;
  flag?: string;
  pageSize?: number;
  activePage?: number;
  setActivePage?: any;

  //Bulk Update
  totalGrossCurrAmount?: number;
  totalGrossNewAmount?: number;

  setDataSalaryBenefit?: any;
  DataSalaryBenefit?: any;
  DataEmployeeBulkUpdate?: any;
  isCheckBulk?: any;
  tempSalary?: any;
  setTempSalary?: any;
}

const SalaryAndBenefit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    contractID,
    flag,
    pageSize,
    activePage,
    setActivePage,
    DataSalaryBenefit,
    setDataSalaryBenefit,
    totalGrossCurrAmount,
    totalGrossNewAmount,

    DataEmployeeBulkUpdate,
    isCheckBulk,
    tempSalary,
    setTempSalary,
  } = props;
  const dispatch: Dispatch = useDispatch();

  const ListSalaryBenefit: ISalaryBenefitTable = useSelector((state: IStore) =>
    selectSalaryBenefit(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const WorkFlowHeader = useSelector((state: IStore) =>
    selectWorkFlowHeader(state)
  );

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(
      DedicatedResourcesActions.requestSalaryBenefit(
        contractID,
        data.activePage,
        pageSize
      )
    );
  };

  const AddSalaryAndBenefit = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <SalaryBenefitForm
          DataSalaryBenefit={DataSalaryBenefit}
          setDataSalaryBenefit={setDataSalaryBenefit}
          // typeBulk={typeBulk}
          DataEmployeeBulkUpdate={DataEmployeeBulkUpdate}
          isCheckBulk={isCheckBulk}
          flag={flag}
          contractID={contractID}
          type={"Add"}
          tempSalary={tempSalary}
          setTempSalary={setTempSalary}
        />,
        ModalSizeEnum.Small
      )
    );
  };
  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [validate, setValidate] = useState(false);

  const handleChecked = (e, checked) => {
    setIsCheckAll(!isCheckAll);

    const isSaveChange = JSON.parse(localStorage.getItem("SalaryBenefit"))?.map(
      (item) => {
        if (!isCheckAll) {
          setIsCheck((oldArray) => [...oldArray, item.salaryID]);
          return { ...item, isSave: 1 };
        } else {
          setIsCheck([]);
          return { ...item, isSave: 0 };
        }
      }
    );

    localStorage.setItem("SalaryBenefit", JSON.stringify(isSaveChange));
  };
  const Checkbox = ({ handleClick, checked }) => {
    //
    return (
      <label className="switch">
        <input type="checkbox" onChange={handleClick} checked={checked} />
        <span className="slider round"></span>
      </label>
    );
  };

  useEffect(() => {
    // Check yang Login sesuai dengan Waiting Approval && Check Setelah SubmitApproval Button Disabled
   
        if(WorkFlowHeader.resultObj?.length > 0)
        {
            //Cek Approval Pertama Bukan pak Alex
            if(WorkFlowHeader.resultObj[0].status === "Waiting For Approval")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "APPROVED" && WorkFlowHeader.resultObj[1].status === "Waiting For Approval")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "APPROVED" && WorkFlowHeader.resultObj[1].status === "APPROVED")
            {
              setValidate(true);
            }

            if(WorkFlowHeader.resultObj[0].status === "REJECTED")
            {
              setValidate(false);
            }

            if(WorkFlowHeader.resultObj[1].status === "REJECTED")
            {
              setValidate(false);
            }
        }
   
  }, [WorkFlowHeader.resultObj]);

  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={6} className="title-w-toggle">
          <Header as="h4">
            <Header.Content>Salary & Benefit</Header.Content>
          </Header>
        </Grid.Column>

        <Grid.Column width={10} textAlign="right">
          {flag === "InputData" ? (
            <div
              className="pt-1r pb-2 item-toggle"
              style={{ marginRight: "10px" }}
            >
              <span>OFF</span>
              <Checkbox handleClick={handleChecked} checked={isCheckAll} />
              {/* <span>
                <Field
                  name={"toggle"}
                  toggle
                  component={CheckBox}
                  // disabled={disableComponent || (!minimumHardware && i.value === false)}
                  // // disabled={disableComponent || (equelMinChoiceHardware && !minimumHardware)}
                  checked={FlagChecked !== "All" ? false : true}
                  // // defaultChecked={i.value}
                  onChange={(e, checked) => {
                    handleChecked(e, checked);
                  }}
                />
              </span> */}
              <span>ON</span>
              {/* <Button content="SET" /> */}
            </div>
          ) : (
            <>
              <Tooltips
                content="Add New Salary & Benefit"
                trigger={
                  <Button
                    onClick={AddSalaryAndBenefit}
                    type="button"
                    className="m-05r"
                    icon="plus"
                    color="yellow"
                    //     : EmployeeInfo.contractStatusName === "Terminated" ||
                    //       EmployeeInfo.contractStatusName === "Full Approved"
                    //     ? true
                    disabled={
                      props.flag === "BulkUpdate"
                        ? DataEmployeeBulkUpdate.length > 0
                          ? false
                          : true
                        : validate
                    }
                    floated="right"
                    size="small"
                    content="Add New"
                  />
                }
              />
            </>
          )}
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Row>
          <Grid.Column>
              <SalaryAndBenefitTable
                totalGrossNewAmount={totalGrossNewAmount}
                totalGrossCurrAmount={totalGrossCurrAmount}
                // typeBulk={typeBulk}
                flag={flag}
                tableData={ListSalaryBenefit}
                DataSalaryBenefit={DataSalaryBenefit}
                setDataSalaryBenefit={setDataSalaryBenefit}
                tempSalary={tempSalary}
                setTempSalary={setTempSalary}
                validate={validate}
                //InputDataFromlastContract
                isCheck={isCheck}
                setIsCheck={setIsCheck}
              />
          </Grid.Column>
        </Grid.Row>
        {flag === "InputData" || flag === "BulkUpdate" ? null : (
          <Grid.Row>
            <Grid.Column>
              <Pagination
                activePage={activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={ListSalaryBenefit?.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </>
  );
};

export default SalaryAndBenefit;
