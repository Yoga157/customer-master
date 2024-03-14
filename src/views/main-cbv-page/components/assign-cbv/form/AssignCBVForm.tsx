import React, { useEffect, Fragment, useState, useCallback } from 'react';
import moment from 'moment';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { NumberInput, Button, RichTextEditor, SearchInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid, Card, Divider } from 'semantic-ui-react';
import { selectUserResult } from 'selectors/user/UserSelector';
import { combineValidators, isRequired } from 'revalidate';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as ModalSecondLevelActions from '../../../../../stores/modal/second-level/ModalSecondLevelActions';
import * as CustomerActions from 'stores/customer/CustomerActions';
import * as EmployeeActions from 'stores/employee/EmployeeActions';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectCustomerSearchOptionsWithFlag } from 'selectors/select-options/CustomerSelector';
import { selectEmployeeSearch } from 'selectors/select-options/EmployeeSelector';
import { selectProjectNames } from 'selectors/main-cbv/CreditBillingServiceSelector';
import * as ToastsAction from 'stores/toasts/ToastsAction';
import ToastStatusEnum from 'constants/ToastStatusEnum';
interface IProps {
  setDataAssign: any;
  dataAssign: any;
  setTotalusedAmountH: any;
  type: string;
  CreditId?: number;
  //Add
  setTotalAmount?: any;
  TotalAmount?: number;
  //Edit
  totalRemaining?: any;
}

