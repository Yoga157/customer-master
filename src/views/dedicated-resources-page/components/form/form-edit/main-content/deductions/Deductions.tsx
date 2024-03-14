import React, { useEffect, useState } from "react";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Tooltips, Button, CheckBox } from "views/components/UI";
import { Grid, Header } from "semantic-ui-react";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { format } from "date-fns";
import "./DeductionsStyle.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import DeductionsTable from "./table/DeductionsTable";
import DeducationsForm from "./form/DeductionsForm";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import { Form as FinalForm, Field } from "react-final-form";
import IDeductionsTable from "selectors/dedicated-resources/models/Deductions/IDeductionsTable";
import {
  selectDeductions,
  selectEmployeeInfo,
  selectWorkFlowHeader,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";

interface IProps {
  // history: any;
  contractID?: number;
  tabItem?: string;
  tableData?: any;
  setActivePage?: any;
  flag?: string;
  activePage?: number;
  pageSize?: number;

  //BulkUpdate
  DataDeductions?: any;
  setDataDeductions?: any;
  pieceDeductions?: number;
  DataEmployeeBulkUpdate?: any;
  tempDeductions?: any;
  setTempDeductions?: any;
}

const Deductions: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    pageSize,
    activePage,
    setActivePage,
    tableData,
    flag,
    contractID,
    DataDeductions,
    setDataDeductions,
    pieceDeductions,
    DataEmployeeBulkUpdate,
    tempDeductions,
    setTempDeductions
  } = props;
  const dispatch: Dispatch = useDispatch();

  const ListDeductions: IDeductionsTable = useSelector((state: IStore) =>
    selectDeductions(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const WorkFlowHeader = useSelector((state: IStore) =>
  selectWorkFlowHeader(state)
);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(data.activePage);
    dispatch(
      DedicatedResourcesActions.requestDeductions(
        contractID,
        data.activePage,
        pageSize
      )
    );
  };

 
  const AddDeductions = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <DeducationsForm
          deductID={0}
          flag={flag}
          DataDeductions={DataDeductions}
          setDataDeductions={setDataDeductions}
          contractID={contractID}
          type={"Add"}
          //BulkUpdate
          DataEmployeeBulkUpdate={DataEmployeeBulkUpdate}
          tempDeductions={tempDeductions}
          setTempDeductions={setTempDeductions}
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

    const isSaveChange = JSON.parse(localStorage.getItem("Deductions"))?.map(
      (item) => {
        if (!isCheckAll) {
          setIsCheck((oldArray) => [...oldArray, item.deductID]);
          return { ...item, isSave: 1 };
        } else {
          setIsCheck([]);
          return { ...item, isSave: 0 };
        }
      }
    );
    localStorage.setItem("Deductions", JSON.stringify(isSaveChange));

    // if (checked.checked === true) {
    //   setFlagChecked("All");
    // } else {
    //   setFlagChecked("AllOff");
    // }
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
            <Header.Content>Deductions</Header.Content>
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
                  checked={FlagChecked !== "All" ? false : true}
                  onChange={(e, checked) => {
                    handleChecked(e, checked);
                  }}
                  // disabled={disableComponent || (!minimumHardware && i.value === false)}
                  // // disabled={disableComponent || (equelMinChoiceHardware && !minimumHardware)}
                  // checked={i.value}
                  // // defaultChecked={i.value}
                  // onChange={(e, checked) => handleChecked(e, checked, 'hardware')}
                />
              </span> */}
              <span>ON</span>
              {/* <Button content="SET" /> */}
            </div>
          ) : (
            <>
              <Tooltips
                content="Add New Deductions"
                trigger={
                  <Button
                    onClick={AddDeductions}
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
          <Grid.Column >
            <DeductionsTable
              flag={flag}
              validate={validate}
              pieceDeductions={pieceDeductions}
              tableData={ListDeductions}
              DataDeductions={DataDeductions}
              setDataDeductions={setDataDeductions}
              //TypeBulk
              tempDeductions={tempDeductions}
              setTempDeductions={setTempDeductions}
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
                totalPage={ListDeductions?.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </>
  );
};

export default Deductions;
