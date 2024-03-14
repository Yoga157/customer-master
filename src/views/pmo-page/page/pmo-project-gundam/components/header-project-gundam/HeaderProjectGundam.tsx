import React, { useState, useEffect } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import fileDownload from "js-file-download";
import { useDispatch, useSelector } from "react-redux";
import environment from "environment";
import { gantt } from "dhtmlx-gantt";
import moment from "moment";
import axios from "axios";

import { selectProjectGundamTaskLinkList } from "selectors/project-gundam/ProjectGundamSelector";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import { selectEmployeesGantt } from "selectors/select-options/PMOTypeSelector";
import { selectViewFunnelCustomer } from "selectors/funnel/FunnelSelector";
import UploadProjectGundam from "../form/UploadProjectGundam";
import * as FunnelActions from "stores/funnel/FunnelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Button } from "views/components/UI";
import IStore from "models/IStore";

function HeaderProjectGundam({ funnelGenID, projectId, setExportMpp }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const listTaskLink = useSelector((state: IStore) =>
    selectProjectGundamTaskLinkList(state)
  );
  const viewFunnelCustomer = useSelector((state: IStore) =>
    selectViewFunnelCustomer(state)
  );
  const employee = useSelector((state: IStore) => selectEmployeesGantt(state));

  useEffect(() => {
    funnelGenID &&
      dispatch(FunnelActions.requestViewFunnelCustomerById(+funnelGenID));
  }, []);

  const handleDownload = (url: string, filename: string) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    setLoading(true);
    axios
      .get(`${url}?projectId=${projectId}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${userLogin === null ? "" : userLogin.token}`,
        },
      })
      .then((res) => {
        fileDownload(res.data, filename);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  return (
    <Grid>
      <Grid.Row
        columns="equal"
        className="pb-1-5r mt-1n5r"
        verticalAlign="middle"
      >
        <Grid.Column verticalAlign="middle">
          <Header as="h3" className="text-gray">
            {viewFunnelCustomer.projectName}
          </Header>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" textAlign="right" width={12}>
          {/* <Button compact color="yellow" onClick={() => toggleOverlay()}>
            <Icon name="plus" />
            Overlay
          </Button> */}

          <Button
            compact
            color="yellow"
            onClick={() => gantt.createTask()}
            disabled={localStorage.getItem("@sttsPMOProject") === "void"}
          >
            <Icon name="plus" />
            Add Task
          </Button>

          <Button
            compact
            color="blue"
            onClick={() =>
              dispatch(
                ModalFirstLevelActions.OPEN(
                  <UploadProjectGundam
                    projectId={+projectId}
                    funnelGenID={+funnelGenID}
                  />,
                  ModalSizeEnum.Tiny
                )
              )
            }
          >
            <Icon name="upload" />
            Import File Project
          </Button>

          <Button
            color="blue"
            compact
            disabled={listTaskLink.data.length === 0 || employee.length === 0}
            onClick={() => {
              // gantt.exportToMSProject()
              setExportMpp(true);
            }}
          >
            <Icon name="download" />
            Export to MS Project
          </Button>

          {listTaskLink.data.length === 0 && (
            <a
              className="FloatRight767"
              onClick={() =>
                handleDownload(
                  `${environment.api.generic.replace(
                    ":controller",
                    `PMOProjectTimeline/GenerateExcel`
                  )}`,
                  `TEMPLATE_GUNDAM.xlsx`
                )
              }
            >
              <Button color="green" compact>
                <Icon name="download" />
                Download Template Timeline
              </Button>
            </a>
            // <a
            //   className="FloatRight767"
            //   href={require(`./../file/template-project-timeline.xlsx`)}
            //   target="_blank"
            //   rel="noopener noreferrer"
            //   download={`TEMPLATE_GUNDAM`}
            // >
            //   <Button color="green" compact>
            //     <Icon name="download" />
            //     Download Template Timeline
            //   </Button>
            // </a>
          )}

          {/* <Button color="green" compact onClick={() => gantt.exportToExcel()}> */}
          {/* {listTaskLink.data.length > 0 && (
            <Button
              color="green"
              compact
              disabled={isLoading}
              loading={isLoading}
              onClick={() =>
                handleDownload(
                  `${environment.api.generic.replace(':controller', `PMOProjectTimeline/GenerateExcel`)}`,
                  `ProjectTimeline_${moment(new Date()).format('DD-MMM-yyyy')}.xlsx`
                )
              }
            >
              <Icon name="download" />
              Export to Excel
            </Button>
          )} */}

          <Button
            color="violet"
            compact
            disabled={isLoading}
            loading={isLoading}
            onClick={() => gantt.performAction("indent")}
          >
            <Icon name="sign in" />
            Indent
          </Button>
          <Button
            color="purple"
            compact
            disabled={isLoading}
            loading={isLoading}
            onClick={() => gantt.performAction("outdent")}
          >
            <Icon name="sign out" />
            Outdent
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default HeaderProjectGundam;
