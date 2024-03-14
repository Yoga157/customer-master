import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AttachmentTable from './table/AttachmentTable';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import { Button } from 'views/components/UI';
import IStore from 'models/IStore';
import { selectAttachment } from 'selectors/bank-garansi/BankGaransiSelector';
import AttachmentForm from 'views/main-cbv-page/components/attachment/form/AttachmentForm';
import { selectViewFunnelCustomer } from 'selectors/funnel/FunnelSelector';
import IAttachmentTable from 'selectors/bank-garansi/models/IAttachmentTable';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import * as ModalThirdLevelActions from 'stores/modal/third-level/ModalThirdLevelActions';
import * as AttachmentActions from 'stores/attachment/AttachmentActions';
import * as BankGaransiActions from 'stores/bank-garansi/BankGaransiActions';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';
import { selectCBVAttachment } from 'selectors/main-cbv/CreditBillingServiceSelector';
import './AttachmentStyle.scss';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';

interface IProps {
  modul: number;
  isLocalFirst: boolean;
  funnelGenID: string;
  bankGuaranteeID: string;
  popupLevel: number;
  expireds: boolean;
  bgNo: string;
  setDataAttachment?: any;
  dataAttachment?: any;
  type: string;
  CreditId?: number;
  rowData?: any;
  typecbv?: number;
  setValidasiAttachment?: any;
}

const Attachment: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { bankGuaranteeID, popupLevel, isLocalFirst, modul, funnelGenID, bgNo, setDataAttachment, dataAttachment, type, CreditId, rowData, typecbv, setValidasiAttachment } = props;

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
 
  useEffect(() => {
    if (type === 'Edit') {
      dispatch(CreditBillingActions.requestAttachmentBilling(CreditId, currentUser.employeeID));
    }
  }, [dataAttachment, typecbv]);
  const CbvAttachment = useSelector((state: IStore) => selectCBVAttachment(state));

  const onAddAttachment = useCallback((typecbv): void => {
    if (popupLevel === 1) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <AttachmentForm
            typecbv={typecbv}
            rowData={rowData}
            dataAttachment={dataAttachment}
            setDataAttachment={setDataAttachment}
            type={type}
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={funnelGenID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 2) {
      dispatch(
        ModalSecondLevelActions.OPEN(
          <AttachmentForm
            typecbv={typecbv}
            rowData={rowData}
            dataAttachment={dataAttachment}
            setDataAttachment={setDataAttachment}
            type={type}
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={bankGuaranteeID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    } else if (popupLevel === 3) {
      dispatch(
        ModalThirdLevelActions.OPEN(
          <AttachmentForm
            typecbv={typecbv}
            rowData={rowData}
            dataAttachment={dataAttachment}
            setDataAttachment={setDataAttachment}
            type={type}
            modul={modul}
            isLocalFirst={isLocalFirst}
            popupLevel={popupLevel}
            funnelGenID={bankGuaranteeID}
            bankGuaranteeID={bankGuaranteeID}
          />,
          ModalSizeEnum.Small
        )
      );
    }
  }, [popupLevel, dispatch, modul, isLocalFirst, bankGuaranteeID, dataAttachment]);

  const attachment: IAttachmentTable = useSelector((state: IStore) =>
    selectAttachment(state, [
      AttachmentActions.REQUEST_ATTACHMENT_LOCAL,
      BankGaransiActions.REQUEST_ATTACHMENT_BG_SERVER,
      AttachmentActions.REQUEST_POST_ATTACHMENT_LOCAL,
      AttachmentActions.POST_ATTACHMENT,
    ])
  );

  const viewFunnelCustomer = useSelector((state: IStore) => selectViewFunnelCustomer(state));
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
      <Grid padded style={{width: "100%"}} >
        <Grid.Row  columns="equal" className="d-inflex-767 align-items-center pb-0">
          <Grid.Column >
            <Header>
              <Header.Content>
                {type} Attachment Documents {props.bankGuaranteeID !== '0' && viewFunnelCustomer && 'for #' && viewFunnelCustomer.projectName}
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            {
              validasiPermission && 
              <Button
                type="button"
                icon="plus"
                color="yellow"
                floated="right"
                size="small"
                content="Attach Document"
                onClick={() => onAddAttachment(typecbv)}
              />
            }
            
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div>
              <AttachmentTable
                type={type}
                dataAttachment={dataAttachment}
                setDataAttachment={setDataAttachment}
                setValidasiAttachment={setValidasiAttachment}
                typecbv={typecbv}
                tableData={type === 'Add' ? dataAttachment : CbvAttachment}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default Attachment;
