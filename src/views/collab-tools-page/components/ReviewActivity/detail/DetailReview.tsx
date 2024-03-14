import React, { Fragment, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  Divider,
  Grid,
  Icon,
  Item,
  Form,
  Button,
} from "semantic-ui-react";
import AddNewReview from "../form/AddNewReview";
import FunnelInfo from "../funnel-info/FunnelInfo";
import ActivitiesList from "../activitiesList/ActivitiesList";
import { SelectInput } from "views/components/UI";
import { Field, Form as FinalForm } from "react-final-form";
import "../../../CollabToolsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import IStore from "models/IStore";
import { selectActivityHistory } from "selectors/collab-tools/CollabToolsSelector";
import * as CollabToolsActions from "stores/collab-tools/CollabToolsActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
interface IProps {
  CategoryOptions: any;
  funnelGenId: any;
  collabToolList: any;
  setCollabToolList: any;
}

const DetailReview: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { CategoryOptions, funnelGenId, collabToolList, setCollabToolList } = props;
  const state = { activeIndex: 0 };
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  const historyActivity = useSelector((state: IStore) =>
    selectActivityHistory(state)
  );
  const [toggleSystemActivity, setToggleSystemActivity] = useState(false);
  const categories = [
    {
      text: "Action Plan",
      value: "actionPlan",
    },
    {
      text: "Discussion",
      value: "discussion",
    },
    {
      text: "Suggestion",
      value: "suggestion",
    },
    {
      text: "All Category",
      value: "All Category",
    },
  ];
  const onSubmitHandler = (values: any) => {};
  function handleToggle() {
    if(toggleSystemActivity){
      setToggleSystemActivity(false);
      dispatch(CollabToolsActions.getReviewActivityHistoryList(funnelGenId, "", false))
    } else{
      setToggleSystemActivity(true);
      dispatch(CollabToolsActions.getReviewActivityHistoryList(funnelGenId, "", true))
    }
  }
  function handleChangeCategory(e: any) {
    setCategory(e);
    if (e === "All Category") {
      dispatch(
        CollabToolsActions.getReviewActivityHistoryList(funnelGenId, "", false)
      );
    } else {
      dispatch(CollabToolsActions.getReviewActivityHistoryList(funnelGenId, e, false));
    }
  }
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CollabToolsActions.REQUEST_ACTIVITY_REVIEW])
  );
  useEffect(() => {
    dispatch(CollabToolsActions.getReviewActivityHistoryList(funnelGenId, "", false));
  }, []);

  return (
    <Grid className="dq-weekly pl-1" divided>
      <Grid.Row columns={1}>
        <Grid.Column>
          <h3>Detail Review</h3>
          <Divider />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Accordion styled>
            <AccordionTitle
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column></Grid.Column>
                  <Grid.Column textAlign="right">
                    <span>Add New Review</span>
                    <Icon className="dropdown-icon-detail" name="dropdown" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {activeIndex === 0 && <Divider />}
            </AccordionTitle>

            <AccordionContent active={activeIndex === 0}>
              <AddNewReview
                collabToolList={collabToolList}
                setCollabToolList={setCollabToolList}
                CategoryOptions={CategoryOptions}
                funnelGenId={funnelGenId}
              />
            </AccordionContent>

            <AccordionTitle
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <FinalForm
                onSubmit={(values) => onSubmitHandler(values)}
                initialValues={{}}
                render={({ handleSubmit }) => (
                  // loading={isRequesting}
                  <Form onSubmit={handleSubmit}>
                    <Grid>
                      <>
                        <Grid.Row
                          verticalAlign="middle"
                          columns={2}
                          style={{ paddingLeft: "15px" }}
                        >
                          <Grid.Column
                            className={
                              activeIndex === parseInt("1") &&
                              historyActivity?.length > 0
                                ? "ViewLabel d-icon-rotate"
                                : "HideSelect"
                            }
                            mobile={16}
                            tablet={16}
                            computer={8}
                            textAlign="left"
                          >

                          </Grid.Column>
                          <Grid.Column
                            textAlign="right"
                            mobile={16}
                            tablet={16}
                            computer={
                              activeIndex === parseInt("1") &&
                              historyActivity?.length > 0
                                ? "8"
                                : "16"
                            }
                          >
                            Review Activity History
                            <Icon
                              className="dropdown-icon-detail"
                              name="dropdown"
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </>
                    </Grid>
                  </Form>
                )}
              />
              {activeIndex === 1 && <Divider />}
            </AccordionTitle>
            <AccordionContent active={activeIndex === 1}>
              <Grid.Row
                className={"ContainerMax500 mt-0 p-0"}
              >
                <Grid.Column className="hide-overflowx" textAlign="left">
                  <Button
                    size="small"
                    toggle
                    loading={isRequesting}
                    className="width-notfull"
                    active={toggleSystemActivity}
                    onClick={handleToggle}
                  >
                    System Activity
                  </Button>
                  {!toggleSystemActivity && (
                    <FinalForm
                      onSubmit={(values) => onSubmitHandler(values)}
                      initialValues={{}}
                      render={({ handleSubmit }) => (
                        // loading={isRequesting}
                        <Form onSubmit={handleSubmit}>
                          <Grid>
                            <>
                              <Grid.Row
                                verticalAlign="middle"
                                columns={2}
                                style={{ paddingLeft: "15px" }}
                              >
                                <Grid.Column
                                  className={"ViewLabel d-icon-rotate"}
                                  mobile={8}
                                  tablet={8}
                                  computer={6}
                                  textAlign="left"
                                >
                                  <Field
                                    name="categoryActivity"
                                    component={SelectInput}
                                    onChanged={handleChangeCategory}
                                    options={categories}
                                    labelName=""
                                    placeholder="Show All"
                                    mandatorys={false}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </>
                          </Grid>
                        </Form>
                      )}
                    />
                  )}
                  <LoadingIndicator isActive={isRequesting}>
                  <Item.Group>
                    {historyActivity?.length > 0 ? (
                      <>
                        {historyActivity.map((item, index) => (
                          <ActivitiesList
                            key={item.funnelActivityID}
                            funnelGenId={funnelGenId}
                            rowData={item}
                          />
                        ))}
                      </>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <Item.Description className="nodata-review">
                          No Data
                        </Item.Description>
                      </div>
                    )}
                  </Item.Group>
                  </LoadingIndicator>
                </Grid.Column>
              </Grid.Row>
            </AccordionContent>
          </Accordion>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <FunnelInfo funnelGenId={funnelGenId} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DetailReview;
