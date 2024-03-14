import React, { useState, useEffect } from "react";
import { Icon, Table } from "semantic-ui-react";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import styles from "./OtherAndBenefitFormTable.module.scss";
import * as ModalSecondLevelActions from "stores/modal/second-level/ModalSecondLevelActions";
import { Dispatch } from "redux";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form, Grid, Divider, Card, Header } from "semantic-ui-react";
import { Button, Tooltips, CheckBox } from "views/components/UI";
import UpdateBenefit from "../../UpdateBenefit";

interface IProps {
  readonly title: string;
  readonly setTempContract?: any;
  readonly listData?: any;
  readonly contractID?: number;
  readonly setReloadTemp?: any;
}

const OtherAndBenefitFormTable: React.FC<IProps> = ({
  title,
  setTempContract,
  listData,
  contractID,
  setReloadTemp,
}) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const AddOtherBenefit = () => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <UpdateBenefit
          contractID={contractID}
          setReloadTemp={setReloadTemp}
          setTempContract={setTempContract}
          tempContract={listData}
          type={"Add"}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const EditOtherBenefit = (listData, contractID, benefitID, DataState) => {
    dispatch(
      ModalSecondLevelActions.OPEN(
        <UpdateBenefit
          setTempContract={setTempContract}
          tempContract={listData}
          contractID={contractID}
          benefitID={benefitID}
          DataState={DataState}
          type={"EditState"}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const [validateRemove, setValidateRemove] = useState(false);
  useEffect(() => {
    if (validateRemove) {
      setTempContract(listData);
      localStorage.setItem("TempContract", JSON.stringify(listData));
      setValidateRemove(false);
    }
  }, [validateRemove]);

  const removePeople = (index) => {
    let list = listData;

    list.splice(index, 1);
    setValidateRemove(true);
  };

  const handleChecked = (e) => {
    const { id, checked } = e.target;
    console.log('id', id,"checked", checked)
    const isSaveChange = JSON.parse(localStorage.getItem("LastContract"))?.map(
      (item) => {
        if(checked === true){
          if (item.benefitID === parseInt(id)) {
            if (item.isSave === 1) {
              return { ...item, isSave: 0 };
            } else {
              return { ...item, isSave: 1 };
            }
          }
          return item;
        }
      }
    );
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
    }
    localStorage.setItem("LastContract", JSON.stringify(isSaveChange));
  };

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    
    const isSaveChange = JSON.parse(localStorage.getItem("LastContract"))?.map(
      (item) => {
        setIsCheck((oldArray) => [...oldArray, item.benefitID]);
        return { ...item, isSave: 1 };
      }
    );
   
    localStorage.setItem("LastContract", JSON.stringify(isSaveChange));
    if (isCheckAll) {
      const isSaveChangeUndo = JSON.parse(localStorage.getItem("LastContract"))?.map(
        (item) => {
          return { ...item, isSave: 0 };
        }
      );
      localStorage.setItem("LastContract", JSON.stringify(isSaveChangeUndo));
      setIsCheck([]);
    }
  };

  const CheckboxCustome = ({ id, type, handleClick, isChecked }) => {
    return (
      <input
        className="ui checkbox"
        id={id}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
    );
  };
  
  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={6} className="title-w-toggle">
          <Header as="h4">
            <Header.Content>{title}</Header.Content>
          </Header>
        </Grid.Column>

        <Grid.Column verticalAlign={"middle"} width={10}>
          <>
            {title === "Benefit from New Contract" && (
              <Tooltips
                content="Add Other and Benefit"
                trigger={
                  <Button
                    onClick={AddOtherBenefit}
                    className="m-05r"
                    icon="plus"
                    color="yellow"
                    disabled={false}
                    floated="right"
                    size="small"
                    content="Add New"
                  />
                }
              />
            )}
          </>
        </Grid.Column>
      </Grid>
      <Table
        sortable
        striped
        className="StickyHeader"
        id="export-main-cbv"
        data-cols-width="10,15,30,30,30,30,50,20,20,20,20"
      >
        <Table.Header className={styles.CreditBillingServiceTable}>
          <Table.Row>
            <>
              <Table.HeaderCell textAlign="left">Type</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">
                {title === "Benefit from Last Contract" && (
                  <CheckBox
                    onChange={handleSelectAll}
                    defaultChecked={isCheckAll}
                  />
                )}
              </Table.HeaderCell>
            </>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {title === "Benefit from Last Contract"
            ? listData &&
              listData.length > 0 &&
              listData?.map((item, index) => (
                <Table.Row>
                  <Table.Cell>{item.benefitTypeStr}</Table.Cell>
                  <Table.Cell>{item.benefitDescStr}</Table.Cell>
                  <Table.Cell>
                    <CheckboxCustome
                     id={item.benefitID}
                     type="checkbox"
                     handleClick={handleChecked}
                     isChecked={isCheck.includes(item.benefitID)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            : listData &&
              listData.length > 0 &&
              listData?.map((item, index) => (
                <Table.Row>
                  <Table.Cell>{item.benefitTypeStr}</Table.Cell>
                  <Table.Cell>{item.benefitDescStr}</Table.Cell>
                  <Table.Cell>
                    <>
                      <Icon
                        name="trash"
                        color="red"
                        onClick={() => removePeople(index)}
                      />
                      <Icon
                        name="edit outline"
                        color="blue"
                        onClick={() =>
                          EditOtherBenefit(
                            listData,
                            item.contractID,
                            item.benefitID,
                            item
                          )
                        }
                      />
                    </>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default OtherAndBenefitFormTable;
