import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Icon, Accordion } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './AssignCBVTable.module.scss';
import DetailUsageCBV from './detail/DetailUsageCBV';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import * as ModalSecondLevelActions from 'stores/modal/second-level/ModalSecondLevelActions';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import ReactHtmlParser from 'react-html-parser';
import * as CreditBillingActions from 'stores/main-cbv/CreditBillingActions';

interface IProps {
  readonly dataAssign: any;
  type: string;
  voucherNo?: string;
  setDataAssign: any;
  setValidasiRemove?: any;
}

const AssignCBVTable: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { dataAssign, type, voucherNo, setDataAssign, setValidasiRemove } = props;
  const [activeIndex, setActiveIndex] = useState()
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  const dispatch: Dispatch = useDispatch();
  const ViewDetail = (item) => {
    if(type === "Edit")
    {
      dispatch(
        ModalSecondLevelActions.OPEN(<DetailUsageCBV voucherNo={voucherNo} item={item} CreditId={item.creditId} />, ModalSizeEnum.FullScreen)
      )
    }
  }

  const [validateRemove, setValidateRemove] = useState(false)
  useEffect(() => {
    if(validateRemove)
    {
      setDataAssign(dataAssign);
      setValidateRemove(false)
      setValidasiRemove(true)
    }
  },[dataAssign,validateRemove])
  const removePeople = (index) => {
    let list = dataAssign;

    list.splice(index, 1);
    setValidateRemove(true)
  }


  const handleDelete = (item) => {
    dispatch(CreditBillingActions.deleteCreditDetail(item.creditDetailId))
  }

    return (
      <Table color="blue" striped inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={styles.ProductServiceTable}/>
            <Table.HeaderCell className={styles.ProductServiceTable}/>
            <Table.HeaderCell className={styles.ProductServiceTable}>Recipient Name</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Customer</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Project Name</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Assigned Amount</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Notes</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Created By</Table.HeaderCell>
            <Table.HeaderCell className={styles.ProductServiceTable}>Created Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataAssign && dataAssign.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={12} textAlign="center" className={styles.nodata}>
                No data
              </Table.Cell>
            </Table.Row>
          )}
        {dataAssign && dataAssign.map((item, index) => 
        
        type === "Edit" && item.isShow === 1 ?
          (
            <Table.Row className={styles.tableCell} >
            
              <Table.Cell className={styles.headTabDropdown} style={{padding: "0px"}} colspan={9}>
                <Accordion defaultActiveIndex={-1}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={handleClick}
                  >
                  {/* <Table> */}
                    <Table.Body>
                      <Table.Cell >
                        <Icon name='dropdown' style={{color:"white"}} />
                      </Table.Cell>
                      <Table.Cell onClick={() => ViewDetail(item)}>
                        <small>PIC Name</small> <strong style={{color:"white"}}>{type === 'Edit' ? item.picName : item.PIC}</strong>   <small>|</small> 
                        <small>Total Received Amt</small> <strong style={{color:"white"}}>{type === 'Edit' ? item.totalReceivedAmount?.toLocaleString() : item.voucherAmountD?.toLocaleString()}</strong> <small>|</small>  
                        <small>Total Used Amt</small> <strong style={{color:"white"}}>{type === 'Edit' ? item.totalUsedAmount?.toLocaleString() : item.usedAmountD?.toLocaleString()}</strong>  <small>|</small>  
                        <small>Total Remaining Amt</small> <strong style={{color:"white"}}>{type === 'Edit' ? item.totalRemainingAmount?.toLocaleString() : item.remainingAmountD.toLocaleString()}</strong>
                      </Table.Cell>
                    </Table.Body>
                  {/* </Table> */}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                  <Table>
                    <Table.Body>
                    {item.creditDetail && item.creditDetail.map((item, index1) => {
                      return (
                        <Table.Row >
                          <Table.Cell></Table.Cell>
                          <Table.Cell>
                              {item.isDelete === 1 && 
                              <Dropdown pointing="left" icon="ellipsis vertical">
                                <Dropdown.Menu>
                                  <Dropdown.Item as={Link} text="Delete" icon="trash" onClick={() => handleDelete(item)} />
                                </Dropdown.Menu>
                              </Dropdown>}
                          </Table.Cell>
                          <Table.Cell>{item && item.salesName}</Table.Cell>
                          <Table.Cell>{item && item.customerName}</Table.Cell>
                          <Table.Cell>{item && item.projectName}</Table.Cell>
                          <Table.Cell>{item.voucherAmountD.toLocaleString()}</Table.Cell>
                          <Table.Cell>{ReactHtmlParser(item && item.notes)}</Table.Cell>
                          <Table.Cell>{item && item.createdBy}</Table.Cell>
                          <Table.Cell>{item && item.createdDate}</Table.Cell>
                        </Table.Row>
                        )
                      })
                    }
                    </Table.Body>
                  </Table>
                  </Accordion.Content>
                </Accordion>
              </Table.Cell>
            </Table.Row>
          )
          :
          type === "Add" ?
          (
            <Table.Row className={styles.tableCell} >
            
              <Table.Cell className={styles.headTabDropdown} style={{padding: "0px"}} colspan={9}>
                <Accordion defaultActiveIndex={-1}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={handleClick}
                  >
                  {/* <Table> */}
                    <Table.Body>
                      <Table.Cell >
                        <Icon name='dropdown' style={{color:"white"}} />
                      </Table.Cell>
                      <Table.Cell onClick={() => ViewDetail(item)}>
                        <small>PIC Name</small> <strong style={{color:"white"}}>{item.PIC}</strong>   <small>|</small> 
                        <small>Total Received Amt</small> <strong style={{color:"white"}}>{item.voucherAmountD?.toLocaleString()}</strong> <small>|</small>  
                        <small>Total Used Amt</small> <strong style={{color:"white"}}>{item.usedAmountD?.toLocaleString()}</strong>  <small>|</small>  
                        <small>Total Remaining Amt</small> <strong style={{color:"white"}}>{item.remainingAmountD.toLocaleString()}</strong>
                      </Table.Cell>
                    </Table.Body>
                  {/* </Table> */}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                  <Table>
                    <Table.Body>
                      <Table.Row >
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                          <Dropdown pointing="left" icon="ellipsis vertical">
                            <Dropdown.Menu>
                              <Dropdown.Item as={Link} text="Delete" icon="trash" onClick={() => removePeople(index)} />
                            </Dropdown.Menu>
                          </Dropdown>
                        </Table.Cell>
                        <Table.Cell>{item.PIC}</Table.Cell>
                        <Table.Cell>{item && item.customerName}</Table.Cell>
                        <Table.Cell>{item && item.projectName}</Table.Cell>
                        <Table.Cell>{item.voucherAmountD.toLocaleString() }</Table.Cell>
                        <Table.Cell>{ReactHtmlParser(item && item.notes)}</Table.Cell>
                        <Table.Cell>{item && item.createdBy}</Table.Cell>
                        <Table.Cell>{ item && item.createDate }</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  </Accordion.Content>
                </Accordion>
              </Table.Cell>
            </Table.Row>
          )
        :
        null
          )}
        </Table.Body>
    </Table>
      
    )
};

export default AssignCBVTable;
