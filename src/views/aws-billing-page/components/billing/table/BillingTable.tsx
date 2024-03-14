import React, { useState } from 'react';
import { Table, Icon, Accordion } from 'semantic-ui-react';
import styles from './BillingTable.module.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  DataPerProduct: any;
}

const BillingTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { DataPerProduct } = props;

  const dispatch: Dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState();
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  
  return (
    <Table striped style={{ padding: 0 }}>
      <Table.Header className={styles.AssignCBV}>
        <Table.Row>
          <Table.HeaderCell className={styles.headerTabel}></Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Usage Amount</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Credit</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Discount Usage</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>SPP Discount</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Fee</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>RI Fee</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Tax</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Saving Plan Amount</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Saving Plan Nego</Table.HeaderCell>
          <Table.HeaderCell className={styles.headerTabel}>Saving Plan Fee</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {DataPerProduct && DataPerProduct.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={12} textAlign="center" className={styles.nodata}>
              No data
            </Table.Cell>
          </Table.Row>
        )}

        {DataPerProduct &&
          DataPerProduct.map((item, index) => (
            <Table.Row className={styles.tableCell}>
              <Table.Cell className={styles.headTabDropdown} style={{ padding: '0px' }} colspan={16}>
                <Accordion defaultActiveIndex={-1}>
                  <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
                    <Table.Row className={styles.tableCell} key={'row-data-' + index}>
                      <Table.Cell>
                        <Icon name="dropdown" style={{ color: 'white' }} />
                      </Table.Cell>
                      <Table.Cell colSpan={16}>
                        <small>Period :</small> {item.period} | <small>Product Code :</small> {item.productCode} | <small>Total Usage Amt :</small>{' '}
                        {item.totalUsageAmount?.toLocaleString()}
                      </Table.Cell>
                    </Table.Row>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <Table style={{ padding: 0 }} className={styles.awsTableBilling}>
                      <Table.Body>
                        {item &&
                          item.awsBillingDetail.map((item) => {
                            return (
                              <Table.Row key={'row-expanded-' + index}>
                                <Table.Cell></Table.Cell>
                                <Table.Cell>{item.usageAmount}</Table.Cell>
                                <Table.Cell>{item.creditAmount}</Table.Cell>
                                <Table.Cell>{item.discUsageAmount}</Table.Cell>
                                <Table.Cell>{item.discSppAmount}</Table.Cell>
                                <Table.Cell>{item.feeAmount}</Table.Cell>
                                <Table.Cell>{item.riFeeAmount}</Table.Cell>
                                <Table.Cell>{item.taxAmount}</Table.Cell>
                                <Table.Cell>{item.savingPlanAmount ? item.savingPlanAmount : 0}</Table.Cell>
                                <Table.Cell>{item.savingPlanNego ? item.savingPlanNego : 0}</Table.Cell>
                                <Table.Cell>{item.savingPlanFee ? item.savingPlanFee : 0}</Table.Cell>
                              </Table.Row>
                            );
                          })}
                      </Table.Body>
                    </Table>
                  </Accordion.Content>
                </Accordion>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default BillingTable;
