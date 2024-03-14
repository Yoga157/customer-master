import React, { useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';

const tools = () => {
  // 02-09
  function shiftTask(task_id, direction) {
    var task = gantt.getTask(task_id);
    task.start_date = gantt.date.add(task.start_date, direction, 'day');
    task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
    gantt.updateTask(task.id);
  }

  var actions = {
    indent: function indent(task_id) {
      var prev_id = gantt.getPrevSibling(task_id);
      while (gantt.isSelectedTask(prev_id)) {
        var prev = gantt.getPrevSibling(prev_id);
        if (!prev) break;
        prev_id = prev;
      }
      if (prev_id) {
        var new_parent = gantt.getTask(prev_id);
        gantt.moveTask(task_id, gantt.getChildren(new_parent.id).length, new_parent.id);
        new_parent.type = gantt.config.types.project;
        new_parent.$open = true;
        gantt.updateTask(task_id);
        // gantt.updateTask(new_parent.id);
        return task_id;
      }
      return null;
    },

    outdent: function outdent(task_id, initialIndexes, initialSiblings) {
      var cur_task = gantt.getTask(task_id);
      var old_parent = cur_task.parent;
      if (gantt.isTaskExists(old_parent) && old_parent != gantt.config.root_id) {
        var index = gantt.getTaskIndex(old_parent) + 1;
        var prevSibling = initialSiblings[task_id].first;

        if (gantt.isSelectedTask(prevSibling)) {
          index += initialIndexes[task_id] - initialIndexes[prevSibling];
        }
        gantt.moveTask(task_id, index, gantt.getParent(cur_task.parent));
        if (!gantt.hasChild(old_parent)) gantt.getTask(old_parent).type = gantt.config.types.task;
        gantt.updateTask(task_id);
        // gantt.updateTask(old_parent);
        return task_id;
      }
      return null;
    },
  };

  var cascadeAction = {
    indent: true,
    outdent: true,
    del: true,
  };

  var singularAction = {
    undo: true,
    redo: true,
  };

  gantt.performAction = function(actionName) {
    var action = actions[actionName];
    if (!action) return;

    if (singularAction[actionName]) {
      action();
      return;
    }

    gantt.batchUpdate(function() {
      // need to preserve order of items on indent/outdent,
      // remember order before changing anything:
      var indexes = {};
      var siblings = {};
      gantt.eachSelectedTask(function(task_id) {
        gantt.ext.undo.saveState(task_id, 'task');
        indexes[task_id] = gantt.getTaskIndex(task_id);
        siblings[task_id] = {
          first: null,
        };

        var currentId = task_id;
        while (gantt.isTaskExists(gantt.getPrevSibling(currentId)) && gantt.isSelectedTask(gantt.getPrevSibling(currentId))) {
          currentId = gantt.getPrevSibling(currentId);
        }
        siblings[task_id].first = currentId;
      });

      var updated = {};
      gantt.eachSelectedTask(function(task_id) {
        if (cascadeAction[actionName]) {
          if (!updated[gantt.getParent(task_id)]) {
            var updated_id = action(task_id, indexes, siblings);

            updated[updated_id] = true;
          } else {
            updated[task_id] = true;
          }
        } else {
          action(task_id, indexes);
        }
      });
    });
  };
};

function Tools() {
  // config zoom in/out
  var zoomConfig = {
    levels: [
      {
        name: 'day',
        scale_height: 27,
        min_column_width: 80,
        scales: [{ unit: 'day', step: 1, format: '%d %M' }],
      },
      {
        name: 'week',
        scale_height: 50,
        min_column_width: 50,
        scales: [
          {
            unit: 'week',
            step: 1,
            format: function(date) {
              var dateToStr = gantt.date.date_to_str('%d %M');
              var endDate = gantt.date.add(date, -6, 'day');
              var weekNum = gantt.date.date_to_str('%W')(date);
              return weekNum + ', ' + dateToStr(date) + ' - ' + dateToStr(endDate);
            },
          },
          { unit: 'day', step: 1, format: '%j %D' },
        ],
      },
      {
        name: 'month',
        scale_height: 50,
        min_column_width: 120,
        scales: [
          { unit: 'month', format: '%F, %Y' },
          { unit: 'day', format: '%d %M' },
          // { unit: 'week', format: 'Week #%W' },
        ],
      },
      {
        name: 'quarter',
        height: 50,
        min_column_width: 90,
        scales: [
          { unit: 'month', step: 1, format: '%M' },
          {
            unit: 'quarter',
            step: 1,
            format: function(date) {
              var dateToStr = gantt.date.date_to_str('%M');
              var endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day');
              return dateToStr(date) + ' - ' + dateToStr(endDate);
            },
          },
        ],
      },
      {
        name: 'year',
        scale_height: 50,
        min_column_width: 30,
        scales: [{ unit: 'year', step: 1, format: '%Y' }],
      },
    ],
  };

  gantt.ext.zoom.init(zoomConfig);
  // gantt.ext.zoom.setLevel('week');
  gantt.ext.zoom.setLevel('day');

  // aplly plugin
  gantt.plugins({
    fullscreen: true,
    critical_path: true,
    auto_scheduling: true,
    zoom: true,
    undo: true,
    marker: true,
    overlay: true,
    drag_timeline: true,
    multiselect: true,
  });

  // gantt.config.autosize = "y";
  gantt.config.scale_height = 50;
  gantt.config.fit_tasks = true;
  gantt.config.drag_project = true;
  // gantt.config.auto_scheduling = true;

  gantt.ext.fullscreen.getFullscreenElement = function() {
    const myCover = document.getElementById('myCover');
    return myCover;
  };

  // // config show message for event drag
  // gantt.attachEvent('onAfterTaskDrag', function(id, mode) {
  //   var task = gantt.getTask(id);
  //   if (mode == gantt.config.drag_mode.progress) {
  //     var pr = Math.floor(task.progress * 100 * 10) / 10;
  //     gantt.message(task.text + ' is now ' + pr + '% completed!');
  //   } else {
  //     var convert = gantt.date.date_to_str('%H:%i, %F %j');
  //     var s = convert(task.start_date);
  //     var e = convert(task.end_date);
  //     gantt.message(task.text + ' starts at ' + s + ' and ends at ' + e);
  //   }
  // });
  // gantt.attachEvent('onBeforeTaskChanged', function(id, mode, old_event) {
  //   var task = gantt.getTask(id);
  //   if (mode == gantt.config.drag_mode.progress) {
  //     if (task.progress < old_event.progress) {
  //       gantt.message(task.text + " progress can't be undone!");
  //       return false;
  //     }
  //   }
  //   return true;
  // });

  useEffect(() => {
    tools();
  }, []);

  return;
}

export default Tools;
