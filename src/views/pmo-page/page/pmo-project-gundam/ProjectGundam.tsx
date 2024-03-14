import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { gantt } from 'dhtmlx-gantt';
import { History } from 'history';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as EmployeeActions from 'stores/employee/EmployeeActions';
import BreadCumb from '../components/breadcumb/BreadCumb';
import Toolbar from 'views/components/Gantt-UI/Toolbar';
import Gantt from 'views/components/Gantt-UI/Gantt';
import IStore from 'models/IStore';

import { selectProjectGundamList, selectProjectGundamTaskLinkList } from 'selectors/project-gundam/ProjectGundamSelector';
import { dataDefaultCol, criticalDefaultCol, dummySemi, customType } from './dummy-data/Dummy';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import LoadingIndicator from 'views/components/loading-indicator/LoadingIndicator';
import { selectEmployeesGantt } from 'selectors/select-options/PMOTypeSelector';
import { selectRequesting } from 'selectors/requesting/RequestingSelector';
import FormGundamHook from './components/form/hooks/FormGundamHook';
import * as FunnelActions from 'stores/funnel/FunnelActions';
import ProjectGundamHooks from './hooks/ProjectGundamHooks';
import { HeaderProjectGundam } from './components';

interface LocationState {
  from: {
    pathname: string;
  };
  funnelGenID: string;
  projectId: string;
}

interface IProps {
  history: History;
}

const ProjectGundam: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const location = useLocation<LocationState>();
  const dispatch: Dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [exportMpp, setExportMpp] = useState(false);
  const [currentZoom, setCurrentZoom] = useState('Days');

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      EmployeeActions.REQUEST_USER_ASSIGN_FINISHED,
      ProjectGundamActions.GET_PROJECT_GUNDAM_TASK_WITH_LINK,
      ProjectGundamActions.POST_PROJECT_GUNDAM_TASK,
      ProjectGundamActions.PUT_PROJECT_GUNDAM_TASK,
      ProjectGundamActions.POST_PROJECT_GUNDAM_LINK,
      ProjectGundamActions.PUT_PROJECT_GUNDAM_LINK,
      FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER,
    ])
  );
  const employee = useSelector((state: IStore) => selectEmployeesGantt(state));
  const listTaskLink = useSelector((state: IStore) => selectProjectGundamTaskLinkList(state));

  FormGundamHook({ projectId: +location?.state?.projectId, funnelGenId: +location?.state?.funnelGenID });

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    setMessages([newMessage, ...messages]);
  };

  const logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  // gantt.message({
  //   text:
  //     'The values in the resource timeline are calculated depending on the zoom level. <br/>' +
  //     'You can change the zoom level with and without the main timeline.',
  //   expire: -1,
  // });

  useEffect(() => {
    +location?.state?.projectId && dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+location?.state?.projectId));
    dispatch(ProjectGundamActions.getDropdownByEntryKey('TaskIssueType'));
    dispatch(ProjectGundamActions.getDropdownByEntryKey('TaskCategory'));
    dispatch(EmployeeActions.requestEmpAssign());
  }, [dispatch]);

  useEffect(() => {
    if (!+location?.state?.projectId) {
      props.history.push(`/pmo`);
    }
  }, [location]);

  useEffect(() => {
    if (exportMpp) {
      gantt.exportToMSProject({
        name: `ProjectTimeline_${moment().format('DD-MMM-yyyy')}_${location?.state?.projectId}.xml`,
        auto_scheduling: false,
        tasks: {
          TaskID: function(task) {
            return task.id;
          },
          FunnelGenId: function(task) {
            return task.funnelGenId;
          },
          TaskUID: function(task) {
            return task.uid;
          },
          IsMilestone: function(task) {
            return task.isMilestone ? 1 : 0;
          },
          Category: function(task) {
            return task.category;
          },
          Subcategory: function(task) {
            return task.subcategory;
          },
          IssueType: function(task) {
            return task.issueType;
          },
          IssueSubtype: function(task) {
            return task.issueSubtype;
          },
          TaskDescription: function(task) {
            return task.taskDescription;
          },
          TaskStatus: function(task) {
            return task.status;
          },
          TaskRemark: function(task) {
            return task.remark;
          },
          AssignTo: function(task) {
            // return task.assigns;
            if (task.assigns) {
              return task.assigns?.map((e) => employee?.find((item) => item?.key === +e)?.key).join(',');
            } else {
              return '';
            }
          },
          SecondaryResources: function(task) {
            if (task.secondaryResources) {
              return task.secondaryResources?.map((e) => employee?.find((item) => item?.key === +e)?.key).join(',');
            } else {
              return '';
            }
          },
          SLAName: function(task) {
            return task.slaName;
          },

          Brand: function(task) {
            return task.brand;
          },
          SubBrand: function(task) {
            return task.subBrand;
          },
          EmailReceiver: function(task) {
            return task.emailReceiver;
          },
          EmailCc: function(task) {
            return task.emailCc;
          },

          Finish: function(task) {
            return task.end_date;
          },
          Duration: function(task) {
            return task.durationX;
          },
        },
      });
      setTimeout(() => {
        setExportMpp(false);
      }, 1000);
    }
  }, [dispatch, exportMpp]);

  ProjectGundamHooks();

  return (
    <div className="pb-1-5r">
      <BreadCumb link={`/pmo-view/${location?.state?.funnelGenID}/${location?.state?.projectId}`} title={'Back to View/Edit'} />
      <HeaderProjectGundam funnelGenID={location?.state?.funnelGenID} projectId={location?.state?.projectId} setExportMpp={setExportMpp} />

      <div id="myCover">
        <LoadingIndicator isActive={isRequesting}>
          <Grid className="container-bar">
            <Toolbar />
          </Grid>
          <div className={`full-screen`} id="gantt-container">
            {/* <Gantt tasks={dataDefaultCol} zoom={currentZoom} onDataUpdated={logDataUpdate} projectId={+location?.state?.projectId} /> */}
            {/* <Gantt tasks={criticalDefaultCol} zoom={currentZoom} onDataUpdated={logDataUpdate} /> */}
            {/* <Gantt tasks={customType} zoom={currentZoom} onDataUpdated={logDataUpdate} projectId={+location?.state?.projectId} /> */}
            {/* <Gantt tasks={dummySemi} zoom={currentZoom} onDataUpdated={logDataUpdate} projectId={+location?.state?.projectId} exportMpp={exportMpp} /> */}

            <Gantt
              tasks={listTaskLink}
              zoom={currentZoom}
              onDataUpdated={logDataUpdate}
              projectId={+location?.state?.projectId}
              exportMpp={exportMpp}
            />
          </div>
        </LoadingIndicator>
      </div>
    </div>
  );
};

export default ProjectGundam;
