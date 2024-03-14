import React, { useEffect, useState, Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import { Button, SelectInput } from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { combineValidators, isRequired } from "revalidate";
import * as ModalAction from "stores/modal/second-level/ModalSecondLevelActions";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import {
  selectDropDownOtherBenefitType,
  selectDropDownOtherBenefitDesc,
  selectOtherBenefit,
} from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import * as ModalActionEdit from "stores/modal/first-level/ModalFirstLevelActions";
import OtherBenefitModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/OtherBenefitModel";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as ToastsAction from "stores/toasts/ToastsAction";
import IOtherBenefitTable from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTable";

interface IProps {
  contractID: number;
  type: string;
  setTempContract?: any;
  benefitID?: number;
  tempContract?: any;
  // Dummy Data From State
  DataState?: any;
  //Tempt as long as getid doesn't exist yet
  rowData?: any;
  //Trigger localStorage
  setReloadTemp?: any;
  //BulkUpdate
  flag?: string;
  setDataOtherBenefit?: any;
  DataOtherBenefit?: any;
  DataEmployeeBulkUpdate?: any;
  tempOther?: any;
  setTempOther?: any;
}

const validate = combineValidators({
  benefitType: isRequired("Benefit Type"),
  benefitDesc: isRequired("Benefit Desc"),
});

const UpdateBenefit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onCloseEdit = () => {
    dispatch(ModalActionEdit.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_TYPE,
      DedicatedResourcesActions.REQUEST_DROPDOWN_OTHER_BENEFIT_DESC,
    ])
  );

  const isLoadingCustomer: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const StoreOtherBenefitType = useSelector((state: IStore) =>
    selectDropDownOtherBenefitType(state)
  );
  const StoreOtherBenefitDesc = useSelector((state: IStore) =>
    selectDropDownOtherBenefitDesc(state)
  );
  const ListOtherBenefit: IOtherBenefitTable = useSelector((state: IStore) =>
  selectOtherBenefit(state)
);

  const [OtherBenefitType, setOtherBenefitType] = useState("");
  const [OtherBenefitDesc, setOtherBenefitDesc] = useState("");
  const [type, setType] = useState("");
  const [OtherBenefitTypeStr, setOtherBenefitTypeStr] = useState("");
  const [OtherBenefitDescStr, setOtherBenefitDescStr] = useState("");

  const [CheckType, setCheckType] = useState(true);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("TempContract"))) {
      window.localStorage.setItem("TempContract", JSON.stringify([]));
    }

    // if(props.flag === "BulkUpdate")
    // {
    //   dispatch(
    //     DedicatedResourcesActions.requestOtherBenefit(
    //       props.DataEmployeeBulkUpdate[0].contractID,
    //       1,
    //       20
    //     )
    //   );
    // }
  }, []);

  const handleSubmit = (values?: any) => {
    if (props.flag === "BulkUpdate" && props.type === "Add") {

      var condition = false;
      const CheckingDesc = ListOtherBenefit.rows?.map((item) => {
        if (item.benefitDescStr === OtherBenefitDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `OtherBenefit Desc ${OtherBenefitDescStr} Already Available`,
            ToastStatusEnum.Warning
          )
        );
      } else {
        const newState = props.DataEmployeeBulkUpdate.map((obj, index) => {
          props.setDataOtherBenefit((oldArray) => [
            ...oldArray,
            {
              idState: Math.floor(Math.random() * 999999999),
              benefitID: 0,
              contractID: obj.contractID,
              benefitType: OtherBenefitType,
              benefitTypeStr: OtherBenefitTypeStr,
              benefitDescStr: OtherBenefitDescStr,
              benefitDesc: OtherBenefitDesc,
              flagLastContract: true,
              flagNewContract: true,
              userLoginID: obj.employeeID,
              isSave: 1,
            },
          ]);
        });
  
        //Temp Show UI Table BulkUpdate
        props.setTempOther((oldArray) => [
          ...oldArray,
          {
            idState: Math.floor(Math.random() * 999999999),
            benefitID: 0,
            contractID: props.DataEmployeeBulkUpdate[0].contractID,
            benefitType: OtherBenefitType,
            benefitTypeStr: OtherBenefitTypeStr,
            benefitDescStr: OtherBenefitDescStr,
            benefitDesc: OtherBenefitDesc,
            flagLastContract: true,
            flagNewContract: true,
            userLoginID: props.DataEmployeeBulkUpdate[0].employeeID,
            isSave: 1,
          },
        ]);
        onCloseEdit();
      }

      
    } else if (props.flag === "BulkUpdate" && props.type === "Edit") {
      const newState = props.DataOtherBenefit?.map((obj) => {
        if (obj.benefitDesc === props.rowData.benefitDesc) {
          return {
            ...obj,
            benefitType: OtherBenefitType,
            benefitDesc: OtherBenefitDesc,
            benefitTypeStr: OtherBenefitTypeStr,
            benefitDescStr: OtherBenefitDescStr,
          };
        }

        return obj;
      });

      props.setDataOtherBenefit(newState);

      const newStateUI = props.tempOther?.map((obj) => {
        if (obj.benefitDesc === props.rowData.benefitDesc) {
          //Temp Show UI Table BulkUpdate
          return {
            ...obj,
            benefitType: OtherBenefitType,
            benefitTypeStr: OtherBenefitTypeStr,
            benefitDescStr: OtherBenefitDescStr,
            benefitDesc: OtherBenefitDesc,
          }
        }

        return obj
      });
      props.setTempOther(newStateUI)
      onCloseEdit();
    } else if (props.type === "Add") {
      const newValues = {
        idState: JSON.parse(localStorage.getItem("TempContract"))
          ? JSON.parse(localStorage.getItem("TempContract")).length + 1
          : 1,
        benefitID: 0,
        contractID: props.contractID,
        benefitType: "",
        benefitTypeStr: "",
        benefitDesc: "",
        benefitDescStr: "",
        flagLastContract: true,
        flagNewContract: true,
        userLoginID: currentUser.employeeID,
        isSave: 1,
        // flag type
        text2: "",
      };

      newValues.benefitType = OtherBenefitType;
      newValues.benefitTypeStr = OtherBenefitTypeStr;

      newValues.benefitDesc = OtherBenefitDesc;
      newValues.benefitDescStr = OtherBenefitDescStr;

      newValues.text2 = type;

      var condition = false;
      const CheckingDesc = JSON.parse(
        localStorage.getItem("TempContract")
      )?.map((item) => {
        if (item.benefitTypeStr === OtherBenefitTypeStr && type === "single") {
          condition = true;
        }
        if (item.benefitDescStr === OtherBenefitDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `OtherBenefit Already Available`,
            ToastStatusEnum.Warning
          )
        );
      }

      if (!condition) {
        const newItems = [
          ...JSON.parse(localStorage.getItem("TempContract")),
          newValues,
        ];
        window.localStorage.setItem("TempContract", JSON.stringify(newItems));
        onClose();
        props.setReloadTemp(true);
      }
    } else if (props.type === "Edit") {
      const newValues = new OtherBenefitModel({});

      newValues.benefitID = props.benefitID;
      newValues.contractID = props.contractID;
      newValues.benefitType = OtherBenefitType;
      newValues.benefitDesc = OtherBenefitDesc;
      newValues.benefitDescStr = OtherBenefitDescStr;
      newValues.benefitTypeStr = OtherBenefitTypeStr;
      newValues.userLoginID = currentUser.employeeID;
      newValues.isSave = 1;

      dispatch(DedicatedResourcesActions.requestPutOtherBenefit(newValues));
      onCloseEdit();
    } else if (props.type === "EditState") {
      var condition = false;
      const CheckingDesc = JSON.parse(
        localStorage.getItem("TempContract")
      )?.map((item) => {
        if (item.benefitTypeStr === OtherBenefitTypeStr && type === "single") {
          condition = true;
        }
        if (item.benefitDescStr === OtherBenefitDescStr) {
          condition = true;
        }
      });

      if (condition) {
        dispatch(
          ToastsAction.add(
            `OtherBenefit Already Available`,
            ToastStatusEnum.Warning
          )
        );
      }

      if (!condition) {
        const newState = JSON.parse(localStorage.getItem("TempContract"))?.map(
          (obj) => {
            if (obj.idState === props.DataState.idState) {
              return {
                ...obj,
                benefitType: OtherBenefitType,
                benefitDesc: OtherBenefitDesc,
                type: type,
              };
            }

            return obj;
          }
        );
        props.setTempContract(newState);
        localStorage.setItem("TempContract", JSON.stringify(newState));
        onClose();
      }
    }
  };

  const [mandatory, setMandatory] = useState({
    benefitType: false,
    benefitDesc: false,
  });

  const onChangeOtherBenefitType = (event: any) => {
    const docTypes = StoreOtherBenefitType?.filter((item: any) => {
      return item.value === event;
    });

    const CheckingType = JSON.parse(
      localStorage.getItem("TempContract")
    )?.filter((item: any) => {
      return item.benefitType === event;
    });

    if (CheckingType?.length > 0) {
      setCheckType(false);
    } else {
      setCheckType(true);
    }

    setOtherBenefitType(docTypes[0].value);
    setOtherBenefitTypeStr(docTypes[0].text);
    setType(docTypes[0].text2);
    dispatch(
      DedicatedResourcesActions.requestDropdownOtherBenefitDesc(
        docTypes[0].value
      )
    );
  };

  const onChangeOtherBenefitDesc = (event: any) => {
    const docTypes = StoreOtherBenefitDesc.filter((item: any) => {
      return item.value === event;
    });
    setOtherBenefitDesc(docTypes[0].value);
    setOtherBenefitDescStr(docTypes[0].text);
  };

  useEffect(() => {
    dispatch(DedicatedResourcesActions.requestDropdownOtherBenefitType());
    // props.setTempContract([])

    if (
      props.type === "Edit" ||
      (props.type === "EditState" && props.benefitID > 0)
    ) {
      setOtherBenefitType(props.rowData.benefitType);
      setOtherBenefitDesc(props.rowData.benefitDesc);

      dispatch(
        DedicatedResourcesActions.requestDropdownOtherBenefitDesc(
          props.rowData.benefitType
        )
      );
    }
  }, [props.benefitID]);
  // console.log('props.rowData',props.rowData)
  return (
    <Fragment>
      <Card.Header>{props.type} Other & Benefit Data</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => handleSubmit(values)}
          initialValues={
            props.type === "Edit" ? props.rowData : props.DataState
          }
          render={({ handleSubmit, invalid, pristine }) => (
            // loading={isRequesting}
            <Form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="benefitType"
                      component={SelectInput}
                      options={StoreOtherBenefitType}
                      placeholder="e.g.Gaji .."
                      labelName="Type"
                      onChanged={onChangeOtherBenefitType}
                      mandatory={mandatory.benefitType}
                    />
                  </Grid.Column>
                  <Grid.Column className="FullGrid767">
                    <Field
                      name="benefitDesc"
                      component={SelectInput}
                      options={StoreOtherBenefitDesc}
                      placeholder="e.g.Gaji Pokok .."
                      labelName="Description"
                      onChanged={onChangeOtherBenefitDesc}
                      mandatory={mandatory.benefitDesc}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    {/* || !errorCustomerName */}
                    {/* || !OtherBenefitDesc || !CheckType*/}
                    <Button
                      color="blue"
                      floated="right"
                      content="Submit"
                      disabled={
                        pristine ||
                        invalid ||
                        !OtherBenefitType ||
                        !OtherBenefitDesc
                      }
                    />
                    <Button
                      type="button"
                      floated="right"
                      content="Cancel"
                      onClick={props.type === "Add" ? onClose : onCloseEdit}
                    />
                    
                    {/*  */}
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

export default UpdateBenefit;
