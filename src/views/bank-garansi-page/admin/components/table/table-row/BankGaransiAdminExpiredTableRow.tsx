import React, { Fragment, useCallback } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
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

interface IProps {
  readonly rowData: IBankGaransiAdminTableRow;
}

const BankGaransiAdminExpiredTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  const onViewEdit = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <BankGaransiFormEdit
          status={rowData.stepName}
          linkTo={rowData.linkTo}
          bankGuaranteeGenID={rowData.bankGuaranteeGenID}
          bankGuaranteeNo={rowData.bankGuaranteeNo}
          expireds={true}
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

  return (
    <Table.Row key={rowData.bankGuaranteeGenID}>
      <Table.Cell width="1">
        <Dropdown pointing="left" icon="ellipsis vertical">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} text="View/Edit" icon="edit outline" onClick={onViewEdit} />
            {rowData.stepOwner === currentUser.userName && currentUser.role === 'Admin' && rowData.stepName === 'Approval Admin' && (
              <Fragment>
                <Dropdown.Item text="Approve" icon="check" onClick={onApprove} />
                <Dropdown.Item text="Reject" icon="minus circle" onClick={onReject} />
              </Fragment>
            )}
            {/* {rowData.stepOwner === currentUser.userName && currentUser.role === "Admin"  && (
                <Fragment>
                  <Dropdown.Item 
                      text='Print' 
                      icon='print'
                      onClick={onPrintBG}
                  />
                </Fragment>
              )} */}
            {rowData.stepOwner === currentUser.userName &&
              currentUser.role != 'Admin' &&
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
      <Table.Cell>{rowData.status}</Table.Cell>
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
    </Table.Row>
  );
};

export default BankGaransiAdminExpiredTableRow;