const AssignCBVForm: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { setDataAssign, dataAssign, setTotalusedAmountH, type, CreditId, setTotalAmount, TotalAmount, totalRemaining } = props;
  const [fileAttachment, setFileAttachment] = useState('');
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [customerName, setCustomerName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [voucherAmountD, setVoucherAmountD] = useState(0);

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  const [remaining, setRemaining] = useState(type === 'Edit' ? totalRemaining.voucherAmountH - totalRemaining.usedAmountH : 0);

  useEffect(() => {

  }, [TotalAmount, totalRemaining]);

  const onSubmitHandler = (values: any) => {
    const now = moment();
    let totalusedAmountH: number = 0;
    dataAssign.map((item: any) => {
      totalusedAmountH += item.voucherAmountD;
    });

    setTotalusedAmountH(totalusedAmountH);
    const newItems = values;
    newItems.creditDetailId = 0;
    newItems.creditId = type === 'Add' ? 0 : CreditId;
    newItems.salesId = employeeId;
    newItems.voucherAmountD = voucherAmountD;
    newItems.usedAmountD = type === 'Add' ? 0 : totalusedAmountH;
    newItems.remainingAmountD = type === 'Add' ? values.voucherAmountD - values.usedAmountD : remaining - values.voucherAmountD;
    newItems.notes = values.notes;
    newItems.customerName = values.customerName;
    newItems.projectName = projectName;
    newItems.createDate = moment(now).format('yyyy-MM-DD');
    newItems.createUserID = currentUser.employeeID;
    newItems.modifyDate = moment(now).format('yyyy-MM-DD');
    newItems.modifyUserID = currentUser.employeeID;
    //State Add Voucher
    newItems.createdBy = currentUser.fullName;

    console.log('newItems', newItems);

    if (type === 'Edit') {
      dispatch(CreditBillingActions.postAssignCBVBilling(newItems));
    }

    if (type === 'Add') {
      setDataAssign((oldData) => [...oldData, newItems]);
      dispatch(ToastsAction.add('Add Assign Success!', ToastStatusEnum.Success));
      setTotalAmount(TotalAmount - voucherAmountD);
    }

    onCloseHandler();
  };

  const onCloseHandler = () => {
    dispatch(ModalSecondLevelActions.CLOSE());
  };

  const validate = combineValidators({
    PIC: isRequired('PIC'),
    //customerName: isRequired('customerName'),
    // projectName: isRequired('projectName'),
    voucherAmountD: isRequired('Voucher Amount D'),
  });

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST,
      CreditBillingActions.REQUEST_PROJECT_NAME,
      EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL,
    ])
  );

  if (bRefreshPage) {
  }

  //Validasi
  const [errorProjectName, setErrorProjectName] = useState(false);
  const [errorEmployeeName, setErrorEmployeeName] = useState(false);
  const [errorCustomerName, setErrorCustomer] = useState(false);

  const [mandatory, setMandatory] = useState({
    sCustomerName: false,
    sEmployeeName: false,
    sProjectName: false,
    voucherAmountD: false,
  });

  const [validateAmount, setValidateAmount] = useState(false);
  const onvoucherAmountD = (event: any) => {
    setVoucherAmountD(event);
    if (type === 'Add') {
      if (TotalAmount >= event) {
        setValidateAmount(true);
      } else if (TotalAmount <= event) {
        setValidateAmount(false);
      }
    } else {
      if (totalRemaining.voucherAmountH - totalRemaining.usedAmountH >= event) {
        setValidateAmount(true);
      } else if (totalRemaining.voucherAmountH - totalRemaining.usedAmountH <= event) {
        setValidateAmount(false);
      }
    }
  };

  const isLoadingCustomer: boolean = useSelector((state: IStore) => selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_BY_NAME]));
  const isLoadingEmployee: boolean = useSelector((state: IStore) => selectRequesting(state, [EmployeeActions.REQUEST_EMPLOYEE_SEARCH_ALL]));
  const isLoadingProjectName: boolean = useSelector((state: IStore) => selectRequesting(state, [CreditBillingActions.REQUEST_PROJECT_NAME]));
  const customerStoreSearch = useSelector((state: IStore) => selectCustomerSearchOptionsWithFlag(state));
  const EmployeStoreSearch = useSelector((state: IStore) => selectEmployeeSearch(state));
  const ProjectNameStoreSearch = useSelector((state: IStore) => selectProjectNames(state));

  const handleSearchChangePIC = useCallback(
    (data) => {
      // if(type === "Edit" && data.length >= 2)
      // {
      //   dispatch(EmployeeActions.searchALL(data, ''));
      // }
      setEmployeeName(data);
      EmployeStoreSearch &&
        EmployeStoreSearch.map((item: any) => {
          if (item.title === employeeName) {
            setErrorEmployeeName(true);
          } else if (employeeName !== data) {
            setErrorEmployeeName(false);
          }
        });
    },
    [dispatch, EmployeStoreSearch]
  );
  const onResultSelectPIC = (data: any) => {
    setEmployeeName(data.result.title);
    setEmployeeId(data.result.employeeID);
    EmployeStoreSearch &&
      EmployeStoreSearch.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorEmployeeName(true);
        }
      });
  };

  const handleSearchChangeProjectName = useCallback(
    (data) => {
      // if(type === "Edit" && data.length >= 2)
      // {
      //   dispatch(CreditBillingActions.requestProjectName(data));
      // }
      setProjectName(data);
      ProjectNameStoreSearch &&
        ProjectNameStoreSearch.map((item: any) => {
          if (item.textData === projectName) {
            setErrorProjectName(true);
          } else if (projectName !== data) {
            setErrorProjectName(false);
          }
        });
    },
    [dispatch, ProjectNameStoreSearch]
  );

  const onResultSelectProjectName = (data: any) => {
    setProjectName(data.result.textData);
    ProjectNameStoreSearch &&
      ProjectNameStoreSearch.map((item: any) => {
        if (item.textData === data.result.textData) {
          setErrorProjectName(true);
        }
      });
  };

  const handleSearchChangeCust = useCallback(
    (data) => {
      // if(type === "Edit" && data.length >= 2)
      // {
      //   dispatch(CustomerActions.requestCustomerByNameBlackList(data));
      // }
      
      setCustomerName(data);
      customerStoreSearch &&
        customerStoreSearch.map((item: any) => {
          if (item.title === customerName) {
            setErrorCustomer(true);
          } else if (customerName !== data) {
            setErrorCustomer(false);
          }
        });
    },
    [dispatch, customerStoreSearch]
  );
    
  const onResultSelectCustomer = (data: any) => {
    setCustomerName(data.result.title);
    customerStoreSearch &&
      customerStoreSearch.map((item: any) => {
        if (item.title === data.result.title) {
          setErrorCustomer(true);
        }
      });
  };

  const resultRenderer = ({ image, price, title, valueData, textData, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === '1' ? 'rgba(255, 248, 54, 0.5)' : '',
        }}
      >
        <div className="price">{price ? price : valueData}</div>
        <div className="title"> {title ? title : textData}</div>
      </div>
    );
  };
  
  return (
    <Fragment>
      <Card.Header>Add Assign CBV</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                  <Field
                    name="PIC"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    loading={isLoadingEmployee}
                    labelName="PIC"
                    handleSearchChange={handleSearchChangePIC}
                    onResultSelect={onResultSelectPIC}
                    results={EmployeStoreSearch}
                    mandatory={mandatory.sEmployeeName}
                    values={employeeName}
                    resultRenderer={resultRenderer}
                    onKeyPress={(event) => {
                      if (event.charCode == 13) {
                        dispatch(EmployeeActions.searchALL(employeeName, ''));
                      }
                    }}
                  />
                    <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="BtmFormNote">Press enter to see the results</p>
                  </div>
                  
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="e.g.PT. Customer .."
                    loading={isLoadingCustomer}
                    labelName="Customer Name"
                    handleSearchChange={handleSearchChangeCust}
                    onResultSelect={onResultSelectCustomer}
                    results={customerStoreSearch}
                    //mandatory={mandatory.sCustomerName}
                    values={customerName}
                    resultRenderer={resultRenderer}
                    onKeyPress={(event) => {
                      if (event.charCode == 13) {
                        dispatch(CustomerActions.requestCustomerByNameBlackList(customerName));
                      }
                    }}
                  />
                    <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="BtmFormNote">Press enter to see the results</p>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Field
                    name="projectName"
                    component={SearchInput}
                    placeholder="e.g.ProjectName .."
                    loading={isLoadingProjectName}
                    labelName="Project Name"
                    handleSearchChange={handleSearchChangeProjectName}
                    onResultSelect={onResultSelectProjectName}
                    results={ProjectNameStoreSearch}
                    //mandatory={mandatory.sProjectName}
                    values={projectName}
                    resultRenderer={resultRenderer}
                    onKeyPress={(event) => {
                      if (event.charCode == 13) {
                        dispatch(CreditBillingActions.requestProjectName(projectName));
                      }
                    }}
                  />
                    <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p className="BtmFormNote">Press enter to see the results</p>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    name="voucherAmountD"
                    component={NumberInput}
                    placeholder="e.g.V0001.."
                    values={voucherAmountD}
                    mandatory={mandatory.voucherAmountD}
                    onChange={onvoucherAmountD}
                    thousandSeparator={true}
                    labelName="Assigned Amount"
                  />
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Field name="notes" component={RichTextEditor} placeholder="e.g.Notes.." labelName="Notes" />
                </Grid.Column>
              </Grid.Row>
            </Grid>{' '}
            <br />
            <Button type="submit" color="blue" floated="right" disabled={pristine || !errorEmployeeName || !validateAmount || !voucherAmountD}>
              Save
            </Button>
            <Button type="button" onClick={onCloseHandler} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default AssignCBVForm;
