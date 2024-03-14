import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { gantt } from 'dhtmlx-gantt';
import { Dispatch } from 'redux';

import { selectProjectGundamTaskLinkList } from 'selectors/project-gundam/ProjectGundamSelector';
import { selectEmployeesGantt } from 'selectors/select-options/PMOTypeSelector';
import ExportImport from './hooks/ExportImport';
import Config from './hooks/Config';
import IStore from 'models/IStore';

const Gantt = ({ tasks, zoom, onDataUpdated, projectId, exportMpp }) => {
  const dispatch: Dispatch = useDispatch();

  const listTaskLink = useSelector((state: IStore) => selectProjectGundamTaskLinkList(state));
  const employee = useSelector((state: IStore) => selectEmployeesGantt(state));

  // instance of gantt.dataProcessor
  var dataProcessor = null;

  const initGanttDataProcessor = () => {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }
        // console.log('item', item);

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        return resolve({ type, action, item, id });
        // return resolve();
      });
    });
  };

  let ganttContainer = null;

  Config();

  useEffect(() => {
    let formatter = gantt.ext.formatters.durationFormatter({
      enter: 'day',
      store: 'day',
      format: 'auto',
    });
    let linksFormatter = gantt.ext.formatters.linkFormatter({ durationFormatter: formatter });
    var editors = {
      predecessors: { type: 'predecessor', map_to: 'auto', formatter: linksFormatter },
    };

    gantt.serverList('employee', employee);

    function findUser(id) {
      var list = gantt.serverList('employee');
      for (var i = 0; i < list.length; i++) {
        if (list[i].key == id) {
          return list[i];
        }
      }
      return null;
    }

    //setup column
    const defaultColumn = [
      {
        name: 'text',
        label: 'Task name',
        tree: true,
        width: 150,
        min_width: 150,
        resize: true,
        template: function(task) {
          if (gantt.getState().selected_task === `${task.id}`) {
            return '<b>' + task.text + '</b>';
          } else {
            return task.text;
          }
        },
      },
      {
        // name: 'estStartTime',
        name: 'start_date',
        label: 'Estimate Start Time',
        align: 'center',
        // resize: true,
        width: 130,
        min_width: 130,
        max_width: 130,
      },
      {
        // name: 'estEndTime',
        name: 'end_date',
        label: 'Estimate End Time',
        align: 'center',
        // resize: true,
        width: 130,
        min_width: 130,
        max_width: 130,
      },
      {
        name: 'act_start_time',
        label: 'Actual Start Time',
        align: 'center',
        // resize: true,
        width: 130,
        min_width: 130,
        max_width: 130,
      },
      {
        name: 'act_end_time',
        label: 'Actual End Time',
        align: 'center',
        // resize: true,
        width: 130,
        min_width: 130,
        max_width: 130,
      },
      {
        name: 'status',
        label: 'Status',
        align: 'center',
        resize: true,
        width: 100,
      },
      {
        name: 'owner',
        label: 'Owner',
        align: 'center',
        template: function(task) {
          // if (task.type == gantt.config.types.project) {
          //   return '';
          // }

          var result = '';

          var assigns = task.assigns;

          if (!assigns || !assigns.length) {
            return 'Unassigned';
          }

          if (assigns?.length === 1) {
            return findUser(assigns[0])?.label;
          }

          if (typeof assigns == 'string') {
            assigns = JSON.parse(assigns);
          }

          assigns.forEach(function(ownerId) {
            var assign = findUser(ownerId);
            if (!assign) return;
            result += "<div class='owner-label' title='" + assign.label + "'>" + assign.label.substr(0, 1) + '</div>';
          });

          return result;
        },
        resize: true,
      },
      {
        name: 'predecessors',
        label: 'Predecessors',
        resize: true,
        width: 100,
        min_width: 100,
        align: 'left',
        // editor: editors.predecessors,
        editor: exportMpp ? '' : editors.predecessors,
        template: function(task) {
          var links = task.$target;
          var labels = [];
          for (var i = 0; i < links.length; i++) {
            var link = gantt.getLink(links[i]);
            var sourceTask = gantt.getTask(link.source);
            if (sourceTask != null && sourceTask.id != null) {
              var taskPredecessors = sourceTask.id;
              labels.push(taskPredecessors);
            }
          }
          return labels.join(', ');
        },
      },
      // {
      //   name: 'duration',
      //   label: 'Duration',
      //   align: 'center',
      //   resize: true,
      //   template: function(task) {
      //     return formatter.format(task.duration);
      //   },
      //   min_width: 90,
      // },
      {
        name: 'durationX',
        label: 'Duration',
        align: 'center',
        resize: true,
        min_width: 90,
      },
      { name: 'add', min_width: 44 },
    ];

    gantt.config.columns = localStorage.getItem('@sttsPMOProject') === 'void' ? defaultColumn.filter((e) => e.name !== 'add') : [...defaultColumn];

    // non-inclusive in gantt
    // gantt.templates.task_end_date = function(date) {
    //   var id = gantt.getState().selected_task;
    //   if (!id) return;
    //   var task = gantt.getTask(id);
    //   if (task.type != 'milestone') return gantt.templates.task_date(new Date(date.valueOf() - 1));
    // };

    // var gridDateToStr = gantt.date.date_to_str('%Y-%m-%d');
    // gantt.templates.grid_date_format = function(date, column) {
    //   if (column === 'end_date') {
    //     return gridDateToStr(new Date(date.valueOf() - 1));
    //   } else {
    //     return gridDateToStr(date);
    //   }
    // };
  }, [dispatch, employee, exportMpp]);
  // }, [dispatch, employee, exportMpp, listTaskLink]);

  useEffect(() => {
    gantt.init(ganttContainer);
    // initGanttDataProcessor();
    gantt.clearAll();
    gantt.parse(tasks);
  }, [dispatch, employee, exportMpp, listTaskLink]);

  // useEffect(() => {
  //   gantt.attachEvent('onTaskClick', function(id, e) {
  //     gantt.message('onTaskClick: ' + id);
  //     return true;
  //   });

  //   gantt.attachEvent('onBeforeAutoSchedule', function() {
  //     // gantt.message('Recalculating project schedule...');
  //     return true;
  //   });

  //   gantt.attachEvent('onAfterTaskAutoSchedule', function(task, new_date, constraint, predecessor) {
  //     if (task && predecessor) {
  //       gantt.message({
  //         text:
  //           '<b>' +
  //           task.text +
  //           '</b> has been rescheduled to ' +
  //           gantt.templates.task_date(new_date) +
  //           ' due to <b>' +
  //           predecessor.text +
  //           '</b> constraint',
  //         expire: 4000,
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    return () => {
      if (dataProcessor) {
        dataProcessor.destructor();
        dataProcessor = null;
      }
    };
  }, []);

  ExportImport();

  return (
    <div
      ref={(input) => {
        ganttContainer = input;
      }}
      style={{ width: '100%', height: '100%' }}
    ></div>

    // <div id="gantt_here" style={{ width: '100%', height: '100%' }} />
  );
};

export default Gantt;
