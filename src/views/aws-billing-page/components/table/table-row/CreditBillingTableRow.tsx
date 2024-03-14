import React, { useEffect, useState } from 'react';
import { Table, Dropdown } from 'semantic-ui-react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import IStore from 'models/IStore';
import IAWSBillingTableRow from 'selectors/aws-billing/models/IAWSBillingTableRow';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import AWSBillingService from '../../billing/form/AWSBillingService';
import CBVServiceForm from '../../form/form-cbv/CBVServiceForm';
import styles from '../CreditBillingServiceTable.module.scss';
import { selectPermission } from 'selectors/aws-billing/AWSBillingServiceSelector';
import PrintBilling from '../../prints/PrintBilling';

interface IProps {
  readonly rowData: IAWSBillingTableRow;
}

const CreditBillingTableRow: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));
  const { rowData } = props;
  const viewEditBilling = () => {
    dispatch(ModalFirstLevelActions.OPEN(<AWSBillingService item={rowData} id={1} type={'Edit'} />, ModalSizeEnum.Large));
  };

  const viewEditCBV = () => {
    dispatch(ModalFirstLevelActions.OPEN(<CBVServiceForm BillingID={rowData.billingIdH} />, ModalSizeEnum.Large));
  };

  const permission = useSelector((state: IStore) => selectPermission(state));

  const [validasiPermission, setValidasiPermission] = useState(false);

  useEffect(() => {
    permission.map((item) => {
      if (item.text1 === currentUser.userName) {
        setValidasiPermission(true);
      }
    });
  }, [validasiPermission, permission, rowData]);
 
  return (
    <>
      <Table.Row
        className={rowData.billingStatus === 'Unmapping' ? styles.unmapping : rowData.billingStatus === 'Unsettle' ? styles.unsettle : styles.settle}
      >
        <Table.Cell width="1" textAlign="center">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
            <Dropdown.Item text="Download" icon="print" onClick={() => dispatch(ModalFirstLevelActions.OPEN(<PrintBilling billingIdH={rowData.billingIdH}/>, ModalSizeEnum.Large))}  />
              {rowData.billingStatus === 'Unmapping' && validasiPermission === true ? (
                <Dropdown.Item text="Billing Mapping" icon="address book" onClick={() => viewEditBilling()} />
              ) : // rowData.billingStatus === 'Unsettle' || rowData.billingStatus === 'Settle' ?
              null
              // :
              // (<Dropdown.Item text="Billing Mapping" icon="address book" onClick={() => viewEditBilling()} />)
             
              }
              {rowData.billingStatus != 'Unmapping' ? (
                <>
                  <Dropdown.Item text="CBV Usage" icon="file outline" onClick={() => viewEditCBV()} />
                  {rowData.isUsageDetail === 0 && validasiPermission === true ? (
                    <Dropdown.Item text="Billing Mapping" icon="address book" onClick={() => viewEditBilling()} />
                  ) : null}
                </>
              ) : null}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.billingStatus}</Table.Cell>
        <Table.Cell>{rowData.billingPeriod}</Table.Cell>
        <Table.Cell>{rowData.accountId}</Table.Cell>
        <Table.Cell> {rowData.so ? rowData.so : 0} </Table.Cell>
        <Table.Cell>{rowData.picName}</Table.Cell>
        <Table.Cell>{rowData.picNameDept}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>
          {' '}
          {rowData.totalBillingUsd ? '$' + rowData.totalBillingUsd?.toLocaleString() : 0} 
          
        </Table.Cell>
        <Table.Cell> {rowData.rate ? 'Rp.' + rowData.rate?.toLocaleString() : 'Rp.' + 0} </Table.Cell>
        <Table.Cell> {rowData.totalBillingIdr ? 'Rp.' + rowData.totalBillingIdr?.toLocaleString() : "Rp." + 0}{' '}</Table.Cell>
        <Table.Cell> {rowData.usageAmount ? rowData.usageAmount : 0} </Table.Cell>
        <Table.Cell> {rowData.credit ? rowData.credit : 0} </Table.Cell>
        <Table.Cell> {rowData.discountUsage ? rowData.discountUsage : 0} </Table.Cell>
        <Table.Cell> {rowData.sppDiscount ? rowData.sppDiscount : 0} </Table.Cell>
        <Table.Cell> {rowData.invoiceNo} </Table.Cell>
        <Table.Cell> {rowData.fee ? rowData.fee : 0} </Table.Cell>
        <Table.Cell> {rowData.riFee ? rowData.riFee : 0} </Table.Cell>
        <Table.Cell> {rowData.tax ? rowData.tax : 0} </Table.Cell>
        <Table.Cell> {rowData.savingPlanAmount ? rowData.savingPlanAmount : 0} </Table.Cell>
        <Table.Cell> {rowData.savingPlanNego ? rowData.savingPlanNego : 0} </Table.Cell>
        <Table.Cell> {rowData.savingPlanFee ? rowData.savingPlanFee : 0} </Table.Cell>
        <Table.Cell> {rowData.mpa} </Table.Cell>
        <Table.Cell> {rowData.flag} </Table.Cell>
      </Table.Row>
    </>
  );
};

export default CreditBillingTableRow;
