import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { gantt } from 'dhtmlx-gantt';

import ZoomFit from './hooks/ZoomFit';
import Tools from './hooks/Tools';

const Toolbar = () => {
  const [isCritical, setCritical] = useState(false);
  const [isAutoSchedule, setAutoSchedule] = useState(false);

  const autoScheduling = () => {
    gantt.config.auto_scheduling = !isAutoSchedule;
    gantt.config.auto_scheduling_strict = !isAutoSchedule;
    gantt.config.auto_scheduling_compatibility = !isAutoSchedule;
    gantt.render();
    setAutoSchedule(!isAutoSchedule);
  };

  //critical path
  const updateCriticalPath = () => {
    setCritical(!isCritical);
    if (isCritical) {
      gantt.config.highlight_critical_path = true;
    } else {
      gantt.config.highlight_critical_path = false;
    }
    gantt.render();
  };

  // collapse or expand all
  const handleCollOrExpAll = (isCollapse: boolean) => {
    gantt.eachTask(function(task) {
      task.$open = isCollapse;
    });
    gantt.render();
  };

  const [useZoomFit] = ZoomFit();

  Tools();
  return (
    <Grid.Row className="tool-bar" columns="2">
      <Grid.Column width={10} verticalAlign="middle" textAlign="left">
        <Grid>
          <Grid.Row textAlign="left" columns="6">
            <Grid.Column className=" hover-pointer" width="2" verticalAlign="middle" onClick={() => handleCollOrExpAll(false)}>
              <Icon size="small" name="chevron up" /> <span className="lg-visible">Collapse All</span>
            </Grid.Column>
            <Grid.Column className=" hover-pointer" width="2" verticalAlign="middle" onClick={() => handleCollOrExpAll(true)}>
              <Icon size="small" name="chevron down" /> <span className="lg-visible">Expand All</span>
            </Grid.Column>
            {/* <Grid.Column className=" hover-pointer" width="2" verticalAlign="middle" onClick={() => gantt.undo()}>
              <Icon size="small" name="undo" /> <span className="lg-visible">Undo</span>
            </Grid.Column>
            <Grid.Column className=" hover-pointer" width="2" verticalAlign="middle" onClick={() => gantt.redo()}>
              <Icon size="small" name="redo" /> <span className="lg-visible">Redo</span>
            </Grid.Column> */}
            <Grid.Column
              className={`${isAutoSchedule ? 'active' : ''} hover-pointer`}
              width="2"
              verticalAlign="middle"
              onClick={() => autoScheduling()}
            >
              <Icon size="small" name="sync" /> <span className="lg-visible">Auto Scheduling</span>
            </Grid.Column>
            <Grid.Column className=" hover-pointer" width="2" verticalAlign="middle" onClick={() => updateCriticalPath()}>
              <Icon size="small" name="code branch" /> <span className="lg-visible">Critical Path</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
      <Grid.Column width={6} verticalAlign="middle" textAlign="right">
        <Grid textAlign="right">
          <Grid.Row className="tool-bar-right" columns="4" textAlign="right">
            <Grid.Column
              className=" hover-pointer"
              width={3}
              verticalAlign="middle"
              onClick={() => {
                gantt.$zoomToFit = false;
                gantt.ext.zoom.zoomIn();
              }}
            >
              <Icon size="small" name="zoom-in" /> <span className="lg-visible">Zoom In</span>
            </Grid.Column>
            <Grid.Column
              className=" hover-pointer"
              width={3}
              verticalAlign="middle"
              onClick={() => {
                gantt.$zoomToFit = false;
                gantt.ext.zoom.zoomOut();
              }}
            >
              <Icon size="small" name="zoom-out" /> <span className="lg-visible">Zoom Out</span>
            </Grid.Column>
            <Grid.Column className=" hover-pointer" width={3} verticalAlign="middle" onClick={useZoomFit()}>
              <Icon size="small" name="expand arrows alternate" /> <span className="lg-visible">Zoom to Fit</span>
            </Grid.Column>
            <Grid.Column
              className=" hover-pointer"
              width={3}
              verticalAlign="middle"
              onClick={() => {
                gantt.ext.fullscreen.toggle();
              }}
            >
              <Icon size="small" name="expand" /> <span className="lg-visible">Fullscreen</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Toolbar;
