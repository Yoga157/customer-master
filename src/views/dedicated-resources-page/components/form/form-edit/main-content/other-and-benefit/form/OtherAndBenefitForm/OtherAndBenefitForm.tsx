import React, { useState, Fragment, useEffect } from "react";
import { Form, Grid, Divider, Card } from "semantic-ui-react";
import { Button } from "views/components/UI";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { combineValidators, isRequired } from "revalidate";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import OtherAndBenefitFormTable from "./Table/OtherAndBenefitFormTable";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import TemplateProject from "../../template-project/TemplateProject";
import SaveOtherBenefitModel from "stores/dedicated-resources/models/DedicatedResourcesViewEdit/OtherBenefit/SaveOtherBenefitModel";
import * as DedicatedResourcesActions from "stores/dedicated-resources/DedicatedResourcesActions";
import { selectOtherBenefit, selectOtherBenefitLastContract } from "selectors/dedicated-resources/DedicatedResourcesServiceSelector";
import ToastStatusEnum from 'constants/ToastStatusEnum';
import * as ToastsAction from "stores/toasts/ToastsAction";
import IOtherBenefitTable from "selectors/dedicated-resources/models/OtherBenefit/IOtherBenefitTable";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";

interface IProps {
  id: number;
  type: string;
  flag: string;
  //BulkUpdate
  setReload: any;
  setDataOtherBenefit: any;
  DataOtherBenefit: any;
}

const validate = combineValidators({
  // voucherAmountH: isRequired('Voucher Amount')
});

