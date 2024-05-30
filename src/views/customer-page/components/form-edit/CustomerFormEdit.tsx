import React, { useEffect, Fragment, useState } from "react";
import {
  SelectInput,
  TextInput,
  Button,
  RichTextEditor,
  LabelName,
  CheckBox,
} from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Accordion, Icon, Label } from "semantic-ui-react";
import { selectIndustryOptions } from "selectors/select-options";
import * as IndustryClassActions from "stores/industry-class/IndustryClassActions";
import classes from "./CustomerFormEdit.module.scss";
import {
  combineValidators,
  isRequired,
  createValidator,
  composeValidators,
} from "revalidate";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import CustomerModel from "stores/customer/models/CustomerModel";
import * as CustomerAction from "stores/customer/CustomerActions";
import * as FunnelActions from "stores/funnel/FunnelActions";
import CustomerFileModel from "stores/customer/models/CustomerFileModel";
import CustomerPICModel from "stores/customer/models/CustomerPICModel";
import { serialize } from "object-to-formdata";
import CustomersModel from "stores/customer/models/CustomersModel";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import {
  selectViewFunnelCustomer,
  selectViewFunnelCustomerDetail,
} from "selectors/funnel/FunnelSelector";
import environment from "environment";
import axios from "axios";
import fileDownload from "js-file-download";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

interface IProps {
  funnelGenID: number;
}

