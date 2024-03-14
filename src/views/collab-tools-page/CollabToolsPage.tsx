import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, List } from "semantic-ui-react";
import "./css/app-weekly.scss";
import "./css/bootstrap-weekly.scss";
import { Form as FinalForm, Field } from "react-final-form";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as CollabToolsActions from "stores/collab-tools/CollabToolsActions";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import IStore from "models/IStore";
import {
  selectReviewBySales,
  selectCategoryOptions,
} from "selectors/collab-tools/CollabToolsSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import DetailReview from "./components/ReviewActivity/detail/DetailReview";
import {
  FunnelCardAbove,
  FunnelCardBest,
  FunnelCardClose,
  FunnelCardIn,
} from "./components/FunnelCards";
import SearchFunnelCategory from "./components/SearchInput/SearchFunnelCategory";
import moment from "moment";
import ToolTips from "views/components/UI/Tooltip/ToolTip";
interface IProps {}

const CollabToolsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const CollabTools = useSelector((state: IStore) =>
    selectReviewBySales(state)
  );
  const [collabToolList, setCollabToolList] = useState([]);
  const CategoryOptions = useSelector((state: IStore) =>
    selectCategoryOptions(state)
  );

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const [cardAboveFunnel, setCardAboveFunnel] = useState([]);
  const [cardInFunnel, setCardInFunnel] = useState([]);
  const [cardBestFew, setCardBestFew] = useState([]);
  const [cardCloseLose, setCardCloseLose] = useState([]);
  const [activeIndex, setActiveIndex] = useState([]);
  const [searchSelect, setSearchSelect] = useState("");
  const [search, setSearch] = useState("");
  const [isSetting, setIsSetting] = useState(false);
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CollabToolsActions.REQUEST_REVIEW_BY_SALES])
  );

  const DetailCollabTools = (funnelGenId: string) => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <DetailReview
          collabToolList={collabToolList}
          setCollabToolList={setCollabToolList}
          CategoryOptions={CategoryOptions}
          funnelGenId={funnelGenId}
        />,
        ModalSizeEnum.Large
      )
    );
  };
  const SearchSelect = [
    {
      text: "funnelGenID",
      value: "funnelGenID",
    },
    {
      text: "Sales",
      value: "sales",
    },
    {
      text: "Customer",
      value: "customer",
    },
    {
      text: "Project",
      value: "project",
    },
  ];
  useEffect(() => {
    $("body").addClass("hidescroll");
    return () => {
      $("body").removeClass("hidescroll");
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      $("body").removeClass("hidescroll");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function handleFetch(search: string, selectSearch: string) {
    if (
      search.trim().length < 1 ||
      (search.trim().length < 1 && selectSearch.length < 1)
    ) {
      setCollabToolList(CollabTools);
    } else if (search.trim().length > 0 && selectSearch.length > 1) {
      if (selectSearch === "funnelGenID") {
        setCollabToolList(
          CollabTools?.filter((item: any) =>
            item.funnelGenID
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      } else if (selectSearch === "sales") {
        setCollabToolList(
          CollabTools?.filter((item: any) =>
            item.salesName
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      } else if (selectSearch === "customer") {
        setCollabToolList(
          CollabTools?.filter((item: any) =>
            item.customerName
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      } else if (selectSearch === "project") {
        setCollabToolList(
          CollabTools?.filter((item: any) =>
            item.projectName
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    }
  }
  function daysDifference(item: any) {
    let today = new Date();
    if (item.lastActivityDate === null) {
      return moment(today).diff(
        moment(moment(item?.createDate).format("YYYY-MM-DD")),
        "days"
      );
    } else {
      return moment(today).diff(
        moment(moment(item?.lastActivityDate).format("YYYY-MM-DD")),
        "days"
      );
    }
  }
  function buttonFilter(type: string) {
    setIsSetting(true);
    if (type === "weeks") {
      setCollabToolList(
        CollabTools?.filter((item: any) => daysDifference(item) > 7)
      );
    } else if (type === "week") {
      setCollabToolList(
        CollabTools?.filter((item: any) => daysDifference(item) < 7)
      );
    } else if (type === "inactive") {
      setCollabToolList(
        CollabTools?.filter((item: any) => item.lastActivityDate === "")
      );
    } else if (type === "all") {
      setCollabToolList(CollabTools);
    }
    setTimeout(()=>setIsSetting(false), 300);
  }
  useEffect(() => {
    dispatch(
      CollabToolsActions.requestReviewBySales({
        salesID: currentUser.employeeID,
      })
    );
    dispatch(CollabToolsActions.getReviewCategoryOption());
  }, []);
  useEffect(() => {
    if (CollabTools?.length >= 0 && !isRequesting) {
      setCollabToolList(CollabTools);
    }
  }, [CollabTools, isRequesting]);
  useEffect(() => {
    if(isRequesting){
      setIsSetting(true);
    }
    if (collabToolList?.length >= 0 && !isRequesting) {
      setIsSetting(true);
      setCardAboveFunnel(
        collabToolList?.filter(
          (item: any) => item.funnelStatus === "Above Funnel"
        )
      );
      setCardBestFew(
        collabToolList?.filter((item: any) => item.funnelStatus === "Best Few")
      );
      setCardInFunnel(
        collabToolList?.filter((item: any) => item.funnelStatus === "In Funnel")
      );
      setCardCloseLose(
        collabToolList?.filter(
          (item: any) => item.funnelStatus === "Close Lose"
        )
      );
      setIsSetting(false);
      $(window).scrollTop(0);
    }
  }, [collabToolList, isRequesting]);

  return (
    <div style={{ marginLeft: "2rem" }}>
      <LoadingIndicator isActive={isRequesting || isSetting} noscroll={true}>
        <div className="behind" />
        <div className="headers-wrap">
          <div className="buttons-wrap">
            <Button
              onClick={() => buttonFilter("all")}
              size="tiny"
              color="grey"
            >
              <span className="button-text">All</span>
            </Button>
            <Button
              onClick={() => buttonFilter("inactive")}
              size="tiny"
              color="red"
            >
              <Icon name="minus circle" />
              <span className="button-text">No Activity</span>
            </Button>
            <Button
              onClick={() => buttonFilter("weeks")}
              size="tiny"
              color="yellow"
            >
              <Icon name="exclamation circle" />
              <span className="button-text">{`> 1 Week`}</span>
            </Button>
            <Button
              onClick={() => buttonFilter("week")}
              size="tiny"
              color="olive"
            >
              <Icon name="check circle" />
              <span className="button-text">{`< 1 Week`}</span>
            </Button>
            <ToolTips
              content={
                <div>
                  <Header as="h4">
                    <Icon color="red" name="minus circle" /> No Activity
                    <Header.Subheader>
                      Funnels with no activity.
                    </Header.Subheader>
                  </Header>
                  <Header as="h4">
                    <Icon color="yellow" name="exclamation circle" />{" "}
                    {`>1 Week`}
                    <Header.Subheader>
                      Funnels with no activity in more than 1 week.
                    </Header.Subheader>
                  </Header>
                  <Header as="h4">
                    <Icon color="olive" name="check circle" /> {`<1 Week`}
                    <Header.Subheader>
                      Funnels with activity in the last 1 week.
                    </Header.Subheader>
                  </Header>
                </div>
              }
              trigger={
                <Button className="tooltips-buttons" circular icon="help" />
              }
            />
          </div>
          <div className="search-wrap">
            <SearchFunnelCategory
              options={SearchSelect}
              isRequesting={isRequesting}
              value={search}
              category={searchSelect}
              handleSelect={setSearchSelect}
              handleSearch={setSearch}
              handleFetch={handleFetch}
              isSetting={isSetting}
              setIsSetting={setIsSetting}
            />
          </div>
        </div>
        <Grid className={`dq-weekly`} columns={4} doubling stackable>
          <Grid.Row stretched>
            <Grid.Column>
              <FunnelCardAbove
                CollabTools={cardAboveFunnel}
                setCollabToolList={setCardAboveFunnel}
                DetailCollabTools={DetailCollabTools}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Grid.Column>
            <Grid.Column>
              <FunnelCardIn
                CollabTools={cardInFunnel}
                DetailCollabTools={DetailCollabTools}
                setCollabToolList={setCardInFunnel}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Grid.Column>
            <Grid.Column>
              <FunnelCardBest
                CollabTools={cardBestFew}
                DetailCollabTools={DetailCollabTools}
                setCollabToolList={setCardBestFew}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Grid.Column>
            <Grid.Column>
              <FunnelCardClose
                CollabTools={cardCloseLose}
                DetailCollabTools={DetailCollabTools}
                setCollabToolList={setCardCloseLose}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <div className="behind-pagination"/> */}
      </LoadingIndicator>
    </div>
  );
};
export default CollabToolsPage;
