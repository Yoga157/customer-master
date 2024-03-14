import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AssignCBVTable from './table/AssignCBVTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'views/components/UI';
import AssignCBVForm from './form/AssignCBVForm';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import IStore from 'models/IStore';
import { selectCBVAssignDetail } from 'selectors/main-cbv/CreditBillingServiceSelector';
import './AssignCBVStyle.scss';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';

interface IProps {
  dataAssign?: any;
  setDataAssign?: any;
  setTotalusedAmountH?: any;
  CreditId?: number;
  VoucherNo?: string;
  type: string;
  //Add
  setTotalAmount?: any;
  TotalAmount?: number;
  setValidasiRemove?: any;
  //Edit
  totalRemaining?: any;
}

const AssignCBV: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const {
    dataAssign,
    setDataAssign,
    type,
    setTotalusedAmountH,
    CreditId,
    VoucherNo,
    setTotalAmount,
    TotalAmount,
    setValidasiRemove,
    totalRemaining,
  } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  useEffect(() => {
    if (type === 'Edit') {
      dispatch(CreditBillingActions.requestDetailCBV(CreditId, currentUser.employeeID));
    }
  }, [totalRemaining]);

  const DetailCbv: any = useSelector((state: IStore) => selectCBVAssignDetail(state));
  
  const onAdd = useCallback(
    (totalRemaining: any, TotalAmount: any): void => {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <AssignCBVForm
            totalRemaining={totalRemaining}
            setTotalAmount={setTotalAmount}
            TotalAmount={TotalAmount}
            type={type}
            CreditId={CreditId}
            setTotalusedAmountH={setTotalusedAmountH}
            dataAssign={dataAssign}
            setDataAssign={setDataAssign}
          />,
          ModalSizeEnum.Small
        )
      );
    },
    [dispatch]
  );
  const [validasiPermission, setValidasiPermission] = useState(false);
  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, []);
  const permission = useSelector((state: IStore) => selectPermission(state));
  return (
    <Fragment>
      <Grid padded>
        <Grid.Row columns="equal" className="d-inflex-767 align-items-center pb-0">
          <Grid.Column>
            <Header>
              <Header.Content>{type} Detail Assign CBV</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            {validasiPermission === true && (
              <Button
                type="button"
                icon="plus"
                color="yellow"
                floated="right"
                size="small"
                content="Add Assign CBV"
                onClick={() => onAdd(totalRemaining, TotalAmount)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div>
              <AssignCBVTable
                setValidasiRemove={setValidasiRemove}
                setDataAssign={setDataAssign}
                voucherNo={VoucherNo}
                type={type}
                dataAssign={type === 'Add' ? dataAssign : DetailCbv}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default AssignCBV;