const CustomerFormEdit: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();

  const [toSales, setToSales] = useState(0);
  const [customerCard, setCustomerCard] = useState("");
  const [fileNPWP, setFileNPWP] = useState("");
  const [custCard, setCustCard] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { funnelGenID } = props;

  const CloseModal = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitBusinessCard = (values: any) => {
    const newCustomer = new CustomerFileModel();
    newCustomer.customer = new CustomerModel(values);
    newCustomer.customerPIC = new CustomerPICModel(values);
    newCustomer.ImageFile = customerCard;
    newCustomer.npwpFile = fileNPWP;

    const data = new FormData();

    newCustomer.customer.customerGenID = customerFunnelDataStore.customerGenID;
    newCustomer.customerPIC.customerGenID =
      customerFunnelDataStore.customerGenID;
    newCustomer.customerPIC.customerPICID =
      customerFunnelDataStore.customerPICID;
    newCustomer.customer.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.salesID = currentUser.employeeID;
    newCustomer.customerPIC.createUserID = currentUser.employeeID;

    const object = {
      /**
       * key-value mapping
       * values can be primitives or objects
       */
    };

    const options = {
      /**
       * include array indices in FormData keys
       * defaults to false
       */
      indices: false,

      /**
       * treat null values like undefined values and ignore them
       * defaults to false
       */
      nullsAsUndefineds: false,

      /**
       * convert true or false to 1 or 0 respectively
       * defaults to false
       */
      booleansAsIntegers: false,

      /**
       * store arrays even if they're empty
       * defaults to false
       */
      allowEmptyArrays: false,
    };

    const Customer = serialize(
      newCustomer,
      options, // optional
      data // optional
    );
    //dispatch(CustomerAction.postFile(data))
    //CloseModal();
  };

  const onSubmitCustomer = (values: any) => {
    const newCustomer = new CustomersModel();
    newCustomer.customer = new CustomerModel(values);
    newCustomer.customerPIC = new CustomerPICModel(values);
    newCustomer.customer.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.salesID = currentUser.employeeID;
    newCustomer.customer.customerGenID = customerFunnelDataStore.customerGenID;
    newCustomer.customerPIC.customerGenID =
      customerFunnelDataStore.customerGenID;
    newCustomer.customerPIC.customerPICID =
      customerFunnelDataStore.customerPICID;
    newCustomer.NPWP = fileNPWP;

    const data = new FormData();

    const object = {
      /**
       * key-value mapping
       * values can be primitives or objects
       */
    };

    const options = {
      /**
       * include array indices in FormData keys
       * defaults to false
       */
      indices: false,

      /**
       * treat null values like undefined values and ignore them
       * defaults to false
       */
      nullsAsUndefineds: false,

      /**
       * convert true or false to 1 or 0 respectively
       * defaults to false
       */
      booleansAsIntegers: false,

      /**
       * store arrays even if they're empty
       * defaults to false
       */
      allowEmptyArrays: false,
    };

    const Customer = serialize(
      newCustomer,
      options, // optional
      data // optional
    );

    dispatch(CustomerAction.putCustomer(data));
  };

  const onSubmitHandler = (values: any) => {
    if (custCard) {
      onSubmitBusinessCard(values);
    } else {
      onSubmitCustomer(values);
    }
  };

  useEffect(() => {
    dispatch(
      CustomerAction.requestCustomerExisting(viewFunnelCustomer.customerName)
    );
    dispatch(FunnelActions.requestViewFunnelCustomerDetailById(funnelGenID));
    dispatch(IndustryClassActions.requestIndustry());
    if (viewFunnelCustomer.customerCardID.length > 0) {
      setCustCard(true);
      setActiveIndex(-1);
    }
  }, [dispatch]);

  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    "Invalid email address"
  );

  const validateMandatory = combineValidators({
    picEmailAddr: composeValidators(isValidEmail, isRequired("Email"))(),
    addr1: isRequired("Customer Address"),
    phoneNumber: isRequired("Phone Number"),
    industryClass: isRequired("Industry Class"),
    picJobTitle: isRequired("Job Title"),
    picMobilePhone: isRequired("PIC Phone Number"),
  });
  const validateExisting = combineValidators({
    customerName: isRequired("Customer Name"),
    picName: isRequired("PIC Name"),
  });

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const checkedClick = (e: any, checked: any) => {
    setCustCard(checked.checked === true ? true : false);
    setActiveIndex(checked.checked === true ? -1 : 0);
  };

  const fileChange = (e: any) => {
    setCustomerCard(e.target.files[0]);
  };

  const fileNPWPChange = (e: any) => {
    setFileNPWP(e.target.files[0]);
  };

  const industryClassStore = useSelector((state: IStore) =>
    selectIndustryOptions(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const bRefreshPage: boolean = useSelector(
    (state: IStore) => state.customer.refreshPage
  );
  const customerFunnelDataStore = useSelector((state: IStore) =>
    selectViewFunnelCustomerDetail(state)
  );
  const viewFunnelCustomer = useSelector((state: IStore) =>
    selectViewFunnelCustomer(state)
  );
  const viewExisting = useSelector(
    (state: IStore) => state.customer.customerExisting
  );

  if (bRefreshPage) {
    dispatch(CustomerAction.requestCustomerById(funnelGenID));
    CloseModal();
  }

  const onDownloadFile = () => {
    const controllerName = `FileFunnel/download-file-customer/${customerFunnelDataStore.customerCardID}`;
    const endpoint: string = environment.api.funnel.replace(
      ":controller",
      controllerName
    );
    handleDownload(endpoint, customerFunnelDataStore.fileDownload);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL])
  );

  return (
    <Fragment>
      <FinalForm
        validate={
          viewExisting.existing > 0 ? validateExisting : validateMandatory
        }
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={customerFunnelDataStore}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid className={classes.WarningNotifBg} centered columns={1}>
              <h3
                className={
                  classes.Label + "" + " ui center aligned header mt-2r-767 "
                }
              >
                Do you have a customer business card ?
              </h3>
              <Grid.Row className={classes.NoPadTop}>
                <Grid.Column className="HalfGrid767" width={3}>
                  <CheckBox
                    label="Yes, I have"
                    onChange={checkedClick}
                    defaultChecked={custCard}
                    checked={custCard}
                    disabled={currentUser.role != "Sales" ? true : false}
                  />
                </Grid.Column>
                <Grid.Column className={classes.MarTop20} width={16}>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={fileChange}
                    hidden={!custCard}
                  />
                  {custCard &&
                    customerFunnelDataStore.customerCardID.length > 0 && (
                      <Label
                        as="a"
                        color="blue"
                        pointing
                        onClick={onDownloadFile}
                      >
                        <Icon name="download" />
                        Business Card
                      </Label>
                    )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="customerName"
                    component={LabelName}
                    placeholder="Customer Name"
                    labelName="Customer Name"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Field
                    name="picName"
                    component={LabelName}
                    placeholder="PIC Name"
                    labelName="PIC Name"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>{" "}
            <br />
            <Accordion color="red" className="NoShadow" fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                onClick={handleClick}
                index={0}
              >
                <Icon name="dropdown" />
                Customer Info
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Field
                        name="addr1"
                        component={RichTextEditor}
                        placeholder="Customer Address"
                        labelName="Customer Address"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="phoneNumber"
                        component={TextInput}
                        placeholder="Phone Number"
                        labelName="Phone Number"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="industryClass"
                        component={SelectInput}
                        options={industryClassStore}
                        placeholder="Industry Classification"
                        labelName="Industry Classification"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="website"
                        component={TextInput}
                        placeholder="Website"
                        labelName="Website"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="socialMedia"
                        component={TextInput}
                        placeholder="Social Media"
                        labelName="Social Media"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
            </Accordion>
            <Accordion color="blue" className="NoShadow" fluid styled>
              <Accordion.Title
                active={activeIndex === 1}
                onClick={handleClick}
                index={1}
              >
                <Icon name="dropdown" />
                NPWP Info
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column className={classes.MarTop20} width={16}>
                      <input
                        type="file"
                        name="npwp"
                        onChange={fileNPWPChange}
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns="equal">
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="npwpNumber"
                        component={TextInput}
                        placeholder="NPWP Number"
                        labelName="NPWP Number"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="npwpName"
                        component={TextInput}
                        placeholder="NPWP Name"
                        labelName="NPWP Name"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="npwpAddress"
                        component={RichTextEditor}
                        placeholder="Address"
                        labelName="Address"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
            </Accordion>
            <Accordion color="green" className="NoShadow" fluid styled>
              <Accordion.Title
                active={activeIndex === 2}
                onClick={handleClick}
                index={2}
              >
                <Icon name="dropdown" />
                PIC Info
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="picMobilePhone"
                        component={TextInput}
                        placeholder="PIC Mobile Phone"
                        labelName="PIC Mobile Phone"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="picJobTitle"
                        component={TextInput}
                        placeholder="Job Title"
                        labelName="Job Title"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="picEmailAddr"
                        component={TextInput}
                        placeholder="Email"
                        labelName="Email"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
            </Accordion>
            <Accordion color="green" className="NoShadow" fluid styled>
              <Accordion.Title
                active={activeIndex === 3}
                onClick={handleClick}
                index={3}
              >
                <Icon name="dropdown" />
                Additional Contact Info
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="financeCPName"
                        component={TextInput}
                        placeholder="e.g.Bunga.."
                        labelName="Finance Contact Person"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="financeCPPhone"
                        component={TextInput}
                        placeholder="e.g.0865182..."
                        labelName="Mobile Phone"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="financeCPEmail"
                        component={TextInput}
                        placeholder="e.g. bunga@company.co.id.."
                        labelName="Email"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="financeDirName"
                        component={TextInput}
                        placeholder="e.g.Bambang.."
                        labelName="Name of Finance Director"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="financeDirPhone"
                        component={TextInput}
                        placeholder="e.g.0862382..."
                        labelName="Mobile Phone"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="financeDirEmail"
                        component={TextInput}
                        placeholder="e.g.Bambang@company.co.id.."
                        labelName="Email"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field
                        name="executiveDirName"
                        component={TextInput}
                        placeholder="e.g.Jhon.."
                        labelName="Name of Executive Director"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="executiveDirPhone"
                        component={TextInput}
                        placeholder="e.g.0812382..."
                        labelName="Mobile Phone"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="executiveDirEmail"
                        component={TextInput}
                        placeholder="e.g.Jhon@company.co.id.."
                        labelName="Email"
                        disabled={currentUser.role != "Sales" ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Content>
            </Accordion>
            <br />
            <Button
              className="MarBot20"
              color="blue"
              floated="right"
              disabled={pristine || (custCard && customerCard.length === 0)}
            >
              Submit
            </Button>
            <Button onClick={CloseModal} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default CustomerFormEdit;
