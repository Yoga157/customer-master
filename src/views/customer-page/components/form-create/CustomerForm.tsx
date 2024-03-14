import React, { useEffect, Fragment, useState } from 'react';
import { SelectInput, TextInput, Button, CheckBox, RichTextEditor } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Accordion, Icon, Label } from 'semantic-ui-react';
import { selectIndustryOptions } from 'selectors/select-options';
import * as IndustryClassActions from 'stores/industry-class/IndustryClassActions';
import classes from './CustomerForm.module.scss';
import { combineValidators, isRequired, createValidator, composeValidators } from 'revalidate';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import CustomerModel from 'stores/customer/models/CustomerModel';
import * as CustomerAction from 'stores/customer/CustomerActions';
import CustomerFileModel from 'stores/customer/models/CustomerFileModel';
import CustomerPICModel from 'stores/customer/models/CustomerPICModel';
import { serialize } from 'object-to-formdata';
import CustomersModel from 'stores/customer/models/CustomersModel';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { selectCustomer } from 'selectors/customer/CustomerSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';

interface IProps {
  onCustomerChange: any;
}

const CustomerForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();

  const [toSales, setToSales] = useState(0);
  const [customerCard, setCustomerCard] = useState('');
  const [custCard, setCustCard] = useState(false);
  const [imageType, setImageType] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleCustomer, setTitleCustomer] = useState('PT');
  const [customerName, setCustomerName] = useState('');

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerAction.POST_FILE, CustomerAction.POST_CUSTOMER]));

  const onCustomerName = (event: any) => {
    dispatch(CustomerAction.requestCustomerExistingFunnel(event));
  };

  const ChangeComboToSales = (event: any) => {
    setToSales(event);
  };

  const CloseModal = () => {
    dispatch(ModalAction.CLOSE());
  };

  const onSubmitBusinessCard = (values: any) => {
    const newCustomer = new CustomerFileModel();
    newCustomer.customer = new CustomerModel(values);
    newCustomer.customerPIC = new CustomerPICModel(values);
    newCustomer.ImageFile = customerCard;

    const data = new FormData();

    newCustomer.customer.customerName = titleCustomer.length > 0 ? titleCustomer + ' ' + values.customerName : values.customerName;
    newCustomer.customer.customerGenID = 0;
    newCustomer.customerPIC.customerGenID = 0;
    newCustomer.customerPIC.customerPICID = 0;
    newCustomer.customer.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.salesID = currentUser.employeeID;
    newCustomer.customerPIC.createUserID = currentUser.employeeID;
    newCustomer.customer.customerIDC = null;

    setCustomerName(newCustomer.customer.customerName);

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

    dispatch(CustomerAction.postFile(data));
    //CloseModal();
  };

  const onSubmitCustomer = (values: any) => {
    const newCustomer = new CustomersModel();
    newCustomer.customer = new CustomerModel(values);
    newCustomer.customerPIC = new CustomerPICModel(values);
    newCustomer.customer.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.createUserID = currentUser.employeeID;
    newCustomer.customerPIC.salesID = currentUser.employeeID;
    newCustomer.customer.customerName = titleCustomer + ' ' + values.customerName;
    newCustomer.NPWP = null;
    newCustomer.customer.customerIDC = null;
    dispatch(CustomerAction.postCustomer(newCustomer));
    //CloseModal();
    //dispatch(ToastsAction.add("Success", ToastStatusEnum.Success));
    //console.log(values);
  };

  const onSubmitHandler = (values: any) => {
    if (custCard) {
      onSubmitBusinessCard(values);
    } else {
      onSubmitCustomer(values);
    }
  };

  useEffect(() => {
    dispatch(IndustryClassActions.requestIndustry());
  }, [dispatch]);

  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    'Invalid email address'
  );

  const validate = combineValidators({
    customerName: isRequired('Customer Name'),
    picEmailAddr: composeValidators(isValidEmail)(),
    picName: isRequired('PIC Name'),
  });

  const validateMandatory = combineValidators({
    customerName: isRequired('Customer Name'),
    picEmailAddr: composeValidators(isValidEmail, isRequired('Email'))(),
    picName: isRequired('PIC Name'),
    addr1: isRequired('Customer Address'),
    phoneNumber: isRequired('Phone Number'),
    industryClass: isRequired('Industry Class'),
    picJobTitle: isRequired('Job Title'),
    picMobilePhone: isRequired('PIC Phone Number'),
  });

  const handleClick = () => {
    const newIndex = activeIndex === -1 ? 0 : -1;
    setActiveIndex(newIndex);
  };

  const checkedClick = (e: any, checked: any) => {
    setCustCard(checked.checked === true ? true : false);
    setActiveIndex(checked.checked === true ? -1 : 0);
  };

  const fileChange = (e: any) => {
    setCustomerCard(e.target.files[0]);
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      setImageType(false);
    } else {
      setImageType(true);
    }
    //const data = new FormData()
    //data.append('Files', e.target.files[0]);

    //console.log(data.get('body'));

    //dispatch(CustomerAction.postFile(data))
  };

  const onTitle = (values: any) => {
    setTitleCustomer(values);
  };

  const industryClassStore = useSelector((state: IStore) => selectIndustryOptions(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const bRefreshPage: boolean = useSelector((state: IStore) => state.customer.refreshPage);
  const resultObj = useSelector((state: IStore) => state.customer.resultActions.resultObj);

  const viewExistingFunnel = useSelector((state: IStore) => state.customer.customerExistingFunnel);

  if (bRefreshPage) {
    //dispatch(CustomerAction.requestCustomerByName(customerName));
    if (resultObj !== null) {
      //console.log(resultObj);
      if (resultObj?.customerGenID) {
        props.onCustomerChange(
          resultObj.customerGenID,
          resultObj.customerName,
          resultObj.customerPICID,
          resultObj.picName
          // resultObj.customerPIC.picJobTitle,
          // resultObj.customerPIC.picEmailAddr,
          // resultObj.customerPIC.picMobilePhone
        );
      } else {
        props.onCustomerChange(
          resultObj.customer.customerGenID,
          resultObj.customer.customerName,
          resultObj.customerPIC.customerPICID,
          resultObj.customerPIC.picName,
          resultObj.customerPIC.picJobTitle,
          resultObj.customerPIC.picEmailAddr,
          resultObj.customerPIC.picMobilePhone
        );
      }
    }
    CloseModal();
  }

  return (
    <Fragment>
      <FinalForm
        validate={custCard ? validate : validateMandatory}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, pristine, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid className={classes.WarningNotifBg} centered columns={1}>
              <h3 className={classes.Label + '' + ' ui center aligned header mt-1r-767'}>Do you have a customer business card ?</h3>
              <Grid.Row className={classes.NoPadTop}>
                <Grid.Column className="HalfGrid767" width={3}>
                  <CheckBox label="Yes, I have" defaultChecked={custCard} onChange={checkedClick} />
                </Grid.Column>
                <Grid.Column className={classes.MarTop20} width={16}>
                  <input type="file" name="imageFile" onChange={fileChange} hidden={!custCard} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column className="FullGrid767 EllipsisText-1" width={3}>
                  <Field
                    name="titleCustomer"
                    component={TextInput}
                    placeholder="e.g. PT"
                    values={titleCustomer}
                    onChange={onTitle}
                    labelName="Title Customer"
                  />
                </Grid.Column>
                <Grid.Column className="FullGrid767" width={13}>
                  <Field name="customerName" component={TextInput} placeholder="Customer Name" labelName="Customer Name" onChange={onCustomerName} />
                  {viewExistingFunnel.existing > 0 && (
                    <Label basic color="red" pointing style={{ position: 'absolute', top: '60px' }}>
                      Customer Already Exists!
                    </Label>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Field name="picName" component={TextInput} placeholder="PIC Name" labelName="PIC Name" />
                </Grid.Column>
              </Grid.Row>
            </Grid>{' '}
            <br />
            <Accordion color="red" className="NoShadow" fluid styled>
              <Accordion.Title active={activeIndex === 0} onClick={handleClick}>
                <Icon name="dropdown" />
                Customer Info
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Field name="addr1" component={RichTextEditor} placeholder="Customer Address" labelName="Customer Address" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field name="phoneNumber" component={TextInput} placeholder="Phone Number" labelName="Phone Number" />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field
                        name="industryClass"
                        component={SelectInput}
                        options={industryClassStore}
                        placeholder="Industry Classification"
                        labelName="Industry Classification"
                        mandatory={custCard ? true : false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field name="website" component={TextInput} placeholder="Website" labelName="Website" />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field name="socialMedia" component={TextInput} placeholder="Social Media" labelName="Social Media" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className="FullGrid767">
                      <Field name="picMobilePhone" component={TextInput} placeholder="PIC Mobile Phone" labelName="PIC Mobile Phone" />
                    </Grid.Column>
                    <Grid.Column className="FullGrid767">
                      <Field name="picJobTitle" component={TextInput} placeholder="Job Title" labelName="Job Title" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Field name="picEmailAddr" component={TextInput} placeholder="Email" labelName="Email" />
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
              loading={isRequesting}
              disabled={
                invalid ||
                pristine ||
                (custCard && customerCard.length === 0) ||
                imageType === false ||
                viewExistingFunnel.existing > 0 ||
                isRequesting
              }
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

export default CustomerForm;
