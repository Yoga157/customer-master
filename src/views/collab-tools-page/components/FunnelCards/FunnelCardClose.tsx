import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Icon,
  Divider,
  Grid,
  Accordion,
  AccordionContent,
  AccordionTitle,
  Button,
} from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
interface IProps {
  CollabTools: any;
  DetailCollabTools: any;
  activeIndex: any;
  setActiveIndex: any;
  setCollabToolList: any;
}

const FunnelCardClose: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    CollabTools,
    setCollabToolList,
    DetailCollabTools,
    activeIndex,
    setActiveIndex,
  } = props;
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    let activeIndexArr = [...activeIndex];
    const typeIdx = `CloseWin${index}`;
    const findIdx = activeIndexArr.findIndex((item: any) => item === typeIdx);
    let ele = document.getElementById("CloseWinGrid");
    let cards = document.getElementById(`CloseWin${index}`);
    if (findIdx > -1) {
      activeIndexArr.splice(findIdx, 1);
    } else {
      activeIndexArr.push(typeIdx);
      activeIndexArr.push(typeIdx);
      ele.scrollTo({top: cards.offsetTop - 5, behavior: 'smooth'})
    }
    if (activeIndexArr.length > 2) {
      activeIndexArr.shift();
    }
    activeIndexArr = activeIndexArr.filter((item: any) => item !== index);

    setActiveIndex(activeIndexArr);
  };
  const [closeWinTicket, setCloseWinTicket] = useState([]);
  const [page, setPage] = useState(1);
  const lastPage = Math.ceil(CollabTools?.length / 20);
  function handlePagination(type: string) {
    if (type === "next") {
      let startData = page * 20;
      let endData = (page + 1) * 20 - 1;
      if (page + 1 === lastPage) {
        endData = CollabTools?.length - 1;
      }
      setCloseWinTicket(CollabTools.slice(startData - 1, endData));
    } else {
      let endData = (page - 1) * 20;
      let startData = (page - 2) * 20;
      if (page - 1 === 1) {
        startData = 0;
      }
      setCloseWinTicket(CollabTools.slice(startData, endData));
    }
  }
  useEffect(() => {
    setCloseWinTicket(CollabTools.slice(0, 20));
  }, [CollabTools]);
  return (
    <>
      <div className="col last">
        <div className="card" style={{ cursor: "default" }}>
          <span
            className="card-header bg-soft-info d-flex justify-content-between"
            // data-toggle="collapse"
            // href="#closelose"
            aria-expanded="false"
            aria-controls="closelose"
          >
            <h5 className="card-title text-uppercase fw-semibold mb-1 fs-15">
              Close Lose
            </h5>
            <h5 className="card-title text-uppercase fw-semibold mb-1 fs-15">
              {CollabTools.length}
            </h5>
            {/* <p className="text-muted mb-0">
                  $44,900 <span className="fw-medium">3 Deals</span>
                </p> */}
          </span>
        </div>
        <div
          data-simplebar
          className={`tasks-wrapper collapse show ${closeWinTicket.length >=
            10 && "need-pagination"}`}
            id="CloseWinGrid"
        >
          {closeWinTicket?.map(
            (item, index) =>
              item.funnelStatus === "Close Lose" && (
                <Accordion styled className="mt-2 mb-1" key={item.funnelGenID}>
                  <AccordionTitle
                    active={
                      activeIndex.find(
                        (activeIdx: any) =>
                          activeIdx === `CloseWin${item.funnelGenID}`
                      ) !== undefined
                        ? true
                        : false
                    }
                    index={item.funnelGenID}
                    onClick={handleClick}
                    key={index}
                  >
                    <span role="button" key={index} id={`CloseWin${item.funnelGenID}`}>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h5 className="fs-15 mb-0 text-truncate task-title">
                            <span className="d-flex justify-content-between">
                              <div className="d-flex">
                                {item.flaggingReview14Days === 1 ? (
                                  <Icon name="info circle" color="red" />
                                ) : item.flaggingReview7Days === 1 ? (
                                  <Icon
                                    name="exclamation circle"
                                    color="yellow"
                                  />
                                ) : (
                                  <Icon name="check circle" color="green" />
                                )}
                                <span>FunnelID #{item.funnelGenID}</span>
                              </div>
                              <Icon name="dropdown" />
                            </span>
                          </h5>
                        </div>
                      </div>
                    </span>
                  </AccordionTitle>

                  <AccordionContent
                    active={
                      activeIndex.find(
                        (activeIdx: any) =>
                          activeIdx === `CloseWin${item.funnelGenID}`
                      ) !== undefined
                        ? true
                        : false
                    }
                  >
                    <div
                      className="pt-0"
                      role="button"
                      onClick={() => DetailCollabTools(item.funnelGenID)}
                    >
                      <Divider className="m-0" />
                      <Grid className="mt-1 py-0 px-3">
                        <Grid.Row columns={2} className="py-0">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Sales Name
                            </span>
                            <br />
                            {/* <p className="text-muted">
                                {item.funnelId}
                              </p> */}
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.salesName}
                            </h1>
                          </Grid.Column>

                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Department
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.deptName}
                            </h1>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} className="py-0">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Customer Name
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.customerName}
                            </h1>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} className="py-0">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Project Name
                            </span>
                            <br />
                            <div className="bg-projectName-close">
                              <h5> {item.projectName}</h5>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2} className="py-0">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Total Ordering
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.totalOrderingPrice.toLocaleString()}
                            </h1>
                          </Grid.Column>
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Total Selling
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.totalSellingPrice.toLocaleString()}
                            </h1>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2} className="py-0">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              GPM
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {item.gpmAmount.toLocaleString()} (
                              {item.gpmPctg.toLocaleString()} %)
                            </h1>
                          </Grid.Column>
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Created Date
                            </span>
                            <br />
                            <h1 className="badge bg-soft-CloseWin mr-1">
                              {moment(item.createDate).format("yyyy-MM-DD")}
                            </h1>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} className="pt-0 pb-2">
                          <Grid.Column>
                            <span className="card-title-field text-uppercase fw-regular mb-1 fs-15">
                              Last Activity
                            </span>
                            <br />
                            <div
                              style={{
                                maxWidth: "100%",
                                // minHeight: "50px",
                                backgroundColor: "#d3d3d3",
                                borderWidth: "1px",
                                borderRadius: "10px",
                                borderColor: "black",
                                padding: "10px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              className="reset-p"
                            >
                              {item.lastActivityDate !== "" && (
                                <>
                                  {moment(
                                    new Date(item.lastActivityDate)
                                  ).format("DD/MM/YY")}
                                  <span
                                    style={{
                                      marginLeft: "5%",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      fontWeight: "bolder",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    "{ReactHtmlParser(item.lastActivity)}"
                                  </span>
                                </>
                              )}
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  </AccordionContent>
                </Accordion>
              )
          )}
        </div>
        {CollabTools.length > 20 && (
          <>
            <div className="pagination-wrapper">
              <div className="pagination-desc-wrapper">
                <span>
                  Showing {(page - 1) * 20} to{" "}
                  {page === lastPage ? CollabTools?.length : page * 20} from{" "}
                  {CollabTools?.length} Data
                </span>
              </div>
              <div className="pagination-button-wrapper">
                <Button
                  onClick={() => {
                    if (page > 1) {
                      handlePagination("prev");
                      setPage((prev) => prev - 1);
                    }
                  }}
                >
                  <Icon name="angle left" />
                </Button>
                <Button
                  onClick={() => {
                    if (page < lastPage) {
                      handlePagination("next");
                      setPage((prev) => prev + 1);
                    }
                  }}
                >
                  <Icon name="angle right" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FunnelCardClose;
