import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IStore from 'models/IStore';
import { CreditBillingFormEdit } from './main-content';
import Attachment from 'views/main-cbv-page/components/attachment/Attachment';
import AssignCBV from 'views/main-cbv-page/components/assign-cbv/AssignCBV';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectCBVCreditById } from 'selectors/main-cbv/CreditBillingServiceSelector';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';

interface IProps {
  rowData: any;
}

const CreditBillingServiceFormEdit: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { rowData } = props;
  const dispatch: Dispatch = useDispatch();
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CreditBillingActions.REQUEST_CREDIT_BILLINGS,
      CreditBillingActions.REQUEST_CBV_CREDIT_ID,
      CreditBillingActions.REQUEST_ATTACHMENT_BILLING,
    ])
  );

  useEffect(() => {
    dispatch(CreditBillingActions.requestCBVCreditId(rowData.creditId));
    dispatch(CreditBillingActions.requestDetailCBV(rowData.creditId, currentUser.employeeID));
    dispatch(CreditBillingActions.requestAttachmentBilling(rowData.creditId, currentUser.employeeID));
  }, [dispatch]);

  const CBVCreditId = useSelector((state: IStore) => selectCBVCreditById(state));
  const result = useSelector((state: IStore) => state.creditBilling.resultActions);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    if (result?.bSuccess === false) {
      dispatch(CreditBillingActions.removeResult());
    } else if (result?.errorNumber === '0') {
      dispatch(CreditBillingActions.requestDetailCBV(rowData.creditId, currentUser.employeeID));
      dispatch(CreditBillingActions.requestAttachmentBilling(rowData.creditId, currentUser.employeeID));
      dispatch(CreditBillingActions.requestCBVCreditId(rowData.creditId));
      dispatch(CreditBillingActions.removeResult());
    }
  }, [result, CBVCreditId]);

  const [totalusedAmountHState, setTotalusedAmountH] = useState(0);
  const [note, setNote] = useState('');
  const [dataAttachment, setDataAttachment] = useState([]);
  const [dataAssign, setDataAssign] = useState([]);

  //Untuk Edit
  const [totalRemaining, setTotalRemaining] = useState(0);
  return (
    <LoadingIndicator isActive={isRequesting}>
      <Grid>
        <Grid.Row>
          <Grid.Column className="FullNotif" width={16}>
            <CreditBillingFormEdit rowData={rowData} CBVCreditId={CBVCreditId} /> <br />
          </Grid.Column>
          <Grid.Column width={16}>
            <Attachment
              type={'Edit'}
              CreditId={rowData.creditId}
              rowData={rowData}
              modul={2}
              isLocalFirst={true}
              funnelGenID={'0'}
              bankGuaranteeID={'0'}
              popupLevel={2}
              expireds={false}
              bgNo={'0'}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <AssignCBV
              type={'Edit'}
              VoucherNo={rowData.voucherNo}
              CreditId={rowData.creditId}
              setTotalusedAmountH={setTotalusedAmountH}
              dataAssign={dataAssign}
              setDataAssign={setDataAssign}
              //Untuk Validasi Edit
              totalRemaining={CBVCreditId}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </LoadingIndicator>
  );
};

export default CreditBillingServiceFormEdit;
