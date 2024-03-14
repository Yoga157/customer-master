import React, { Fragment, useEffect, useState } from 'react';
import { Button, SelectInput } from 'views/components/UI';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Card, Divider } from 'semantic-ui-react';
import * as ModalAction from 'stores/modal/first-level/ModalFirstLevelActions';
import * as FunnelAction from 'stores/funnel/FunnelActions';
import IStore from 'models/IStore';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import * as BankGaransiAction from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import ReportPage from 'views/bank-garansi-page/components/report/ReportPage';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { selectPrintOptions } from 'selectors/bank-garansi/BankGaransiSelector';

interface IProps {
  IdBG: string;
  popup: string;
  Issuer: string;
}

const SelectPrint: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const printStore = useSelector((state: IStore) => selectPrintOptions(state));

  let reportType: any;

  const onSubmitHandler = (values: any) => {
    if (values.selectPrint === 'Danamon') {
      reportType = 'Danamon';
    } else if (values.selectPrint === 'Referensi Bank') {
      reportType = 'ReferenceLetter';
    } else if (values.selectPrint === 'Dukungan Bank') {
      reportType = 'DukunganBank';
    } else if (values.selectPrint === 'Mandiri') {
      reportType = 'Mandiri';
    } else {
      reportType = 'PrintAsuransi';
    }
    if (props.popup === 'first')
      dispatch(ModalFirstLevelActions.OPEN(<ReportPage type={reportType} IdBG={props.IdBG} Issuer={props.Issuer} />, ModalSizeEnum.Large));
    else dispatch(ModalSecondLevelActions.OPEN(<ReportPage type={reportType} IdBG={props.IdBG} Issuer={props.Issuer} />, ModalSizeEnum.Large));
  };

  useEffect(() => {
    dispatch(BankGaransiAction.requestPrint(props.IdBG));
  }, [dispatch]);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const bRefreshPage: boolean = useSelector((state: IStore) => state.bankGaransi.refreshPage);

  if (bRefreshPage) {
    cancelClick();
    dispatch(BankGaransiAction.requestBankGaransiAdmins(currentUser.userName, activePage, pageSize, 0, 'BankGuaranteeGenID', 'descending'));
  }

  const isRequesting: boolean = useSelector((state: IStore) => selectRequesting(state, [FunnelAction.REQUEST_POST_FUNNEL]));

  return (
    <Fragment>
      <Card.Header>Print Bank Guarantee</Card.Header>
      <Divider></Divider>
      <FinalForm
        //valiate={validate}
        onSubmit={(values: any) => onSubmitHandler(values)}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} loading={isRequesting}>
            {/* <p>Select Print Document :</p> */}
            <Field
              name="selectPrint"
              options={printStore}
              component={SelectInput}
              placeholder="e.g.Bank Guarantee.."
              //onChanged={onBondIssuer}
              labelName="Select Print Document"
            />
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

export default SelectPrint;
