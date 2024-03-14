import IStore from "models/IStore";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserResult } from "selectors/user/UserSelector";
import { Grid, Header, Radio, Segment } from "semantic-ui-react";
import IUserResult from "selectors/user/models/IUserResult";
import { Dispatch } from "redux";
import * as ActivityReportTotalCustomerExperienceActions from "stores/activity-report-total-customer-experience/ActivityReportTotalCustomerExperienceActions";
import { selectViewTotalCustomerExperience } from "selectors/activity-report/ActivityReportSelector";

interface IProps {
  id: number;
}

const TotalCustomerExperience: React.FC<IProps> = ({ id }) => {
  const dispatch: Dispatch = useDispatch();
  const [disableComponent, setDisableComponent] = useState(true);
  
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const viewTotalCustomerExperience = useSelector((state: IStore) =>
    selectViewTotalCustomerExperience(state)
  );

  useEffect(() => {
    // if (id > 0) {
    dispatch(
      ActivityReportTotalCustomerExperienceActions.requestViewTotalCustomerExperienceById(
        +id,
        +currentUser.employeeID
      )
    );
    // }
  }, [dispatch, id]);

  return (
    <>
      {viewTotalCustomerExperience.isAllowAccess && (
        <Segment className="LightGreyNotif">
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Header>
                  <Header.Content>Total Customer Experience</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal" className="pt-0">
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="1"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "1"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="2"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "2"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="3"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "3"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="4"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "4"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="5"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "5"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="6"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "6"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="7"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "7"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="8"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "8"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="9"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "9"
                  }
                />
              </Grid.Column>
              <Grid.Column width={1} className="ViewLabel">
                <Radio
                  name="totalCustomerExperience"
                  label="10"
                  disabled={disableComponent}
                  checked={
                    viewTotalCustomerExperience.totalCustomerExperience === "10"
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )}
    </>
  );
};

export default TotalCustomerExperience;
