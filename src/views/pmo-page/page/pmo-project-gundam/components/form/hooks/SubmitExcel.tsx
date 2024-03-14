import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gantt } from 'dhtmlx-gantt';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import UploadFile from './UploadFile';

function SubmitExcel() {
  const dispatch = useDispatch();

  const [requesting, setRequesting] = useState(false);

  const [uploadFile] = UploadFile();

  const onSubmitHandler = (file: any, projectId, funnelGenID) => {
    saveToDatabase(file, projectId, funnelGenID);
    // upload(
    //   file,
    //   function() {
    //     // fileDnD.hideOverlay();
    //   },
    //   projectId
    // );
  };

  const saveToDatabase = (file, projectId, funnelGenID) => {
    uploadFile(false, file, projectId, funnelGenID);
  };

  function upload(file, callback, projectId, funnelGenID) {
    setRequesting(true);
    gantt.importFromExcel({
      server: 'https://export.dhtmlx.com/gantt',
      data: file,
      callback: function(project) {
        if (project) {
          var header = [];
          var headerControls = [];
          var body = [];

          project.forEach(function(task) {
            var cols = [];
            if (!header.length) {
              for (var i in task) {
                header.push(i);
              }
              header.forEach(function(col, index) {
                cols.push('<th>' + col + '</th>');
                headerControls.push("<td><select data-column-mapping='" + col + "'>" + getOptions(index) + '</select>');
              });
              body.push('<tr>' + cols.join('') + '</tr>');
              body.push('<tr>' + headerControls.join('') + '</tr>');
            }
            cols = [];
            header.forEach(function(col) {
              cols.push('<td>' + task[col] + '</td>');
            });
            body.push('<tr>' + cols.join('') + '</tr>');
          });

          var div = gantt.modalbox({
            title: 'Preview',
            type: 'excel-form',
            text: '<table>' + body.join('') + '</table>',
            buttons: [
              { label: 'Save', css: 'link_save_btn', value: 'save' },
              { label: 'Cancel', css: 'link_cancel_btn', value: 'cancel' },
            ],
            callback: function(result) {
              switch (result) {
                case 'save':
                  var selects = div.querySelectorAll('[data-column-mapping]');
                  var mapping = {};
                  selects.forEach(function(select) {
                    mapping[select.getAttribute('data-column-mapping')] = select.value;
                  });
                  loadTable(mapping, project);
                  saveToDatabase(file, projectId, funnelGenID);
                  dispatch(ModalFirstLevelActions.CLOSE());
                  setRequesting(false);
                  break;
                case 'cancel':
                  //Cancel
                  break;
              }
            },
          });
        }

        if (callback) callback(project);
      },
    });
  }

  function getOptions(selectedIndex) {
    return ['text', 'start_date', 'end_date', 'act_start_time', 'act_end_time', 'status', 'owners', 'duration']
      .map(function(name, index) {
        return "<option value='" + name + "' " + (selectedIndex == index ? 'selected' : '') + '>' + name + '</option>';
      })
      .join('');
  }

  function to_snake_case(name) {
    return (name + '').toLowerCase().replace(/ /, '_');
  }
  function loadTable(mapping, data) {
    var ganttDataset = {
      data: [],
      links: [],
    };

    data.forEach(function(item) {
      var copy: any = {};
      for (var i in item) {
        if (mapping[i]) {
          copy[mapping[i]] = item[i];
        } else {
          copy[to_snake_case(i)] = item[i];
        }

        copy.open = true;
        if (copy.wbs) {
          var wbs = copy.wbs + '';
          copy.id = wbs;
          var parts = wbs.split('.');
          parts.pop();
          copy.parent = parts.join('.');
        }
      }
      ganttDataset.data.push(copy);
    });

    // gantt.clearAll();
    // gantt.parse(ganttDataset);
  }

  return [requesting, (e, projectId, funnelGenID) => onSubmitHandler(e, projectId, funnelGenID)];
}

export default SubmitExcel;