const OtherAndBenefitForm: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };

  const [tempContract, setTempContract] = useState([]);
  const [reloadTemp, setReloadTemp] = useState(false);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      DedicatedResourcesActions.REQUEST_GET_LAST_CONTRACT,
    ])
  );
  const result: any = useSelector(
    (state: IStore) => state.dedicatedresources.resultActions
  );
  const ListOtherLastContract = useSelector((state: IStore) =>
    selectOtherBenefitLastContract(state)
  );
  const ListOtherBenefit: IOtherBenefitTable = useSelector((state: IStore) =>
    selectOtherBenefit(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
  selectUserResult(state)
);
  const handleSubmit = (values?: any) => {
    // const newValues = new OtherBenefitModel({});
    const newValues = new SaveOtherBenefitModel({});
    newValues.totalRows = 0;
    newValues.column = "";
    newValues.sorting = "";
    newValues.rows = JSON.parse(localStorage.getItem("TempContract"));

    if (props.flag !== "BulkUpdate") {
      // localStorage.removeItem("TempContract");
      props.setReload(true);
    }
    if (props.flag === "BulkUpdate") {
      var MatchConcat = JSON.parse(localStorage.getItem("TempContract")).concat(
        props.DataOtherBenefit
      );
      props.setDataOtherBenefit(MatchConcat);
      // localStorage.removeItem("TempContract");
    } else {
     
      var condition = false
      const CheckingDesc = JSON.parse(localStorage.getItem("TempContract"))?.map((itemTemp) => {
        var ListOther = ListOtherBenefit.rows?.map((itemRows) => {
        
          if(itemTemp.text2 === "multiple")
          {
            if(itemTemp.benefitDescStr === itemRows.benefitDescStr)
            {
              condition = true
            }
          }

          if(itemTemp.text2 === "single")
          {
            if(itemTemp.benefitTypeStr === itemRows.benefitTypeStr)
            {
              condition = true
            }
          }
        })
      })
      if(condition)
      {
          dispatch(ToastsAction.add(`OtherBenefit Already Available`, ToastStatusEnum.Warning));
      }

      if(!condition)
      {
      dispatch(DedicatedResourcesActions.requestpostOtherBenefit(newValues));
      localStorage.removeItem("LastContract");
      onClose();
      }
    }
    
  };

  const [mandatory, setMandatory] = useState({
    svoucherAmountH: false,
    screditType: false,
  });

  const TemplateProjectPopUp = () => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <TemplateProject
          setReloadTemp={setReloadTemp}
          contractID={
            props.flag === "BulkUpdate"
              ? JSON.parse(localStorage.getItem("EmployeeContractID"))
              : props.id
          }
        />,
        ModalSizeEnum.Small
      )
    );
  };

  useEffect(() => {
    dispatch(
      DedicatedResourcesActions.requestOtherLastContract(
        props.flag === "BulkUpdate"
          ? JSON.parse(localStorage.getItem("EmployeeContractID"))
          : props.id
      )
    );

    if (reloadTemp) {
      setReloadTemp(false);
    }
  }, [reloadTemp]);

  useEffect(() => {
    if (ListOtherLastContract.rows?.length > 0) {
      if (
        ListOtherLastContract.rows?.length !==
        JSON.parse(localStorage.getItem("LastContract"))?.length
      ) {
        const newState = ListOtherLastContract.rows?.map((item, index) => {
          return { ...item, idState: index + 1, userLoginID: currentUser.employeeID };
        });
        // console.log('newState',newState)
        localStorage.setItem("LastContract", JSON.stringify(newState));
        setReloadTemp(true);
      }
    }
  }, [
    ListOtherLastContract && ListOtherLastContract?.rows?.length > 0,
    JSON.parse(localStorage.getItem("LastContract")),
  ]);
  // console.log('ListOtherLastContract',ListOtherLastContract)
  const CopyLastContract = () => {
    var a = [];
    a = JSON.parse(localStorage.getItem("TempContract"));
    JSON.parse(localStorage.getItem("LastContract")).map((item) => {
      if (item.isSave === 1) {
        // console.log('item',item)
        a.push(item);
        localStorage.setItem("TempContract", JSON.stringify(a));
        if (reloadTemp) {
          setReloadTemp(false);
        } else {
          setReloadTemp(true);
        }
      }
    });
  };

  return (
    <Fragment>
      <Card.Header>{props.type} Other & Benefit Data</Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        {/* <FinalForm
                    // validate={validate}
                    onSubmit={(values: any) => handleSubmit(values)}
                    // initialValues={softwareMains}
                    render={({ handleSubmit, invalid, pristine }) => ( */}
        {/* // loading={isRequesting} */}
        {/* onSubmit={handleSubmit} */}
        <Form>
          <Grid>
            {/* <Grid.Row>
              <Grid.Column className="FullGrid767">
                <OtherAndBenefitFormTable
                  listData={JSON.parse(localStorage.getItem("LastContract"))}
                  title="Benefit from Last Contract"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button
                  type="button"
                  icon="copy outline"
                  color="yellow"
                  floated="right"
                  onClick={CopyLastContract}
                  content="Copy Benefit From Last Contract"
                />
                <Button
                  type="button"
                  icon="copy outline"
                  color="green"
                  floated="right"
                  onClick={TemplateProjectPopUp}
                  content="View Benefit From Template Project"
                />
              </Grid.Column>
            </Grid.Row> */}

            <Grid.Row>
              <Grid.Column className="FullGrid767">
                <OtherAndBenefitFormTable
                  setReloadTemp={setReloadTemp}
                  contractID={props.id}
                  listData={JSON.parse(localStorage.getItem("TempContract"))}
                  setTempContract={setTempContract}
                  title="Benefit from New Contract"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                {/* || !errorCustomerName */}
                <Button
                  type="button"
                  floated="right"
                  content="Cancel"
                  onClick={onClose}
                />
                {/* disabled={pristine || invalid || !localStorage.getItem("TempContract") }  */}
                <Button
                  color="blue"
                  floated="right"
                  content="Submit"
                  disabled={
                    localStorage.getItem("TempContract") &&
                    localStorage.getItem("TempContract").length === 0
                  }
                  onClick={handleSubmit}
                />
                {/*  */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {/* )}
                /> */}
      </LoadingIndicator>
    </Fragment>
  );
};

export default OtherAndBenefitForm;
