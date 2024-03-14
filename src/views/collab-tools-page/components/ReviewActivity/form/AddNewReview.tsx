import React, { useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid } from "semantic-ui-react";
import {
  DateName,
  RichTextEditor,
  SearchInputList,
  SelectInput,
} from "views/components/UI";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import * as EmployeeAction from "stores/employee/EmployeeActions";
import { selectEmployeeSemantic } from "selectors/select-options/EmployeeSelector";
import "../../../CollabToolsPage.scss";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import ReviewModel from "stores/collab-tools/models/ReviewModel";
import moment from "moment";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import ToastStatusEnum from "constants/ToastStatusEnum";
import * as CollabToolsAction from "stores/collab-tools/CollabToolsActions";
import * as ToastAction from "stores/toasts/ToastsAction";
import { combineValidators, isRequired } from "revalidate";
import debounce from "lodash.debounce";
interface IProps {
  CategoryOptions: any;
  funnelGenId: string;
  collabToolList: any;
  setCollabToolList: any;
}

const AddNewReview: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { CategoryOptions, funnelGenId, collabToolList, setCollabToolList } = props;
  const isLoading: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [EmployeeAction.REQUEST_EMPLOYEES_BY_NAME])
  );
  const isSubmitting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CollabToolsAction.REQUEST_POST_REVIEW])
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const resultMessage = useSelector(
    (state: IStore) => state.collabTools.resultActions
  );
  const [categorySelect, setCategorySelect] = useState("");
  const dispatch: Dispatch = useDispatch();
  const onSubmitHandler = (values: any, form: any) => {
    const newReview = new ReviewModel();
    const users = values?.sentTo?.filter(
      (item: any) => item?.email !== undefined && item?.email?.length > 0
    );
    newReview.reviewCategoryID = values.category;
    newReview.reviewCategory = CategoryOptions?.find(
      (item: any) => item.value === values.category
    )?.text;
    newReview.reviewName = values.newreview;
    newReview.createDate = new Date();
    newReview.sentTo = users;
    if (categorySelect === "Action Plan") {
      newReview.dueDate = values.endDate;
    } else {
      newReview.dueDate = null;
    }
    newReview.funnelGenID = funnelGenId;
    newReview.createUserID = currentUser.employeeID;
    dispatch(CollabToolsAction.postReview(newReview))
      .then(
        ()=>{
          let localChange = [...collabToolList];
          let idx = localChange.findIndex((item:any)=>item.funnelGenID === funnelGenId);
          localChange[idx].flaggingReview7Days = 0;
          localChange[idx].flaggingReview14Days = 0;
          localChange[idx].lastActivityDate = new Date();
          localChange[idx].lastActivity = `<p>${values.newreview}</p>`;
          setCollabToolList(localChange);
        }
      )
  };
  const onClose = () => {
    dispatch(ModalAction.CLOSE());
  };
  const userEmployee = useSelector((state: IStore) =>
    selectEmployeeSemantic(state)
  );
  const handleSearchChange = (e: any) => {
    if (e.target.value.length > 1) {
      dispatch(
        EmployeeAction.requestEmployeeByName(e.target.value.trimStart(), "")
      );
    }
  };
  const validation = combineValidators({
    newreview: isRequired("New Review"),
    category: isRequired("Category"),
    endDate: isRequired("Due Date"),
  });
  const validationOther = combineValidators({
    newreview: isRequired("New Review"),
  });
  const debouncedResults = debounce((e: any) => handleSearchChange(e), 350);
  const resultRenderer = ({ image, price, title, description, flag, id }) => {
    return (
      <div
        key={id}
        className="content"
        style={{
          backgroundColor: flag === "1" ? "rgba(255, 248, 54, 0.5)" : "",
        }}
      >
        <div className="price">{price}</div>
        <div className="title"> {title}</div>
      </div>
    );
  };
  function handleChangeCategory(e: any) {
    setCategorySelect(
      CategoryOptions.find((item: any) => item.value === e).text
    );
  }
  useEffect(() => {
    if (resultMessage?.errorNumber === "666") {
      dispatch(
        ToastAction.add(resultMessage?.message, ToastStatusEnum.Warning)
      );
    } else if (resultMessage?.errorNumber === "0" && resultMessage?.message === "Insert Success!") {
      dispatch(
        ToastAction.add(resultMessage?.message, ToastStatusEnum.Success)
      );
      onClose();
    }
    dispatch(CollabToolsAction.removeResult());
  }, [resultMessage]);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);
  return (
    <FinalForm
      validate={categorySelect === "Action Plan" ? validation : validationOther}
      onSubmit={(values, form) => onSubmitHandler(values, form)}
      initialValues={{}}
      render={({ handleSubmit, invalid }) => (
        <Form onSubmit={handleSubmit}>
          {/* <Segment className="LightYellowNotif PadPmoNotif"> */}
          <Grid>
            <>
              <Grid.Row style={{ paddingLeft: "15px" }}>
                <Grid.Column
                  className="ViewLabel pt-0"
                  mobile={16}
                  tablet={16}
                  computer={16}
                  textAlign="left"
                >
                  <Field
                    name="newreview"
                    component={RichTextEditor}
                    labelName="New Review"
                    mandatorys={false}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row
                columns={3}
                className="input-types pt-0"
                textAlign="left"
                style={{ paddingLeft: "15px" }}
              >
                <Grid.Column
                  // className="ViewLabel"
                  mobile={16}
                  tablet={16}
                  computer={5}
                >
                  <Field
                    name="category"
                    value={categorySelect}
                    onChanged={handleChangeCategory}
                    component={SelectInput}
                    options={CategoryOptions}
                    labelName="Review Category"
                    mandatory={false}
                  />
                </Grid.Column>
                {categorySelect === "Action Plan" && (
                  <>
                    <Grid.Column
                      // className="ViewLabel"
                      mobile={16}
                      tablet={16}
                      computer={5}
                    >
                      <Field
                        name="endDate"
                        component={DateName}
                        date={true}
                        minDate={new Date()}
                        labelName="Set Due Date"
                        placeholder="09/09/2020"
                        mandatory={false}
                        formated={"MM/dd/yyyy"}
                      />
                    </Grid.Column>
                  </>
                )}
                <Grid.Column
                  // className="ViewLabel"
                  mobile={16}
                  tablet={16}
                  computer={5}
                >
                  <Field
                    name="sentTo"
                    id="customSearchList"
                    component={SearchInputList}
                    allowAdditions={true}
                    loading={isLoading}
                    results={userEmployee}
                    placeHolder={"Employee Name"}
                    handleSearchChange={(e: any) => {
                      e.persist();
                      debouncedResults(e);
                    }}
                    labelColor="white"
                    resultRenderer={resultRenderer}
                    labelName="Sent To"
                    TextAlign="left"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Button
                    loading={isSubmitting}
                    color="blue"
                    floated="right"
                    content="Submit"
                    disabled={invalid}
                  />
                  <Button
                    type="button"
                    floated="right"
                    content="Cancel"
                    onClick={onClose}
                  />
                </Grid.Column>
              </Grid.Row>
            </>
          </Grid>
        </Form>
      )}
    />
  );
};

export default AddNewReview;

