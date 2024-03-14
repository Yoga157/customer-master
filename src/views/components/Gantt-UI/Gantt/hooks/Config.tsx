import React, { useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';

function Config() {
  useEffect(() => {
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    // custom row header
    gantt.config.scales = [
      { unit: 'month', format: '%F, %Y' },
      { unit: 'day', format: '%d %M' },
    ];
    // higlight the weekends
    gantt.templates.scale_cell_class = function(date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return 'weekend';
      }
    };
    gantt.templates.timeline_cell_class = function(task, date) {
      // if (date.getDay() == 0 || date.getDay() == 6 || moment(date).format('YYYY-MM-DD') === '2022-11-29') {
      //   return 'weekend';
      // }
      if (date.getDay() == 0 || date.getDay() == 6) {
        return 'weekend';
      }
    };

    // // work time
    // gantt.templates.scale_cell_class = function(date) {
    //   if (!gantt.isWorkTime(date)) return 'weekend';
    // };

    // gantt.templates.timeline_cell_class = function(item, date) {
    //   for (var i = 0; i < holidays.length; i++) {
    //     var converted_date = format_date(holidays[i]);
    //     if (+converted_date == +date) {
    //       return 'weekend company_holiday';
    //     }
    //   }

    //   if (!gantt.isWorkTime({ date: date, task: item })) return 'weekend';
    // };

    // gantt.addCalendar({
    //   id: 'custom',
    // });

    // var holidays = ['12-04-2018', '17-04-2018', '04-05-2018', '24-05-2018', '31-05-2018', '01-06-2018', '06-06-2018'];

    // var format_date = gantt.date.str_to_date('%d-%m-%Y');

    // for (var i = 0; i < holidays.length; i++) {
    //   var converted_date = format_date(holidays[i]);
    //   gantt.getCalendar('custom').setWorkTime({ date: converted_date, hours: false });
    // }

    // gantt.config.duration_unit = 'hour';
    gantt.config.work_time = true; // exclude week end in collumn
    // gantt.setWorkTime({ hours: ['8:00-17:00'] });

    // multi select input
    gantt.form_blocks['multiselect'] = {
      render: function(sns) {
        let height = (sns.height || '23') + 'px';
        let html =
          "<div class='gantt_cal_ltext gantt_cal_chosen gantt_cal_multiselect' style='height:" +
          height +
          ";width:100%'><select data-placeholder='...' class='chosen-select' multiple>";
        if (sns.options) {
          for (let i = 0; i < sns.options.length; i++) {
            if (sns.unassigned_value !== undefined && sns.options[i].key == sns.unassigned_value) {
              continue;
            }
            html += "<option value='" + sns.options[i].key + "'>" + sns.options[i].label + '</option>';
          }
        }
        html += '</select></div>';
        return html;
      },

      set_value: function(node, value, ev, sns) {
        node.style.overflow = 'visible';
        node.parentNode.style.overflow = 'visible';
        node.style.display = 'inline-block';
        let select = $(node.firstChild) as any;

        if (value) {
          value = (value + '').split(',');
          select.val(value);
        } else {
          select.val([]);
        }

        select.chosen();
        if (sns.onchange) {
          select.change(() => {
            sns.onchange.call(this);
          });
        }
        select.trigger('chosen:updated');
        select.trigger('change');
      },

      get_value: function(node, ev) {
        let value = $(node.firstChild).val();
        return value;
      },

      focus: function(node) {
        $(node.firstChild).focus();
      },
    };

    gantt.config.resize_rows = true;
    // gantt.config.grid_width = 800;
  }, []);

  // scroll horizontal
  gantt.config.layout = {
    css: 'gantt_container',
    cols: [
      {
        width: 1200,
        min_width: 300,
        rows: [
          { view: 'grid', scrollX: 'gridScroll', scrollable: true, scrollY: 'scrollVer' },
          { view: 'scrollbar', id: 'gridScroll', group: 'horizontal' },
        ],
      },
      { resizer: true, width: 1 },
      {
        rows: [
          { view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
          { view: 'scrollbar', id: 'scrollHor', group: 'horizontal' },
        ],
      },
      { view: 'scrollbar', id: 'scrollVer' },
    ],
  };

  gantt.config.grid_elastic_columns = true;

  return;
}

export default Config;
