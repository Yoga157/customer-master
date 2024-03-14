import React, { useEffect, useState } from "react";
import IStore from "models/IStore";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import { Pagination, Tooltips, Button, CheckBox } from "views/components/UI";
import { Grid, Header } from "semantic-ui-react";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as FunnelActions from "stores/funnel/FunnelActions";
import { format } from "date-fns";
import "./OtherAndBenefitStyle.scss";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import OtherAndBenefitTable from "./table/OtherAndBenefitTable";
import OtherAndBenefitForm from "./form/OtherAndBenefitForm/OtherAndBenefitForm";
import { Form as FinalForm, Field } from "react-final-form";
import {
  selectOtherBenefit,
  selectEmployeeInfo,
  selectWorkFlowHeader,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import IOtherBenefitTable from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTable";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import UpdateBenefit from "./form/UpdateBenefit";

interface IProps {
  contractID?: number;
  flag: string;
  pageSize?: number;
  activePage?: number;
  setActivePage?: any;
  DataOtherBenefit?: any;
  setDataOtherBenefit?: any;
  setFlagChecked?: any;
  FlagChecked?: string;
  //BulkUpdate
  DataEmployeeBulkUpdate?: any;
}

const OtherAndBenefit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    contractID,
    flag,
    pageSize,
    activePage,
    setActivePage,
    DataOtherBenefit,
    setDataOtherBenefit,
    FlagChecked,
    setFlagChecked,
    DataEmployeeBulkUpdate
  } = props;
  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );
  const ListOtherBenefit: IOtherBenefitTable = useSelector((state: IStore) =>
    selectOtherBenefit(state)
  );
  const EmployeeInfo = useSelector((state: IStore) =>
    selectEmployeeInfo(state)
  );

  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const WorkFlowHeader = useSelector((state: IStore) =>
  selectWorkFlowHeader(state)
);

  const [reload, setReload] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("TempContract", JSON.stringify([]));
    if (reload) {
      setReload(false);
    }
  }, [reload]);

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

   //BulkUpdate Show UI Temporary
   const [tempOther, setTempOther] = useState([])
  // console.log('tempOther',tempOther)
  const AddOtherBenefit = () => {
    if(props.flag === "BulkUpdate") {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <UpdateBenefit
            flag={flag}
            DataOtherBenefit={DataOtherBenefit}
            setDataOtherBenefit={setDataOtherBenefit}
            contractID={contractID}
            type={"Add"}
            DataEmployeeBulkUpdate={DataEmployeeBulkUpdate}
            tempOther={tempOther}
            setTempOther={setTempOther}
          />,
          ModalSizeEnum.Small
        )
      );
    } else {
      dispatch(
        ModalFirstLevelActions.OPEN(
          // <UpdateBenefit id={1} type={"Add"} />,
          <OtherAndBenefitForm
            setReload={setReload}
            flag={flag}
            DataOtherBenefit={DataOtherBenefit}
            setDataOtherBenefit={setDataOtherBenefit}
            id={contractID}
            type={"Add"}
           
          />,
          ModalSizeEnum.Small
        )
      );
    }
    
  };
  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleChecked = (e, checked) => {
    // const isSaveChange = JSON.parse(localStorage.getItem("OtherBenefit"))?.map(
    //   (item) => {
    //     if (checked.checked === true) {
    //       return { ...item, isSave: 1 };
    //     } else {
    //       return { ...item, isSave: 0 };
    //     }
    //   }
    // );
    // localStorage.setItem("OtherBenefit", JSON.stringify(isSaveChange));

    // if (checked.checked === true) {
    //   setFlagChecked("All");
    // } else {
    //   setFlagChecked("AllOff");
    // }
    setIsCheckAll(!isCheckAll);

    const isSaveChange = JSON.parse(localStorage.getItem("OtherBenefit"))?.map(
      (item) => {
        if (!isCheckAll) {
          setIsCheck((oldArray) => [...oldArray, item.benefitID]);
          return { ...item, isSave: 1 };
        } else {
          setIsCheck([]);
          return { ...item, isSave: 0 };
        }
      }
    );

    localStorage.setItem("OtherBenefit", JSON.stringify(isSaveChange));
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
            <Header.Content>Other Benefits</Header.Content>
          </Header>
        </Grid.Column>

        <Grid.Column width={10} textAlign="right">
          {flag === "Contract" ? (
            <div
              className="pt-1r pb-2 item-toggle"
              style={{ marginRight: "10px" }}
            >
              <span>OFF</span>
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
              <Checkbox handleClick={handleChecked} checked={isCheckAll} />
              <span>ON</span>
              {/* <Button content="SET" /> */}
            </div>
          ) : (
            <>
              <Tooltips
                content="Add Other and Benefit"
                trigger={
                  <Button
                    onClick={AddOtherBenefit}
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
            <OtherAndBenefitTable
              setDataOtherBenefit={setDataOtherBenefit}
              flag={flag}
              DataOtherBenefit={DataOtherBenefit}
              tableData={ListOtherBenefit}
              validate={validate}
              //BulkUpdate
              tempOther={tempOther}
              setTempOther={setTempOther}
                //InputDataFromlastContract
                isCheck={isCheck}
                setIsCheck={setIsCheck}
            />
          </Grid.Column>
        </Grid.Row>
        {flag === "NonContract" && (
          <Grid.Row>
            <Grid.Column>
              <Pagination
                activePage={activePage}
                onPageChange={(e, data) => handlePaginationChange(e, data)}
                totalPage={ListOtherBenefit?.totalRows}
                pageSize={pageSize}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </>
  );
};

export default OtherAndBenefit;
