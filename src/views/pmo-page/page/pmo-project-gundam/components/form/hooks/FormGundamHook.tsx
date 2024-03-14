import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gantt } from 'dhtmlx-gantt';
import { Dispatch } from 'redux';
import moment from 'moment';

import * as ModalFirstLevelActions from 'stores/modal/first-level/ModalFirstLevelActions';
import ProjectGundamTaskModel, { ProjectTasktModel } from 'stores/project-gundam/models/ProjectGundamTaskModel';
import ProjectGundamLinkModel from 'stores/project-gundam/models/ProjectGundamLinkModel';
import * as ProjectGundamActions from 'stores/project-gundam/ProjectGundamActions';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import FormGundam from '../FormGundam';
import IStore from 'models/IStore';

const updateTask = (dispatch, newItems, projectId) => {
  dispatch(ProjectGundamActions.putProjectGundamTask(newItems)).then(() => {
    dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
    dispatch(ModalFirstLevelActions.CLOSE());
  });
};

const deleteLink = (dispatch, id, projectId, userLoginId: number) => {
  dispatch(ProjectGundamActions.deleteProjectGundamLink(+id, userLoginId)).then(() => {
    dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
    gantt.clearAll();
  });
};

function FormGundamHook({ projectId, funnelGenId }) {
  const dispatch: Dispatch = useDispatch();
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    gantt.showLightbox = function(id) {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <FormGundam task={id} projectId={projectId} funnelGenId={funnelGenId} />,
          ModalSizeEnum.Small,
          false,
          false,
          false
        )
      );
    };
  }, []);

  useEffect(() => {
    gantt.createDataProcessor({
      task: {
        create: function(data) {
          console.log('task create', data);
        },

        update: function(data, id) {
          console.log('task update', data, id);
          const newItems = new ProjectTasktModel({
            taskId: +id,
            projectId: projectId,
            // [task,project,milestone]
            ganttType: data.isMilestone ? 'milestone' : 'task',
            taskTitle: data.text,
            taskDescription: data.taskDescription,
            category: data.category,
            subcategory: data.subcategory,
            issueType: data.issueType,
            issueSubtype: data.issueSubtype,
            primaryResources: data.assigns?.map((item: any) => item).join(','),
            secondaryResources: data.secondaryResources?.map((item: any) => item).join(','),
            slaName: data.slaName,
            status: data.status,
            remark: data.remark,
            estStartDate: moment(data.start_date).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            estEndDate: moment(data.end_date).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            isMilestone: data.isMilestone,
            isApplyTaskResourceToAllChild: data.isApplyTaskResourceToAllChild,
            taskDuration: data.duration,
            taskProgress: data.progress,
            parentTaskId: +data.parent,

            funnelGenId: data.funnelGenId,
            brand: data.brand,
            subBrand: data.subBrand,
            isSendEmailNotification: data.isSendEmailNotification,
            isSendEmailTaskStatusInProgressEscalation: data.isSendEmailTaskStatusInProgressEscalation,
            emailReceiver: data.emailReceiver,
            emailCc: data.emailCc,

            createDate: moment(data.createDate).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            createUserID: data.createUserID,

            modifyDate: new Date(),
            modifyUserID: currentUser.employeeID,
          });

          // fix
          updateTask(dispatch, newItems, projectId);
        },

        delete: function(id) {
          // gantt.getTask(id);
          console.log('task delete', id);
        },
      },
      link: {
        create: function(data) {
          console.log('link create', data);

          const newItems = new ProjectGundamLinkModel({
            projectId: +projectId,
            sourceTaskId: +data.source,
            targetTaskId: +data.target,
            type: +data.type,
            lag: data.lag ? data.lag : 0,
            createDate: new Date(),
            createUserID: currentUser.employeeID,
          });

          dispatch(ProjectGundamActions.postProjectGundamLink(newItems)).then(() => {
            dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
            gantt.clearAll();
          });
        },

        update: function(data, id) {
          // const newItems = new ProjectGundamLinkModel({
          //   linkId: id,
          //   sourceTaskId: +data.source,
          //   targetTaskId: +data.target,
          //   type: data.type,
          //   lag: data.lag,
          //   modifyDate: new Date(),
          //   modifyUserID: currentUser.employeeID,
          // });
          console.log('update link', data, id);
          // dispatch(ProjectGundamActions.putProjectGundamLink(newItems)).then(() => {
          //   // dispatch(ProjectGundamActions.getProjectGundamTaskWithLink(+projectId));
          // });
        },

        delete: function(id) {
          deleteLink(dispatch, id, projectId, currentUser.employeeID);
          console.log('link delete', id);
        },
      },
    });

    // // link
    // gantt.attachEvent('onBeforeLinkAdd', function(id, link) {
    //   console.log('onBeforeLinkAdd id, link', id, link);
    //   return true;
    // });
    // gantt.attachEvent('onBeforeLinkDelete', function(id, item) {
    //   console.log('onBeforeLinkDelete id, link', id, item);
    //   return true;
    // });
  }, []);

  return;
}

export default FormGundamHook;
