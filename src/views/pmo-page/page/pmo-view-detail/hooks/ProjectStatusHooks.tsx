import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import LatestMIlestoneCard from '../components/card/latest-milestone/LatestMIlestoneCard';
import * as ModalNoPaddingActions from 'stores/modal/no-padding/ModalNoPaddingActions';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IStore from 'models/IStore';

const ProjectStatusHooks = ({ projectId }) => {
  const latestMilestone = useSelector((state: IStore) => state.pmo.latestMilestone);
  const projectSummary = useSelector((state: IStore) => state.pmo.projectSummary);

  let dataCardStatus = [
    {
      title: 'Project Summary',
      sub1: `${projectSummary.precentageTask}%`,
      sub2: `${projectSummary?.totalTask - projectSummary?.completeTask} Task to go`,
      text: ` ${projectSummary?.firstActualStartDate &&
        moment(projectSummary?.firstActualStartDate).format('DD MMM yyyy')} ${projectSummary?.lastActualEndDate &&
        ` - ${moment(projectSummary?.lastActualEndDate).format('DD MMM yyyy')}`}`,

      bg: 'bg-blue',
      icon: {
        name: 'clipboard list',
        size: 'big',
        icColor: 'icon-blue',
      },
      action: {
        type: 'link',
        item: null,
      },
      hover: false,
    },
    {
      title: 'Latest Milestone',
      sub1: `${latestMilestone.precentageTask}% Task Done`,
      sub2: '',
      text: `${latestMilestone?.lastActualEndDate ? moment(latestMilestone?.lastActualEndDate).format('DD MMM yyyy') : ''}`,
      bg: 'bg-yellow',
      icon: {
        name: 'trophy',
        size: 'big',
        icColor: 'icon-yellow',
      },
      action: {
        type: 'modal',
        item: ModalNoPaddingActions.OPEN(<LatestMIlestoneCard projectId={projectId} />, ModalSizeEnum.Small),
      },
      hover: true,
    },
  ];

  return dataCardStatus;
};

export default ProjectStatusHooks;
