import React, { useState, useEffect } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import styles from "./CustomerSignature.module.scss";
import * as ActivityReportCustomerSignatureActions from "stores/activity-report-customer-signature/ActivityReportCustomerSignatureActions";
import { selectViewCustomerSignature } from "selectors/activity-report/ActivityReportSelector";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import IStore from "models/IStore";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";

interface IProps {
  id: number;
}

const CustomerSignature: React.FC<IProps> = ({ id }) => {
  const dispatch: Dispatch = useDispatch();
  const viewCustomerSignature = useSelector((state: IStore) =>
    selectViewCustomerSignature(state)
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const [customerSignName, setCustomerSignName] = useState("");
  const [customerSignImage, setCustomerSignImage] = useState("");
  const [customerSignDate, setCustomerSignDate] = useState("");
 
  useEffect(() => {
    dispatch(
      ActivityReportCustomerSignatureActions.requestViewCustomerSignatureById(
        id,
        +currentUser.employeeID
      )
    );
  }, []);

  useEffect(() => {
    if (id > 0) {
      dispatch(
        ActivityReportCustomerSignatureActions.requestViewCustomerSignatureById(
          id,
          +currentUser.employeeID
        )
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    setCustomerSignName(
      viewCustomerSignature.customerSignName === ""
        ? "-"
        : viewCustomerSignature.customerSignName
    );
    setCustomerSignDate(
      viewCustomerSignature.dCustomerSignDate === undefined
        ? "-"
        : `${moment(viewCustomerSignature.dCustomerSignDate).format(
            "DD MMMM yyyy"
          )} ${moment(viewCustomerSignature.dCustomerSignDate).format("HH:mm")}`
    );
    setCustomerSignImage(viewCustomerSignature.customerSignImage);
  }, [viewCustomerSignature]);

  return (
    <>
      {viewCustomerSignature.isAllowAccess && (
        <Segment className="LightGreyNotif">
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Header>
                  <Header.Content>Customer Signature</Header.Content>

                  <Grid.Row columns="equal" className={styles.mt1rem}>
                    <Grid.Column width={16} className="ViewLabel">
                      <Segment className="WhiteNotes">
                        <img
                          className="ui centered medium image"
                          src={customerSignImage}
                        />
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns="equal" className={styles.mt1rem}>
                    <Grid.Column width={16} className="ViewLabel">
                      <Segment className="WhiteNotes">
                        <table className={styles.fontTable}>
                          <tbody>
                            <tr>
                              <td>Name </td>
                              <td>: </td>
                              <td>{customerSignName}</td>
                            </tr>
                            <tr>
                              <td>Date </td>
                              <td>: </td>
                              <td>{customerSignDate}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )}
    </>
  );
};
export default CustomerSignature;
