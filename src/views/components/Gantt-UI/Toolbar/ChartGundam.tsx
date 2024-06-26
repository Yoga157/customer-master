import React from 'react';
import { Icon } from 'semantic-ui-react';
import { gantt } from 'dhtmlx-gantt';

import { Button } from 'views/components/UI';

function ChartGundam() {
  // var overlayControl = gantt.ext.overlay;
  // function toggleOverlay() {
  //   if (overlayControl.isOverlayVisible(lineOverlay)) {
  //     gantt.config.readonly = false;
  //     overlayControl.hideOverlay(lineOverlay);
  //     gantt.$root.classList.remove('overlay_visible');
  //   } else {
  //     gantt.config.readonly = true;
  //     overlayControl.showOverlay(lineOverlay);
  //     gantt.$root.classList.add('overlay_visible');
  //   }
  // }

  // function getChartScaleRange() {
  //   var tasksRange = gantt.getSubtaskDates();
  //   var cells = [];
  //   var scale = gantt.getScale();
  //   if (!tasksRange.start_date) {
  //     return scale.trace_x;
  //   }

  //   scale.trace_x.forEach(function(date) {
  //     if (date >= tasksRange.start_date && date <= tasksRange.end_date) {
  //       cells.push(date);
  //     }
  //   });
  //   return cells;
  // }

  // function getProgressLine() {
  //   var tasks = gantt.getTaskByTime();
  //   var scale = gantt.getScale();
  //   var step = scale.unit;

  //   var timegrid = {};

  //   var totalDuration = 0;

  //   gantt.eachTask(function(task) {
  //     if (gantt.isSummaryTask(task)) {
  //       return;
  //     }
  //     if (!task.duration) {
  //       return;
  //     }

  //     var currDate = gantt.date[scale.unit + '_start'](new Date(task.start_date));
  //     while (currDate < task.end_date) {
  //       var date = currDate;
  //       currDate = gantt.date.add(currDate, 1, step);

  //       if (!gantt.isWorkTime({ date: date, task: task, unit: step })) {
  //         continue;
  //       }

  //       var timestamp = currDate.valueOf();
  //       if (!timegrid[timestamp]) {
  //         timegrid[timestamp] = {
  //           planned: 0,
  //           real: 0,
  //         };
  //       }

  //       timegrid[timestamp].planned += 1;
  //       if (date <= today) {
  //         timegrid[timestamp].real += 1 * (task.progress || 0);
  //       }

  //       totalDuration += 1;
  //     }
  //   });

  //   var cumulativePlannedDurations = [];
  //   var cumulativeRealDurations = [];
  //   var cumulativePredictedDurations = [];
  //   var totalPlanned = 0;
  //   var totalReal = 0;

  //   var chartScale = getChartScaleRange();
  //   var dailyRealProgress = -1;
  //   var totalPredictedProgress = 0;
  //   for (var i = 0; i < chartScale.length; i++) {
  //     start = new Date(chartScale[i]);
  //     end = gantt.date.add(start, 1, step);
  //     var cell = timegrid[start.valueOf()] || { planned: 0, real: 0 };
  //     totalPlanned = cell.planned + totalPlanned;

  //     cumulativePlannedDurations.push(totalPlanned);
  //     if (start <= today) {
  //       totalReal = (cell.real || 0) + totalReal;
  //       cumulativeRealDurations.push(totalReal);
  //       cumulativePredictedDurations.push(null);
  //     } else {
  //       if (dailyRealProgress < 0) {
  //         dailyRealProgress = totalReal / cumulativeRealDurations.length;
  //         totalPredictedProgress = totalReal;
  //         cumulativePredictedDurations.pop();
  //         cumulativePredictedDurations.push(totalPredictedProgress);
  //       }
  //       totalPredictedProgress += dailyRealProgress;
  //       cumulativePredictedDurations.push(totalPredictedProgress);
  //     }
  //   }

  //   for (var i = 0; i < cumulativePlannedDurations.length; i++) {
  //     cumulativePlannedDurations[i] = Math.round((cumulativePlannedDurations[i] / totalPlanned) * 100);
  //     if (cumulativeRealDurations[i] !== undefined) {
  //       cumulativeRealDurations[i] = Math.round((cumulativeRealDurations[i] / totalPlanned) * 100);
  //     }

  //     if (cumulativePredictedDurations[i] !== null) {
  //       cumulativePredictedDurations[i] = Math.round((cumulativePredictedDurations[i] / totalPlanned) * 100);
  //     }
  //   }
  //   return { planned: cumulativePlannedDurations, real: cumulativeRealDurations, predicted: cumulativePredictedDurations };
  // }

  // function getScalePaddings() {
  //   var scale = gantt.getScale();
  //   var dataRange = gantt.getSubtaskDates();

  //   var chartScale = getChartScaleRange();
  //   var newWidth = scale.col_width;
  //   var padding = {
  //     left: 0,
  //     right: 0,
  //   };

  //   if (dataRange.start_date) {
  //     var yScaleLabelsWidth = 48;
  //     // fine tune values in order to align chart with the scale range
  //     padding.left = gantt.posFromDate(dataRange.start_date) - yScaleLabelsWidth;
  //     padding.right = scale.full_width - gantt.posFromDate(dataRange.end_date) - yScaleLabelsWidth;
  //     padding.top = gantt.config.row_height - 12;
  //     padding.bottom = gantt.config.row_height - 12;
  //   }
  //   return padding;
  // }

  // var dateToStr = gantt.date.date_to_str('%F %j, %Y');
  // var myChart;
  // var lineOverlay = overlayControl.addOverlay(function(container) {
  //   var scaleLabels = [];

  //   var chartScale = getChartScaleRange();

  //   chartScale.forEach(function(date) {
  //     scaleLabels.push(dateToStr(date));
  //   });

  //   var values = getProgressLine();

  //   var canvas = document.createElement('canvas');
  //   container.appendChild(canvas);
  //   canvas.style.height = container.offsetHeight + 'px';
  //   canvas.style.width = container.offsetWidth + 'px';

  //   var ctx = canvas.getContext('2d');
  //   if (myChart) {
  //     myChart.destroy();
  //   }
  //   myChart = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       datasets: [
  //         {
  //           label: 'Planned progress',
  //           backgroundColor: '#001eff',
  //           borderColor: '#001eff',
  //           data: values.planned,
  //           fill: false,
  //           cubicInterpolationMode: 'monotone',
  //         },
  //         {
  //           label: 'Real progress',
  //           backgroundColor: '#ff5454',
  //           borderColor: '#ff5454',
  //           data: values.real,
  //           fill: false,
  //           cubicInterpolationMode: 'monotone',
  //         },
  //         {
  //           label: 'Real progress (predicted)',
  //           backgroundColor: '#ff5454',
  //           borderColor: '#ff5454',
  //           data: values.predicted,
  //           borderDash: [5, 10],
  //           fill: false,
  //           cubicInterpolationMode: 'monotone',
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       layout: {
  //         padding: getScalePaddings(),
  //       },
  //       onResize: function(chart, newSize) {
  //         var dataRange = gantt.getSubtaskDates();
  //         if (dataRange.start_date) {
  //           // align chart with the scale range
  //           chart.options.layout.padding = getScalePaddings();
  //         }
  //       },
  //       legend: {
  //         display: false,
  //       },
  //       tooltips: {
  //         mode: 'index',
  //         intersect: false,
  //         callbacks: {
  //           label: function(tooltipItem, data) {
  //             var dataset = data.datasets[tooltipItem.datasetIndex];
  //             return dataset.label + ': ' + dataset.data[tooltipItem.index] + '%';
  //           },
  //         },
  //       },
  //       hover: {
  //         mode: 'nearest',
  //         intersect: true,
  //       },
  //       scales: {
  //         xAxes: [
  //           {
  //             labels: scaleLabels,
  //             gridLines: {
  //               display: false,
  //             },
  //             ticks: {
  //               display: false,
  //             },
  //           },
  //           {
  //             position: 'top',
  //             labels: scaleLabels,
  //             gridLines: {
  //               display: false,
  //             },
  //             ticks: {
  //               display: false,
  //             },
  //           },
  //         ],
  //         yAxes: [
  //           {
  //             display: true,
  //             gridLines: {
  //               display: false,
  //             },
  //             ticks: {
  //               display: true,
  //               min: 0,
  //               max: 100,
  //               stepSize: 10,
  //               callback: function(current) {
  //                 if (current > 100) {
  //                   return '';
  //                 }
  //                 return current + '%';
  //               },
  //             },
  //           },
  //           {
  //             display: true,
  //             position: 'right',
  //             gridLines: {
  //               display: false,
  //             },
  //             ticks: {
  //               display: true,
  //               min: 0,
  //               max: 100,
  //               stepSize: 10,
  //               callback: function(current) {
  //                 if (current > 100) {
  //                   return '';
  //                 }
  //                 return current + '%';
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   return canvas;
  // });

  return (
    // <Button compact color="yellow" onClick={() => toggleOverlay()}>
    //   <Icon name="plus" />
    //   Overlay
    // </Button>
    <></>
  );
}

export default ChartGundam;
