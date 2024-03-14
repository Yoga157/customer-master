import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Table, Dropdown, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IBankGaransiAdminTableRow from 'selectors/bank-garansi/models/IBankGaransiAdminTableRow';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import { selectUserResult } from 'selectors/user/UserSelector';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ConfirmApprove from '../../ConfirmApprove';
import BankGaransiFormEdit from 'views/bank-garansi-page/admin/components/form/form-edit/BankGaransiFormEdit';
import SelectPrint from 'views/bank-garansi-page/admin/components/SelectPrint';
import PrintBG from 'views/bank-garansi-page/components/prints/PrintBG';
import './BankGaransiAdminTableRow.scss';

interface IProps {
  readonly rowData: IBankGaransiAdminTableRow;
}

const BankGaransiAdminTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const [colorStatus, setColorStatus] = useState('grey' as any);
  const [textColorStatus, setTextColorStatus] = useState('#FFFFFF' as any);
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onViewEdit = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <BankGaransiFormEdit
          status={rowData.stepName}
          linkTo={rowData.linkTo}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          expireds={false}
          process={rowData.process}
          so={rowData.so}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const onPrintBG = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(<SelectPrint popup={'first'} IdBG={rowData.bankGuaranteeNo} Issuer={rowData.bondIssuerType} />, ModalSizeEnum.Small)
    );
    //dispatch(ModalFirstLevelActions.OPEN(<ReportPage type={rowData.bondIssuer} IdBG={rowData.bankGuaranteeNo}/>,ModalSizeEnum.Large));
  }, [dispatch]);

  const onApprove = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ConfirmApprove
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          type={'Approve'}
          bondIssuer={rowData.bondIssuer}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          process={rowData.process}
          bondIssuerType={rowData.bondIssuerType}
          stepName={rowData.stepName}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch]);

  const onReject = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ConfirmApprove
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          type={'Reject'}
          bondIssuer={rowData.bondIssuer}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          process={rowData.process}
          bondIssuerType={rowData.bondIssuerType}
          stepName={rowData.stepName}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch]);

  const onVoid = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ConfirmApprove
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          type={'Void'}
          bondIssuer={rowData.bondIssuer}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          process={rowData.process}
          bondIssuerType={rowData.bondIssuerType}
          stepName={rowData.stepName}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch]);

  const onReturn = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ConfirmApprove
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          type={'Return'}
          bondIssuer={rowData.bondIssuer}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          process={rowData.process}
          bondIssuerType={rowData.bondIssuerType}
          stepName={rowData.stepName}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch]);

  const onExtend = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ConfirmApprove
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          type={'Extend'}
          bondIssuer={rowData.bondIssuer}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          process={rowData.process}
          bondIssuerType={rowData.bondIssuerType}
          stepName={rowData.stepName}
        />,
        ModalSizeEnum.Mini
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (rowData.status === 'ON PROGRESS') {
      setTextColorStatus('#55637A');
      setColorStatus('#FFD64F');
    } else if (rowData.status === 'COMPLETED' && rowData.process != 'RETURN') {
      setColorStatus('#A77BE9');
    } else if (rowData.status === 'REJECTED') {
      setColorStatus('#FE5024');
    } else if (rowData.status === 'COMPLETED' && rowData.process === 'RETURN') {
      setColorStatus('#27D4A5');
    }
  }, [dispatch]);

  return (
    <Table.Row
      key={rowData.bankGuaranteeGenID}
      className={
        (rowData.stepName === 'Approval Admin' || rowData.stepName === 'Approval Direktur') && rowData.stepOwner === currentUser.userName
          ? 'approval'
          : ''
      }
    >
      <Table.Cell width="1">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item text="View/Edit" icon="edit outline" onClick={onViewEdit} />
            {rowData.stepOwner === currentUser.userName && currentUser.role === 'Admin' && rowData.stepName === 'Approval Admin' && (
              <Fragment>
                <Dropdown.Item text="Approve" icon="check" onClick={onApprove} />
                <Dropdown.Item text="Reject" icon="minus circle" onClick={onReject} />
              </Fragment>
            )}

            {rowData.stepOwner === 'agnes.layarda' && rowData.stepName === 'Approval Direktur' && (
              <Fragment>
                <Dropdown.Item text="Approve" icon="check" onClick={onApprove} />
                <Dropdown.Item text="Reject" icon="minus circle" onClick={onReject} />
              </Fragment>
            )}
            {currentUser.role === 'Admin' &&
              (rowData.stepName === 'Process In Admin' ||
                rowData.status === 'COMPLETED' ||
                rowData.process === 'RETURN' ||
                rowData.process === 'EXTEND DATE') && (
                <Fragment>
                  <Dropdown.Item text="Print" icon="print" onClick={onPrintBG} />
                </Fragment>
              )}
              <Fragment>
                <Dropdown.Item text="Print BG Request" icon="print" onClick={() => dispatch(ModalFirstLevelActions.OPEN(<PrintBG bankGuaranteeGenID={`${rowData.bankGuaranteeGenID}`} />, ModalSizeEnum.Large))} />
              </Fragment>
            {rowData.stepOwner === currentUser.userName &&
              currentUser.role === 'Sales' &&
              rowData.bankGuaranteeID === '' &&
              rowData.status != 'VOID' && <Dropdown.Item text="Void" icon="cancel" onClick={onVoid} />}
            {currentUser.role == 'Sales' && rowData.status === 'COMPLETED' && rowData.process != 'RETURN' && (
              <Fragment>
                <Dropdown.Item text="Extend BG" icon="calendar alternate outline" onClick={onExtend} />
                <Dropdown.Item text="Return" icon="reply" onClick={onReturn} />
              </Fragment>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
      <Table.Cell>{rowData.bankGuaranteeNo}</Table.Cell>
      <Table.Cell className="FunnelStatusBtn">
        <Button type="button" style={{ backgroundColor: colorStatus, color: textColorStatus }}>
          {rowData.status}
        </Button>
      </Table.Cell>
      <Table.Cell>{rowData.process}</Table.Cell>
      <Table.Cell>{rowData.stepOwner}</Table.Cell>
      <Table.Cell>{rowData.stepName}</Table.Cell>
      <Table.Cell>{rowData.createBy}</Table.Cell>
      <Table.Cell>{rowData.bondIssuer}</Table.Cell>
      <Table.Cell>{rowData.bondType}</Table.Cell>
      <Table.Cell>{rowData.letterType}</Table.Cell>
      <Table.Cell>{rowData.bankGuaranteeID}</Table.Cell>
      <Table.Cell textAlign="right">{rowData.nilai.toLocaleString()}</Table.Cell>
      <Table.Cell>{rowData.customerName}</Table.Cell>
      <Table.Cell>{rowData.bu}</Table.Cell>
      <Table.Cell>{rowData.companyApplicant == 'undefined' ? '' : rowData.companyApplicant}</Table.Cell>
      <Table.Cell>{rowData.so}</Table.Cell>
      <Table.Cell>{moment(rowData.createDate).format('DD-MM-yyyy')}</Table.Cell>
      <Table.Cell>{moment(rowData.expireDate).format('DD-MM-yyyy')}</Table.Cell>
      <Table.Cell>{rowData.statusProject}</Table.Cell>
    </Table.Row>
  );
};

export default BankGaransiAdminTableRow;
