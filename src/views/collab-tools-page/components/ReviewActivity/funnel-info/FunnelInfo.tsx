import React, { useCallback, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import {
  TextInput,
} from "views/components/UI";
import * as CollabToolsActions from "stores/collab-tools/CollabToolsActions"
import { selectFunnelInfo } from "selectors/collab-tools/CollabToolsSelector";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
interface IProps {
  funnelGenId: number;
}

const FunnelInfo: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const onSubmitHandler = (values: any) => {};
  const dispatch = useDispatch();
  const {funnelGenId} = props;
  const funnelDetail = useSelector((state: IStore)=>selectFunnelInfo(state))
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CollabToolsActions.REQUEST_GET_FUNNEL_INFO])
  );
  useEffect(()=>{
    dispatch(CollabToolsActions.getFunnelInfo(funnelGenId));
  }, [])
  return (
    <LoadingIndicator isActive={isRequesting}>
    <FinalForm
      onSubmit={(values) => onSubmitHandler(values)}
      initialValues={{}}
      render={({ handleSubmit }) => (
        // loading={isRequesting}
        <Form onSubmit={handleSubmit}>
          <Segment className="LightYellowNotif PadPmoNotif">
            <Grid>
              <>
                <Grid.Row columns={3} style={{ paddingLeft: "15px" }}>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Funnel ID"
                      values={funnelDetail?.funnelGenID}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Sales Name"
                      values={funnelDetail?.salesName}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Department"
                      values={funnelDetail?.deptName}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3} style={{ paddingLeft: "15px" }}>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Customer Name"
                      values={funnelDetail?.customerName}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={10}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Project Name"
                      values={funnelDetail?.projectName}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={3} style={{ paddingLeft: "15px" }}>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Total Selling"
                      values={funnelDetail?.totalSellingPrice?.toLocaleString()}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="Total Ordering"
                      values={funnelDetail?.totalOrderingPrice?.toLocaleString()}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column
                    className="ViewLabel"
                    mobile={16}
                    tablet={16}
                    computer={5}
                    textAlign="left"
                  >
                    <Field
                      name="newreview"
                      component={TextInput}
                      labelName="GPM"
                      values={`${funnelDetail?.gpmAmount?.toLocaleString()} (${(Math.round(funnelDetail?.gpmPctg * 100) / 100).toFixed(2)}%)`}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>

              </>
            </Grid>
          </Segment>
        </Form>
      )}
    />
    </LoadingIndicator>
  );
};

export default FunnelInfo;
