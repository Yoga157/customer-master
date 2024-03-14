import React, { Fragment, useEffect, useState } from 'react';
import { Button, DateInput, RichTextEditor, TextInput, NumberInput, SelectInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Card, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import BankGaransiApproveModel from 'stores/bank-garansi/models/BankGaransiApproveModel';
import ExtendMapper from 'stores/bank-garansi/models/ExtendMapper';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import {
  selectBGEditAdmin,
  selectBGEditRequester,
  selectCompanyApplicantOptions,
  selectExtendAttachment,
} from 'selectors/bank-garansi/BankGaransiSelector';
import { combineValidators, createValidator, isRequired } from 'revalidate';
import { serialize } from 'object-to-formdata';
import axios from 'axios';
import environment from 'environment';
import fileDownload from 'js-file-download';
import { useHistory } from 'react-router-dom';
import RouteEnum from 'constants/RouteEnum';
import FilterSearchModel from 'stores/bank-garansi/models/FilterSearchModel';

interface IProps {
  type: string;
  bankGuaranteeNo: string;
  bondIssuer: string;
  bankGuaranteeGenID: number;
  process: string;
  stepName: string;
  bondIssuerType: string;
}

const ConfirmApprove: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [textConfirm, setTextConfirm] = useState('');
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const [vReturnDate, setVReturnDate] = useState(new Date());
  const [textDate, setTextDate] = useState('');
  const [fileAttachment, setFileAttachment] = useState('');
  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);
  const companyApplicantStore = useSelector((state: IStore) => selectCompanyApplicantOptions(state));
  const filter: FilterSearchModel = useSelector((state: IStore) => state.bankGaransi.listSearch.filter);
  const search: any = useSelector((state: IStore) => state.bankGaransi.listSearch.search);
  const direction: string = useSelector((state: IStore) => state.bankGaransi.listSearch.sorting);
  const columnsorting: string = useSelector((state: IStore) => state.bankGaransi.listSearch.column);
  const extendAttach = useSelector((state: IStore) => selectExtendAttachment(state));
  const historys = useHistory();

  useEffect(() => {
    dispatch(BankGaransiAction.requestBGViewEditAdmin(props.bankGuaranteeGenID));
    dispatch(BankGaransiAction.requestBGViewEditRequester(props.bankGuaranteeGenID));
    dispatch(BankGaransiAction.requestAttachmentExtend(props.bankGuaranteeNo));
    dispatch(BankGaransiAction.requestCompanyApplicant());
    if (props.type === 'Extend') {
      setTextDate('Extend Date');
    } else if (props.type === 'Return') {
      setTextDate('Return Date');
    }
  }, [props.bankGuaranteeGenID]);

  const bankGaransi = useSelector((state: IStore) => selectBGEditAdmin(state));
  const bankGaransiRequest = useSelector((state: IStore) => selectBGEditRequester(state));

  const validasi = createValidator(
    (message) => (value) => {
      if (value != '') {
        return message;
      }
    },
    'blank'
  );

  const validateApprove = combineValidators({
    increamentNo: isRequired('Increment No'),
    claimPeriod: isRequired('Claim Period'),
    publishDate: isRequired('Publish Date'),
    submitDate: isRequired('Submit Date'),
    effectiveDate: isRequired('Effective Date'),
    expiredDate: isRequired('Expired Date'),
  });

  const validateInsurance = combineValidators({
    suratPerjanjianNo: isRequired('Surat Perjanian No'),
    submitDate: isRequired('Submit Date'),
    effectiveDate: isRequired('Effective Date'),
    expiredDate: isRequired('Expired Date'),
  });

  const validateReturn = combineValidators({
    returnDate: isRequired('Return Date'),
    reason: isRequired('Reason'),
  });

  const validateExtend = combineValidators({
    returnDate: isRequired('Extend Date'),
    reason: isRequired('Reason'),
  });

  const validateReject = combineValidators({
    reason: isRequired('Reason'),
  });

  const validate = combineValidators({
    /* increamentNo: composeValidators(
            validasi,
        )(), */
  });

  const onDownloadFile = () => {
    const controllerName = `FileFunnel/download-file-DocNumber/${extendAttach.funnelAttachmentID}`;
    const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
    handleDownload(endpoint, extendAttach.fileName);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const onSubmitHandler = (values: any) => {
    const approveBankGaransi = new BankGaransiApproveModel(values);

    approveBankGaransi.userLogin = currentUser.userName;
    approveBankGaransi.bankGuaranteeNo = props.bankGuaranteeNo;
    approveBankGaransi.returnDate = new Date();

    if (
      props.type != 'Approve' ||
      (props.type == 'Approve' && props.process != 'REQUEST') ||
      (props.type == 'Approve' && props.process != 'REQUEST INSURANCE')
    ) {
      //jika action selain approve dan jika action approve untuk return & extend
      //new parameter
      approveBankGaransi.publishDate = bankGaransi.publishDate;
      approveBankGaransi.submitDate = bankGaransi.submitDate;
      approveBankGaransi.claimPeriod = bankGaransi.claimPeriod;
      approveBankGaransi.suratPerjanjianNo = bankGaransi.suratPerjanjianNo;
      approveBankGaransi.increamentNo = bankGaransi.increamentNo;
      approveBankGaransi.effectiveDate = bankGaransi.adminEffectiveDate;
      approveBankGaransi.expiredDate = bankGaransi.adminExpireDate;
      approveBankGaransi.companyApplicant = bankGaransi.companyApplicant;
      approveBankGaransi.letterNo = bankGaransiRequest.letterNo;
    }

    if (props.type == 'Reject') {
      approveBankGaransi.status = 'REJECTED';
      approveBankGaransi.notes = values.reason;
      dispatch(BankGaransiAction.postApproveBankGaransi(approveBankGaransi));
    } else if (props.type == 'Approve') {
      approveBankGaransi.status = 'APPROVED';
      approveBankGaransi.notes = '';
      if (props.process === 'REQUEST') {
        approveBankGaransi.claimPeriod = values.claimPeriod;
        approveBankGaransi.increamentNo = values.increamentNo;
        approveBankGaransi.publishDate = values.publishDate;
        approveBankGaransi.submitDate = values.submitDate;
        approveBankGaransi.effectiveDate = values.effectiveDate;
        approveBankGaransi.expiredDate = values.expiredDate;
        approveBankGaransi.companyApplicant = values.companyApplicant;
      }
      approveBankGaransi.process = props.process;

      if (props.bondIssuerType == 'Bank' && props.bondIssuer != 'Danamon') {
        approveBankGaransi.claimPeriod = 0;
        approveBankGaransi.increamentNo = 0;
        approveBankGaransi.publishDate = undefined;
        approveBankGaransi.suratPerjanjianNo = '';
      } else if (props.bondIssuerType == 'Insurance') {
        approveBankGaransi.claimPeriod = 0;
        approveBankGaransi.increamentNo = 0;
        approveBankGaransi.publishDate = undefined;
        if (props.stepName == 'Approval Direktur') {
          approveBankGaransi.submitDate = bankGaransi.submitDate;
          approveBankGaransi.suratPerjanjianNo = bankGaransi.suratPerjanjianNo;
          approveBankGaransi.effectiveDate = bankGaransi.adminEffectiveDate;
          approveBankGaransi.expiredDate = bankGaransi.adminExpireDate;
        } else {
          approveBankGaransi.suratPerjanjianNo = values.suratPerjanjianNo;
          approveBankGaransi.submitDate = values.submitDate;
          approveBankGaransi.expiredDate = values.expiredDate;
          approveBankGaransi.effectiveDate = values.effectiveDate;
        }
      }

      dispatch(BankGaransiAction.postApproveBankGaransi(approveBankGaransi));
    } else if (props.type == 'Void') {
      approveBankGaransi.status = 'Void';
      approveBankGaransi.notes = values.reason;
      approveBankGaransi.process = 'VOID';

      dispatch(BankGaransiAction.postVoidBankGaransi(approveBankGaransi));
    } else if (props.type == 'Return') {
      const newObject = new ExtendMapper();
      const data = new FormData();

      newObject.BGApprovalForm = new BankGaransiApproveModel(values);
      newObject.BGApprovalForm.status = 'Return';
      newObject.BGApprovalForm.bankGuaranteeNo = props.bankGuaranteeNo;
      newObject.BGApprovalForm.userLogin = currentUser.userName;
      newObject.BGApprovalForm.notes = values.reason;
      newObject.BGApprovalForm.returnDate = values.returnDate;
      newObject.BGApprovalForm.process = 'RETURN';
      newObject.BGApprovalForm.publishDate = bankGaransi.publishDate;
      newObject.BGApprovalForm.submitDate = bankGaransi.submitDate;
      newObject.BGApprovalForm.claimPeriod = bankGaransi.claimPeriod;
      newObject.BGApprovalForm.suratPerjanjianNo = bankGaransi.suratPerjanjianNo;
      newObject.BGApprovalForm.increamentNo = bankGaransi.increamentNo;
      newObject.BGApprovalForm.effectiveDate = bankGaransi.adminEffectiveDate;
      newObject.BGApprovalForm.expiredDate = bankGaransi.adminExpireDate;
      newObject.BGApprovalForm.companyApplicant = bankGaransi.companyApplicant;

      newObject.File = fileAttachment;

      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
      };

      serialize(
        newObject,
        options, // optional
        data // optional
      );

      dispatch(BankGaransiAction.postExtendReturn(data));
    } else if (props.type == 'Extend') {
      const newObject = new ExtendMapper();
      const data = new FormData();

      newObject.BGApprovalForm = new BankGaransiApproveModel(values);
      newObject.BGApprovalForm.status = 'Extend';
      newObject.BGApprovalForm.bankGuaranteeNo = props.bankGuaranteeNo;
      newObject.BGApprovalForm.userLogin = currentUser.userName;
      newObject.BGApprovalForm.notes = values.reason;
      newObject.BGApprovalForm.returnDate = values.returnDate;
      newObject.BGApprovalForm.process = 'EXTEND DATE';
      newObject.BGApprovalForm.publishDate = bankGaransi.publishDate;
      newObject.BGApprovalForm.submitDate = bankGaransi.submitDate;
      newObject.BGApprovalForm.claimPeriod = bankGaransi.claimPeriod;
      newObject.BGApprovalForm.suratPerjanjianNo = bankGaransi.suratPerjanjianNo;
      newObject.BGApprovalForm.increamentNo = bankGaransi.increamentNo;
      newObject.BGApprovalForm.effectiveDate = bankGaransi.adminEffectiveDate;
      newObject.BGApprovalForm.expiredDate = bankGaransi.adminExpireDate;
      newObject.BGApprovalForm.companyApplicant = bankGaransi.companyApplicant;

      newObject.File = fileAttachment;

      const options = {
        indices: false,
        nullsAsUndefineds: false,
        booleansAsIntegers: false,
        allowEmptyArrays: false,
      };

      serialize(
        newObject,
        options, // optional
        data // optional
      );

      dispatch(BankGaransiAction.postExtendReturn(data));
    }
  };

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
    //route to bank garansi
    historys.push(RouteEnum.BankGaransi);
  };

  const onReturnDate = (values: any) => {
    setVReturnDate(values);
  };

  const fileChange = (e: any) => {
    setFileAttachment(e.target.files[0]);
  };

  if (bRefreshPage) {
    if (search !== null && search.searchText != null) {
      dispatch(BankGaransiAction.requestBGSearch(currentUser.userName, search.searchText, activePage, pageSize, 0, columnsorting, direction));
    } else if (filter !== null) {
      const filterNew = new FilterSearchModel(filter);
      filterNew.pageSize = pageSize;
      filterNew.page = activePage;
      filterNew.column = columnsorting;
      filterNew.sorting = direction;
      dispatch(BankGaransiAction.postFilterSearch(filterNew));
    } else {
      dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, columnsorting, direction));
    }
    //dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, 'BankGuaranteeGenID', 'descending'));

    dispatch(BankGaransiAction.setActivePage(activePage));
    cancelClick();
  }

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      BankGaransiAction.REQUEST_POST_APPROVE_BANK_GARANSI,
      BankGaransiAction.REQUEST_POST_RETURN_EXTEND,
      BankGaransiAction.REQUEST_POST_VOID_BANK_GARANSI,
    ])
  );
  return (
    <Fragment>
      <Card.Header>Confirmation</Card.Header>
      <Divider></Divider>
      <FinalForm
        validate={
          props.type == 'Approve' && props.bondIssuer == 'Danamon' && props.process == 'REQUEST'
            ? validateApprove
            : props.type == 'Approve' &&
              props.bondIssuerType == 'Insurance' &&
              props.stepName != 'Approval Direktur' &&
              props.process != 'RETURN' &&
              props.process != 'EXTEND DATE'
            ? validateInsurance
            : props.type == 'Return'
            ? validateReturn
            : props.type == 'Extend'
            ? validateExtend
            : props.type == 'Void' || props.type == 'Reject'
            ? validateReject
            : validate
        }
        onSubmit={(values: any) => onSubmitHandler(values)}
        initialValues={extendAttach}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            <p>Are you sure ?</p>
            {/* khusus untuk extend approve */}
            {props.type == 'Approve' && props.stepName != 'Approval Direktur' && props.process == 'EXTEND DATE' && (
              <Fragment>
                <Field name="extendDate" component={TextInput} placeholder="Extend Date" labelName="Extend Date" disabled={true} />
                <Field name="notes" component={RichTextEditor} labelName="Reason Extend" disabled={true} />
                <Button type="button" onClick={onDownloadFile} color="blue">
                  Download Attachment
                </Button>
                <br /> <br /> <br />
              </Fragment>
            )}
            {props.type == 'Approve' &&
              props.stepName != 'Approval Direktur' &&
              (props.process == 'REQUEST' || props.process == 'REQUEST INSURANCE') && (
                <Fragment>
                  {props.bondIssuerType == 'Insurance' && (
                    <Field name="suratPerjanjianNo" component={TextInput} placeholder={'Surat Perjanjian No'} labelName={'Surat Perjanjian No'} />
                  )}
                  {props.bondIssuer == 'Danamon' && (
                    <Fragment>
                      <Field name="increamentNo" component={NumberInput} placeholder={'Increment No'} labelName={'Increment No'} />
                      <Field name="claimPeriod" component={NumberInput} placeholder={'Claim Period'} labelName={'Claim Period'} />
                      <Field
                        name="publishDate"
                        component={DateInput}
                        placeholder={'Publish Date'}
                        labelName={'Publish Date'}
                        date={true}
                        //onChange={onReturnDate}
                      />
                      <Field
                        name="companyApplicant"
                        options={companyApplicantStore}
                        component={SelectInput}
                        placeholder="e.g.BHP.."
                        labelName="Company Applicant"
                      />
                    </Fragment>
                  )}
                  <Field
                    name="submitDate"
                    component={DateInput}
                    placeholder={'Submit Date'}
                    labelName={'Submit Date'}
                    date={true}
                    //onChange={onReturnDate}
                  />
                  <Field
                    name="effectiveDate"
                    component={DateInput}
                    placeholder={'Effective Date'}
                    labelName={'Effective Date'}
                    date={true}
                    //onChange={onReturnDate}
                  />
                  <Field
                    name="expiredDate"
                    component={DateInput}
                    placeholder={'Expired Date'}
                    labelName={'Expired Date'}
                    date={true}
                    //onChange={onReturnDate}
                  />
                </Fragment>
              )}
            {props.type === 'Return' && (
              <Field
                name="returnDate"
                component={DateInput}
                placeholder={textDate}
                labelName={textDate}
                date={true}
                maxDate={vReturnDate}
                onChange={onReturnDate}
              />
            )}
            {props.type === 'Extend' && (
              <Fragment>
                <Field
                  name="returnDate"
                  component={DateInput}
                  placeholder={textDate}
                  labelName={textDate}
                  date={true}
                  values={extendAttach.returnDate}
                  onChange={onReturnDate}
                />

                <label style={{ fontWeight: 'bold' }}>
                  File<label style={{ color: 'red' }}> *</label>
                </label>
                <input type="file" name="imageFile" onChange={fileChange} />
              </Fragment>
            )}
            {(props.type === 'Reject' || props.type === 'Void' || props.type === 'Return' || props.type === 'Extend') && (
              <Field name="reason" component={RichTextEditor} placeholder="e.g.Rejected.." labelName="Reason" />
            )}
            {props.type === 'Return' && <p>*pastikan admin sudah menerima hardcopy</p>}
            <Button type="submit" color="blue" floated="right">
              Submit
            </Button>
            <Button type="button" onClick={cancelClick} floated="right">
              Cancel
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
};

export default ConfirmApprove;
